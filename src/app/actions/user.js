// @flow

import { AsyncStorage } from 'react-native'

import { Actions } from 'app/reducers/user'
import { fetchConversations } from 'app/actions/conversations'
import { fetchUser } from 'app/actions/users'

import bumpDetect from 'app/bump-detect'
import bumpDetectNew from 'app/bump-detect-new'

import type { Id, State } from 'app/reducers'
import type { Action } from 'app/reducers/user'

export const login = (id: Id) =>
  (dispatch: Dispatch, getState: () => State) => (
    Promise.all([
      dispatch(fetchConversations(id)),
      dispatch(fetchUser(id)),
    ])
      .then(() => {
        dispatch({
          type: Actions.LOGIN,
          user: id,
        })

        // Save the user ID for logging in later
        AsyncStorage.setItem('userId', id)

        // Enable bump detection here
        bumpDetect(() => bumpDetectNew(getState(), dispatch))
      })
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
