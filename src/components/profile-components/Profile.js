import React, {Component} from 'react'
import {StyleSheet, View, Text, Image} from 'react-native'

class Profile extends Component{
  static navigationOptions = {
    title: 'Profile',
  };
  render(){
    return(
      <View style={styles.profile}>
        <View style={styles.user}>
          {/* <Image
            source={require('../../assets/artificial-intelligence.png')}
            style={styles.profileImage}
            /> */}
          <Text style={styles.userGreeting}>Hello!</Text>
        </View>
        <View style={styles.profileInfo}>
          <Text>Hello again!</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  profile:{
    flex: 1,
    padding: 30,
    justifyContent: 'center',
  },
  user:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  userGreeting:{
    fontSize: 24,
  },
  profileImage:{
    width: 75,
    height: 75
  },
  profileInfo:{
    flex: 3
  }

})

export default Profile;
