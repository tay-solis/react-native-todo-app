import React, {Component} from 'react'
import {View, Modal} from 'react-native'
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
      <Modal
        animationType="slide">
        <View style={{flex:1,}}>
        {this.state.showLogin &&
          <Login newJWT={this.props.newJWT} toggleLogin={this.toggleLogin}/>
        }
        {!this.state.showLogin &&
          <SignUp newJWT={this.props.newJWT} toggleLogin={this.toggleLogin}/>
        }  
        </View>
      </Modal>
       
    );
  }
}
export default Auth;