import User from '~/common/models/User.model';
import { StateCreator } from 'zustand';
import { Connection, ConnectionStatus } from '~/common/models/Connection.model';

export interface ConnectionSlice extends Connection {
  setChatbotKey: (key: string) => void;
  setUser: (user: User) => void;
  setConnectionStatus: (status: ConnectionStatus) => void;
  setBearerToken: (token: string) => void;
}

export const createConnectionSlice: StateCreator<ConnectionSlice> = (set) => ({
  user: undefined,
  chatbotKey: '',
  status: ConnectionStatus.UNAUTHED,
  bearerToken: '',

  setUser: (user: User) => set(() => ({ user })),
  setChatbotKey: (key: string) => set(() => ({ chatbotKey: key })),
  setConnectionStatus: (status: ConnectionStatus) => set(() => ({ status })),
  setBearerToken: (token: string) => set(() => ({ bearerToken: token })),
});
