import React, {Component} from 'react';
import {BottomNavigation} from 'react-native-paper';

import TodoContainer from './src/components/todo-components/TodoContainer'
import Profile from './src/components/profile-components/Profile'
import MetricsContainer from './src/components/Metrics/MetricsContainer'



export default class AppContainer extends Component {
  state = {
    index: 0,
    routes: [
      {
        key: 'dashboard',
        title: 'Dashboard',
        icon: 'view-day',
      }, 
      {
        key: 'metrics',
        title: 'Metrics',
        icon: 'insert-chart'
      },
      {
        key: 'profile',
        title: 'Profile',
        icon: 'account-circle',
      }
    ]
  };

  _handleIndexChange = index => this.setState({index});

  _renderScene = BottomNavigation.SceneMap({
    dashboard: TodoContainer,
    metrics: MetricsContainer,
    profile: Profile});

  render() {
    return (<BottomNavigation
      navigationState={this.state}
      onIndexChange={this._handleIndexChange} renderScene={this._renderScene}/>);
  }
}
