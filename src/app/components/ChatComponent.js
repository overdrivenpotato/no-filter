//@flow

import React from 'react'
import { View, Text } from 'react-native'

const style = {
  marginLeft: 10,
  marginTop: 5,
  marginBottom: 5,
  borderTopRightRadius: 5,
  borderTopLeftRadius: 5,
  borderBottomLeftRadius: 5,
  padding: 5,
  maxWidth: 200,
  minWidth: 35,
  time: {
    color: 'black',
    fontSize: 10,
    alignSelf: 'flex-end'
  }
}

const Style = (type) => {
  if(type == 'sent') {
    return {
      marginLeft: style.marginLeft,
      marginTop: style.marginTop,
      marginBottom: style.marginBottom,
      marginRight: 5,
      borderTopRightRadius: style.borderTopRightRadius,
      borderBottomLeftRadius: style.borderBottomLeftRadius,
      borderTopLeftRadius: 5,
      padding: style.padding,
      maxWidth: style.maxWidth,
      minWidth: style.minWidth,
      alignSelf: 'flex-end',
      backgroundColor: 'skyblue'
    }
  } else if(type == 'received') {
    return {
      marginLeft: style.marginLeft,
      marginTop: style.marginTop,
      marginBottom: style.marginBottom,
      borderTopRightRadius: style.borderTopRightRadius,
      borderBottomLeftRadius: style.borderBottomLeftRadius,
      borderBottomRightRadius: 5,
      padding: style.padding,
      maxWidth: style.maxWidth,
      minWidth: style.minWidth,
      alignSelf: 'flex-start',
      backgroundColor: 'deeppink'
    }
  }
}

export default (props) => (
  <View style={ Style(props.type) }>
    <Text>
      {props.text}
    </Text>
    <Text style={ style.time }>
      {props.time}
    </Text>
  </View>
)
