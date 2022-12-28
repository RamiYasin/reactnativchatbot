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
import {
  MessageEvent,
  TypingEvent,
} from '~/services/SocketIOService/socketIOResponses';
import { LiveChatSlice } from '~/store/slices/LiveChat.slice';
import { liveChatMocks } from '~/__tests__/__mocks__/liveChatMocks';

jest.mock('socket.io-client');
resetStoreCalls();

describe('socketIO service integration tests', () => {
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

  it('should change attr client typing on event "typing"', async () => {
    const { result } = renderHook(() => {
      return useStore((state: ConnectionSlice & LiveChatSlice) => state);
    });

    await act(() => {
      result.current.setUser(testUser);
      result.current.addLiveChats(liveChatMocks);
    });

    // call socket io service here to extract events with updated store
    renderHook(() => SocketIOService());

    const typingEvent = ioMock.on.mock.calls.find(
      (event) => event[0] === 'typing',
    );

    const typingResponse: TypingEvent = {
      roomId: liveChatMocks[2]._id,
      typing: true,
      userId: testUser.id,
    };

    expect(result.current.liveChats[2].isClientTyping).toBe(false);
    await act(() => typingEvent[1](typingResponse));
    expect(result.current.liveChats[2].isClientTyping).toBe(true);
  });

  it('should add message on event "message"', async () => {
    const { result } = renderHook(() => {
      return useStore((state: ConnectionSlice & LiveChatSlice) => state);
    });

    await act(() => {
      result.current.setUser(testUser);
      result.current.addLiveChats(liveChatMocks);
    });

    // call socket io service here to extract events with updated store
    renderHook(() => SocketIOService());

    const messageEvent = ioMock.on.mock.calls.find(
      (event) => event[0] === 'message',
    );

    const messageEventResponse: MessageEvent = {
      roomId: liveChatMocks[0]._id,
      userId: testUser.id,
      content: 'testMessage',
      date: '1998-06-24T00:59:00.000Z',
    };

    expect(result.current.liveChats[0].messages).toHaveLength(0);
    await act(() => messageEvent[1](messageEventResponse));
    expect(result.current.liveChats[0].messages).toHaveLength(1);
    expect(result.current.liveChats[0].messages[0].content).toBe(
      messageEventResponse.content,
    );
    expect(
      result.current.liveChats[0].messages[0].date.getTime() -
        new Date(messageEventResponse.date).getTime(),
    ).toBe(0);
  });

  it('should change status on event "connect"', async () => {
    const { result } = renderHook(() => {
      SocketIOService();
      return useStore((state: ConnectionSlice & LiveChatSlice) => state);
    });

    const connectEvent = ioMock.on.mock.calls.find(
      (event) => event[0] === 'connect',
    );

    expect(result.current.status).toBe(ConnectionStatus.UNAUTHED);
    await act(() => connectEvent[1]());
    expect(result.current.status).toBe(ConnectionStatus.SERVICES_SUCCESS);
  });
});
