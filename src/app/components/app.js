// @flow

import React from 'react'
import { Text, View } from 'react-native'

const styles = {
  view: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  hello: {
    color: 'orange',
    fontSize: 50,
  },
  world: {
    color: 'red',
    fontSize: 100,
  },
}

export default () => (
  <View style={styles.view}>
    <Text style={styles.hello}>hello</Text>
    <Text style={styles.world}>WORLD</Text>
  </View>
)
