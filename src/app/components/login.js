// @flow

import React from 'react'
import { connect } from 'react-redux'
import { View, TextInput, Keyboard, ScrollView } from 'react-native'
import firebase from 'firebase'

import * as commonColors from 'app/common-colors'
import Button from './Button'
import Text from 'app/components/text'
import LoadingSpinner from './LoadingSpinner'
import { login } from 'app/actions/user'

import type { Id } from 'app/reducers'

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

class LoginForm extends React.Component {
  state = {
    email: '',
    password: '',
    error: '',
    loading: false,
  }

  props: DispatchProps

  sendLogin = () => {
    const { email, password } = this.state

    Keyboard.dismiss()

    this.setState({ error: '', loading: true })

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(this.onLoginSuccess)
      .catch(this.displayError)
  }

  redirectRegister = () => {
    // TODO redirect to register screen
  }

  onLoginSuccess = (user) => {
    this.setState({ error: 'Logged in!', loading: false })
    this.props.login(user.uid)
  }

  displayError = () => {
    this.setState({ error: 'There was an error logging in.', loading: false })
  }

  renderLoginButton () {
    if (this.state.loading) {
      return (
        <LoadingSpinner size={'small'} />
      )
    }

    return (
      <Button onPress={this.sendLogin}>
        Login
      </Button>
    )
  }

  renderRegisterButton () {
    if (!this.state.loading) {
      return (
        <Button onPress={this.redirectRegister}>
          Register
        </Button>
      )
    }
  }

  render () {
    return (
      <ScrollView style={styles.component}>
        <View style={styles.title}>
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

type DispatchProps = {
  login: Id => void,
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  login: id => dispatch(login(id)),
})

export default connect(null, mapDispatchToProps)(LoginForm)
