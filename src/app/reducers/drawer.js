// @flow

export const Actions = {
  SHOW: 'DRAWER_SHOW',
  HIDE: 'DRAWER_HIDE',
}

export type Action =
  | { type: 'DRAWER_SHOW' }
  | { type: 'DRAWER_HIDE' }

export type State = boolean
const defaultState = false

export default (state: State = defaultState, action: Action) => {
  switch (action.type) {
    case Actions.SHOW:
      return true

    case Actions.HIDE:
      return false

    default:
      return state
  }
}
