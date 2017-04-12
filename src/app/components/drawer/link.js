// @flow

import React from 'react'
import { connect } from 'react-redux'
import { View, TouchableNativeFeedback } from 'react-native'
import { Link } from 'react-router-native'
import { withRouter } from 'react-router'
import Icon from 'react-native-vector-icons/Ionicons'

import * as commonColors from 'app/common-colors'
import Text from 'app/components/text'

import type { State } from 'app/reducers'

type StateProps = {
  drawer: ?string,
  onPress: () => void,
}

type InProps = {
  icon: string,
  location?: string,
  onPress?: () => void,
  screen: string,
}

type Props = InProps & StateProps

const styles = {
  component: {
    padding: 10,
    paddingLeft: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    color: '#ddd',
    paddingLeft: 20,
  },
  icon: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
}

const color = (location, to) => (
  location === to ? commonColors.RED : '#ddd'
)

const Component = ({ drawer, icon, onPress, location }: Props) => (
  <TouchableNativeFeedback onPress={onPress}>
    <View style={styles.component}>
      <View style={styles.icon}>
        <Icon
          color={color(drawer, location)}
          name={icon}
          size={30}
          width={30}
        />
      </View>
      <Text
        style={[
          styles.text,
          { color: color(drawer, location) },
        ]}
      >
        {location}
      </Text>
    </View>
  </TouchableNativeFeedback>
)

const mapStateToProps = (state: State, props: InProps): StateProps => ({
  drawer: state.drawer,
  onPress: props.onPress || (() => state.navigation.navigate(props.screen)),
})

export default connect(mapStateToProps)(Component)
