import LiveChatCustomer from '~/common/models/LiveChatCustomer.model';
import LiveChatAgent from '~/common/models/LiveChatAgent.model';
import LiveChatAgentStatus from '~/common/models/LiveChatAgentStatus.model';
import LiveChatMessage from '~/common/models/LiveChatMessage.model';

interface LiveChat {
  _id: string;
  customer: LiveChatCustomer;
  agent: LiveChatAgent;
  startMessageId: string;
  sessionId: string;
  states: LiveChatAgentStatus[];
  messages: LiveChatMessage[];
  lastActive: Date;
  createdAt: Date;
  updatedAt: Date;
  isClientTyping: boolean;
}

export default LiveChat;
