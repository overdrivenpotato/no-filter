// @flow

import React from 'react'
import { connect } from 'react-redux'
import { View, Alert} from 'react-native'
import * as commonColors from 'app/common-colors'

import { newConversation } from 'app/actions/conversations'

import type { User } from 'app/reducers/users'

import Text from 'app/components/text'
import Button from 'app/components/Button'

const styles = {
  component: {
    flex: 1,
    flexDirection: 'column',
  },
  bodyText: {
    color: '#222',
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 30,
    paddingBottom: 30,
  },
  bodyView: {
    paddingTop: 80,
    justifyContent: 'center',
  },
  boxcontainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    width: 100,
  },
}

type Props = {
  user: User,
  name: string,
  add: () => void,
  decline: () => void,
  navigation: any,
}

const Component = ({ navigation, name, add, decline }: Props) => (
  <View style={styles.component}>
    <View style={styles.bodyView}>
      <Text style={styles.bodyText}>
        Confirm add?{'\n'}
      </Text>
    </View>
    <View style={styles.boxcontainer}>
      <Button style={styles.button} onPress={add}>Yes</Button>
      <Button style={styles.button} onPress={decline}>No</Button>
    </View>
  </View>
)

const mapDispatchToProps = (dispatch: Dispatch, props) => ({
  add: () => dispatch(newConversation(props.navigation.state.params.name)),
})

const mapStateToProps = (state, props) => ({
  name: state.navigation.state.params.name,
  decline: () => {
    state.navigation.navigate('conversations')
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(Component)
