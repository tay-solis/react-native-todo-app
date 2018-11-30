import React, {Component} from 'react'
import {View, Text, StyleSheet} from 'react-native'

class MetricsContainer extends Component{
    render(){
        return(
            <View style={styles.container}>
                <Text style={styles.title}>My Metrics</Text>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container:{
      flex:1,
      justifyContent: 'flex-start',
      alignItems: 'center',
      paddingTop: 30
    },
    title: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
      },
});

export default MetricsContainer;