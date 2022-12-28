interface LiveChatIdentifier {
  userId: string;
  roomId: string; // LiveChatId
}

export interface TypingEvent extends LiveChatIdentifier {
  typing: boolean;
}

export interface MessageEvent extends LiveChatIdentifier {
  content: string;
  date: string;
}

export interface UpdatesEvent {
  _id: string; // LiveChatId
  chatbotKey: string;
  customer: any; // TODO wat it dat
}

export interface NewEvent {
  chatbotKey: string;
  createdAt: string;
  customer: {
    userId: string;
  };
  lastActive: string; // date
  lastOnline: string; // date
  messages: string[]; // TODO check if it is a string or {@link LiveChatMessage}
  sessionId: string;
  startMessageId: string;
  updatedAt: string; // date
  _id: string;
}
