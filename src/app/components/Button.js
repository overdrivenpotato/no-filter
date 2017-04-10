// @flow

import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import * as commonColors from 'app/common-colors'
import Text from 'app/components/text'

const Button = ({ onPress, children }) => {
  const { buttonStyle, textStyle } = styles

  return (
    <View style={ styles.view }>
      <TouchableOpacity onPress={onPress} style={buttonStyle}>
        <Text style={textStyle}>
          {children}
        </Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = {
  buttonStyle: {
    backgroundColor: '#eee',
    borderRadius: 5
  },
  textStyle: {
    alignSelf: 'center',
    color: commonColors.DARK_BG,
    fontSize: 16,
    paddingTop: 10,
    paddingBottom: 10
  },
  view: {
    elevation: 2,
    backgroundColor: '#eee',
    borderRadius: 5,
    marginLeft: 60,
    marginRight: 60,
    marginTop: 30
    }
}

export default Button
