import { StateCreator } from 'zustand';
import LiveChat from '~/common/models/LiveChat.model';
import LiveChatMessage from '~/common/models/LiveChatMessage.model';
import update from 'react-addons-update';

export interface LiveChatSlice {
  liveChats: LiveChat[];
  updateLiveChat: (liveChat: LiveChat, index: number) => void;
  //the active live chat selected by user
  activeLiveChat: null | LiveChat;
  addLiveChats: (liveChats: LiveChat[]) => void;
  addMessageToLiveChat: (index: number, message: LiveChatMessage) => void;
  setClientTyping: (isTyping: boolean, index: number) => void;
  setActiveLiveChat: (activeLiveChat: LiveChat) => void;
}

export const createLiveChatSlice: StateCreator<LiveChatSlice> = (set) => ({
  liveChats: [],
  activeLiveChat: null,

  updateLiveChat: (liveChat: LiveChat, index: number) =>
    set((state) => ({
      liveChats: update(state.liveChats, {
        [index]: {
          $set: liveChat,
        },
      }),
    })),

  addLiveChats: (liveChats: LiveChat[]) =>
    set((state) => ({
      liveChats: [...state.liveChats, ...liveChats],
    })),

  setClientTyping: (isTyping: boolean, index: number) =>
    set((state) => ({
      liveChats: update(state.liveChats, {
        [index]: {
          isClientTyping: { $set: isTyping },
        },
      }),
    })),

  addMessageToLiveChat: (index, message: LiveChatMessage) =>
    set((state) => ({
      liveChats: update(state.liveChats, {
        [index]: {
          messages: {
            $push: [message],
          },
        },
      }),
    })),

  setActiveLiveChat: (activeLiveChat: LiveChat) =>
    set(() => ({ activeLiveChat })),
});
