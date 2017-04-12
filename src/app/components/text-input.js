// @flow

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, TextInput } from 'react-native'

import { updateText } from 'app/actions/conversations'


  const styles = {
    view: {
      flexDirection: 'row',
    },
    input: {
      flex: 5,
      height: 40,
    },
  }

class comp extends Component {
  state = {
    message: ''
  }

  change = (text: string) => {
    //TODO Something
    this.setState({ message: text })

    this.props.update(this.props.id, this.props.message, text)
  }

  send (text: string) {

  }

  render() {
    return (
      <View style={styles.view}>
        <TextInput
        value={this.state.message}
        onChangeText={this.change}
        style={styles.input}
        onSubmitEditing={this.send}
        />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  const id = state.navigation.state.params.conversation

  return ({
    id: id,
    message: state.conversations[id].messages.length - 1,
  })
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  update: (id, message, text) => {
    dispatch(updateText(id, message, text))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(comp)
