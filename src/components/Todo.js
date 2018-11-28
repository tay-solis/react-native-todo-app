import React, {Component} from 'react'
import {StyleSheet, View, Text} from 'react-native';
import {Button} from 'react-native-paper'
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';


class Todo extends Component{
    state ={
        name:'',
        completed:false,
        dateSubmitted:0
    }
    
    componentDidMount(){
        this.setState({
            name: this.props.name,
            completed:this.props.completed,
            dateSubmitted:this.props.dateSubmitted
        })
    }

    toggleCheck =()=>{
        let completed = this.state.completed;
        completed = !completed;
        this.setState({
            completed
        })
    }

    render(){
        return(
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
                <Text style={styles.todoText}>
                    {this.props.name}
                </Text>
            </View>

        );
    }
}


const styles = StyleSheet.create({
	todo:{
		width: '100%',
		padding: 10,
        backgroundColor: '#eee',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingRight: 20
    },
    details:{
        marginRight: 20
    },
    todoText:{
      fontSize: 20,

    }
})
export default Todo
