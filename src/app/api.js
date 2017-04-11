const LOCATION = process.env.API_SERVER
const PORT = __DEV__ ? process.env.API_PORT : 80

export { LOCATION }
export { PORT }

export const timesyncServer = `http://${LOCATION}:${PORT}/timesync`
