// @flow

import React from 'react'
import { View, StatusBar } from 'react-native'
import { Route, Redirect } from 'react-router'
import { DrawerNavigator } from 'react-navigation'

import Conversation from './conversation'
import Conversations from './conversations'
import Login from './login'
import Register from './register'
import About from './about'
import AddConfirm from './add-confirm'
import AboutUser from './about-user'
import AddByNumber from './add-by-number'
import Drawer from './drawer'
import routeWrapper from './route-wrapper'

const styles = {
  component: {
    flexGrow: 1,
    backgroundColor: '#ddd',
  },
}

const pages = {
  conversations: {
    screen: routeWrapper(Conversations, 'Messages'),
  },
  conversation: {
    screen: routeWrapper(Conversation, params => params.name),
  },
  addByNumber: {
    screen: routeWrapper(AddByNumber, 'Add By Number'),
  },
  login: {
    screen: routeWrapper(Login),
  },
  register: {
    screen: routeWrapper(Register),
  },
  aboutUser: {
    screen: routeWrapper(AboutUser, 'My Profile'),
  },
  addConfirm: {
    screen: routeWrapper(AddConfirm, params => `Add ${params.name}`),
  },
  about: {
    screen: routeWrapper(About, 'About'),
  },
}

const options = {
  drawerWidth: 300,
  contentComponent: Drawer,
}

export const Navigator = DrawerNavigator(pages, options)

export default () => (
  <View style={styles.component}>
    <StatusBar
      backgroundColor='transparent'
      translucent
      animated
    />
    <Navigator />
  </View>
)
