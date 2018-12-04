import React, {Component} from 'react';
import { Appbar, DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import AppContainer from './AppContainer';
import Home from './src/components/Home'
import deviceStorage from './src/services/deviceStorage'

const defaultTheme = {
  ...DefaultTheme,
  fonts: {
    regular: 'Open Sans',
    medium: 'Open Sans',
    light: 'Open Sans Light',
    thin: 'Open Sans Thin',
  },
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
      loading: true,
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
        <Home newJWT={this.newJWT}/>
      }

      {this.state.jwt !== '' &&
      <AppContainer currentUser={this.state.currentUser} deleteJWT={this.deleteJWT}/>
      }
    </PaperProvider>
  );
}
}
