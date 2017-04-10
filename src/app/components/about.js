// @flow

import React, { Component } from 'react'
import { View } from 'react-native'

import * as commonColors from 'app/common-colors'
import Text from 'app/components/text'

const styles = {
  component: {
    flex: 1,
    backgroundColor: commonColors.DARK_BG,
    flexDirection: 'column'
  },
  base: {
    title: {
      elevation: 2,
      backgroundColor: commonColors.DARK_BG,
      marginBottom: 30
    }
  },
  titleText: {
    fontSize: 25,
    alignSelf: 'center',
    color: commonColors.RED,
    padding: 30
  },
  bodyText: {
    color: commonColors.RED,
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 18
  },
  bodyView: {
    paddingTop: 80,
    justifyContent: 'center'
  }
}

export default () => (
  <View style={ styles.component }>
    <View style={ styles.base.title }>
      <Text style={ styles.titleText }>
        About No Filter
      </Text>
    </View>
    <View style={ styles.bodyView }>
      <Text style={ styles.bodyText }>
        Made under normal, not stressful conditions {"\n"}many weeks before the deadline{"\n"}{"\n"}
        Azem Centiner{"\n"}
        Clarence Su{"\n"}
        Eugene Mikhailovski{"\n"}
        Jackson Zavarella{"\n"}
        Marko Mijalkovic
      </Text>
    </View>
  </View>
)
