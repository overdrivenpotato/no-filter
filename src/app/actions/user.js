// @flow

import { Actions } from 'app/reducers/user'

import type { Id } from 'app/reducers'
import type { Action } from 'app/reducers/user'

export const login = (id: Id): Action => ({
  type: Actions.LOGIN,
  user: id,
})
