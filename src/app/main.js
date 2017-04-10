// @flow

// Polyfills
import 'whatwg-fetch'

import React from 'react'
import { Provider } from 'react-redux'
import { AppRegistry } from 'react-native'
import { NativeRouter } from 'react-router-native'
import { create as createTimesyncServer } from 'timesync/src/timesync'

import App from './components/app'
import configureStore from './configure-store'
import bumpDetect from './bump-detect'
import { timesyncServer } from './api'

// Sync with the server so that we can match bumps better
const ts = createTimesyncServer({
  server: timesyncServer,
})

bumpDetect(() => console.log(`Detected bump at ${Math.round(ts.now())}! :D`))

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
