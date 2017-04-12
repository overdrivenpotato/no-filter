// @flow

import express from 'express'
import firebase from 'firebase-admin'
import bodyParser from 'body-parser'
import credentials from '../../credentials.json'

firebase.initializeApp({
  credential: firebase.credential.cert(credentials),
  databaseURL: 'https://no-filter-aa5d0.firebaseio.com',
})

const database = firebase.database()

const api = express.Router()
api.use(bodyParser.json())

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
    .then(response => response.val())
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

export default api
