import React, {Component} from 'react'
import {TouchableOpacity, StyleSheet, Text} from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';


class TodoReadMore extends Component{
  onDetailsPress =()=>{
      return this.props.onDetailsPress(this.props.todoKey)
  }
  render(){
    return(
      <TouchableOpacity
          onPress={this.onDetailsPress}
      >
        <MaterialIcons name="more-horiz" size={20} color='#333' />
      </TouchableOpacity>

    )
  }
}

const styles = StyleSheet.create({
  readMore: {
    color: '#be95ff',
    fontSize: 16
  }
})

export default TodoReadMore
