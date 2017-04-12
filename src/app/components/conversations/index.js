// @flow

import React from 'react'
import { connect } from 'react-redux'
import {
  ListView,
  View,
  StyleSheet,
} from 'react-native'

import Preview from './preview'
import AddFriend from './add-friend'

import type { State, Id } from 'app/reducers'

type MessageRow = {
  type: 'message' | 'first',
  state: 'typing' | 'final',
  user: Id,
  conversation: Id,
  first?: boolean,
  message: string,
}

type LastRow = {
  type: 'last',
}

type StateProps = {
  conversations: Array<MessageRow | LastRow>,
}

const renderRow = (row: MessageRow | LastRow) => (
  row.type === 'last'
    ? <AddFriend />
    : (
      <Preview
        userId={row.user}
        conversation={row.conversation}
        highlight={row.state === 'typing'}
        message={row.message}
        first={row.type === 'first'}
      />
    )
)

const Component = ({ conversations }: StateProps) => (
  <ListView
    renderRow={renderRow}
    dataSource={new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    }).cloneWithRows(conversations)}
  />
)

const mapStateToProps = (state: State): StateProps => {
  const conversations = Object.keys(state.conversations)
    .map((conversationId, index) => {
      const conversation = state.conversations[conversationId]
      const messages = conversation.messages
      const lastMessage = messages[messages.length - 1]

      return {
        type: index === 0 ? 'first' : 'message',
        state: lastMessage.state,
        user: lastMessage.user,
        conversation: conversationId,
        message: lastMessage.text,
      }
    })

  console.log(conversations)

  return {
    conversations: conversations.concat({ type: 'last' }),
  }
}

export default connect(mapStateToProps)(Component)
