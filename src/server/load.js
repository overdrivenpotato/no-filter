// @flow

import colors from 'colors'

import type { Application } from 'express'

// Print which port we are serving
export const portNotify = () => {
  console.log(colors.blue(`\nListening on http://localhost:${port}`))
}

let port = 3000

// Serve the app at an available port
export default (app: Application) => {
  // Try to find the next available port
  if (process.env.NODE_ENV === 'production') {
    app.listen(80)
  } else {
    // Try listening at the current port, incrementing by one if it is taken
    const listen = () => {
      app.listen(port).on('error', () => {
        port++
        listen()
      })
    }

    listen()
  }
}
