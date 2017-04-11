// @flow

import {
  View,
} from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons'

import Text from 'app/components/text'

const styles = {
  component: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
  },
  text: {
    color: '#222',
    fontSize: 20,
  },
}

export default () => (
  <View style={styles.component}>
    <Icon
      name='ios-swap'
      size={50}
      color='#555'
    />
    <Text style={styles.text}>Bump a Phone!</Text>
  </View>
)
