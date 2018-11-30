import React, {Component} from 'react';
import { Modal, View, Text, StyleSheet } from 'react-native';
import {Button} from 'react-native-paper'
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

class TodoModal extends Component {
  state ={
    name:'',
    completed:false,
    dateSubmitted:0
}

componentDidMount(){
    this.setState({
        name: this.props.selectedTodo.name,
        completed:this.props.selectedTodo.completed,
        dateSubmitted:this.props.selectedTodo.dateSubmitted
    })
}

toggleCheck =()=>{
    let completed = this.state.completed;
    completed = !completed;
    this.setState({
        completed
    })
    return this.props.toggleCheck(this.state.dateSubmitted)
}

  render(){
    return(
    <Modal animationType="slide">
        <View
          style={styles.container}>
          <View style={styles.todo}>
                <Button
                onPress={this.toggleCheck}
                >
                    {!this.state.completed &&
                        <MaterialIcons name="check-box-outline-blank" size={24} color='#333' />
                    }
                    {this.state.completed && 
                        <MaterialCommunityIcons name="checkbox-marked-outline" size={24} color='#333' />

                    }
                    
                </Button>
                <Text style={styles.title}>
                    {this.state.name}
                </Text>
            </View>
          
          <Text>Created  {timeAgo(this.state.dateSubmitted)}</Text>
          <View style={styles.buttons}>
            <Button
              color='#F7E012'
              onPress={this.props.onDeleteModal}>Delete</Button>
            <Button
              color= '#be95ff'
            onPress={this.props.onModalClose}>Close</Button>
          </View>

        </View>


    </Modal>
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
  todo:{
		width: '100%',
		padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    },
  title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  buttons:{
    flexDirection: 'row'
  }
})

const timeAgo =(past) =>{
    let today = Date.now();
    let time = Math.floor((today - past) / (1000 * 60 * 60));
    if (time < 1) {
      time = Math.floor((today - past) / (1000 * 60));
      return `${time} minutes ago`;
    }
    if (time < 24) {
      return `${time} hours ago`;
    } else {
      time = Math.floor(time / 24);
      if (time === 1) {
        return `${time} day ago`;
      } else {
        return `${time} days ago`;
      }
    }
  }
export default TodoModal
