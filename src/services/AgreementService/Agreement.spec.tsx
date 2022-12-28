import AgreementService, {
  AgreementResponse,
} from '~/services/AgreementService/Agreement.service';
import { act, renderHook, waitFor } from '@testing-library/react-native';
import axios, { AxiosError } from 'axios';
import { useStore } from '~/store/Store';
import { ConnectionSlice } from '~/store/slices/Connection.slice';
import { ConnectionStatus } from '~/common/models/Connection.model';
import resetStoreCalls from '~/__tests__/resetStore';

jest.mock('axios');
resetStoreCalls();

describe('AgreementService', () => {
  const response: AgreementResponse = {
    user: {
      firstName: 'Hans',
      lastName: 'Zimmer',
      email: 'hans.zimmer@gmail.com',
      id: 'auth0|42',
    },
    chatbotKey: 'a_ch4tb0tk3y',
  };

  // deep copy
  const responseCopy: AgreementResponse = JSON.parse(JSON.stringify(response));

  it('should trigger on status change', async () => {
    // arrange
    axios.get.mockResolvedValueOnce({ data: response });

    const { result } = renderHook(() => {
      AgreementService();
      return useStore((state: ConnectionSlice) => state);
    });

    // act
    await act(() => {
      result.current.setConnectionStatus(ConnectionStatus.AUTH_SUCCESS);
    });

    // assert
    expect(result.current.status).toBe(ConnectionStatus.AGREEMENT_SUCCESS);
    expect(result.current.user).toEqual(responseCopy.user);
    expect(result.current.chatbotKey).toEqual(responseCopy.chatbotKey);
  });

  it('should retry on network error', async () => {
    axios.get.mockRejectedValueOnce({
      message: 'Network err',
      status: 400,
      code: AxiosError.ERR_NETWORK,
    });

    const { result } = renderHook(() => {
      AgreementService();
      return useStore((state: ConnectionSlice) => state);
    });

    // act
    await act(() => {
      result.current.setConnectionStatus(ConnectionStatus.AUTH_SUCCESS);
    });

    expect(result.current.status).toBe(ConnectionStatus.AGREEMENT_NET_ERR);

    // good response
    axios.get.mockResolvedValueOnce({ data: response });
    await waitFor(
      () => {
        expect(result.current.status).toBe(ConnectionStatus.AGREEMENT_SUCCESS);
      },
      {
        timeout: 2200,
      },
    );
  });

  it('should retry give up on 401', async () => {
    axios.get.mockRejectedValueOnce({
      message: 'Network err',
      status: 401,
      code: AxiosError.ERR_BAD_REQUEST,
    });

    const { result } = renderHook(() => {
      AgreementService();
      return useStore((state: ConnectionSlice) => state);
    });

    // act
    await act(() => {
      result.current.setConnectionStatus(ConnectionStatus.AUTH_SUCCESS);
    });

    expect(result.current.status).toBe(ConnectionStatus.UNAUTHED);
  });
});
