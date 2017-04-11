// @flow

import type { Id } from './'
import type { Message } from './messages'

export const Actions = {
  FETCH: 'CONVERSATION_FETCH',
}

export type Conversation = {
  user: Id,
  messages: Array<Id>,
}

export type State = { [Id]: Conversation }

type Action =
  | { type: 'CONVERSATION_FETCH', conversation: Conversation }

const defaultState: State = {
  'convo-1': {
    user: 'user-1',
    messages: [
      'message-1',
      'message-2',
    ],
  },
  'convo-2': {
    user: 'user-2',
    messages: [
      'message-3',
      'message-4',
    ],
  },
}

export default (state: State = defaultState, action: Action): State => {
  switch (action.type) {
    case Actions.FETCH:
      return state

    default:
      return state
  }
}
