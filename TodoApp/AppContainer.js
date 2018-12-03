import React, {Component} from 'react';
import {BottomNavigation} from 'react-native-paper';

import TodoContainer from './src/components/todo-components/TodoContainer'
import Profile from './src/components/profile-components/Profile'
import UpcomingContainer from './src/components/Metrics/UpcomingContainer'
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
        key: 'upcoming',
        title: 'Upcoming',
        icon: 'today'
      },
      {
        key: 'metrics',
        title: 'Metrics',
        icon: 'timeline'
      },
      {
        key: 'profile',
        title: 'Profile',
        icon: 'account-circle',
      },
      
    ]
  };

  _handleIndexChange = index => this.setState({index});

  // _renderScene = BottomNavigation.SceneMap({
  //   dashboard: TodoContainer,
  //   upcoming: UpcomingContainer,
  //   metrics: MetricsContainer,
  //   profile: Profile});

  _renderScene = ({route}) => {
    switch (route.key) {
      case 'dashboard':
        return <TodoContainer/>;
      case 'upcoming':
        return <UpcomingContainer/>;
      case 'metrics':
        return <MetricsContainer/>;
      case 'profile':
        return <Profile currentUser={this.props.currentUser} deleteJWT={this.props.deleteJWT}/>;
    }
  }

  render() {
    return (<BottomNavigation
      navigationState={this.state}
      onIndexChange={this._handleIndexChange} 
      renderScene={this._renderScene}/>);
  }
}
