// @flow

import express from 'express'
import routes from './routes'
import load from './load'

const app = express()
app.use(routes)
load(app)
