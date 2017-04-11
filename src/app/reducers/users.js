// @flow

import type { Id } from './'

export type User = {
  name: string,
}

export type State = { [Id]: User }

const defaultState = {
  'user-1': {
    name: 'The True Homie',
  },
  'user-2': {
    name: 'John Doe',
  },
}

export default (state: State = defaultState, action: any) => {
  return state
}
