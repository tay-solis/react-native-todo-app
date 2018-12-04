import React, {Component} from 'react'
import { Modal, View, Text, StyleSheet} from 'react-native'
import {ProgressBar, TextInput, Button, Snackbar} from 'react-native-paper';





class ProgressModal extends Component {
	state = {
		name:'',
		dateSubmitted:0,
		added:0,
		soFar:0,
		completed:0,
		errorMessageVisible: false
	}

	updateProgress =()=>{
		let soFar = this.state.soFar;
		let updatedAmount = soFar + parseInt(this.state.added, 10);
		if(updatedAmount  > this.state.completed) {
			alert('We know you kick ass, but you can\'t go over 100%!')
		} else {
			this.setState({
				soFar: updatedAmount
			})
			return this.props.updateProgress(this.props.selectedProgress._id, updatedAmount)
		}
		
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

	progressAmountChangedHandler = (val) =>{
    this.setState({
      added: val,
    });
  }

	
	componentDidMount(){
		this.setState({
			name: this.props.name,
			dateSubmitted: this.props.selectedProgress.dateSubmitted,
			soFar: this.props.selectedProgress.soFar,
			completed: this.props.selectedProgress.completed
		})
	}

	render(){
		let percent = this.state.soFar / this.state.completed;

		return(
    <Modal animationType="slide">
        <View
          style={styles.container}>
            <Text style={styles.title}>{this.props.selectedProgress.name}</Text>
          <Text>Created  {this.timeAgo(this.props.selectedProgress.dateSubmitted)}</Text>
          <Text>Progress so far: {`${Math.floor(percent * 100)}%`}</Text>
          <ProgressBar style={{width: '100%', backgroundColor: '#FFF'}}progress={percent} color='#000'/>
					{percent > 1 &&
					<Text>Congratulations! You've finished this project!</Text>
					}
					{percent < 1 &&
						<View style={styles.bottomRow}>
            <TextInput 
                mode='outlined'
                style={styles.inputs}
                label="How much did you do?"
                keyboardType='numeric'
                onChangeText = {this.progressAmountChangedHandler}
                />
            <Button
                mode='contained'
                color='#F6D258'
                onPress={this.updateProgress}
                >Add</Button>
          </View>
					}
          
					<View style={styles.buttons}>
            <Button
              color='#F6D258'
              onPress={this.props.onProgressDeleteModal}
              >
						Delete</Button>
            <Button
              title="Close"
              color= '#be95ff'
            	onPress={this.props.onProgressModalClose}>
						Close</Button>
          </View>
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

export default ProgressModal