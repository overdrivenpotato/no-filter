// @flow

import colors from 'colors'

import reactNativeDevServer from './react-native-dev-server'

import type { $Application } from 'express'

// Print which port we are serving
const portNotify = () => {
  console.log(colors.bold(colors.magenta('\nStarted react native packager')))
  console.log(colors.blue(`Listening on http://localhost:${port}\n`))
}

let port = 3000

// Serve the app at an available port
export default (app: $Application) => {
  // Try to find the next available port
  if (process.env.NODE_ENV === 'production') {
    app.listen(80)
  } else {
    // Try listening at the current port, incrementing by one if it is taken
    const listen = () => {
      app.listen(port, () => {
        reactNativeDevServer(port)
        portNotify()
      }).on('error', () => {
        port++
        listen()
      })
    }

    listen()
  }
}
