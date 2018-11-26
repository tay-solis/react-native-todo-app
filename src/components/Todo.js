import React, {Component} from 'react'
import {StyleSheet, View, Text} from 'react-native';



const Todo = (props) => {
		return(
			<View style={styles.todo}>
				<Text > 
					{props.todoName}
				</Text>
			</View>
			
    );
    
}


const styles = StyleSheet.create({
	todo:{
		width: '100%',
		padding: 10,
		fontSize: 16,
		backgroundColor: '#eee',
	}
})
export default Todo