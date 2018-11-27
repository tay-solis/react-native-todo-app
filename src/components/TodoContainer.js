/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, Text, View, TextInput, Button, FlatList, Image} from 'react-native';

import Todo from './Todo'
import Todos from './Todos'
import TodoModal from './modals/TodoModal'

class LogoTitle extends React.Component {
  render() {
    return (
      <Image
      style={
        {width: 51,
        height: 51}
      }
      source={require('../assets/artificial-intelligence.png')}
      />
    );
  }
}

export default class TodoContainer extends Component {
  static navigationOptions = {
    headerTitle: <LogoTitle />,
  };;

  state = {
    todoName: '',
    todos: [],
    selectedTodo: null
  }

  todoNameChangedHandler = (val) =>{
    this.setState({
      todoName: val,
    });
  }


  todoSubmitHandler = () =>{
    let dateSubmitted = Date.now();
    if(this.state.todoName.trim() === '') return;
    let newTodo = {
      key: dateSubmitted,
      value: this.state.todoName,
      dateSubmitted
    }
    let todos = this.state.todos;
    todos.push(newTodo);
    this.setState({
        todos,
        todoName: ''
    });

  }

  onDetailsPress = (key) =>{
    let selectedTodo = null;
    for(let i = 0; i < this.state.todos.length; i++){
      if (this.state.todos[i].key === key) selectedTodo = this.state.todos[i];
    }
    this.setState({
      selectedTodo
    })
  }


  onDeletePress = (key) =>{
    this.setState(prevState =>{
      return{
        todos: prevState.todos.filter((todo)=>{
          return todo.key !== key;
        })}
    })
  }

  onDeleteModal = (key) =>{
    this.setState(prevState =>{
      return{
        selectedTodo: null,
        todos: prevState.todos.filter((todo)=>{
          return todo.key !== prevState.selectedTodo.key;
        })}
    })
  }

  onModalClose =()=>{
    this.setState({
      selectedTodo: null
    })
  }

  render() {
    return (
      <View
      style={styles.container}
      >
        {this.state.selectedTodo &&
          <TodoModal
            selectedTodo={this.state.selectedTodo}
            onDeleteModal={this.onDeleteModal}
            onModalClose={this.onModalClose}
          />
        }
        {/* <Button
          title="My Profile"
          color='#be95ff'
          onPress={() => this.props.navigation.navigate('Profile')}
        /> */}

        <Text style={styles.welcome}>What do you need to get done?</Text>
        <View style={styles.inputsContainer}>
        <TextInput
          style={styles.inputs}
          value={this.state.todoName}
          onChangeText = {this.todoNameChangedHandler}
          onSubmitEditing = {this.todoSubmitHandler}
          placeholder = "Make a to-do list"
        />
        <Button
          title="Add"
          style={styles.button}
          onPress={this.todoSubmitHandler}
          color='#be95ff'
        />
        </View>
        <Todos
        todos={this.state.todos}
        onDetailsPress={this.onDetailsPress}
        onDeletePress={this.onDeletePress}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
      flex:1,
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
});
