import create from 'zustand';
import {
  ConnectionSlice,
  createConnectionSlice,
} from '~/store/slices/Connection.slice';
import {
  createLiveChatSlice,
  LiveChatSlice,
} from '~/store/slices/LiveChat.slice';

export const useStore = create<ConnectionSlice & LiveChatSlice>((...a) => ({
  ...createConnectionSlice(...a),
  ...createLiveChatSlice(...a),
}));
