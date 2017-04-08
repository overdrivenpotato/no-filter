// @flow

import React from 'react'
import {
  View,
  TouchableNativeFeedback,
} from 'react-native'
import { Link } from 'react-router-native'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'

import Text from 'app/components/text'

const styles = {
  component: {
    width: '100%',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: {
    flexDirection: 'column',
    flexGrow: 1,
    flexShrink: 1,
    marginLeft: 7,
  },
  container: {
    first: {
      marginTop: 10,
    },
    base: {
      margin: 10,
      marginBottom: 5,
      marginTop: 5,
      height: 80,
      justifyContent: 'center',
      backgroundColor: '#eee',
      elevation: 2,
    },
  },
  paddedContainer: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    fontSize: 20,
    color: '#222',
  },
}

type Props = {
  name: string,
  message: string,
  first?: boolean,
}

export default ({name, message, first}: Props) => (
  <Link
    component={TouchableNativeFeedback}
    style={styles.component}
    to={`/conversations/${name}`}
  >
    <View style={[
      styles.container.base,
      first ? styles.container.first : {},
    ]}>
      <View style={styles.paddedContainer}>
        <View style={styles.info}>
          <Text style={styles.name}>{name}</Text>
          <Text numberOfLines={1}>{message}</Text>
        </View>
        <View>
          <MaterialIcon
            name='chevron-right'
            size={30}
            color='#222'
          />
        </View>
      </View>
    </View>
  </Link>
)
