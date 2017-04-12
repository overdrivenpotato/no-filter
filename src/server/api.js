// @flow

import express from 'express'
import firebase from 'firebase'
import bodyParser from 'body-parser'

const api = express.Router()
api.use(bodyParser.json())

api.get('/user/:userid', (req, res) => {
  const id = req.params.userid

  firebase
    .database()
    .ref(`/users/${id}`)
    .once('value')
    .then(user => {
      res.json(user)
    })
})

export default api
