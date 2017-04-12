// @flow

import { fetch } from 'app/api'

import { Actions } from 'app/reducers/conversations'
import { fetchUser } from 'app/actions/users'

import type { Id, State } from 'app/reducers'
import type { Action } from 'app/reducers/conversations'
import type { Action as UsersAction } from 'app/reducers/users'

export const fetchConversations = (id: Id) =>
  (dispatch: (Action | UsersAction) => void, getState: () => State) => (
    fetch(`/user/${id}/conversations`)
      .then(response => response.json())
      .then(response => {
        console.log(response)
        return response
      })
      .then(conversations => {
        const state = getState()
        const promises = []

        // Extract users that we need to fetch
        Object.keys(conversations).forEach(key => {
          conversations[key].messages.forEach(message => {
            if (!state.users[message.user]) {
              promises.push(fetchUser(message.user)(dispatch))
            }
          })
        })

        // After we have all the users trigger the conversation reducer
        return Promise.all(promises).then(() => {
          dispatch({
            type: Actions.FETCH_ALL,
            conversations: conversations,
          })
        })
      })
      .catch(err => console.log(err))
  )
