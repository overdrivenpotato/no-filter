// @flow

import express from 'express'
import firebase from 'firebase-admin'

import credentials from '../../credentials.json'
import { timedBump, watchBump } from './bump'

firebase.initializeApp({
  credential: firebase.credential.cert(credentials),
  databaseURL: 'https://no-filter-aa5d0.firebaseio.com',
})

export const database = firebase.database()

const api = express.Router()

api.get('/user/:userId', (req, res) => {
  const id = req.params.userId

  database
    .ref(`/users/${id}`)
    .once('value')
    .then(query => {
      const { name } = query.val()

      res.json({ name })
    })
})

api.get('/user/:userId/conversations', (req, res) => {
  const userId = req.params.userId

  database
    .ref(`/users/${userId}/conversations`)
    .once('value')
    .then(response => response.val() || [])
    .then(ids => (
      // Fetch all the conversations
      Promise
        .all(ids.map(id => (
          database
            .ref(`/conversation/${id}`)
            .once('value')
        )))
        .then(conversations => (
          // Map the conversations into a hashmap of { [id]: conversation }
          ids.reduce((acc, id, index) => ({
            ...acc,
            [id]: conversations[index].val(),
          }), {})
        ))
    ))
    .then(conversations => {
      res.json(conversations)
    })
})

api.post('/bump', (req, res) => {
  const SEARCH_WINDOW = 100

  const { user, timestamp } = req.body

  // 200ms search window
  const min = timestamp - SEARCH_WINDOW
  const max = timestamp + SEARCH_WINDOW

  // First we scan for a match before trying to make a new bump
  database.ref('/bump')
    .orderByChild('timestamp')
    .startAt(min)
    .endAt(max)
    .once('value')
    .then(response => {
      const bumps = response.val()

      if (!bumps) {
        watchBump(res, min, max, timedBump({ user, timestamp }))
        console.log(`No Matching bumps were found ${user}`)
        return
      }

      console.log(`Matching bumps were found ${user}`)

      const keys = Object.keys(bumps)

      if (keys.length > 1) {
        res.send('Multiple bumps')
      } else {
        res.send('Got a bump!!!')
        timedBump({ user, timestamp })
      }
    })
})

export default api
