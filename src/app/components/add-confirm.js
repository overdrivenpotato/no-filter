// @flow

import React, { Component } from 'react'
import { View, Alert, Button } from 'react-native'
import * as commonColors from 'app/common-colors'
import Text from 'app/components/text'

const styles = {
  component: {
    flex: 1,
    backgroundColor: '#eee',
    flexDirection: 'column',
  },
  bodyText: {
    color: '#222',
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 30,
  },
  bodyView: {
    paddingTop: 80,
    justifyContent: 'center',
  },
  boxcontainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  boxstyle: {
    width: 200,
    height: 50,
  },
}

export default () => (
  <View style={styles.component}>
    <View style={styles.bodyView}>
      <Text style={styles.bodyText}>
        would you like to add {'\n'}
        John Smith{'\n'}{'\n'}
      </Text>
    </View>

    <View style={styles.boxcontainer}>
      <View style={styles.boxstyle}>
        <Button
          onPress={() => { Alert.alert('Added') }}
          title='Add Friend'
          color='#ddd'
        />
      </View>

      <View style={styles.boxstyle}>
        <Button
          onPress={() => { Alert.alert('Rejected') }}
          title='Deny Request'
          color='#ddd'
        />
      </View>
    </View>
  </View>
)
