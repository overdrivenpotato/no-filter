// @flow

import React from 'react'
import { View, ActivityIndicator } from 'react-native'

type Props = {
  size: string,
}

const Spinner = ({size}: Props) => (
  <View style={styles.spinnerStyle}>
    <ActivityIndicator
      size={size || 'large'}
    />
  </View>
)

const styles = {
  spinnerStyle: {
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
}

export default Spinner
