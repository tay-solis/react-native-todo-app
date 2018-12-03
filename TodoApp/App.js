import React, {Component} from 'react';
import {View} from 'react-native'
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import AppContainer from './AppContainer';
import Auth from './src/components/accounts-components/Auth'
import deviceStorage from './src/services/deviceStorage'

const defaultTheme = {
  ...DefaultTheme,
  roundness: 4,
  colors: {
    ...DefaultTheme.colors,
    primary: '#F7E012',
    accent: '#424242',
  }
};

export default class Main extends Component {
  constructor() {
    super();
    this.state = {
      jwt: '',
      loading: true
    }
    
    this.newJWT = this.newJWT.bind(this);
    this.deleteJWT = deviceStorage.deleteJWT.bind(this);
    this.loadJWT = deviceStorage.loadJWT.bind(this);
    this.loadJWT();
  }

  newJWT(jwt){
    this.setState({
      jwt: jwt
    });
  } 
  
  render(){
    return (
    <PaperProvider theme={defaultTheme}>
      {this.state.jwt === '' &&
      <View style={{flex:1}}>
      <Auth newJWT={this.newJWT}/>
      </View>
        
      }    
      {this.state.jwt !== '' &&
        <AppContainer deleteJWT={this.deleteJWT}/>
      }
    </PaperProvider>
  );
}
}
