// @flow

import React from 'react'
import { View, DrawerLayoutAndroid } from 'react-native'
import { Route } from 'react-router'
import { connect } from 'react-redux'
import Ionicon from 'react-native-vector-icons/Ionicons'

import * as commonColors from 'app/common-colors'
import * as drawer from 'app/actions/drawer'
import Text from 'app/components/text'
import Drawer from './drawer'
import { Actions as DrawerActions } from 'app/reducers/drawer'

const ToolbarAndroid = Ionicon.ToolbarAndroid

const styles = {
  toolbarContainer: {
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
  component: any,
  title: string | Object => string,
  location: Object,
  onOpen: () => void,
  onClose: () => void,
  openDrawer: () => void,
}

const Active = ({
  // Rename so react interprets this as a component not a tag
  component: Component,
  title,
  location,
  onOpen,
  onClose,
  openDrawer,
}: Props) => (
  <DrawerLayoutAndroid
    drawerWidth={300}
    drawerPosition={DrawerLayoutAndroid.positions.Left}
    onDrawerOpen={onOpen}
    onDrawerClose={onClose}
    renderNavigationView={() => <Drawer />}
  >
    <View style={styles.toolbarContainer}>
      <ToolbarAndroid
        title=''
        titleColor={commonColors.RED}
        navIconName='ios-menu'
        style={styles.toolbar}
        onIconClicked={openDrawer}
      >
        <Text style={styles.toolbarTitle}>
          {
            typeof title === 'string' ? title : title(location)
          }
        </Text>
      </ToolbarAndroid>
    </View>
    <Component />
  </DrawerLayoutAndroid>
)

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onOpen: () => dispatch({ type: DrawerActions.SHOW }),
  onClose: () => dispatch({ type: DrawerActions.HIDE }),
  openDrawer: () => drawer.show(dispatch),
})

// Render callback passed to route. We merge in the props passed to this
// RouteWrapper with the props passed into the render function. This way we can
// access our original props and also the current router location.
const renderCallback = (props) =>
  (routeProps) => {
    const Component = connect(null, mapDispatchToProps)(Active)
    const merged = { ...props, ...routeProps }
    return <Component {...merged} />
  }

export default (props: any) => (
  <Route {...{ ...props, component: null }} render={renderCallback(props)} />
)
