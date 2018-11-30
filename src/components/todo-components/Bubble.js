import React, {Component} from 'react'
import {View, Text, StyleSheet} from 'react-native'


class Bubble extends Component{
  
  render(){
    return(
      <View style={styles.todo}>
        <Text style={styles.todoText}>{this.props.name}</Text>
        <Text>{this.props.soFar} / {this.props.completed}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  todo:{
		width: '100%',
		padding: 10,
    backgroundColor: '#eee',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
		paddingLeft: 30, 
		height: 75
		
  },
  todoText:{
    fontSize: 20,
    marginRight: 20
  }
})
export default Bubble