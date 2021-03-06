
import React, {Component} from 'react'
import { ScrollView, Modal, View, Text, StyleSheet} from 'react-native'
import {Button} from 'react-native-paper';
import LineGraph from '../Metrics/LineGraph'

import BubbleBar from '../todo-components/BubbleBar'



class BubbleModal extends Component {
	state = {
		name:'',
		dateSubmitted:0,
		added:0,
		soFar:0,
		completed:0,
    bubbles: [],
    chart: null
	}

	updateProgress =()=>{
    let soFar = this.state.soFar;
    if(soFar == this.state.completed) return;
    let bubbles = this.state.bubbles;
    bubbles[soFar] = 'fill';

    let updatedAmount = soFar + 1;
		this.setState({
      soFar: updatedAmount,
      bubbles
    });
    
		return this.props.updateProgress(this.props.selectedBubble._id, updatedAmount)
  }	
  
  onDeletePress =()=>{
    return this.props.onDeletePress(this.props.selectedBubble._id)
  }


	timeAgo =(past) =>{
    let today = parseInt(Date.now(), 10);
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
			name: this.props.selectedBubble.name,
			dateSubmitted: this.props.selectedBubble.dateSubmitted,
			soFar: this.props.selectedBubble.soFar,
      completed: this.props.selectedBubble.completed,
      bubbles
		})
	}

	render(){

		return(
    <Modal animationType="slide">
        <ScrollView>
          <View style={styles.container}>
          <Text style={styles.title}>{this.state.name}</Text>
          <Text style={styles.text}>Created  {this.timeAgo(this.state.dateSubmitted)}</Text>
          <Text style={styles.text}>Bubble so far: {this.state.soFar} / {this.state.completed}</Text>
          <Button
            mode='contained'
            color='#F6D258'
            onPress={this.updateProgress}
            >+1</Button>
          
					<View style={styles.buttons}>
            <Button
              color='#F6D258'
              onPress={this.onDeletePress}
              >
						Delete</Button>
            <Button
              title="Close"
              color= '#bdbdbd'
            	onPress={this.props.onBubbleModalClose}>
						Close</Button>
          </View>
          <BubbleBar bubbles={this.state.bubbles}/>
          <LineGraph maxY={this.props.selectedBubble.completed} data={this.props.selectedBubble.updates}/>
          </View>
            

        </ScrollView>


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
    fontSize: 24,
    textAlign: 'center',
    margin: 10,
  },
  text:{
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