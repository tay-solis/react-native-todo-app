/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import { Button, } from 'react-native-paper';

import Todos from './Todos'
import TodoModal from './modals/TodoModal'
import AddTodoForm from './AddTodoForm'
import AddProgressForm from './AddProgressForm'

export default class TodoContainer extends Component {

  state = {
    todos: [],
    progresses: [],
    selectedTodo: null,
    todoFormOpen: false,
    progressFormOpen: false,
  }


  todoSubmitHandler = (newTodo) =>{
    let todos = this.state.todos;
    todos.push(newTodo);
    this.setState({
        todos,
        todoFormOpen: false
    });

  }
  progressSubmitHandler = (newProgress) =>{
    let progresses = this.state.progresses;
    progresses.push(newProgress);
    this.setState({
        progresses,
        progressFormOpen: false
    });
    console.log(progresses)
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

        <Button 
          icon="add"
          onPress={()=>this.setState({todoFormOpen:true})}>
          Add a Regular Todo
        </Button>
        <Button 
          icon="show-chart"
          onPress={()=>this.setState({progressFormOpen:true})}>
          Add a Progress Bar
        </Button>

      {this.state.todos.length === 0 &&
        <Text style={styles.welcome}>Nothing to do yet!</Text>
      }

      {this.state.progressFormOpen &&
        <AddProgressForm 
          closeProgressForm={()=>this.setState({progressFormOpen:false})}
          progressSubmitHandler={this.progressSubmitHandler}
        />
      }

      {this.state.todoFormOpen &&
        <AddTodoForm
          todoSubmitHandler={this.todoSubmitHandler}
          closeTodoForm = {()=>this.setState({todoFormOpen:false})}
        />
      }

        
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
    paddingTop: 30
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});
