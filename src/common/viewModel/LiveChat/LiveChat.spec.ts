import { act, renderHook } from '@testing-library/react-native';
import useLiveChatViewmodel from '~/common/viewModel/LiveChat/LiveChat.viewmodel';
import { useStore } from '~/store/Store';
import { LiveChatSlice } from '~/store/slices/LiveChat.slice';
import { liveChatMocks } from '~/__tests__/__mocks__/liveChatMocks';

describe('LiveChat view model unit tests', () => {
  it('should throw an error on manipulating absent livechat', async () => {
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

    expect(() => {
      result.current.setClientTyping('not a existing id', true);
    }).toThrowError();
  });

  it('should find the index to the live chat id', async () => {
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

    expect(() => {
      act(() => {
        result.current.setClientTyping(liveChatMocks[0]._id, true);
        result.current.setClientTyping(liveChatMocks[1]._id, true);
        result.current.setClientTyping(liveChatMocks[2]._id, true);
      });
    }).not.toThrowError();
  });

  it('should throw an error on inserting live chats with the same id', async () => {
    const { result } = renderHook(() => {
      const { addLiveChats } = useLiveChatViewmodel();
      const liveChatSlice = useStore<LiveChatSlice>((state) => state);

      return {
        liveChatSlice,
        addLiveChats,
      };
    });

    await act(() => {
      result.current.liveChatSlice.addLiveChats(liveChatMocks);
    });

    const newLC = JSON.parse(JSON.stringify(liveChatMocks[1]));

    expect(() => {
      act(() => {
        result.current.addLiveChats([newLC]);
      });
    }).toThrowError();
    newLC._id = 'some other lc with other id';
    expect(() => {
      act(() => {
        result.current.addLiveChats([newLC]);
      });
    }).not.toThrowError();
  });
});
