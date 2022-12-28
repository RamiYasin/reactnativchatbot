import { act, renderHook } from '@testing-library/react-native';
import useLiveChatViewmodel from '~/common/viewModel/LiveChat/LiveChat.viewmodel';
import { useStore } from '~/store/Store';
import { LiveChatSlice } from '~/store/slices/LiveChat.slice';
import { liveChatMocks } from '~/__tests__/__mocks__/liveChatMocks';
import resetStoreCalls from '~/__tests__/resetStore';
import LiveChatMessage from '~/common/models/LiveChatMessage.model';

resetStoreCalls();

describe('LiveChat view model integration tests', () => {
  it('should set typing for a specific livechat', async () => {
    const { result } = renderHook(() => {
      const { setClientTyping } = useLiveChatViewmodel();
      const liveChatSlice = useStore<LiveChatSlice>((state) => state);

      return {
        liveChatSlice,
        setClientTyping,
      };
    });

    await act(() => {
      result.current.liveChatSlice.addLiveChats(liveChatMocks);
    });

    // check that all liveChats set isClientTyping attr to false
    expect(
      result.current.liveChatSlice.liveChats.filter(
        (liveChat) => liveChat.isClientTyping,
      ),
    ).toHaveLength(0);

    const testedLiveChat = liveChatMocks[1];
    await act(() => {
      result.current.setClientTyping(testedLiveChat._id, true);
    });

    expect(result.current.liveChatSlice.liveChats[0].isClientTyping).toBe(
      false,
    );
    expect(result.current.liveChatSlice.liveChats[1].isClientTyping).toBe(true);
    expect(result.current.liveChatSlice.liveChats[2].isClientTyping).toBe(
      false,
    );
  });

  it('should add Message for a specific liveChat', async () => {
    const { result } = renderHook(() => {
      const { addMessage } = useLiveChatViewmodel();
      const liveChatSlice = useStore<LiveChatSlice>((state) => state);

      return {
        liveChatSlice,
        addMessage,
      };
    });

    await act(() => {
      result.current.liveChatSlice.addLiveChats(liveChatMocks);
    });

    // check that all liveChats have empty messages
    expect(
      result.current.liveChatSlice.liveChats.filter(
        (liveChat) => liveChat.messages.length,
      ),
    ).toHaveLength(0);

    const testedLiveChat = liveChatMocks[0];
    const testMessage: LiveChatMessage = {
      content: 'testMessage',
      date: new Date(),
    };

    await act(() => {
      result.current.addMessage(testedLiveChat._id, testMessage);
    });

    expect(result.current.liveChatSlice.liveChats[0].messages.length).toBe(1);
    expect(result.current.liveChatSlice.liveChats[0].messages[0].content).toBe(
      testMessage.content,
    );
  });
});
