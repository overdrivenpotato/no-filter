// @flow

import { combineReducers } from 'redux'
import conversations from './conversations'
import drawer from './drawer'

import type { State as Conversations } from './conversations'
import type { State as Drawer } from './drawer'

export default combineReducers({
  conversations,
  drawer,
})

export type State = {
  conversations: Conversations,
  drawer: Drawer,
}

export type Id = string
