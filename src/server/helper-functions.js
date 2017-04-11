// @flow

/*
  This file houses all helper functions
*/

import firebase from 'firebase'

// Initialize Firebase
firebase.initializeApp({
  apiKey: 'AIzaSyCrwmUkhC5-mbwu7nETYlvvaqRqNICA5Ko',
  authDomain: 'no-filter-aa5d0.firebaseapp.com',
  databaseURL: 'https://no-filter-aa5d0.firebaseio.com',
  projectId: 'no-filter-aa5d0',
  storageBucket: 'no-filter-aa5d0.appspot.com',
  messagingSenderId: '536468709239',
})

// The number of milliseconds a bump is allowed to be in the bump pool
const REMOVE_TIME = 10000
// The number of milliseconds two bumps can be apart for it to count
const BUMP_TIME = 6000

export { REMOVE_TIME }
export { BUMP_TIME }

/*
Checks the given data to see if it is a valid bump request
*/
export function checkData (data: Object) {
  if (isUndefined(data.user)) {
    throw new Error('user is undefined')
  }
  if (isUndefined(data.timestamp)) {
    throw new Error('timestamp is undefined')
  }
  if (isUndefined(data.location)) {
    throw new Error('location is undefined')
  }
  if (isUndefined(data.location.longitude)) {
    throw new Error('longitude is undefined')
  }
  if (isUndefined(data.location.latitude)) {
    throw new Error('latitude is undefined')
  }
}

/*
This function checks to see if two bumps in the
area are within three seconds of each other and
then removes both of those entries.

To improve efficiency in the system,
this function also removes bumps that are older than the REMOVE_TIME
*/
export function checkBumpsInArea (data: Object) {
  console.log('checking ' + data.user)
  return firebase.database().ref('/bumps/').once('value')
}

/*
Helper function to check if the sent parameter is undefined
*/
function isUndefined (attribute) {
  return (typeof (attribute) === 'undefined')
}

export function removeUserFromBumps (user: string) {
  firebase.database().ref('/bumps/' + user).remove()
}

/*
Inserts data into the firebase database at the location
Please check to ensure that all information is correct
before calling this function
as anything in the database will be overridden by this function
@params
  location: string location in the database ex:('/users/...')
  data: JSON object of data to be added
@return {staus: true/false, reason: error} ****TODO****
*/
export function insertData (location: Object, data: Object) {
  return firebase.database().ref(location).set(data)
}
