// @flow

import React, { Component } from 'react'
import { View, TextInput, Keyboard, ScrollView } from 'react-native'
import firebase from 'firebase'

import * as commonColors from 'app/common-colors'
import Button from './Button'
import Text from 'app/components/text'
import LoadingSpinner from './LoadingSpinner'

const styles = {
  component: {
    flex: 1,
  },
  base: {
    title: {
      elevation: 2,
      backgroundColor: commonColors.DARK_BG,
      marginBottom: 30,
<<<<<<< HEAD
    }
=======
    },
>>>>>>> 855bfb31a41896d9f5349f65369995e5ab795630

  },
  text: {
    fontSize: 25,
    alignSelf: 'center',
    color: commonColors.RED,
    padding: 30,
  },
  input: {
    marginLeft: 40,
    marginRight: 40,
    paddingBottom: 10,
  },
  errorText: {
    color: commonColors.RED,
    alignSelf: 'center',
<<<<<<< HEAD
  }
=======
  },
>>>>>>> 855bfb31a41896d9f5349f65369995e5ab795630
}

class LoginForm extends Component {
  state = {
    email: '',
    password: '',
    error: '',
    loading: false,
  }

  sendLogin = () => {
    const { email, password } = this.state

    Keyboard.dismiss()

    this.setState({ error: '', loading: true })

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(this.onLoginSuccess.bind(this))
      .catch(this.displayError.bind(this))
  }

  redirectRegister = () => {
    /*
      TODO redirect to register screen
    */
  }

  onLoginSuccess () {
    this.setState({ error: 'Logged in!', loading: false })
    /*
      TODO logic to execute when the user logs in
    */
  }

  displayError () {
    this.setState({ error: 'There was an error loggin in.', loading: false })
  }

  renderLoginButton () {
    if (this.state.loading) {
      return (
        <LoadingSpinner size={'small'} />
      )
    }
    return (
      <Button onPress={this.sendLogin} children='login'>
        Login
      </Button>
    )
  }

  renderRegisterButton () {
    if (!this.state.loading) {
      return (
        <Button onPress={this.redirectRegister} children='Register'>
          Register
        </Button>
      )
    }
  }

  render () {
    return (
      <ScrollView style={styles.component}>
        <View style={styles.base.title}>
          <Text style={styles.text}>
            Welcome To No Filter
          </Text>

        </View>
        <Text style={styles.errorText}>
          {this.state.error}
        </Text>
        <TextInput
          value={this.state.email}
          onChangeText={email => this.setState({email})}
          style={styles.input}
          placeholder='email'
          autoCorrect={false}
        />
        <TextInput
          value={this.state.password}
          onChangeText={password => this.setState({password})}
          style={styles.input}
          placeholder='password'
          autoCorrect={false}
          secureTextEntry
        />
        {this.renderLoginButton()}
        {this.renderRegisterButton()}
      </ScrollView>
    )
  }
}

export default LoginForm
