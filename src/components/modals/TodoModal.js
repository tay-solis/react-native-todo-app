import React from 'react'
import { Modal, View, Text, StyleSheet, Button } from 'react-native'

const TodoModal = (props) => (
    <Modal animationType="slide">
        <View
          style={styles.container}>
            <Text style={styles.title}>{props.selectedTodo.name}</Text>
          <Text>Created  {timeAgo(props.selectedTodo.dateSubmitted)}</Text>
          <View style={styles.buttons}>
            <Button
              title="Delete"
              color='#be95ff'
              onPress={props.onProgressDeleteModal}
              />
            <Button
              title="Close"
              color= '#be95ff'
            onPress={props.onProgressModalClose}/>
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
