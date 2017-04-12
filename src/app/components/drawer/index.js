// @flow

import React from 'react'
import { connect } from 'react-redux'
import { View } from 'react-native'

import * as commonColors from 'app/common-colors'
import Text from 'app/components/text'
import Link from './link'
import { logout } from 'app/actions/user'

import type { State } from 'app/reducers'

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

type StateProps = {
  navigation: any,
  name: string,
}

type DispatchProps = {
  logout: () => void,
}

type Props = StateProps & DispatchProps

const Component = ({ navigation, name, logout }: Props) => (
  <View style={styles.component}>
    <Text style={styles.branding}>No Filter</Text>
    <Text style={styles.user}>{name}</Text>
    <Link icon='ios-people' location='Messages' screen='conversations' />
    <Link
      icon='ios-phone-portrait'
      location='Add By Number'
      screen='addByNumber'
    />
    <Link icon='ios-information-circle' location='About' screen='about' />
    <View style={styles.linkFiller} />
    <Link icon='ios-log-out' location='Log Out' onPress={logout} />
  </View>
)

const mapStateToProps = (state: State): StateProps => ({
  navigation: state.navigation,
  name: state.user ? state.users[state.user].name : '',
})

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  logout: () => dispatch(logout()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Component)
