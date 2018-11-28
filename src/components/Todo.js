import React, {Component} from 'react'
import {StyleSheet, View, Text, TouchableOpacity, Button} from 'react-native';

class Todo extends Component{
    render(){
        return(
            <View style={styles.todo}>
                <View style={{flexDirection: 'row', alignItems:'center', width:'60%'}}>

                    <Text style={styles.todoText}>
                        {this.props.name}
                    </Text>
                </View>

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
