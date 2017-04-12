// @flow

import React from 'react'
import { View, TextInput, Text } from 'react-native'

import Message from './message'
import MessageList from './message-list'
import TInput from './../text-input'

const styles = {
  component: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
}

export default () => (
  <View style={styles.component}>
    <MessageList />
    <TInput />
  </View>
)
