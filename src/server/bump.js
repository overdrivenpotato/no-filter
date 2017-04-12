// @flow

import genUuid from 'uuid/v4'

import { database } from './api'

type BumpRequest = {
  user: string,
  timestamp: number,
}

// How long the request will live for
const BUMP_DELAY = 5000

// How long the bump should live for in the case of double bump
const BUMP_LIFETIME = 60000

export const timedBump = ({ user, timestamp }: BumpRequest): string => {
  const uuid = genUuid()
  const ref = database.ref(`/bump/${uuid}`)

  ref.set({ timestamp, user })

  setTimeout(() => ref.remove(), BUMP_LIFETIME)

  return uuid
}

export const watchBump = (
  res: Response,
  min: number,
  max: number,
  id: string,
) => {
  // Database endpoints
  const all = database.ref('/bump')
  const ref = database.ref(`/bump/${id}`)

  // Create the watch variable up here so we can reference it within the `off`
  // callback
  let watch
  let closed = false

  // Kill the watcher, returning a body if applicable or 404 if not.
  const off = (body?: Object) => {
    // Don't try to close twice
    if (closed) {
      return
    }

    closed = true

    // Stop watching for values
    all.off('value', watch)

    if (body) {
      res.json(body)
    } else {
      res.sendStatus(404)
    }
  }

  watch = all
    .on('child_added', update => {
      // Don't trigger on adding our own bump
      if (update.key === id) {
        return
      }

      const bump = update.val()

      if (bump.timestamp > min && bump.timestamp < max) {
        off({ user: bump.user })
      }
    })

  setTimeout(() => off(), BUMP_DELAY)
}
