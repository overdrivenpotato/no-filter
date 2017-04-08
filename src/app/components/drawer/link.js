// @flow

import React from 'react'
import { View, TouchableNativeFeedback } from 'react-native'
import { Link } from 'react-router-native'
import { withRouter } from 'react-router'
import Icon from 'react-native-vector-icons/Ionicons'

import * as commonColors from 'app/common-colors'
import Text from 'app/components/text'

type Props = {
  location: string,
  icon: string,
  to: string,
  text: string,
}

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
  location.pathname === to ? commonColors.RED : '#ddd'
)

const Component = ({ location, icon, to, text }: Props) => (
  <Link to={to} component={TouchableNativeFeedback} activeOpacity={0.8}>
    <View style={styles.component}>
      <View style={styles.icon}>
        <Icon
          color={color(location, to)}
          name={icon}
          size={30}
          width={30}
        />
      </View>
      <Text
        style={[
          styles.text,
          { color: color(location, to) },
        ]}
      >
        {text}
      </Text>
    </View>
  </Link>
)

export default withRouter(Component)
