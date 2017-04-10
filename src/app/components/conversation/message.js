// @flow

import React from 'react'
import { View } from 'react-native'

import Text from 'app/components/text'
import * as commonColors from 'app/common-colors'
import Crumbs from './crumbs'

const styles = {
  component: {
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 3,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  message: {
    maxWidth: '60%',
    padding: 10,
    backgroundColor: '#eee',
    elevation: 2,
  },
  time: {
    fontSize: 10,
    marginBottom: 5,
    textAlign: 'center',
    color: '#bbb',
  },
  crumbs: {
    width: 24,
  },
}

const typingStyles = {
  message: {
    backgroundColor: commonColors.RED,
  },
  body: {
    color: 'white',
    textShadowRadius: 5,
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: {
      width: 0,
      height: 1,
    }
  },
}

const toStyles = {
  component: {
    flexDirection: 'row-reverse',
  },
  message: {
    alignSelf: 'flex-start',
  },
  body: {
    textAlign: 'right',
  },
}

const patch = (style, flag: boolean, ...extra) => (
  flag ? [ style, ...extra ] : [ style ]
)

export type Props = {
  first: boolean,
  last: boolean,
  type: 'from' | 'to',
  state: 'final' | 'typing',
  text: string,
}

export default ({ first, last, type, state, text }: Props) => {
  const right = type === 'to'
  const typing = state === 'typing'

  return (
    <View style={patch(styles.component, right, toStyles.component)}>
      <View style={styles.crumbs}>
        {
          last
            ? <Crumbs highlight={typing} align={right ? 'right' : 'left'} />
            : null
        }
      </View>
      <View
        style={[
          ...patch(styles.message, right, toStyles.message),
          ...patch(styles.message, typing, typingStyles.message),
        ]}
      >
        <Text
          style={[
            ...patch({}, right, toStyles.body),
            ...patch({}, typing, typingStyles.body),
          ]}
        >
          {text}
        </Text>
      </View>
    </View>
  )
}
