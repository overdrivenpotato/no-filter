// @flow

import type { Id } from './'

export const Actions = {
  LOGIN: 'USER_LOGIN',
  LOGOUT: 'USER_LOGOUT',
}

export type Action =
  | { type: 'USER_LOGIN', user: Id }
  | { type: 'USER_LOGOUT' }

export type State = Id | null

const defaultState = null

export default (state: State = defaultState, action: Action): State => {
  switch (action.type) {
    case Actions.LOGIN:
      return action.user

    case Actions.LOGOUT:
      return null

    default:
      return state
  }
}
