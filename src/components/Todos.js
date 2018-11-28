import React, {Component} from 'react'
import {StyleSheet, View, } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';


import Todo from './Todo'
import Bubble from './Bubble'
import TodoDelete from './TodoDelete'
import TodoReadMore from './TodoReadMore'
import Progress from './Progress'

class Todos extends Component{
  render(){
    return(
      <SwipeListView
        useFlatList
        style={styles.todos}
        data={this.props.todos}
        renderItem={ (todo) => {
          if(todo.item.type == 'checkbox') {
            return (<Todo
            name={todo.item.name}
            key={todo.item.key}
            dateSubmitted={todo.item.dateSubmitted}
            toggleCheck = {this.props.toggleCheck}
            completed={todo.item.completed}/>)}
          if (todo.item.type == 'progress') {
            return (<Progress
            name={todo.item.name}
            key={todo.item.key}
            soFar={todo.item.soFar}
            completed={todo.item.completed}
            dateSubmitted={todo.item.dateSubmitted}/>)}
          if (todo.item.type == 'bubble') {
            return (<Bubble
            name={todo.item.name}
            key={todo.item.key}
            soFar={todo.item.soFar}
            completed={todo.item.completed}
            dateSubmitted={todo.item.dateSubmitted}/>)}}
          }
          
        renderHiddenItem={ (todo) => {
          let details = null;
          if(todo.item.type == 'checkbox') {
            details = <TodoReadMore
            onDetailsPress={this.props.onDetailsPress}
            todoKey={todo.item.dateSubmitted} />
          }
          if (todo.item.type == 'progress'){
            details = 
            <TodoReadMore
            onDetailsPress={this.props.onProgressDetailsPress}
            todoKey={todo.item.dateSubmitted} />
          }
          if (todo.item.type == 'bubble'){
            details = 
            <TodoReadMore
            onDetailsPress={this.props.onBubbleDetailsPress}
            todoKey={todo.item.dateSubmitted} />
          }
          
          return(
                <View style={styles.rowBack}>
                  <TodoDelete
                    onDeletePress={this.props.onDeletePress}
                    todoKey={todo.item.dateSubmitted} />
                  {details}
                </View>
            )}}
            leftOpenValue={40}
            rightOpenValue={-40}
      />
    );
  }
}

const styles = StyleSheet.create({
  todos: {
    width: '100%',
    marginTop: 10
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#DDD',
    flex: 1,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
})

export default Todos
