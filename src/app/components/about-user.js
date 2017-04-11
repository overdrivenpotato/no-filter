// @flow

import React, { Component } from 'react'
import { View, ScrollView } from 'react-native'
import * as commonColors from 'app/common-colors'
import Text from 'app/components/text'

const styles = {
  component: {
    flex: 1,
    backgroundColor: '#eee',
    flexDirection: 'column',
  },
  headingtext: {
    fontSize: 30,
    textAlign: 'left',
  },
  bodyText: {
    color: '#222',
    textAlign: 'left',
    fontSize: 15,
  },
}

export default () => (
  <View style={styles.component}>
    <ScrollView>
      <Text style={styles.headingtext}>
        Name:{'\n'}
      </Text>
      <Text style={styles.bodyText}>
        John Smith{'\n'}{'\n'}
      </Text>

      <Text style={styles.headingtext}>
        Email:{'\n'}
      </Text>
      <Text style={styles.bodyText}>
        JohnSmith@hotmail.com{'\n'}{'\n'}
      </Text>

      <Text style={styles.headingtext}>
        Bio:{'\n'}
      </Text>
      <Text style={styles.bodyText}>
        I am White{'\n'}{'\n'}
      </Text>

      <Text style={styles.headingtext}>
        Age:{'\n'}
      </Text>
      <Text style={styles.bodyText}>
        69{'\n'}{'\n'}
      </Text>

      <Text style={styles.headingtext}>
        Location:{'\n'}
      </Text>
      <Text style={styles.bodyText}>
        UNKNOWN{'\n'}{'\n'}
      </Text>

      <Text style={styles.headingtext}>
        Job:{'\n'}
      </Text>
      <Text style={styles.bodyText}>
        Developer{'\n'}{'\n'}
      </Text>

      <Text style={styles.headingtext}>
        Name:{'\n'}
      </Text>
      <Text style={styles.bodyText}>
        John Smith{'\n'}{'\n'}
      </Text>

      <Text style={styles.headingtext}>
        Email:{'\n'}
      </Text>
      <Text style={styles.bodyText}>
        JohnSmith@hotmail.com{'\n'}{'\n'}
      </Text>

      <Text style={styles.headingtext}>
        Bio:{'\n'}
      </Text>
      <Text style={styles.bodyText}>
        I am White{'\n'}{'\n'}
      </Text>

      <Text style={styles.headingtext}>
        Age:{'\n'}
      </Text>
      <Text style={styles.bodyText}>
        69{'\n'}{'\n'}
      </Text>

      <Text style={styles.headingtext}>
        Location:{'\n'}
      </Text>
      <Text style={styles.bodyText}>
        UNKNOWN{'\n'}{'\n'}
      </Text>

      <Text style={styles.headingtext}>
        Job:{'\n'}
      </Text>
      <Text style={styles.bodyText}>
        Developer{'\n'}{'\n'}
      </Text>
    </ScrollView>
  </View>
)
