import React, {Component} from 'react';
import {StyleSheet, Text, View, Modal} from 'react-native';
import {Button} from 'react-native-paper';
import {rootUrl} from '../../config/constants'
import axios from 'axios'


import Todos from './Todos'
import TodoModal from '../modals/TodoModal'
import ProgressModal from '../modals/ProgressModal'
import BubbleModal from '../modals/BubbleModal'
import AddTodoForm from '../forms/AddTodoForm'
import AddProgressForm from '../forms/AddProgressForm'
import AddBubbleForm from '../forms/AddBubbleForm'

export default class TodoContainer extends Component {
  /*
    Todo Object Properties include:
    key: NEEDS UNIQUE KEY GENERATOR
    name: String
    type: 'checkbox' || 'progress' || 'bubble'
    soFar: progress on goal so far, Integer
    completed: progress needed to complete goal, Integer
    isCompleted: Boolean
    dateSubmitted: Date object, in ms
    datesContributed: [Array of Date objects, in ms]
    updates: [Array of Objects containing dates and "soFar" values]
    dateCompleted: Date object, in ms
  */ 
   
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

  updateGraphs = (todos) =>{
    return this.props.updateGraphs(todos);
  }

  updateProgress = (key, updatedProgress) =>{
    let todo = null;
    let todoIndex = null;
    let todos = this.state.todos;
    for(let i = 0; i < todos.length; i++){
      if (todos[i]._id === key) {
        todo = todos[i]
        todoIndex = i;
        todo.soFar = updatedProgress;
    };
    }
    if(todo === null) return;   
    axios({
      method: 'PUT',
      url: `${rootUrl}/task/update/${key}`,
      data: {
        id: todo._id,
        soFar: todo.soFar,
        dateUpdated: parseInt(Date.now(), 10)
      }
    })
    .then((res)=>{
      todos[todoIndex] = res.data;
      this.setState({
        todos,
        todosList: <Todos
          todos={todos}
          updateProgress={this.updateProgress}
          onDetailsPress={this.onDetailsPress}
          onProgressDetailsPress={this.onProgressDetailsPress}
          onBubbleDetailsPress={this.onBubbleDetailsPress}
          onDeletePress={this.onDeletePress}
          />,
        selectedTodo: null,
        selectedProgress: null,
        selectedBubble: null,
        todoFormOpen: false,
        progressFormOpen: false,
        bubbleFormOpen: false,
        addModalOpen: false
      });
      this.updateGraphs(todos);
    });

  }
  
  todoSubmitHandler = (newTodo) =>{
    axios({
      method: 'POST',
      url: `${rootUrl}/task/create`,
      data:{
        user: this.props.currentUser.username,
        task: newTodo
      }
    })
    .then((res)=>{
      let todos = this.state.todos;
      todos.push(res.data);
      this.setState({
        todos,
        todosList: <Todos
          todos={todos}
          updateProgress={this.updateProgress}
          onDetailsPress={this.onDetailsPress}
          onProgressDetailsPress={this.onProgressDetailsPress}
          onBubbleDetailsPress={this.onBubbleDetailsPress}
          onDeletePress={this.onDeletePress}
          />,
        todoFormOpen: false,
        progressFormOpen: false,
        bubbleFormOpen: false
      });
      this.updateGraphs(todos);
    });
  }

  onDetailsPress = (key) =>{
    let selectedTodo = null;
    for(let i = 0; i < this.state.todos.length; i++){
      if (this.state.todos[i]._id === key) selectedTodo = this.state.todos[i];
    }
    this.setState({
      selectedTodo
    })
  }

  onProgressDetailsPress = (key) =>{
    let selectedProgress = null;
    for(let i = 0; i < this.state.todos.length; i++){
      if (this.state.todos[i]._id === key) selectedProgress = this.state.todos[i];
    }
    this.setState({
      selectedProgress
    })
  }

  onBubbleDetailsPress = (key) =>{
  let selectedBubble = null;
  for(let i = 0; i < this.state.todos.length; i++){
    if (this.state.todos[i]._id === key) selectedBubble = this.state.todos[i];
  }
  this.setState({
    selectedBubble
  })
  }

  onDeletePress = (key) =>{
    axios.delete(`${rootUrl}/task/delete/${this.props.currentUser.username}/${key}`)
    .then((res)=>{
      let todos = res.data;

      todos = todos.filter(todo => todo._id !== key);
      this.setState({
      selectedTodo: null,
      selectedProgress: null,
      selectedBubble: null,
      todos,
      todosList: <Todos
      todos={todos}
      updateProgress={this.updateProgress}
      onDetailsPress={this.onDetailsPress}
      onProgressDetailsPress={this.onProgressDetailsPress}
      onBubbleDetailsPress={this.onBubbleDetailsPress}
      onDeletePress={this.onDeletePress}
      />
      
      })
      this.updateGraphs(todos);
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

  componentDidMount(){
  axios.get(`${rootUrl}/task/by/${this.props.currentUser.username}`)
    .then((res)=>{
      let todos =[];
      for(let i = 0; i < res.data.length; i++){
        todos.push(res.data[i])
      }
      let todosList = <Todos
      todos={todos}
      updateProgress={this.updateProgress}
      onDetailsPress={this.onDetailsPress}
      onProgressDetailsPress={this.onProgressDetailsPress}
      onBubbleDetailsPress={this.onBubbleDetailsPress}
      onDeletePress={this.onDeletePress}
      />
      this.setState({
        todos,
        todosList
      });
      this.updateGraphs(todos);
    });
  }

  render() {
  return (
    <View
    style={styles.container}
    >
    {this.state.selectedTodo &&
      <TodoModal
      selectedTodo={this.state.selectedTodo}
      updateProgress={this.updateProgress}
      onDeletePress={this.onDeletePress}
      onModalClose={this.onModalClose}
      />
    }

    {this.state.selectedProgress &&
      <ProgressModal
      selectedProgress={this.state.selectedProgress}
      onDeletePress={this.onDeletePress}
      onProgressModalClose={this.onProgressModalClose}
      updateProgress={this.updateProgress}
      />
    }

    {this.state.selectedBubble &&
      <BubbleModal
      selectedBubble={this.state.selectedBubble}
      onDeletePress={this.onDeletePress}
      onBubbleModalClose={this.onBubbleModalClose}
      updateProgress={this.updateProgress}
      />
    }

    <Button
    mode="contained"
    icon="add"
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
        style={styles.formBtn} 
        style={styles.formBtn}
        mode="contained"
        icon="check"
        onPress={()=>this.setState({todoFormOpen:true, addModalOpen: false})}>
        Add a Regular Todo
      </Button>
      <Button
        style={styles.formBtn}
        mode="contained" 
        icon="show-chart"
        onPress={()=>this.setState({progressFormOpen:true, addModalOpen: false})}>
        Add a Progress Bar
      </Button>
      <Button
        style={styles.formBtn}
        mode="contained" 
        icon="radio-button-checked"
        onPress={()=>this.setState({bubbleFormOpen:true, addModalOpen: false})}>
        Add a Bubble Bar
      </Button>
      <Button
        style={styles.button}
        mode='text'
        color='#bdbdbd'
        onPress={(()=>this.setState({addModalOpen: false}))}
  
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
      progressSubmitHandler={this.todoSubmitHandler}
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
      bubbleSubmitHandler={this.todoSubmitHandler}
      closeBubbleForm = {()=>this.setState({bubbleFormOpen:false})}
    />
    }

    
    {this.state.todosList}

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
  },
  formBtn:{
  margin: 10, 
  width: '100%'
  }
});
