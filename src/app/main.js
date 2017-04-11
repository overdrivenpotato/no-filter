// @flow

// Polyfills
import 'whatwg-fetch'

import React from 'react'
import { Provider } from 'react-redux'
import { AppRegistry } from 'react-native'
import { NativeRouter } from 'react-router-native'
import { create as createTimesyncServer } from 'timesync/src/timesync'
import firebase from 'firebase'

import App from './components/app'
import configureStore from './configure-store'
import bumpDetect from './bump-detect'
import { timesyncServer, LOCATION, PORT } from './api'

// Sync with the server so that we can match bumps better
const ts = createTimesyncServer({
  server: timesyncServer,
})

bumpDetect(() => {
  console.log(`Detected bump at ${Math.round(ts.now())}! :D`)
  // fetch('http://192.168.2.18:3000/api/')
  //   .then((response) => {
  //     response.json().then((r) => {
  //       console.log(r)
  //     })
  //   })

  var body = {
    user: firebase.auth().currentUser.uid,
    location: {
      longitude: '45',
      latitude: '45',
    },
    timestamp: Math.round(ts.now()),
  }
  // var local = '10.16.100.182'
  // var local = '192.168.2.18'
  var local = LOCATION

  fetch('http://' + LOCATION + ':' + PORT + '/api/bump', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
  .then((response) => {
    response.json().then((user) => {
      console.log(user.pairedUser)
    })
  })
  .catch((err) => {
    console.log(err)
  })
})

// Initialize Firebase
firebase.initializeApp({
  apiKey: 'AIzaSyCrwmUkhC5-mbwu7nETYlvvaqRqNICA5Ko',
  authDomain: 'no-filter-aa5d0.firebaseapp.com',
  databaseURL: 'https://no-filter-aa5d0.firebaseio.com',
  projectId: 'no-filter-aa5d0',
  storageBucket: 'no-filter-aa5d0.appspot.com',
  messagingSenderId: '536468709239',
})

firebase.auth().signInWithEmailAndPassword('test@test.com', 'yo12345')
  .then(() => {
    console.log('loggin')
  })
  .catch((error) => {
    console.log(error)
  })

// Wrap the main app in a class so that we can hot reload reducers
class Wrapper extends React.Component {
  state = {
    store: configureStore(),
  }

  render () {
    return <Provider store={this.state.store}>
      <NativeRouter>
        <App />
      </NativeRouter>
    </Provider>
  }
}

AppRegistry.registerComponent('nofilter', () => Wrapper)
