// @flow

import { Actions } from 'app/reducers/users'

import type { Id } from 'app/reducers'
import type { User, Action } from 'app/reducers/users'

import { fetch } from 'app/api'

export const fetchUser = (id: Id) =>
  (dispatch: Action => void) => (
    fetch(`/user/${id}`)
      .then(response => response.json())
      .then(user => {
        dispatch({
          type: Actions.ADD,
          id,
          user,
        })

        return user
      })
  )
