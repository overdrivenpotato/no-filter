// @flow

import React from 'react'
import { connect } from 'react-redux'
import { ListView } from 'react-native'

import MessageGroup from './message-group'

import type { State } from 'app/reducers'
import type { Props as MessageGroupProps } from './message-group'
import type { Message } from 'app/reducers/messages'

const date = new Date().toLocaleTimeString()

type StateProps = {
  navigation: any,
  messages: Array<MessageGroupProps>,
}

type Props = StateProps

const Component = ({ navigation, messages }: Props) => (
  <ListView
    renderRow={MessageGroup}
    dataSource={new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    }).cloneWithRows(messages)}
  />
)

const messages = (state: State): Array<MessageGroupProps> => {
  // Extract the current conversation messages
  const conversationId = state.navigation.state.params.conversation
  const conversation = state.conversations[conversationId]
  const messages = conversation.messages.map(id => state.messages[id])

  // Group them according to type and state
  return messages.reduce((acc, value: Message) => {
    const newMessage = {
      type: value.type,
      state: value.state,
      time: value.date,
      messages: [ value.text ],
    }

    if (acc.length === 0) {
      return [ newMessage ]
    }

    const lastMessage = acc[acc.length - 1]

    // Push the message text into an existing group or make a new one if needed
    if (value.type === lastMessage.type && value.state === lastMessage.state) {
      lastMessage.messages.push(value.text)
    } else {
      acc.push(newMessage)
    }

    return acc
  }, [])
}

const mapStateToProps = (state: State): StateProps => ({
  navigation: state.navigation,
  messages: messages(state),
})

export default connect(mapStateToProps)(Component)
