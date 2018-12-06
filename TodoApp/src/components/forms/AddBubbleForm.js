import React, {Component} from 'react'
import {StyleSheet, View, Modal} from 'react-native'
import {TextInput, Button, HelperText} from 'react-native-paper'

class AddBubbleForm extends Component {
  state = {
    bubbleName: '',
    bubbleAmount: ''
  }

  bubbleNameChangedHandler = (val) =>{
    this.setState({
      bubbleName: val,
    });
  }
  bubbleAmountChangedHandler = (val) =>{
    if(val > 20){
      return alert('No, seriously, the max is 20!')
    } else{
      this.setState({
        bubbleAmount: val,
      });
    }  
  }

  bubbleSubmitHandler = ()=>{
    if(this.state.bubbleAmount.trim() === '') return;
    if (this.state.bubbleAmount < 1 || !Number.isInteger(Number(this.state.bubbleAmount))) return alert('Please enter a whole number! We don\'t half do anything \'round these parts!')
    let dateSubmitted = parseInt(Date.now(), 10);
    let name = this.state.bubbleName;
    let completed = this.state.bubbleAmount;
    if(completed > 20){
      return alert('No, seriously, the max is 20!')
    }
    let newBubble = {
      name,
      completed,
      soFar: 0,
      type: 'bubble',
      dateSubmitted,
      updates: [{
        soFar: 0,
        dateUpdated: dateSubmitted
      }]
    }
    this.setState({
      bubbleName: '',
      bubbleAmount: ''
    })
    return this.props.bubbleSubmitHandler(newBubble)
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
                  onChangeText = {this.bubbleNameChangedHandler}
              />
              <View style={styles.bottomRow}>
                <View style={styles.num}>
                  <TextInput 
                      mode='outlined'
                      style={styles.numberInput}
                      label="How many?"
                      keyboardType='numeric'
                      onChangeText = {this.bubbleAmountChangedHandler}
                      />
                    <HelperText
                        type="info"
                    >
                    Max. 20</HelperText>
                </View>
                  
                  <Button
                      mode='contained'
                      color='#F6D258'
                      onPress={this.bubbleSubmitHandler}
                      >Add</Button>
              </View>
              
              <Button
                  onPress={this.props.closeBubbleForm}
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
    num:{
      width: '70%'
    },
    inputs:{
        width:'70%'
      },
    numberInput:{
      width: '100%'
    },  
    bottomRow:{
        flexDirection: 'row',
        width: '70%',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    
})

export default AddBubbleForm