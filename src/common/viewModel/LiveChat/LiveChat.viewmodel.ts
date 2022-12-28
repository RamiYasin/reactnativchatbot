import { useStore } from '~/store/Store';
import { LiveChatSlice } from '~/store/slices/LiveChat.slice';
import LiveChatMessage from '~/common/models/LiveChatMessage.model';
import LiveChat from '~/common/models/LiveChat.model';

const useLiveChatViewmodel = () => {
  const {
    addMessageToLiveChat,
    setClientTyping,
    liveChats,
    updateLiveChat,
    activeLiveChat,
    addLiveChats,
    setActiveLiveChat,
  } = useStore((state: LiveChatSlice) => state);

  const addMessage = (liveChatId: string, message: LiveChatMessage) => {
    addMessageToLiveChat(getIndexFromLcId(liveChatId), message);
  };

  const newLiveChat = () => {
    // TODO figure out what kind of data we will get from the 'new' event
  };

  const _setClientTyping = (liveChatId: string, isTyping: boolean) => {
    setClientTyping(isTyping, getIndexFromLcId(liveChatId));
  };

  /**
   * Add live chats to the liveChat array
   *
   * @throws Throws an error when a live chat with the same id already exists
   * in the store. <br>
   * This is a constraint to prevent {@link getIndexFromLcId} to return the
   * wrong index to a live chat
   *
   * @param _liveChats
   */
  const _addLiveChats = (_liveChats: LiveChat[]) => {
    liveChats.forEach((existingLC) => {
      _liveChats.forEach((newLC) => {
        if (newLC._id === existingLC._id) {
          throw new Error(
            `Live chat with id ${newLC._id} already exists in store`,
          );
        }
      });
    });

    const modifiedLiveChats = _liveChats.map((liveChat) => {
      return { ...liveChat, isClientTyping: false };
    });

    addLiveChats(modifiedLiveChats);
  };

  const storeActiveLiveChat = (liveChatId: string) => {
    const index = getIndexFromLcId(liveChatId);
    const selectedLiveChat = liveChats[index];

    setActiveLiveChat(selectedLiveChat);
  };

  /**
   * Converts a liveChatId to a index of the liveChats array in the store
   */
  const getIndexFromLcId = (liveChatId: string): number => {
    const index = liveChats.findIndex(
      (liveChat) => liveChat._id === liveChatId,
    );

    if (index === -1) {
      throw new Error(`Live chat id ${liveChatId} not found in store`);
    }

    return index;
  };

  /**
   *
   * Update live Chat state in the store
   *
   */

  const _updateLiveChat = (liveChat: LiveChat) => {
    updateLiveChat(liveChat, getIndexFromLcId(liveChat._id));
  };

  return {
    liveChats,
    activeLiveChat,
    addMessage,
    addLiveChats: _addLiveChats,
    setClientTyping: _setClientTyping,
    newLiveChat,
    updateLiveChat: _updateLiveChat,
    setActiveLiveChat: storeActiveLiveChat,
  };
};

export default useLiveChatViewmodel;
