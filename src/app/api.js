// @flow

export const LOCATION = process.env.API_SERVER || 'nofilter.chat'
export const PORT = process.env.API_PORT || 80
export const SCHEME = __DEV__ ? 'http' : 'https'
export const ORIGIN = `${SCHEME}://${LOCATION}:${PORT}`
export const timesyncServer = `${ORIGIN}/timesync`

export const fetch = (baseUrl: string, ...args: Array<any>) => (
  window.fetch(`${ORIGIN}/api${baseUrl}`, ...args)
)
