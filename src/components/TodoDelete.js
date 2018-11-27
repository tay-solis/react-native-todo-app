import React, {Component} from 'react'
import {StyleSheet,  View, Text, TouchableOpacity} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';


class TodoDelete extends Component{
  onDeletePress = () =>{
      return this.props.onDeletePress(this.props.todoKey)
  }

  render(){
    return(
      <TouchableOpacity
          onPress={this.onDeletePress}
      >
        <MaterialIcons name="close" size={20} color='#333' />
      </TouchableOpacity>
    );
  }
}


export default TodoDelete
