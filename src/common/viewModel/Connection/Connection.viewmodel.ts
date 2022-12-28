import { useStore } from '~/store/Store';
import { ConnectionSlice } from '~/store/slices/Connection.slice';
import User from '~/common/models/User.model';
import { ConnectionStatus } from '~/common/models/Connection.model';
import { useMemo } from 'react';
import { AxiosRequestConfig } from 'axios';

const useConnectionViewModel = () => {
  const {
    user,
    setUser,
    chatbotKey,
    setChatbotKey,
    setConnectionStatus,
    status,
    bearerToken,
    setBearerToken,
  } = useStore((state: ConnectionSlice) => state);

  /**
   * Sets information to use the backend interfaces.
   *
   * The params will be needed by the SocketIO.service and other services
   * that communicates with melibo api backend
   *
   * @param _user User element that comes from the /agreement api call
   * @param _chatbotKey chatbotKey that derives with the same api call
   */
  const onAgreementSuccess = (_user: User, _chatbotKey: string) => {
    setUser(_user);
    setChatbotKey(_chatbotKey);
    setConnectionStatus(ConnectionStatus.AGREEMENT_SUCCESS);
  };

  const onAuthenticationSuccess = (_token: string) => {
    setBearerToken(_token);
    setConnectionStatus(ConnectionStatus.AUTH_SUCCESS);
  };

  const onLogoutSuccess = () => {
    setBearerToken('');
    setConnectionStatus(ConnectionStatus.UNAUTHED);
  };

  /**
   * Is user authenticated
   *
   * This function returns true regardless of its connection status.
   * You can be authenticated (own a valid jwt token) but doesn't have a currently running
   * internet connection.
   */
  const isAuthenticated = (): boolean => {
    return status !== ConnectionStatus.UNAUTHED;
  };

  /**
   * Is app connected to the internet.
   *
   * This function returns true regardless of the authentication state.
   * When a user is unauthed (caused by jwt expiration or logout) and has a running internet
   * connection this function returns true.
   */
  const isConnected = (): boolean => {
    return (
      status === ConnectionStatus.AUTH_SUCCESS ||
      status === ConnectionStatus.AGREEMENT_SUCCESS ||
      status === ConnectionStatus.SERVICES_SUCCESS ||
      status === ConnectionStatus.UNAUTHED
    );
  };

  /**
   * Global axios configurations
   */
  const getAxiosConfig = useMemo<AxiosRequestConfig>(() => {
    return {
      headers: { Authorization: `Bearer ${bearerToken}` },
      baseURL: 'https://api.gomelibo.com/',
    };
  }, [bearerToken]);

  return {
    user,
    chatbotKey,
    connectionStatus: status,
    bearerToken,
    getAxiosConfig,

    onAgreementSuccess,
    isAuthenticated,
    isConnected,
    setConnectionStatus,
    onAuthenticationSuccess,
    onLogoutSuccess,
  };
};

export default useConnectionViewModel;
