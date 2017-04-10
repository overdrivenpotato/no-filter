// @flow
 import React from 'react'
 import { View, TextInput, Button, Alert } from 'react-native'

const styles = {
  view: {
    flexDirection: 'row'
  },
  input: {
    flex: 5,
    height: 40
  },
  button: {
    flex: 1
  }
}

const sendMessage = () => {
  console.log("Boop")
}

 export default () => (
   <View style = { styles.view }>
    <TextInput
      style = { styles.input }
      placeholder = "send a message"
      onSubmit = { sendMessage }
    />
    <Button
      style = { styles.button }
      title = 'send'
      onPress = { sendMessage }
    />

   </View>
 )
