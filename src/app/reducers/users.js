// @flow

import type { Id } from './'

export const Actions = {
  ADD: 'USERS_ADD',
}

export type User = {
  name: string,
}

export type Action =
  | { type: 'USERS_ADD', id: Id, user: User }

export type State = { [Id]: User }

const defaultState = {
  'user-1': {
    name: 'The True Homie',
  },
  'user-2': {
    name: 'John Doe',
  },
}

export default (state: State = defaultState, action: Action): State => {
  switch (action.type) {
    case Actions.ADD:
      return {
        ...state,
        [action.id]: action.user,
      }

    default:
      return state
  }
}
