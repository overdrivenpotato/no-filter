// @flow

import type { Id } from './'

export type MessageState = 'typing' | 'final'
export type Message = {
  user: Id,
  state: MessageState,
  text: string,
  date: Date,
}

export const Actions = {
  FETCH_ALL: 'CONVERSATION_FETCH_ALL',
  NEW: 'CONVERSATION_NEW',
}

export type Conversation = {
  users: Array<Id>,
  messages: Array<Message>,
}

export type State = { [Id]: Conversation }

export type Action =
  | { type: 'CONVERSATION_FETCH_ALL', conversations: State }
  | { type: 'CONVERSATION_NEW', id: Id, conversation: Conversation }

const defaultState: State = {}

export default (state: State = defaultState, action: Action): State => {
  switch (action.type) {
    case Actions.FETCH_ALL:
      return action.conversations

    case Actions.NEW:
      return {
        ...state,
        [action.id]: action.conversation,
      }

    default:
      return state
  }
}
