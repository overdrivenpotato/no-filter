// @flow

import { AsyncStorage } from 'react-native'

import { Actions } from 'app/reducers/user'
import { fetchConversations } from 'app/actions/conversations'
import { fetchUser } from 'app/actions/users'

import type { Id } from 'app/reducers'
import type { Action } from 'app/reducers/user'

export const login = (id: Id) =>
  (dispatch: Dispatch) => (
    Promise.all([
      dispatch(fetchConversations(id)),
      dispatch(fetchUser(id)),
    ])
      .then(() => dispatch({
        type: Actions.LOGIN,
        user: id,
      }))
      .catch(err => console.log(err))
  )

export const logout = () => 
  (dispatch: Dispatch) => {
    AsyncStorage.removeItem('userId', () => {
      dispatch({
        type: Actions.LOGOUT,
      })
    })
  }
