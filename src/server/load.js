// @flow

import colors from 'colors'

import reactNativeDevServer from './react-native-dev-server'

import type { $Application } from 'express'

const PRODUCTION_PORT = parseInt(process.env.PORT) || 3000

// Print which port we are serving
const portNotify = (packager: boolean, port: number) => {
  if (packager) {
    console.log(colors.bold(colors.magenta('\nStarted react native packager')))
  }

  console.log(colors.blue(`Listening on http://localhost:${port}\n`))
}

let port = 3000

// Serve the app at an available port
export default (app: $Application) => {
  // Try to find the next available port
  if (process.env.NODE_ENV === 'production') {
    app.listen(PRODUCTION_PORT)
    portNotify(false, PRODUCTION_PORT)
  } else {
    // Try listening at the current port, incrementing by one if it is taken
    const listen = () => {
      app.listen(port, () => {
        reactNativeDevServer(port)
        portNotify(true, port)
      }).on('error', () => {
        port++
        listen()
      })
    }

    listen()
  }
}
