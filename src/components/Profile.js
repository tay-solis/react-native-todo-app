import React, {Component} from 'react'
import {StyleSheet, View, Text} from 'react-native'

class Profile extends Component{
  static navigationOptions = {
    title: 'Profile',
  };
  render(){
    return(
      <View>
        <Text>Hello!</Text>
      </View>
    )
  }
}

export default Profile;
