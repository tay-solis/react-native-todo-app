import React from 'react'
import { Modal, View, Text, StyleSheet, Button } from 'react-native'

const TodoModal = (props) => (
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
                    {this.props.name}
                </Text>
            </View>
          
          <Text>Created  {timeAgo(props.selectedTodo.dateSubmitted)}</Text>
          <View style={styles.buttons}>
            <Button
              title="Delete"
              color='#be95ff'
              onPress={props.onDeleteModal}
              />
            <Button
              title="Close"
              color= '#be95ff'
            onPress={props.onModalClose}/>
          </View>

        </View>


    </Modal>
)

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
        backgroundColor: '#eee',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingRight: 20
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
