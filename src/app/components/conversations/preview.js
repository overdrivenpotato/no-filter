// @flow

import React from 'react'
import { connect } from 'react-redux'
import {
  View,
  TouchableNativeFeedback,
} from 'react-native'
import { Link } from 'react-router-native'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'

import Text from 'app/components/text'
import * as commonColors from 'app/common-colors'

import type { State, Id } from 'app/reducers'
import type { User } from 'app/reducers/users'

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
  highlight: {
    color: commonColors.RED,
    textShadowColor: 'rgba(0,0,0,0.15)',
    textShadowRadius: 3,
    textShadowOffset: {
      height: 1,
      width: 0,
    },
  },
}

type Props = InProps & StateProps

const Component = ({userName, message, highlight, first, navigate}: Props) => (
  <TouchableNativeFeedback onPress={navigate}>
    <View style={[
      styles.container.base,
      first ? styles.container.first : {},
    ]}>
      <View style={styles.paddedContainer}>
        <View style={styles.info}>
          <Text style={styles.name}>{userName}</Text>
          <Text
            style={[
              highlight ? styles.highlight : {},
            ]}
            numberOfLines={1}
          >
            {message}
          </Text>
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
  </TouchableNativeFeedback>
)

type InProps = {
  userId: Id,
  conversation: Id,
  first: boolean,
  highlight: boolean,
  message: string,
}

type StateProps = {
  navigate: () => void,
  userName: string,
}

const mapStateToProps = (state: State, { userId, conversation }: InProps): StateProps => ({
  navigate: () => state.navigation.navigate('conversation', {
    name: state.users[userId].name,
    conversation,
  }),
  userName: state.users[userId].name,
})

export default connect(mapStateToProps)(Component)
