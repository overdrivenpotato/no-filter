// @flow

import React from 'react'
import { render } from 'react-dom'
import App from './components/app'

render(
  <App text='Hello World!' />,
  document.getElementById('root')
)
