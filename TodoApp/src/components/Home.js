import React, {Component} from 'react'
import {View, Text, StyleSheet, Image} from 'react-native'
import {Button} from 'react-native-paper'
import Auth from './accounts-components/Auth'
import { Font } from 'expo';


class Home extends Component{
  state = {
  showAuth: false,
  fontLoaded: false,
  }

  componentDidMount() {
    Font.loadAsync({
      'Gruppo': require('../assets/Gruppo-Regular.ttf'),
    });
  }

  render(){
  return(
    <View style={styles.homescreen}>
    <Image
          style={{width: 150, height: 150, margin: 20}}
          source={require('../assets/bee-fill.png')}
        />
    <Text style={styles.tagline}>ART || WORK</Text>
    <Button
        mode='text'
        mode = 'contained'
        onPress={()=>{this.setState({showAuth: true})}}
        color='#000'
      >Ready to get to work?</Button>
    {this.state.showAuth &&
      <Auth newJWT={this.props.newJWT}/>
    }
    </View>
  );
  }  
}

const styles = StyleSheet.create({
  homescreen:{
    flex:1,
    backgroundColor: '#F6D258',
    alignItems: 'center',
    justifyContent: 'center'
    },
  tagline: {
    fontSize: 40,
    fontFamily: 'Gruppo'
  }
})

export default Home;