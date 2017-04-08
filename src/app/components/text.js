// @flow

import React from 'react'
import { Text } from 'react-native'

const style = {
  fontFamily: 'avenirnext',
}

export default (props: any) => (
  <Text {...props} style={[ style, props.style ]} />
)
