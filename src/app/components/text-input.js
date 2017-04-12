// @flow

import React, { Component } from 'react'
import { View, TextInput } from 'react-native'


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

  change (text: string) {
    //TODO Something
  }

  render() {
    return (
      <View style={styles.view}>
        <TextInput
        value={this.state.message}
        onChangeText={this.change(this.state.message)}
        style={styles.input}
        />
      </View>
    )
  }
}

export default comp
