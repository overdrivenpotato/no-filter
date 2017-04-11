// @flow

import type { Id } from './'

export const Actions = {
  LOGIN: 'USER_LOGIN',
}

export type Action =
  | { type: 'GENERIC' }
  | { type: 'USER_LOGIN', user: Id }

export type State = ?Id

const defaultState = null

export default (state: State = defaultState, action: Action): State => {
  switch (action.type) {
    case Actions.LOGIN:
      return action.user

    default:
      return state
  }
}
