import { useStore } from '~/store/Store';
import { ConnectionSlice } from '~/store/slices/Connection.slice';

/**
 * Call this function whenever you write tests
 * that changes the state of the store
 *
 * This approach is a bit of a workaround of
 * https://docs.pmnd.rs/zustand/guides/testing
 * but unfortunately the mocked create func won't be invoked
 */
const resetStoreCalls = () => {
  let initState: ConnectionSlice;

  beforeEach(() => {
    initState = useStore.getState();
  });

  afterEach(() => {
    useStore.setState(initState, true);
  });
};

export default resetStoreCalls;
