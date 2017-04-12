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
  UPDATE: 'CONVESATION_UPDATE',
}

export type Conversation = {
  users: Array<Id>,
  messages: Array<Message>,
}

export type State = { [Id]: Conversation }

export type Action =
  | { type: 'CONVERSATION_FETCH_ALL', conversations: State }
  | { type: 'CONVERSATION_NEW', id: Id, conversation: Conversation }
  | { type: 'CONVERSATION_UPDATE', id: Id, messages: Array<Message> }

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

    case Actions.UPDATE:
      console.log('update triggered')
      console.log(state)
      console.log(action)

      const conversation = {
        ...state[action.id],
        messages: action.messages,
      }

      return {
        ...state,
        [action.id]: conversation,
      }

    default:
      return state
  }
}
