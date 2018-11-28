import React, {Component} from 'react'
import {StyleSheet, View, Text} from 'react-native';

class Todo extends Component{
    render(){
        return(
            <View style={styles.todo}>
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
