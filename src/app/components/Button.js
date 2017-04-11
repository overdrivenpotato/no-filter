// @flow

import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import * as commonColors from 'app/common-colors'
import Text from 'app/components/text'

const styles = {
  button: {
    backgroundColor: '#eee',
    borderRadius: 5,
  },
  text: {
    alignSelf: 'center',
    color: commonColors.DARK_BG,
    fontSize: 16,
    paddingTop: 10,
    paddingBottom: 10,
  },
  view: {
    elevation: 2,
    backgroundColor: '#eee',
    borderRadius: 5,
    marginLeft: 60,
    marginRight: 60,
    marginTop: 30,
  },
}

type Props = {
  onPress: () => void,
  children?: any,
}

export default ({ onPress, children }: Props) => (
  <View style={styles.view}>
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={styles.text}>
        {children}
      </Text>
    </TouchableOpacity>
  </View>
)
