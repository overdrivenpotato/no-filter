// @flow

import React, { Component } from 'react'
import { View, Alert, Button } from 'react-native'
import * as commonColors from 'app/common-colors'
import Text from 'app/components/text'
const onButtonPress = () => {
  Alert.alert('Button has been pressed!')
}
const styles = {
  component: {
    flex: 1,
    backgroundColor: '#eee',
    flexDirection: 'column',
  },
  base: {
    title: {
      elevation: 2,
      backgroundColor: '#eee',
      marginBottom: 30,
    },
  },
  titleText: {
    fontSize: 25,
    alignSelf: 'center',
    color: commonColors.RED,
    padding: 30,
  },
  bodyText: {
    color: commonColors.RED,
    alignSelf: 'center',
    textAlign: 'center',
  },
  bodyView: {
    paddingTop: 80,
    justifyContent: 'center',
  },
  boxstyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 2,
    width: 50,
    height: 50,
  },
}

export default () => (
  <View style={styles.component}>
    <View style={styles.bodyView}>
      <Text style={styles.bodyText}>
        would you like to add {'\n'}
        INSERT USER HERE
      </Text>
    </View>
    <View style={styles.boxstyle}>
      <Button
        onPress={onButtonPress}
        title='yes add that cutie'
        color='#ddd'
        accessibilityLabel='you added INSERT NAME HERE'
      />
      <Button
        onPress={onButtonPress}
        title='NAAAAAAA FAM'
        color='#ddd'
        accessibilityLabel='deniedddddd'
      />
    </View>
  </View>
)
