import { act, renderHook } from '@testing-library/react-native';
import { useStore } from '~/store/Store';
import { ConnectionSlice } from '~/store/slices/Connection.slice';
import { ConnectionStatus } from '~/common/models/Connection.model';
import SocketIOService, {
  resetSocket,
} from '~/services/SocketIOService/SocketIO.service';
import { io } from 'socket.io-client';
import User from '~/common/models/User.model';
import resetStoreCalls from '~/__tests__/resetStore';

jest.mock('socket.io-client');
resetStoreCalls();

describe('SocketIO service', () => {
  const ioMock = {
    on: jest.fn(),
    connect: jest.fn(),
    emit: jest.fn(),
  };

  const testUser: User = {
    id: 'testID',
    email: 'testMail',
    lastName: 'lastName',
    firstName: 'firstName',
  };

  io.mockImplementation(() => ioMock);

  afterEach(() => {
    resetSocket();
    io.mockClear();
    for (const [_, value] of Object.entries(ioMock)) {
      value.mockClear();
    }
  });

  it('should init socket', async () => {
    renderHook(() => {
      SocketIOService();
      return useStore((state: ConnectionSlice) => state);
    });

    expect(io).toHaveBeenCalledTimes(1);
    expect(ioMock.connect).toHaveBeenCalledTimes(0);
    expect(ioMock.emit).toHaveBeenCalledTimes(0);
    expect(ioMock.on).toHaveBeenCalledTimes(5);
  });

  it('should connect on state change', async () => {
    const { result } = renderHook(() => {
      SocketIOService();
      return useStore((state: ConnectionSlice) => state);
    });

    // act
    await act(() => {
      result.current.setUser(testUser);
      result.current.setConnectionStatus(ConnectionStatus.AGREEMENT_SUCCESS);
    });

    expect(ioMock.connect).toHaveBeenCalledTimes(1);
    expect(io.mock.lastCall[0]).toBe('https://api.gomelibo.com/');
    expect(io.mock.lastCall[1].path).toBe('/lorikeet/socket.io');
  });

  it('should emit joinChatbotRoom', async () => {
    const { result } = renderHook(() => {
      SocketIOService();
      return useStore((state: ConnectionSlice) => state);
    });

    expect(ioMock.emit).toHaveBeenCalledTimes(0);

    const chatbotKey = 'testKey';

    // act
    await act(() => {
      result.current.setUser(testUser);
      result.current.setChatbotKey(chatbotKey);
      result.current.setConnectionStatus(ConnectionStatus.AGREEMENT_SUCCESS);
    });

    expect(ioMock.emit).toHaveBeenCalledTimes(1);
    expect(ioMock.emit.mock.lastCall[0]).toBe('joinChatbotRoom');
    expect(ioMock.emit.mock.lastCall[1]).toStrictEqual({
      userId: testUser.id,
      chatbotKey,
    });
  });

  it('should emit joinLiveChat', async () => {
    const { result } = renderHook(() => {
      const { joinLiveChat } = SocketIOService();
      return {
        connectionSlice: useStore((state: ConnectionSlice) => state),
        joinLiveChat,
      };
    });

    expect(ioMock.emit).toHaveBeenCalledTimes(0);

    const chatbotKey = 'testKey';
    const roomId = 42;

    // act
    await act(() => {
      result.current.connectionSlice.setUser(testUser);
      result.current.connectionSlice.setChatbotKey(chatbotKey);
      result.current.connectionSlice.setConnectionStatus(
        ConnectionStatus.AGREEMENT_SUCCESS,
      );
    });

    result.current.joinLiveChat(roomId);

    expect(ioMock.emit).toHaveBeenCalledTimes(2);
    expect(ioMock.emit.mock.lastCall[0]).toBe('agent/join');
    expect(ioMock.emit.mock.lastCall[1]).toStrictEqual({
      userId: testUser.id,
      chatbotKey,
      roomId,
    });
  });

  it('should not initialize socket twice', async () => {
    renderHook(() => {
      SocketIOService();
      SocketIOService();
    });

    expect(io).toHaveBeenCalledTimes(1);
  });

  it('should emit send on sendMessage()', async () => {
    const { result } = renderHook(() => SocketIOService());

    const message = 'testMessage';
    const index = 42;

    await act(() => {
      result.current.sendMessage(message, index);
    });

    expect(ioMock.emit).toHaveBeenCalledTimes(1);
    expect(ioMock.emit.mock.lastCall[0]).toBe('send');
    expect(typeof ioMock.emit.mock.lastCall[1]).toBe('object');
    expect(ioMock.emit.mock.lastCall[1]).toHaveProperty('roomId');
    expect(ioMock.emit.mock.lastCall[1]).toHaveProperty('content');
    expect(ioMock.emit.mock.lastCall[1].roomId).toBe(index);
  });

  it('should emit typing on sendTyping()', async () => {
    const { result } = renderHook(() => SocketIOService());

    const typing = true;
    const index = 42;

    await act(() => {
      result.current.sendTyping(typing, index);
    });

    expect(ioMock.emit).toHaveBeenCalledTimes(1);
    expect(ioMock.emit.mock.lastCall[0]).toBe('typing');
    expect(typeof ioMock.emit.mock.lastCall[1]).toBe('object');
    expect(ioMock.emit.mock.lastCall[1]).toHaveProperty('roomId');
    expect(ioMock.emit.mock.lastCall[1]).toHaveProperty('typing');
    expect(ioMock.emit.mock.lastCall[1].roomId).toBe(index);
    expect(ioMock.emit.mock.lastCall[1].typing).toBe(typing);
  });

  it.skip('should emit finish on sendFinish()', async () => {
    const { result } = renderHook(() => SocketIOService());
    const index = 42;

    await act(() => {
      result.current.sendFinish(index);
    });

    expect(ioMock.emit).toHaveBeenCalledTimes(1);
    expect(ioMock.emit.mock.lastCall[0]).toBe('finish');
    expect(typeof ioMock.emit.mock.lastCall[1]).toBe('object');
    expect(ioMock.emit.mock.lastCall[1]).toHaveProperty('roomId');
    expect(ioMock.emit.mock.lastCall[1].roomId).toBe(index);
  });

  it('should emit agent/join on joinLiveChat()', async () => {
    const { result } = renderHook(() => {
      const { joinLiveChat } = SocketIOService();
      return {
        connectionSlice: useStore((state: ConnectionSlice) => state),
        joinLiveChat,
      };
    });

    const index = 42;
    const chatbotKey = 'my_personal_key';
    const user: User = {
      id: 'Id_42',
      lastName: 'Goethe',
      firstName: 'Johann Wolfgang',
      email: 'johann_wolfgang.goethe@dichter.de',
    };
    const payload = {
      roomId: index,
      chatbotKey: chatbotKey,
      userId: user.id,
    };

    await act(() => {
      result.current.connectionSlice.setChatbotKey(chatbotKey);
      result.current.connectionSlice.setUser(user);
    });

    await act(() => {
      result.current.joinLiveChat(index);
    });

    expect(ioMock.emit).toHaveBeenCalledTimes(1);
    expect(ioMock.emit.mock.lastCall[0]).toBe('agent/join');
    expect(typeof ioMock.emit.mock.lastCall[1]).toBe('object');
    expect(ioMock.emit.mock.lastCall[1]).toStrictEqual(payload);
  });
});
