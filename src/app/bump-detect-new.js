// @flow

import { create as createTimesyncServer } from 'timesync/src/timesync'

import { timesyncServer, fetch } from './api'

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
      fetch(`/user/${response.user}`)
        .then(response => response.json())
    ))
    .then(user => {
      // state.navigate('addConfirm', user)
      alert(`Matched with user: ${user.name}!`)
    })
    .catch(() => console.log('No bump detected'))
}
