// @flow

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, TextInput, Keyboard } from 'react-native'
import firebase from 'firebase'
import { fetch } from 'app/api'
import { addByEmail } from 'app/actions/conversations'

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
    this.props.add(nameToAdd)
    console.log(this.props)
    this.props.navigate()
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
    return (
      <Button onPress={this.addByName}>
        Add
      </Button>
    )
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

const mapDispatchToProps = (dispatch: Dispatch) => ({
  add: email => {
    dispatch(addByEmail(email))
  }
})

const mapStateToProps = (state) => ({
  navigate: () => state.navigation.navigate('conversations'),
})

export default connect(mapStateToProps, mapDispatchToProps)(Adder)
