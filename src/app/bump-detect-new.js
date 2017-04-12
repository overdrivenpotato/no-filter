// @flow

import { create as createTimesyncServer } from 'timesync/src/timesync'

import { timesyncServer, fetch } from './api'
import { fetchUser } from 'app/actions/users'

import type { State } from 'app/reducers'

// Sync with the server so that we can match bumps better
const ts = createTimesyncServer({
  server: timesyncServer,
})

export default (state: State, dispatch: Dispatch) => {
  const body = {
    user: state.user,
    timestamp: Math.round(ts.now()),
  }

  const fetchOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body)
  }

  fetch('/bump', fetchOptions)
    .then(response => response.json())
    .then(response => (
      // FIXME: Don't add a user we have cached
      // Should be done server side
      // alert(`Adding ${response.user}`)
      fetchUser(response.user)(dispatch)
        .then(user => {
          console.log(user)
          state.navigation.navigate('addConfirm', {
            id: response.user,
            user: user,
          })
        })
    ))
    .catch(err => console.log(err))
}
