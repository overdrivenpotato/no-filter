// @flow

import { combineReducers } from 'redux'
import conversations from './conversations'
import drawer from './drawer'
import messages from './messages'
import navigation from './navigation'
import users from './users'
import user from './user'

import type { State as Conversations } from './conversations'
import type { State as Drawer } from './drawer'
import type { State as Messages } from './messages'
import type { State as Navigation } from './navigation'
import type { State as Users } from './users'
import type { State as User } from './user'

export default combineReducers({
  conversations,
  drawer,
  messages,
  navigation,
  users,
  user,
})

export type State = {
  conversations: Conversations,
  drawer: Drawer,
  messages: Messages,
  navigation: Navigation,
  users: Users,
  user: User,
}

export type Id = string
