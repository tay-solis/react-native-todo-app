import React from "react";
import { StyleSheet, Text, ScrollView, View } from "react-native";
import LineGraph from './LineGraph'
import BarGraph from './BarGraph'


const data = [
    { x: 0, y: .2},
    { x: 1, y: .3},
    { x: 2, y: .5},
    { x: 3, y: .5},
    { x: 4, y: 1}
  ];
let barData = [
    {x: 1, y: 3, label: "F"},
    {x: 2, y: 4, label: "Th"},
    {x: 3, y: 6, label: "W"},
    {x: 4, y: 3, label: "T"},
    {x: 5, y: 7, label: "M"},
  ];
class MetricsContainer extends React.Component {
    render() {
      return (
        <ScrollView contentContainerStyle={{
            paddingTop: 40,
          }}>
            <View styles={styles.container}>
                <Text style={styles.title}>My Metrics</Text>
                <LineGraph data={data}/>
                <BarGraph data={barData}/>
            </View>         
        </ScrollView>
      );
    }
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#f5fcff",
      padding: 40,
      height: '100%'
    },
    title:{
        fontSize:20,
        textAlign:"center"
    }
  });

  export default MetricsContainer;