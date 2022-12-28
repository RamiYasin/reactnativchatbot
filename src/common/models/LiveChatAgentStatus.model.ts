export enum AgentStatus {
  LIVE,
  DENIED,
  REQUESTED,
  FINISHED,
}

interface LiveChatAgentStatus {
  status: AgentStatus;
}

export default LiveChatAgentStatus;
