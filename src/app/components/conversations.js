// @flow

import React from 'react'
import { connect } from 'react-redux'
import {
  ListView,
  View,
  StyleSheet,
} from 'react-native'

import ConversationPreview from './conversation-preview'
import ConversationAddFriend from './conversation-add-friend'

type MessageRow = {
  type: 'message' | 'first',
  name: string,
  first?: boolean,
  message: string,
}

type LastRow = {
  type: 'last',
}

const renderRow = (row: MessageRow | LastRow) => (
  row.type === 'last'
    ? <ConversationAddFriend />
    : (
      <ConversationPreview
        name={row.name}
        message={row.message}
        first={row.type === 'first'}
      />
    )
)

export default () => (
  <ListView
    renderRow={renderRow}
    style={{ height: 100 }}
    dataSource={new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    }).cloneWithRows([
      {
        type: 'first',
        name: 'Marko Mijalkovic',
        message: 'This is a really long test message blah suh duuuuuuuuuu',
      },
      {
        type: 'message',
        name: 'John Appleseed',
        message: 'why did you take my wallet',
      },
      {
        type: 'message',
        name: 'Dan The Man',
        message: 'lol there was only $10 in there',
      },
      {
        type: 'last',
      },
    ])}
  />
)
