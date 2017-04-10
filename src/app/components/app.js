// @flow

import React from 'react'
import { View, StatusBar } from 'react-native'
import { Route, Redirect } from 'react-router'

import RouteWrapper from './route-wrapper'
import Conversation from './conversation'
import Conversations from './conversations'
import Login from './login'
import Register from './register'
import About from './about'
import AddConfirm from './add-confirm'

const styles = {
  component: {
    flexGrow: 1,
    backgroundColor: '#ddd',
  },
}

export default () => (
  <View style={styles.component}>
    <StatusBar
      backgroundColor='transparent'
      translucent
      animated
    />
    { /* Redirect to conversations by default */ }
    <Redirect to='/add-confirm' />
    <RouteWrapper
      exact
      path='/conversations'
      component={Conversations}
      title='Messages'
    />
    <RouteWrapper
      path='/conversations/:id'
      component={Conversation}
      title='Conversation'
    />
    <RouteWrapper
      exact
      path='/login'
      component={Login}
      title='Login'
    />
    <RouteWrapper
      exact
      path='/register'
      component={Register}
      title='Register'
    />
    <RouteWrapper
      exact
      path='/about'
      component={About}
      title='About'
    />
    <RouteWrapper
      exact
      path='/add-confirm'
      component={AddConfirm}
      title='Confirm'
    />
  </View>
)
