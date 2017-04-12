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
}

export type Conversation = {
  user: Id,
  messages: Array<Message>,
}

export type State = { [Id]: Conversation }

export type Action =
  | { type: 'CONVERSATION_FETCH_ALL', conversations: State }

const defaultState: State = {}

export default (state: State = defaultState, action: Action): State => {
  switch (action.type) {
    case Actions.FETCH_ALL:
      return action.conversations

    default:
      return state
  }
}
