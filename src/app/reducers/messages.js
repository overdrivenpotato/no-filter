// @flow

import type { Id } from './'

export const Actions = {
  FETCH: 'MESSAGE_FETCH',
}

export type MessageType = 'from' | 'to'
export type MessageState = 'typing' | 'final'

export type Message = {
  type: MessageType,
  state: MessageState,
  text: string,
  date: Date,
}

export type State = { [Id]: Message }

const date = new Date()

const defaultState = {
  'message-1': {
    type: 'from',
    state: 'final',
    text: 'Suh dude',
    date: date,
  },
  'message-2': {
    type: 'to',
    state: 'typing',
    text: 'message in progre',
    date: date,
  },
  'message-3': {
    type: 'from',
    state: 'final',
    text: 'suhhush',
    date: date,
  },
  'message-4': {
    type: 'from',
    state: 'final',
    text: 'DUUUUUUUUUUUUUUUUDE',
    date: date,
  },
}

export default (state: State = defaultState, action: any) => {
  return state
}
