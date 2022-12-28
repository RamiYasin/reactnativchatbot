import { AuthSessionResult } from 'expo-auth-session';
import useConnectionViewModel from '~/common/viewModel/Connection/Connection.viewmodel';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import AuthenticationService from '~/services/AuthenticationService/Authentication.service';
import useLiveChatViewmodel from '~/common/viewModel/LiveChat/LiveChat.viewmodel';
import SocketIOService from '~/services/SocketIOService/SocketIO.service';
import LiveChat from '~/common/models/LiveChat.model';

const useHomeController = () => {
  const { onLogoutSuccess, user, chatbotKey } = useConnectionViewModel();
  const { liveChats, activeLiveChat, setActiveLiveChat } =
    useLiveChatViewmodel();
  const [error, setError] = useState('');

  const { logout } = AuthenticationService();
  const { joinLiveChat } = SocketIOService();
  const navigation = useNavigation();

  const onLivePress = () => {
    navigation.dispatch(
      CommonActions.navigate({
        name: 'LiveChatScreen',
      }),
    );
  };

  const onPressLogout = () => {
    logout().then(onLogoutResponse);
  };

  const onPressLiveChat = (liveChatId: string) => {
    joinLiveChat(liveChatId);
    setActiveLiveChat(liveChatId);
  };

  const onLogoutResponse = ({ type }: AuthSessionResult) => {
    if (type === 'success') {
      onLogoutSuccess();
    } else {
      //if the logout failed, give the user a feedback
      setError('Logout fehlgeschlagen');
    }
  };

  const getMessagesFromALiveChat = (activeLiveChat: LiveChat) => {
    let totalMessages = '';
    if (activeLiveChat) {
      activeLiveChat.messages.forEach((message) => {
        totalMessages += message.content + '\n';
      });
      return totalMessages;
    }
  };

  const onPressLogo = () => {
    navigation.dispatch(
      CommonActions.navigate({
        name: 'MenuScreen',
      }),
    );
  };

  return {
    onPressLogout,
    onPressLiveChat,
    getMessagesFromALiveChat,
    onPressLogo,
    onLivePress,
    user,
    chatbotKey,
    error,
    liveChats,
    activeLiveChat,
  };
};

export default useHomeController;
