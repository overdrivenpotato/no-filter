// @flow

import express from 'express'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import TimesyncServer from 'timesync/server'

import { clientConfig } from '../../webpack.config.babel.js'

const routes = express.Router()

routes.get('/api/', (req, res) => {
  res.json({ test: 'Hello!' })
})

routes.use('/timesync', TimesyncServer.requestHandler)

// Serve static files if in production, webpack hot reloading otherwise.
if (process.env.NODE_ENV === 'production') {
  routes.use(express.static('build/client'))
} else {
  const compiler = webpack(clientConfig)
  const devOptions = {
    stats: {
      colors: true,
    },
  }

  const devMiddleware = webpackDevMiddleware(compiler, devOptions)
  const hotMiddleware = webpackHotMiddleware(compiler)
  routes.use(devMiddleware)
  routes.use(hotMiddleware)
}

export default routes
