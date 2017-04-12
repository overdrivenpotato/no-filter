// @flow

import genUuid from 'uuid/v4'
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

  const removeSelf = (conversation) => ({
    ...conversation,
    users: conversation.users.filter(id => id !== userId),
  })

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
            [id]: removeSelf(conversations[index].val()),
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
  database
    .ref('/bump')
    .orderByChild('timestamp')
    .startAt(min)
    .endAt(max)
    .once('value')
    .then(response => {
      const bumps = response.val()

      if (!bumps) {
        watchBump(res, min, max, timedBump({ user, timestamp }))
        return
      }

      // Filter for bumps that fit the timestamp window
      const filtered = Object.keys(bumps)
        .map(key => bumps[key])
        .filter(bump => bump.timestamp > min && bump.timestamp < max)

      if (filtered.length > 1) {
        res.sendStatus(404)
      } else {
        res.json({ user: filtered[0].user })
        timedBump({ user, timestamp })
      }
    })
})

api.post('/conversations', (req, res) => {
  const { users } = req.body
  const uuid = genUuid()

  for (const user of users) {
    const ref = database.ref(`/users/${user}/conversations`)

    ref
      .once('value')
      .then(conversations => {
        const val = conversations.val() || []
        val.push(uuid)
        return val
      })
      .then(conversations => {
        ref.set(conversations)
      })
  }

  database.ref(`/conversation/${uuid}`)
    .set({ users })

  res.json({ id: uuid })
})

// TMP
// TODO: remove
api.get('/user-by-email/:email', (req, res) => {
  const email = req.params.email

  database
    .ref(`/users/`)
    .orderByChild('email')
    .equalTo(email)
    .once('value')
    .then(response => {
      res.json(response.val())
    })
})

export default api
