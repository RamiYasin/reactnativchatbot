import User from '~/common/models/User.model';

/**
 * Status to the connection workflow. Services listening to status changes to
 * invoke their actions
 *
 * @see https://drive.google.com/file/d/1psdnoWy80kFJW5upoRMTjYXuptDmDHFE/view?usp=sharing
 * for more information
 */
export enum ConnectionStatus {
  UNAUTHED, // whenever a 401 is received

  AUTH_SUCCESS, // after auth succeeded
  AUTH_NET_ERR, // when auth network error

  AGREEMENT_SUCCESS, // after /agreement api call responded successfully
  AGREEMENT_NET_ERR, // on /agreement error

  SERVICES_SUCCESS, // after some service received a good response
  SERVICES_NET_ERR, // after some service received a network err
}

export interface Connection {
  chatbotKey: string;
  status: ConnectionStatus;
  bearerToken: string;

  user: User | undefined;
}
