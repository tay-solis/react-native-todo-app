import React, {Component} from 'react'
import {View, StyleSheet, Modal,} from 'react-native'
import { TextInput,  Button, } from 'react-native-paper';

class AddTodoForm extends Component {
  state = {
    todoName: '',
  }

  todoNameChangedHandler = (val) =>{
    this.setState({
      todoName: val,
    });
  }

  todoSubmitHandler = ()=>{
    let dateSubmitted = Date.now();
    let name = this.state.todoName
    if(this.state.todoName.trim() === '') return;
    let newTodo = {
      key: dateSubmitted,
      name,
      type: 'checkbox',
      dateSubmitted
    }
    this.setState({
      todoName: ''
    })
    return this.props.todoSubmitHandler(newTodo)
  }

  render(){
    return(
      <Modal
        animationType="fade">
        <View style={styles.form}>
          <View style={styles.inputsContainer}>
          <TextInput
            mode='outlined'
            style={styles.inputs}
            value={this.state.todoName}
            onChangeText = {this.todoNameChangedHandler}
            onSubmitEditing = {this.todoSubmitHandler}
            label="What do you need to get done?"
          />
          <Button
          style={styles.button}
            mode='text'
            onPress={this.todoSubmitHandler}
            color='#be95ff'>Add</Button>
          </View>
          <Button
          style={styles.button}
            mode='text'
            onPress={this.props.closeTodoForm}
            color='#dfd8e9'
          >Nevermind</Button>
        </View>


      </Modal>

    );
  }
}

const styles = StyleSheet.create({
  form:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  inputsContainer:{
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',

  },
  inputs:{
    width: '70%',
    height: 60
  },
  button:{
  }
})

export default AddTodoForm
