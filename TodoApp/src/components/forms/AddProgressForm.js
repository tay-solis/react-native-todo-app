import React, {Component} from 'react'
import {StyleSheet, View, Modal} from 'react-native'
import {TextInput, Button} from 'react-native-paper'


class AddProgressForm extends Component {
  state = {
    progressName: '',
    progressAmount: ''
  }

  progressNameChangedHandler = (val) =>{
    this.setState({
      progressName: val,
    });
  }
  progressAmountChangedHandler = (val) =>{
    this.setState({
      progressAmount: val,
    });
  }

  progressSubmitHandler = ()=>{
    let dateSubmitted = parseInt(Date.now(), 10);
    let name = this.state.progressName;
    let completed = this.state.progressAmount;
    if(this.state.progressName.trim() === '') return;
    let newProgress = {
      key: dateSubmitted,
      name,
      completed,
      soFar: 0,
      type: 'progress',
      dateSubmitted,
      updates: [{
        soFar: 0,
        dateUpdated: dateSubmitted
      }]
    }
    this.setState({
      progressName: '',
      progressAmount: ''
    })
    return this.props.progressSubmitHandler(newProgress)
  }
  render(){
      return(
          <Modal animationType="fade">
              <View style={styles.form}>
              <TextInput
                  style={styles.inputs}
                  mode='outlined'
                  label='What do you need to get done?'
                  placeholder='Pages, words, $$, etc.'
                  onChangeText = {this.progressNameChangedHandler}
              />
              <View style={styles.bottomRow}>
                  <TextInput 
                      mode='outlined'
                      style={styles.inputs}
                      label="How many?"
                      keyboardType='numeric'
                      onChangeText = {this.progressAmountChangedHandler}
                      />
                  <Button
                      mode='contained'
                      color='#F6D258'
                      onPress={this.progressSubmitHandler}
                      >Add</Button>
              </View>
              
              <Button
                  onPress={this.props.closeProgressForm}
                  mode='text'
                  color='#bdbdbd'
              >Nevermind</Button>
              </View>
          </Modal>
      )
  }
}

const styles = StyleSheet.create({
    form:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center'
      },
    inputs:{
        width:'70%'
      },
    bottomRow:{
        flexDirection: 'row',
        width: '70%',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    
})

export default AddProgressForm