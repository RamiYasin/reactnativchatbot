import axios, { AxiosError } from 'axios';
import User from '~/common/models/User.model';
import useConnectionViewModel from '~/common/viewModel/Connection/Connection.viewmodel';
import { useCallback, useEffect } from 'react';
import { ConnectionStatus } from '~/common/models/Connection.model';

/**
 * Response data of api call '/dingo/api/agreements'
 * This interface contains not all attributes but all necessary
 */
export interface AgreementResponse {
  chatbotKey: string;
  user: User;
}

const WAIT_AFTER_NET_ERR = 2000;
/**
 * The AgreementService listen to the {@link ConnectionStatus.AUTH_SUCCESS} status
 * to pull user and chatbotKey information.
 *
 * The data will be stored in {@link ConnectionSlice}
 */
const AgreementService = () => {
  const {
    onAgreementSuccess,
    connectionStatus,
    setConnectionStatus,
    getAxiosConfig,
  } = useConnectionViewModel();

  useEffect(() => {
    if (connectionStatus === ConnectionStatus.AUTH_SUCCESS) {
      runAgreementApiCall();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connectionStatus]);

  const runAgreementApiCall = useCallback(() => {
    axios
      .get<AgreementResponse>('dingo/api/agreements', getAxiosConfig)
      .then(({ data }) => onAgreementSuccess(data.user, data.chatbotKey))
      .catch(errorHandling);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getAxiosConfig]);

  /**
   * Error handling for api call.
   *
   * Log the error. If it's a network error set the connection status to {@link ConnectionStatus.AGREEMENT_NET_ERR}
   * @param reason AxiosError object
   */
  const errorHandling = ({ message, status, code }: AxiosError) => {
    console.error(
      `Failed to call /dingo/api/agreements: ${message}
      \nStatuscode: ${status || code}`,
    );

    switch (code) {
      case AxiosError.ERR_NETWORK:
        setConnectionStatus(ConnectionStatus.AGREEMENT_NET_ERR);
        setTimeout(runAgreementApiCall, WAIT_AFTER_NET_ERR);
        break;

      default:
        setConnectionStatus(ConnectionStatus.UNAUTHED);
        break;
    }
  };
};

export default AgreementService;
