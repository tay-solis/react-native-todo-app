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
import ProgressModal from './modals/ProgressModal'
import AddTodoForm from './AddTodoForm'
import AddProgressForm from './AddProgressForm'

export default class TodoContainer extends Component {

  state = {
    todos: [],
    selectedTodo: null,
    selectedProgress: null,
    todoFormOpen: false,
    progressFormOpen: false,
  }

  updateProgress = (key, updatedProgress) =>{
    let todos = this.state.todos;
    for(let i = 0; i < todos.length; i++){
      if (todos[i].key === key) {
        console.log(`found. updated${todos[i].soFar} to ${updatedProgress}`)
        todos[i].soFar = updatedProgress
      };
    }
    console.log(todos)
    this.setState({
      selectedProgress: null,
      todos
    })
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
    let todos = this.state.todos;
    todos.push(newProgress);
    this.setState({
        todos,
        progressFormOpen: false
    });
    console.log(todos)
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

  onProgressDetailsPress = (key) =>{
    let selectedProgress = null;
    for(let i = 0; i < this.state.todos.length; i++){
      if (this.state.todos[i].key === key) selectedProgress = this.state.todos[i];
    }
    this.setState({
      selectedProgress
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

  onProgressDeleteModal = (key) =>{
    this.setState(prevState =>{
      return{
        selectedProgress: null,
        todos: prevState.todos.filter((todo)=>{
          return todo.key !== prevState.selectedProgress.key;
        })}
    })
  }

  onModalClose =()=>{
    this.setState({
      selectedTodo: null
    })
  }

  onProgressModalClose =()=>{
    this.setState({
      selectedProgress: null
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

        {this.state.selectedProgress &&
          <ProgressModal
            selectedProgress={this.state.selectedProgress}
            onProgressDeleteModal={this.onProgressDeleteModal}
            onProgressModalClose={this.onProgressModalClose}
            updateProgress={this.updateProgress}
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
        onProgressDetailsPress={this.onProgressDetailsPress}
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
