export const LOCATION = __DEV__ ? process.env.API_SERVER : 'nofilter.chat'
export const PORT = __DEV__ ? process.env.API_PORT : 80
export const timesyncServer = `http://${LOCATION}:${PORT}/timesync`
