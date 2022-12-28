import useLiveChatViewmodel from '~/common/viewModel/LiveChat/LiveChat.viewmodel';
import useConnectionViewModel from '~/common/viewModel/Connection/Connection.viewmodel';
import axios, { AxiosError } from 'axios';
import LiveChat from '~/common/models/LiveChat.model';
import { useEffect } from 'react';
import { ConnectionStatus } from '~/common/models/Connection.model';
import { AgentStatus } from '~/common/models/LiveChatAgentStatus.model';

interface LiveChatResponse {
  list: LiveChat[];
}

const WAIT_AFTER_NET_ERR = 2000;

const ApiService = () => {
  const { addLiveChats } = useLiveChatViewmodel();
  const { chatbotKey, getAxiosConfig, connectionStatus, setConnectionStatus } =
    useConnectionViewModel();

  useEffect(() => {
    if (connectionStatus === ConnectionStatus.AGREEMENT_SUCCESS) {
      executeFetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connectionStatus]);

  const executeFetch = () => {
    fetchLiveChats(AgentStatus.LIVE);
    fetchLiveChats(AgentStatus.DENIED);
    fetchLiveChats(AgentStatus.REQUESTED);
    fetchLiveChats(AgentStatus.FINISHED);
  };

  const fetchLiveChats = (status: AgentStatus) => {
    axios
      .get<LiveChatResponse>('lorikeet/live-chat/' + chatbotKey, {
        ...getAxiosConfig,
        params: {
          status,
        },
      })
      .then(({ data }) => addLiveChats(data.list))
      .catch(errorHandling);
  };

  const errorHandling = ({ message, status, code }: AxiosError) => {
    console.error(
      `Failed to call /lorikeet/live-chat: ${message}
      \nStatuscode: ${status || code}`,
    );

    switch (code) {
      case AxiosError.ERR_NETWORK:
        setConnectionStatus(ConnectionStatus.SERVICES_NET_ERR);
        setTimeout(executeFetch, WAIT_AFTER_NET_ERR);
        break;

      default:
        setConnectionStatus(ConnectionStatus.UNAUTHED);
        break;
    }
  };
};

export default ApiService;
