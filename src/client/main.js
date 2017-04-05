// @flow

// Polyfills
import 'whatwg-fetch'

import React from 'react'
import { render } from 'react-dom'
import App from './components/app'

// Render the given component
const mount = component => render(component, document.getElementById('root'))

// Render from the start
mount(<App />)

fetch('/api/').then(response => {
  console.log(`Api Response: ${response.status}`)
})

// Ignore flow errors on module
declare var module: any

// Accept the entire app with hot loading and re render if changed
if (module.hot) {
  module.hot.accept('./components/app', () => {
    const App: any = require('./components/app').default
    mount(<App />)
  })
}
