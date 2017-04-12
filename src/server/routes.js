// @flow

import express from 'express'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import TimesyncServer from 'timesync/server'
import bodyParser from 'body-parser'

import { clientConfig } from '../../webpack.config.babel.js'
import api from './api'
import {
  checkData,
  insertData,
  checkBumpsInArea,
  removeUserFromBumps,
  REMOVE_TIME,
  BUMP_TIME,
} from './helper-functions'

const routes = express.Router()

routes.use('/api', api)
routes.use(bodyParser.json())       // to support JSON-encoded bodies
routes.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true,
}))

/*
Inserts a new bump request into the firebase database at location /bumps/<user>
@param
{user: UID, timestamp: time, location: {longitude: long, latitude: lat}}
Will throw an error if any of the variables are undefined.
This is done using the helper function checkData(data)
@return
status 200 on success
string depending on error (see checkData(data) for the strings)
*/
routes.post('/api/bump', (req, res) => {
  console.log('POST /api/bump')

  try {
    var data = {
      user: req.body.user,
      location: {
        longitude: req.body.location.longitude,
        latitude: req.body.location.latitude,
      },
      timestamp: req.body.timestamp,
    }

    // Checks to see if data is all there and correct
    checkData(data)
    insertData('/bumps/' + data.user, data)
    var pairedUserPromise = checkBumpsInArea(data)
    var user = 'undefined'
    while (user === 'undefined' &&
      Math.abs(data.timestamp - new Date().getTime()) < BUMP_TIME) {
      pairedUserPromise.then((snapshot) => {
        user = handleSnapshot(snapshot, data)
      })
    }
    Promise.all([pairedUserPromise]).then(() => {
      console.log('sending')
      res.json({
        pairedUser: user,
      })
      removeUserFromBumps(data.user)
    }).catch((err) => {
      res.send(err)
    })
  } catch (err) {
    res.status(500).send(err)
  }
})

function handleSnapshot (snapshot: Object, data: Object) {
  for (var key in snapshot.val()) {
    if (snapshot.val().hasOwnProperty(key)) {
      var currentUser = snapshot.val()[key]
      if (
      data.user !== currentUser.user &&
      Math.abs(currentUser.timestamp - data.timestamp) < BUMP_TIME
      ) {
        return currentUser.user
      }
    }
  }
}

routes.post('/api/testpost', (req, res) => {
  console.log('POST api/testpost')
  console.log(req.body)
  res.send(req.body)
})

routes.use('/timesync', TimesyncServer.requestHandler)

// Serve static files if in production, webpack hot reloading otherwise.
if (process.env.NODE_ENV === 'production') {
  routes.use(express.static('build/client'))
} else {
  const compiler = webpack(clientConfig)
  const devOptions = {
    stats: {
      colors: true,
    },
  }

  const devMiddleware = webpackDevMiddleware(compiler, devOptions)
  const hotMiddleware = webpackHotMiddleware(compiler)
  routes.use(devMiddleware)
  routes.use(hotMiddleware)
}

export default routes
