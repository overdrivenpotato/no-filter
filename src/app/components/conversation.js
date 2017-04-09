// @flow

import React from 'react'
import { View, TextInput, Text } from 'react-native'
import MessageBox from './MessageBox'
import Card from './Card'
import ChatComponent from './ChatComponent'

const styles = {
  component: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end'
  }
}

export default () => (
  <View style={styles.component}>
    <Card>
      <ChatComponent type='sent' text='I sent this message, wooo' time='Sat  8 Apr 2017 18:16:48'/>
      <ChatComponent type='received' text='Some dude sent this to me, woo' time='Sat  8 Apr 2017 18:16:48'/>
      <ChatComponent type='sent' text='I sent this message, wooo' time='Sat  8 Apr 2017 18:16:48'/>
      <ChatComponent type='received' text='Some dude sent this to me, woo' time='Sat  8 Apr 2017 18:16:48'/>
      <ChatComponent type='sent' text='I sent this message, wooo' time='Sat  8 Apr 2017 18:16:48'/>
      <ChatComponent type='received' text='Some dude sent this to me, woo' time='Sat  8 Apr 2017 18:16:48'/>
      <ChatComponent type='sent' text='I sent this message, wooo' time='Sat  8 Apr 2017 18:16:48'/>
      <ChatComponent type='received' text='Some dude sent this to me, woo' time='Sat  8 Apr 2017 18:16:48'/>
      <ChatComponent type='sent' text='I sent this message, wooo' time='Sat  8 Apr 2017 18:16:48'/>
      <ChatComponent type='received' text='Some dude sent this to me, woo' time='Sat  8 Apr 2017 18:16:48'/>
    </Card>
    <MessageBox />
  </View>
)
