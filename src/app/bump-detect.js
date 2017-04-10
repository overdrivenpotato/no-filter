// @flow

import { DeviceEventEmitter } from 'react-native'

// $FlowExpectedError
import { SensorManager } from 'NativeModules'

export default (callback: () => void) => {
  let lastTime = 0

  SensorManager.startAccelerometer(20)
  DeviceEventEmitter.addListener('Accelerometer', data => {
    const GRAVITY = 9.81

    const { x: rawX, y: rawY, z: rawZ } = data
    const x = rawX / GRAVITY
    const y = rawY / GRAVITY
    const z = rawZ / GRAVITY

    const force = Math.sqrt(x * x + y * y + z * z)

    if (force > 1.5) {
      const currentTime = new Date().getTime()

      // Don't bump more than once every 500ms
      if (currentTime - lastTime > 500) {
        callback()
        lastTime = currentTime
      }
    }
  })
}
