import React, {Component} from 'react';
import {View} from 'react-native'
import { Appbar, DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import AppContainer from './AppContainer';
import Auth from './src/components/accounts-components/Auth'
import deviceStorage from './src/services/deviceStorage'

const defaultTheme = {
  ...DefaultTheme,
  roundness: 4,
  colors: {
    ...DefaultTheme.colors,
    primary: '#F6D258',
    accent: '#424242',
  }
};

export default class Main extends Component {
  constructor() {
    super();
    this.state = {
      jwt: '',
      currentUser: {},
      loading: true
    }
    
    this.newJWT = this.newJWT.bind(this);
    this.deleteJWT = deviceStorage.deleteJWT.bind(this);
    this.loadJWT = deviceStorage.loadJWT.bind(this);
    this.loadJWT();
  }

  newJWT(jwt, user){
      this.setState({
      jwt: jwt,
      currentUser: user
    })
  } 
  
  render(){
    return (
    <PaperProvider theme={defaultTheme}>
      
      <Appbar.Header height={0}>
      </Appbar.Header>

      {this.state.jwt === '' &&
      <View style={{flex:1}}>
      <Auth newJWT={this.newJWT}/>
      </View>
      }

      {this.state.jwt !== '' &&
      <AppContainer currentUser={this.state.currentUser} deleteJWT={this.deleteJWT}/>
      }
    </PaperProvider>
  );
}
}
