import LiveChat from '~/common/models/LiveChat.model';
import { AgentStatus } from '~/common/models/LiveChatAgentStatus.model';

/**
 * Three dummy live chats.
 * Everything is the same except the id which increments by value and alphabet:
 * 1a
 * 2b
 * 3c
 */
export const liveChatMocks: LiveChat[] = [
  {
    _id: '1a',
    messages: [],
    createdAt: new Date(),
    sessionId: 'some_id',
    lastActive: new Date(),
    customer: {
      page: 'customer_page',
      url: 'customerurl',
      browser: 'chrome',
    },
    agent: {
      picture: 'url',
      email: 'some.mail@world.com',
      name: 'Peter Maier',
    },
    states: [
      {
        status: AgentStatus.LIVE,
      },
    ],
    updatedAt: new Date(),
    isClientTyping: false,
    startMessageId: 'some id ',
  },

  {
    _id: '2b',
    messages: [],
    createdAt: new Date(),
    sessionId: 'some_id',
    lastActive: new Date(),
    customer: {
      page: 'customer_page',
      url: 'customerurl',
      browser: 'chrome',
    },
    agent: {
      picture: 'url',
      email: 'some.mail@world.com',
      name: 'Peter Maier',
    },
    states: [
      {
        status: AgentStatus.LIVE,
      },
    ],
    updatedAt: new Date(),
    isClientTyping: false,
    startMessageId: 'some id ',
  },

  {
    _id: '3c',
    messages: [],
    createdAt: new Date(),
    sessionId: 'some_id',
    lastActive: new Date(),
    customer: {
      page: 'customer_page',
      url: 'customerurl',
      browser: 'chrome',
    },
    agent: {
      picture: 'url',
      email: 'some.mail@world.com',
      name: 'Peter Maier',
    },
    states: [
      {
        status: AgentStatus.LIVE,
      },
    ],
    updatedAt: new Date(),
    isClientTyping: false,
    startMessageId: 'some id ',
  },
];
