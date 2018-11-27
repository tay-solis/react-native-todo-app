import React, {Component} from 'react';
import {createAppContainer} from 'react-navigation';
import {BottomNavigation, Text} from 'react-native-paper';

import {MaterialCommunityIcons} from '@expo/vector-icons';
import { withTheme } from 'react-native-paper';

import TodoContainer from './src/components/TodoContainer'
import Profile from './src/components/Profile'



export default class AppContainer extends Component {
  state = {
    index: 0,
    routes: [
      {
        key: 'dashboard',
        title: 'Dashboard',
        icon: 'view-day',
      }, {
        key: 'profile',
        title: 'Profile',
        icon: 'account-circle',
      }
    ]
  };

  _handleIndexChange = index => this.setState({index});

  _renderScene = BottomNavigation.SceneMap({
    dashboard: TodoContainer,
    profile: Profile});

  render() {
    return (<BottomNavigation
      navigationState={this.state}
      onIndexChange={this._handleIndexChange} renderScene={this._renderScene}/>);
  }
}
