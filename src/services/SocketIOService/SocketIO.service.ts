import { io } from 'socket.io-client';
import useConnectionViewModel from '~/common/viewModel/Connection/Connection.viewmodel';
import { useEffect } from 'react';
import { ConnectionStatus } from '~/common/models/Connection.model';
import { Socket } from 'socket.io-client/build/esm/socket';
import {
  MessageEvent,
  NewEvent,
  TypingEvent,
} from '~/services/SocketIOService/socketIOResponses';
import useLiveChatViewmodel from '~/common/viewModel/LiveChat/LiveChat.viewmodel';
import LiveChat from '~/common/models/LiveChat.model';

let socket: Socket | null;

/**
 * Reset socket for each unit test
 * Don't use it in production to manipulate the socket!!
 */
export const resetSocket = () => {
  if (__DEV__) {
    socket = null;
  }
};

const SocketIOService = () => {
  const { user, chatbotKey, connectionStatus, setConnectionStatus } =
    useConnectionViewModel();

  const { setClientTyping, addMessage, updateLiveChat } =
    useLiveChatViewmodel();

  useEffect(() => {
    if (connectionStatus === ConnectionStatus.AGREEMENT_SUCCESS) {
      socket?.connect();
      joinChatbotRoom();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connectionStatus]);

  /**
   * Initialize the socket
   *
   * SocketIO is getting called once to have one connection
   * with multiple service calls.
   */
  const init = () => {
    if (!socket) {
      socket = io('https://api.gomelibo.com/', {
        path: '/lorikeet/socket.io',
        autoConnect: false,
      });
    }
  };

  /**
   * Call this to receive all available
   * liveChats with the 'update' event
   */
  const joinChatbotRoom = () => {
    socket?.emit('joinChatbotRoom', {
      userId: user?.id,
      chatbotKey,
    });
  };

  /**
   * Call this function to receive following calls for
   * a specific liveChat:
   * - message
   * - typing
   */
  const joinLiveChat = (liveChatId: string) => {
    socket?.emit('agent/join', {
      userId: user?.id,
      chatbotKey,
      roomId: liveChatId,
    });
  };

  const sendMessage = (message: string, liveChatId: string) => {
    socket?.emit('send', {
      userId: user?.id,
      roomId: liveChatId,
      content: message,
    });
  };

  const sendTyping = (isTyping: boolean, liveChatId: string) => {
    socket?.emit('typing', {
      userId: user?.id,
      roomId: liveChatId,
      typing: isTyping,
    });
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const sendFinish = (liveChatId: string) => {
    // TODO emit finish
  };

  init();

  // this should never happen
  if (!socket) {
    throw Error('Socket initialization goes wrong');
  }

  socket.on('updates', (liveChat: LiveChat) => {
    updateLiveChat(liveChat);
  });

  socket.on('message', ({ roomId, content, date }: MessageEvent) => {
    addMessage(roomId, { content, date: new Date(date) });
  });

  socket.on('typing', ({ roomId, typing }: TypingEvent) => {
    setClientTyping(roomId, typing);
  });

  socket.on('new', (payload: NewEvent) => {
    // eslint-disable-next-line no-console
    console.log('new', payload);
  });

  socket.on('connect', () => {
    setConnectionStatus(ConnectionStatus.SERVICES_SUCCESS);
  });

  return {
    joinLiveChat,
    sendMessage,
    sendTyping,
    sendFinish,
  };
};

export default SocketIOService;
