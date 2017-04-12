// @flow

import React from 'react'
import { connect } from 'react-redux'
import { View, TextInput, Text } from 'react-native'

import { updateConversation } from 'app/actions/conversations'

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

class Component extends React.Component {
  state = {}

  componentDidMount () {
    const { id } = this.props

    this.setState({
      interval: setInterval(() => this.props.fetch(id), 200)
    })
  }

  componentWillUnmount () {
    clearInterval(this.state.interval)
  }

  render () {
    return <View style={styles.component}>
      <MessageList />
    </View>
  }
}

const mapStateToProps = (state) => ({
  id: state.navigation.state.params.conversation,
})

const mapDisatchToProps = (dispatch: Dispatch) => ({
  fetch: (id) => {
    console.log('test')
    dispatch(updateConversation(id))
  },
})

export default connect(mapStateToProps, mapDisatchToProps)(Component)
