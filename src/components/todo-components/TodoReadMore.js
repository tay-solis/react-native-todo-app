import React, {Component} from 'react'
import {TouchableOpacity, StyleSheet, Text} from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';


class TodoReadMore extends Component{
  onDetailsPress = () =>{
      return this.props.onDetailsPress(this.props.todoKey)
  }
  render(){
    return(
      <TouchableOpacity
          onPress={this.onDetailsPress}
          style={styles.touchable}
      >
        <MaterialIcons name="more-horiz" size={20} color='#333' />
      </TouchableOpacity>

    )
  }
}

const styles = StyleSheet.create({
    touchable:{
      height: 50, 
      width: 50,
      justifyContent: 'center',
      alignItems: 'center'}
})

export default TodoReadMore
