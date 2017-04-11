// @flow

export const Actions = {
  TITLE: 'DRAWER_TITLE',
}

export type Action =
  | { type: 'DRAWER_TITLE', title: string }

export type State = ?string
const defaultState = null

export default (state: State = defaultState, action: Action) => {
  switch (action.type) {
    case Actions.TITLE:
      return action.title

    default:
      return state
  }
}
