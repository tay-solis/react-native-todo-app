import React, {Component} from 'react'
import {View, Text} from 'react-native'
import SignUp from './SignUp'
import Login from './Login'

class Auth extends Component{
  state={
    showLogin: false
  }

  toggleLogin =()=>{
    let showLogin = this.state.showLogin;
    showLogin = !showLogin;
    this.setState({
      showLogin
    })
  }
  render(){
    return(
      <View
      style={
        {
          flex:1,
          
        }
      }>
      <Text>Get in the Grind</Text>
        {this.state.showLogin &&
          <Login newJWT={this.props.newJWT} toggleLogin={this.toggleLogin}/>
        }
        {!this.state.showLogin &&
          <SignUp newJWT={this.props.newJWT} toggleLogin={this.toggleLogin}/>
        }
          
          
      </View> 
    );
  }
}
export default Auth;