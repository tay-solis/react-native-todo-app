/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, Text, View, TextInput, Button} from 'react-native';

import Todo from './src/components/Todo'

export default class App extends Component {
  state = {
    todoName: '',
    todos: [],
  }

  todoNameChangedHandler = (val) =>{
    this.setState({
      todoName: val,
    });
  } 

  todoSubmitHandler = () =>{
    if(this.state.todoName.trim() === '') return;
    this.setState((prevState) =>{
      return {todos: prevState.todos.concat(prevState.todoName)};
    })
  }
  render() {
    const todoOutput = this.state.todos.map((todo, i)=> <Todo todoName={todo} key={i}/>)
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>What do you need to get done?</Text>
        <View style={styles.inputsContainer}>
        <TextInput
          style={styles.inputs}
          value={this.state.todoName}
          onChangeText = {this.todoNameChangedHandler}
          placeholder = "Make a to-do list"
        />
        <Button
          title="Add"
          style={styles.button}
          onPress={this.todoSubmitHandler}
        />
        </View> 
        <View>
          {todoOutput}
        </View>    
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#FFF',
    paddingTop: 30
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  inputsContainer:{
    // flex: 1,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',

  },
  inputs:{
    width: '70%',
    height: 40,
    borderColor: '#AAA',
    borderWidth: 1,
    padding: 10,
  },
  button: {
    width: 40,
  }
});
