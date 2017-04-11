// @flow

import firebase from 'firebase'
import { create as createTimesyncServer } from 'timesync/src/timesync'

import { timesyncServer, LOCATION, PORT } from './api'

// Sync with the server so that we can match bumps better
const ts = createTimesyncServer({
  server: timesyncServer,
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

export default () => {
  console.log(`Detected bump at ${Math.round(ts.now())}! :D`)

  var body = {
    user: firebase.auth().currentUser.uid,
    location: {
      longitude: '45',
      latitude: '45',
    },
    timestamp: Math.round(ts.now()),
  }

  fetch(`http://${LOCATION}:${PORT}/api/bump`, {
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
      if (typeof (user.pairedUser) !== 'undefined') {
        console.log('ITS A MATCH BOYS')
        /*
        TODO Some logic to check if both users accept the bump
        */

        // Inserts the friend into firebase
        var updates = {}
        updates['/users/' + body.user + '/friends/'] = user.pairedUser

        firebase.database().ref().update(updates).then(() => {
          console.log('Added friend')
        })
      }
    })
  })
  .catch((err) => {
    console.log(err)
  })
}
