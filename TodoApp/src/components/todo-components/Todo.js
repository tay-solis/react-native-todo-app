import React, {Component} from 'react'
import {StyleSheet, View, Text} from 'react-native';
import {Button} from 'react-native-paper'
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';


class Todo extends Component{
    state ={
        name:'',
        isCompleted: false, 
        dateSubmitted:0
    }

    componentDidMount(){
        this.setState({
            name: this.props.name,
            isCompleted  :this.props.isCompleted  ,
            dateSubmitted:this.props.dateSubmitted
        })
    }

    toggleCheck =()=>{
        let isCompleted   = this.state.isCompleted  ;
        isCompleted   = !isCompleted  ;
        this.setState({
            isCompleted  
        })
        this.props.toggleCheck(this.props._id)
    }

    render(){
        return(
            <View style={styles.todo}>
                <Button
                onPress={this.toggleCheck}
                >
                    {!this.state.isCompleted   &&
                        <MaterialIcons name="check-box-outline-blank" size={24} color='#333' />
                    }
                    {this.state.isCompleted   && 
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
        paddingRight: 20, 
        height:75
    },
    details:{
        marginRight: 20
    },
    todoText:{
      fontSize: 20,

    }
})
export default Todo
