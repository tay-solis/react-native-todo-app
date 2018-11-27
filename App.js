

import React, {Component} from 'react';
import { AppRegistry } from 'react-native';
import {Provider as PaperProvider } from 'react-native-paper';

import AppContainer from './AppContainer'

export default class App extends Component {


  render() {
    return (
      <PaperProvider>
        <AppContainer />
      </PaperProvider>
    );
  }
}
