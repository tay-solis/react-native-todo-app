import React, {Component} from 'react'
import {StyleSheet, TouchableOpacity} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';


class TodoDelete extends Component{
  onDeletePress = () =>{
      return this.props.onDeletePress(this.props.todoKey)
  }

  render(){
    return(
      <TouchableOpacity
          onPress={this.onDeletePress}
          style={styles.touchable}
      >
        <MaterialIcons name="close" size={20} color='#333' />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  touchable:{
    height: 50, 
    width: 50,
    justifyContent: 'center',
    alignItems: 'center'}
})


export default TodoDelete
