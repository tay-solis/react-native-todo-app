import React from "react";
import { StyleSheet, Text, ScrollView, View } from "react-native";
import axios from 'axios';
import {rootUrl} from '../../config/constants'
import BarGraph from './BarGraph'

//  One Week in milliseconds: 604800000
//  Example Data:
//let barData = [
//   {x: 1, y: 3, label: "F"},
//   {x: 2, y: 4, label: "Th"},
//   {x: 3, y: 6, label: "W"},
//   {x: 4, y: 3, label: "T"},
//   {x: 5, y: 7, label: "M"},
// ];

class MetricsContainer extends React.Component {
  state={
    todos: [],
    weekData: [],
    actionsInWeek: 0,
    perWeek: [
      {x: 0, y: 0, label: "Sn"},
      {x: 1, y: 0, label: "M"},
      {x: 2, y: 0, label: "T"},
      {x: 3, y: 0, label: "W"},
      {x: 4, y: 0, label: "Th"},
      {x: 5, y: 0, label: "F"},
      {x: 6, y: 0, label: "S"},
    ],
  }
  
  processData = (data) =>{
    let weekData = [];
    let actionsInWeek = 0;
    let perWeek = this.state.perWeek;
    let today = parseInt(Date.now());
    for (let i = 0; i < data.length; i++){
      let date = data[i];
      for(let j = 0; j < date.updates.length; j++){
        if(today - date.updates[j].dateUpdated <= 604800000) {
          let amountUpdated = date.updates[j].soFar;
          if(j >0){
            amountUpdated -= date.updates[j-1].soFar
          }
          weekData.push(date.updates[j]);
          actionsInWeek += amountUpdated;
          let day= new Date(date.updates[j].dateUpdated).getDay();        
          perWeek[day].y += amountUpdated;
        }
      }
    }
    loading = false;
    this.setState({
      weekData,
      actionsInWeek,
      perWeek,
    })
  }

  componentDidMount(){
    axios.get(`${rootUrl}/task/by/${this.props.currentUser.username}`)
    .then((res)=>{
      let todos = [];
      for(let i = 0; i < res.data.length; i++){
        todos.push(res.data[i])
      }
      this.setState({
        todos
      });
      this.processData(todos);
    });
    
  }
    render() {
      return (
        <ScrollView contentContainerStyle={{
            paddingTop: 40,
          }}>
            <View styles={styles.container}>
            <Text style={styles.title}>My Metrics</Text>
            <Text style={styles.text}>You've done</Text>
            <Text style={styles.number}>{this.state.actionsInWeek}</Text>
            <Text style={styles.text}>things this week!</Text>
              {this.state.actionsInWeek > 0 &&
              <View>
              
            <BarGraph data={this.state.perWeek}/>
            </View>
              }
              {this.state.actionsInWeek === 0 &&
              <Text style={styles.text}>You chillin'?</Text>
              }
                
                
                
                
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
        fontSize:40,
        textAlign:"center"
    },
    text:{
      fontSize: 20,
      textAlign:"center"
    },
    number: {
      fontSize: 50,
      textAlign:"center"
    }
  });

  export default MetricsContainer;
