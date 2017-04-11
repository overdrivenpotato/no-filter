// @flow

import React from 'react'
import { connect } from 'react-redux'
import { View } from 'react-native'
import Ionicon from 'react-native-vector-icons/Ionicons'

import Text from 'app/components/text'
import * as commonColors from 'app/common-colors'

import type { State } from 'app/reducers'

const ToolbarAndroid = Ionicon.ToolbarAndroid

const styles = {
  component: {
    paddingTop: 20,
    backgroundColor: commonColors.DARK_BG,
    elevation: 3,
  },
  toolbar: {
    height: 56,
    alignContent: 'center',
  },
  toolbarTitle: {
    fontSize: 20,
    color: commonColors.RED,
  },
}

type Props = {
  title: string,
  openDrawer: () => void,
}

const Component = ({ title, openDrawer }: Props) => (
  <View style={styles.component}>
    <ToolbarAndroid
      title=''
      titleColor={commonColors.RED}
      navIconName='ios-menu'
      style={styles.toolbar}
      onIconClicked={openDrawer}
    >
      <Text style={styles.toolbarTitle}>{title}</Text>
    </ToolbarAndroid>
  </View>
)

const mapStateToProps = (state: State) => ({
  openDrawer: () => state.navigation.navigate('DrawerOpen'),
  title: state.drawer,
})

export default connect(mapStateToProps)(Component)
