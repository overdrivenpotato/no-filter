//@flow

import React, { Component } from 'react';
import { ScrollView } from 'react-native';

const styles = {
  containerStyle: {
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    marginLeft: 2,
    marginRight: 2,
    marginTop: 2,
    flex: 1
  }
}

class Card extends Component {
  componentDidMount() {
    //this.scrollView.scrollTo(0)
    //console.log(this.scrollView.scrollToEnd);
  }
  render() {
    return (
      <ScrollView style={styles.containerStyle} ref={(scrollView) => { this.scrollView = scrollView }}>
        {this.props.children}
      </ScrollView>
    )
  }
}

export default Card
