import React, {Component} from 'react'
import {StyleSheet, View, Text, TouchableOpacity, Button} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

class Todo extends Component{
    onDeletePress = () =>{
        return this.props.onDeletePress(this.props.dateSubmitted)
    }

    onDetailsPress =()=>{
        return this.props.onDetailsPress(this.props.dateSubmitted)
    }
    render(){
        return(
            <View style={styles.todo}>
                <View style={{flexDirection: 'row', alignItems:'center', width:'60%'}}>
                <TouchableOpacity
                    style={styles.delete}
                    onPress={this.onDeletePress}
                    >
                      <MaterialCommunityIcons name="close-circle" size={24} color='#333' />
                    </TouchableOpacity>
                    <Text >
                        {this.props.todoName}
                    </Text>
                </View>

                <Button
                onPress={this.onDetailsPress}
                color='#be95ff'
                title='Read More...'
                />

            </View>

        );
    }


}


const styles = StyleSheet.create({
	todo:{
		width: '100%',
		padding: 10,
		fontSize: 16,
    backgroundColor: '#eee',
    marginBottom: 5,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingRight: 20
    },
    delete: {
      justifyContent: 'center',
      alignItems: 'center',
        padding: 2,
        width: 30,
        height: 30,
        borderRadius: 10,
        fontSize: 18,
        marginLeft: 20,
        marginRight: 10,
    },
    details:{
        marginRight: 20
    }
})
export default Todo
