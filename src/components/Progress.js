import React, {Component} from 'react'
import {View, Text, StyleSheet} from 'react-native'
import {ProgressBar} from 'react-native-paper';

class Progress extends Component{
    state ={
        name: '',
        progressPercent: 0,
        soFar: 0,
        completed: 0,
        dateSubmitted: 0,
        
    }
    render(){
        let percent = this.props.soFar / this.props.completed;
        console.log(percent)
        return(
            <View style={styles.todo}>
                <Text style={styles.todoText}>{this.props.name}</Text>
                <Text>Progress so far: {`${Math.floor(percent * 100)}%`}</Text>
                <ProgressBar style={{width: '100%', backgroundColor: '#FFF'}}progress={percent} color='#000'/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    todo:{
		width: '100%',
		padding: 10,
        backgroundColor: '#eee',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        paddingRight: 20
    },
    todoText:{
      fontSize: 20,

    }
})
export default Progress