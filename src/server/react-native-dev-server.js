// @flow

import { spawn } from 'child_process'

export default (port: number) => {
  spawn('npm', ['run', 'start:app'], {
    cwd: process.cwd(),
    env: {
      ...process.env,
      API_PORT: port,
    },
  })
}
