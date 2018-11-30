
import React, {Component} from 'react'
import { Modal, View, Text, StyleSheet} from 'react-native'
import {Button} from 'react-native-paper';

import BubbleBar from '../todo-components/BubbleBar'



class BubbleModal extends Component {
	state = {
		name:'',
		dateSubmitted:0,
		added:0,
		soFar:0,
		completed:0,
	  bubbles: []
	}

	updateProgress =()=>{
    let soFar = this.state.soFar;
    if(soFar == this.state. completed) return;
    let bubbles = this.state.bubbles;
    bubbles[soFar] = 'fill';

    let updatedAmount = soFar + 1;
		this.setState({
      soFar: updatedAmount,
      bubbles
    });
    
		return this.props.updateProgress(this.state.dateSubmitted, updatedAmount)
	}		


	timeAgo =(past) =>{
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

	bubbleAmountChangedHandler = (val) =>{
    this.setState({
      added: val,
    });
  }

	
	componentDidMount(){
    let bubbles = [];
    for (let i = 0; i < this.props.selectedBubble.completed; i++){
      if(i < this.props.selectedBubble.soFar){
        bubbles.push('fill')
      } else {
        bubbles.push('empty')
      }
    }
		this.setState({
			name: this.props.name,
			dateSubmitted: this.props.selectedBubble.dateSubmitted,
			soFar: this.props.selectedBubble.soFar,
      completed: this.props.selectedBubble.completed,
      bubbles
		})
	}

	render(){

		return(
    <Modal animationType="slide">
        <View
          style={styles.container}>
            <Text style={styles.title}>{this.state.name}</Text>
          <Text>Created  {this.timeAgo(this.state.dateSubmitted)}</Text>
          <Text>Bubble so far: {this.state.soFar} / {this.state.completed}</Text>
          <Button
            mode='contained'
            color='#F7E012'
            onPress={this.updateProgress}
            >+1</Button>
          
					<View style={styles.buttons}>
            <Button
              color='#F7E012'
              onPress={this.props.onBubbleDeleteModal}
              >
						Delete</Button>
            <Button
              title="Close"
              color= '#be95ff'
            	onPress={this.props.onBubbleModalClose}>
						Close</Button>
          </View>
          <BubbleBar bubbles={this.state.bubbles}/>
        </View>


    </Modal>
)
  }
}


const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 30
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  buttons:{
    flexDirection: 'row'
	},
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
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between'
	},
	snackbar:{
		position: 'absolute',
		top: 30
	}
})

export default BubbleModal