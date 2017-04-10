// @flow

import React from 'react'
import { ListView } from 'react-native'

import MessageGroup from './message-group'

const date = new Date().toLocaleTimeString()

export default () => (
  <ListView
    renderRow={MessageGroup}
    dataSource={new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    }).cloneWithRows([
      {
        first: true,
        type: 'from',
        state: 'final',
        messages: [
          'asdf',
          'testing message 2',
        ],
      },
      {
        type: 'to',
        state: 'final',
        time: date,
        messages: [
          'zxcv',
          'zxcvasdfasdfljasdlajsdlfajsdlkfjsdfasdfsafdlaskdjfalsdjf',
        ],
      },
      {
        type: 'from',
        state: 'typing',
        time: date,
        messages: [
          'typing this rn...',
        ],
      },
    ])}
  />
)
