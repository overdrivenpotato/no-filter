// @flow

import React, { Component } from 'react'
import { View, TextInput, Keyboard } from 'react-native'
import firebase from 'firebase'

import * as commonColors from 'app/common-colors'
import Button from './Button'
import Text from 'app/components/text'
import LoadingSpinner from './LoadingSpinner'

const styles = {
  component: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingBottom: 30,
  },
  input: {
    marginLeft: 40,
    marginRight: 40,
    paddingBottom: 10,
  },
  errorText: {
    color: commonColors.RED,
    alignSelf: 'center',
  },
}

class Adder extends Component {
  state = {
    nameToAdd: '',
    error: '',
    loading: false,
  }

  addByName = () => {
    const { nameToAdd } = this.state
    Keyboard.dismiss()
    this.setState({ error: '', loading: true })

    firebase.auth().getUser(nameToAdd)
      .then(this.onAddSuccess.bind(this)
      .catch(this.displayError.bind(this))
      )
  }

  redirectToAdded = () => {
    /*
      TODO redirect to success screen
    */
  }

  onAddSuccess = () => {
    const { nameToAdd } = this.state
    this.setState({ error: 'Added', loading: false })
    /*
      TODO logic to execute when the user logs in
    */
  }

  displayError = () => {
    this.setState({ error: 'There was an error adding the user.',
      loading: false })
  }

  renderAddButton () {
    if (!this.state.loading) {
      return (
        <Button onPress={this.addByName}>
          Add
        </Button>
      )
    }
  }

  render () {
    return (
      <View style={styles.component}>
        <Text style={styles.errorText}>
          {this.state.error}
        </Text>
        <TextInput value={this.state.nameToAdd}
          onChangeText={nameToAdd => this.setState({ nameToAdd })}
          style={styles.input} placeholder='Email' autoCorrect={false} />
        {this.renderAddButton()}
      </View>
    )
  }
}

export default Adder
