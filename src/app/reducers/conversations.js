// @flow

import type { Id } from './'

export const Actions = {
  FETCH: 'CONVERSATIONS_FETCH',
}

export type Conversation = {
  messages: Array<Id>,
}

export type Action =
  | {
    type: 'CONVERSATIONS_FETCH',
    conversations: Array<Conversation>,
  }

export type State = Array<Conversation>
const defaultState = []

export default (state: State = defaultState, action: Action) => {
  switch (action.type) {
    case Actions.FETCH:
      // TODO
      return state

    default:
      return state
  }
}
