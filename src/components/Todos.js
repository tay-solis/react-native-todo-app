import React, {Component} from 'react'
import {StyleSheet,  FlatList, View, Text} from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import { MaterialCommunityIcons } from '@expo/vector-icons';


import Todo from './Todo'
import TodoDelete from './TodoDelete'
import TodoReadMore from './TodoReadMore'

class Todos extends Component{
  render(){
    return(
      <SwipeListView
        useFlatList
        style={styles.todos}
        data={this.props.todos}
        renderItem={ (todo) => <Todo
          todoName={todo.item.value}
          key={todo.item.key}
          dateSubmitted={todo.item.dateSubmitted}/>
        }
        renderHiddenItem={ (todo) => (
                <View style={styles.rowBack}>
                  <TodoDelete 
                    onDeletePress={this.props.onDeletePress}
                    todoKey={todo.item.dateSubmitted} />
                  <TodoReadMore
                    onDetailsPress={this.props.onDetailsPress}
                    todoKey={todo.item.dateSubmitted} />
                </View>
            )}
            leftOpenValue={40}
            rightOpenValue={-40}
      />
    );
  }
}

const styles = StyleSheet.create({
  todos: {
    width: '100%',
    marginTop: 5
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
