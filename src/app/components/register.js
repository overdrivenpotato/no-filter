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
  title: {
    elevation: 2,
    backgroundColor: commonColors.DARK_BG,
    marginBottom: 30,
    paddingTop: 20,
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
  },
}

class LoginForm extends Component {
  state = {
    email: '',
    name: '',
    password: '',
    cnfmpassword: '',
    error: '',
    loading: false,
  }

  sendRegister = () => {
    const { email, name, password, cnfmpassword } = this.state

    Keyboard.dismiss()

    this.setState({ error: '', loading: true })

    if (password !== cnfmpassword) {
      this.setState({ error: 'Passwords do not match', loading: false })
    } else {
      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(this.onRegisterSuccess)
        .catch((error) => {
          console.log(error)
          this.displayError()
        })
    }
  }

  redirectLogin = () => {
    this.props.redirectLogin()
  }

  onRegisterSuccess = () => {
    const { email, name } = this.state
    const id = firebase.auth().currentUser.uid

    firebase.database().ref('/users/' + id).set({ name, email }, () => (
      this.props.login(id)
    ))
  }

  displayError = () => {
    this.setState({ error: 'There was an error registering', loading: false })
  }

  renderRegisterButton () {
    if (this.state.loading) {
      return (
        <LoadingSpinner size={'small'} />
      )
    }
    return (
      <Button onPress={this.sendRegister}>
        Register
      </Button>
    )
  }

  renderLoginButton () {
    if (!this.state.loading) {
      return (
        <Button onPress={this.redirectLogin}>
          Have an account?
        </Button>
      )
    }
  }

  render () {
    return (
      <ScrollView style={styles.component}>
        <View style={styles.title}>
          <Text style={styles.text}>
            Register An Account
          </Text>

        </View>
        <Text style={styles.errorText}>
          {this.state.error}
        </Text>
        <TextInput
          value={this.state.name}
          onChangeText={name => this.setState({name})}
          style={styles.input}
          placeholder='full name'
          autoCorrect={false}
        />
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
        <TextInput
          value={this.state.cnfmpassword}
          onChangeText={cnfmpassword => this.setState({cnfmpassword})}
          style={styles.input}
          placeholder='confirm password'
          autoCorrect={false}
          secureTextEntry
        />
        {this.renderRegisterButton()}
        {this.renderLoginButton()}
      </ScrollView>
    )
  }
}

export default LoginForm
