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
    flex: 1
  },
  base: {
    title: {
      elevation: 2,
      backgroundColor: commonColors.DARK_BG,
      marginBottom: 30
    }

  },
  text: {
    fontSize: 25,
    alignSelf: 'center',
    color: commonColors.RED,
    padding: 30
  },
  input: {
    marginLeft: 40,
    marginRight: 40,
    paddingBottom: 10,
  },
  errorText: {
    color: commonColors.RED,
    alignSelf: 'center'
  }
}

class LoginForm extends Component {
  state = {
    email: '',
    password: '',
    error: '',
    loading: false
  }

  sendLogin() {
    const { email, password } = this.state

    Keyboard.dismiss()

    this.setState({ error: '', loading: true })

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(this.onLoginSuccess.bind(this))
      .catch(this.displayError.bind(this))


  }

  onLoginSuccess() {
    this.setState({ error: 'Logged in!', loading: false })
    /*
      TODO logic to execute when the user logs in
    */
  }

  displayError() {
    this.setState({ error: 'There was an error loggin in.', loading: false })
  }

  renderButton() {
    if(this.state.loading) {
      return (
        <LoadingSpinner size={'small'} />
      )
    }
    return (
      <Button onPress={this.sendLogin.bind(this)}>
        Login
      </Button>
    )
  }

  render() {
    return (
      <View style={ styles.component }>
        <View style={ styles.base.title }>
          <Text style={ styles.text }>
            Welcome To No Filter
          </Text>

        </View>
        <Text style={ styles.errorText }>
          {this.state.error}
        </Text>
        <TextInput onChangeText={email => this.setState({ email })} style={ styles.input } placeholder='email' autoCorrect={false} />
        <TextInput onChangeText={password => this.setState({ password })} style={ styles.input } placeholder='password' autoCorrect={false} secureTextEntry={true}/>
        {this.renderButton()}
      </View>
    )
  }
}

export default LoginForm