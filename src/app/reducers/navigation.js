// @flow

import React from 'react'

export type State = any

export const Actions = {
  UPDATE: 'NAVIGATION_UPDATE',
}

export default (state: State = null, action: any) => {
  switch (action.type) {
    case Actions.UPDATE:
      return action.navigation

    default:
      return state
  }
}
