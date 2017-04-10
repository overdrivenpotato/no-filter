// @flow

import React from 'react'
import { View } from 'react-native'

import * as commonColors from 'app/common-colors'

type Props = {
  align: 'left' | 'right',
  highlight: boolean,
}

const styles = {
  component: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  componentReverse: {
    flexDirection: 'row-reverse',
  },
  crumb: {
    backgroundColor: '#eee',
    elevation: 2,
  },
  smallCrumb: {
    width: 6,
    height: 6,
  },
  bigCrumb: {
    width: 10,
    height: 10,
    marginLeft: 4,
    marginRight: 4,
  },
  highlight: {
    backgroundColor: commonColors.RED,
  },
}

export default ({ align, highlight }: Props) => (
  <View
    style={[
      styles.component,
      align === 'right' ? styles.componentReverse : {},
    ]}
  >
    <View
      style={[
        styles.crumb,
        styles.smallCrumb,
        highlight ? styles.highlight : {},
      ]}
    />
    <View
      style={[
        styles.crumb,
        styles.bigCrumb,
        highlight ? styles.highlight : {},
      ]}
    />
  </View>
)
