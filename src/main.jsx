// @flow

import React from 'react'
import { render } from 'react-dom'
import App from './components/app'

render(
  <App text='Marko is a cool cat!' />,
  document.getElementById('root')
)
