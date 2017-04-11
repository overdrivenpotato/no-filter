// @flow

import React from 'react'
import {
  View,
} from 'react-native'

import * as commonColors from 'app/common-colors'
import Text from 'app/components/text'
import Link from './link'

const styles = {
  component: {
    backgroundColor: commonColors.DARK_BG,
    height: '100%',
    padding: 20,
    paddingTop: 40,
  },
  branding: {
    color: commonColors.RED,
    fontSize: 50,
    paddingBottom: 15,
    borderBottomColor: '#444',
    borderBottomWidth: 1,
    textAlign: 'center',
  },
  user: {
    fontSize: 20,
    color: '#999',
    paddingTop: 20,
    paddingBottom: 30,
    textAlign: 'center',
  },
  linkFiller: {
    flexGrow: 1,
  },
}

export default ({ navigation }: any) => (
  <View style={styles.component}>
    <Text style={styles.branding}>No Filter</Text>
    <Text style={styles.user}>John Doe</Text>
    <Link icon='ios-people' location='Messages' screen='conversations' />
    <Link
      icon='ios-phone-portrait'
      location='Add By Number'
      screen='addByNumber'
    />
    <Link icon='ios-information-circle' location='About' screen='about' />
    <View style={styles.linkFiller} />
    <Link icon='ios-log-out' location='Log Out' screen='logout' />
  </View>
)
