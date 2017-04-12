// @flow

import React from 'react'
import { View } from 'react-native'

import Message from './message'
import Text from 'app/components/text'

export type Props = {
  messages: Array<string>,
  type: 'from' | 'to',
  state: 'final' | 'typing',
  time: Date,
}

const styles = {
  component: {
    elevation: 3,
    marginTop: 10,
  },
  time: {
    marginBottom: 5,
    textAlign: 'center',
    fontSize: 10,
    color: '#aaa',
  },
}

export default ({ messages, type, state, time }: Props) => (
  <View style={styles.component}>
    {
      state === 'final'
        ? <Text style={styles.time}>{time.toLocaleTimeString()}</Text>
        : null
    }
    {
      messages.map((message, index, array) => (
        <Message
          key={index}
          first={index === 0}
          last={index === array.length - 1}
          type={type}
          state={state}
          text={message}
        />
      ))
    }
  </View>
)
