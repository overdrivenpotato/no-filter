// @flow

import React from 'react'
import { View, StatusBar } from 'react-native'
import { Route, Redirect } from 'react-router'

import RouteWrapper from './route-wrapper'
import Conversation from './conversation'
import Conversations from './conversations'

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
    <Redirect to='/conversations' />
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
  </View>
)
