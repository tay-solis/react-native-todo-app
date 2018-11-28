/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, Text, View, Modal} from 'react-native';
import {Button} from 'react-native-paper';

import Todos from './Todos'
import TodoModal from './modals/TodoModal'
import ProgressModal from './modals/ProgressModal'
import BubbleModal from './modals/BubbleModal'
import AddTodoForm from './AddTodoForm'
import AddProgressForm from './AddProgressForm'
import AddBubbleForm from './AddBubbleForm'

export default class TodoContainer extends Component {

  state = {
    todos: [],
    selectedTodo: null,
    selectedProgress: null,
    selectedBubble: null,
    todoFormOpen: false,
    progressFormOpen: false,
    bubbleFormOpen: false,
    addModalOpen: false
  }

  toggleCheck = (key) =>{
    let todos = this.state.todos;
    for(let i = 0; i < todos.length; i++){
      if (todos[i].key === key) {
        todos[i].completed = !todos[i].completed;
      };
    }
    this.setState({
      todos
    })
  }

  updateProgress = (key, updatedProgress) =>{
    let todos = this.state.todos;
    for(let i = 0; i < todos.length; i++){
      if (todos[i].key === key) {
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

  bubbleSubmitHandler = (newBubble) =>{
    console.log('submitted bubble')
    let todos = this.state.todos;
    todos.push(newBubble);
    this.setState({
        todos,
        bubbleFormOpen: false
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

  onBubbleDetailsPress = (key) =>{
    let selectedBubble = null;
    for(let i = 0; i < this.state.todos.length; i++){
      if (this.state.todos[i].key === key) selectedBubble = this.state.todos[i];
    }
    this.setState({
      selectedBubble
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

  onBubbleDeleteModal = (key) =>{
    this.setState(prevState =>{
      return{
        selectedBubble: null,
        todos: prevState.todos.filter((todo)=>{
          return todo.key !== prevState.selectedBubble.key;
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
  onBubbleModalClose =()=>{
    this.setState({
      selectedBubble: null
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

        {this.state.selectedBubble &&
          <BubbleModal
            selectedBubble={this.state.selectedBubble}
            onBubbleDeleteModal={this.onBubbleDeleteModal}
            onBubbleModalClose={this.onBubbleModalClose}
            updateProgress={this.updateProgress}
          />
        }

        <Button
        onPress={()=>this.setState({addModalOpen: true})}>
          What do you need to get done?
        </Button>
        {this.state.addModalOpen &&
          <Modal 
          animationType="fade" 
          presentationStyle="formSheet"
          transparent="true">
          <View style={styles.addModal}>
            <Button 
              icon="add"
              onPress={()=>this.setState({todoFormOpen:true, addModalOpen: false})}>
              Add a Regular Todo
            </Button>
            <Button 
              icon="show-chart"
              onPress={()=>this.setState({progressFormOpen:true, addModalOpen: false})}>
              Add a Progress Bar
            </Button>
            <Button 
              icon="radio-button-checked"
              onPress={()=>this.setState({bubbleFormOpen:true, addModalOpen: false})}>
              Add a Bubble Bar
            </Button>
            <Button
              style={styles.button}
              mode='text'
              onPress={(()=>this.setState({addModalOpen: false}))}
              color='#dfd8e9'
            >Nevermind</Button>
          </View>
            
          </Modal>
        }


        

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

      {this.state.bubbleFormOpen &&
        <AddBubbleForm
          bubbleSubmitHandler={this.bubbleSubmitHandler}
          closeBubbleForm = {()=>this.setState({bubbleFormOpen:false})}
        />
      }

        
        <Todos
        todos={this.state.todos}
        onDetailsPress={this.onDetailsPress}
        onProgressDetailsPress={this.onProgressDetailsPress}
        onBubbleDetailsPress={this.onBubbleDetailsPress}
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
  addModal:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF'
  }
});
