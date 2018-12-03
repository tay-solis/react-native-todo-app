import React, {Component} from 'react'
import {StyleSheet, View, Text, Image} from 'react-native'
import {Button} from 'react-native-paper'

class Profile extends Component{
  static navigationOptions = {
    title: 'Profile',
  };
  render(){
    return(
      <View style={styles.profile}>
      {this.props.currentUser !== null &&
      <View style={styles.user}>

        <Text style={styles.userGreeting}>{this.props.currentUser.username}</Text>
        <View style={styles.profileInfo}>
        <Text>Hello again!</Text>
        </View>
       </View>
    
    }
        
        <View style={styles.settings}>
            <Button
            mode='text'
            onPress={this.props.deleteJWT}
            color='#bdbdbd'>
            Log Out
            </Button>
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
  },
  settings:{
    flex:1
  }

})

export default Profile;
