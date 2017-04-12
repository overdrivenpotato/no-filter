// @flow

import 'whatwg-fetch'

import React from 'react'
import { Provider } from 'react-redux'
import { AppRegistry } from 'react-native'
import { NativeRouter } from 'react-router-native'

import App from './components/app'
import configureStore from './configure-store'
import bumpDetect from './bump-detect'
import bumpDetectTemporary from './bump-detect-temporary'

// Extracted the bump detection handler into a temporary file. This file
// contains logic which should be moved to the server eventually.
// bumpDetect(bumpDetectTemporary)

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
