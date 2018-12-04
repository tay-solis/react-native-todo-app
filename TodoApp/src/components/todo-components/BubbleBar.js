import React from 'react'
import {FlatList, View} from 'react-native'
import { Ionicons } from '@expo/vector-icons';

const BubbleBar = (props) => {
    return (<FlatList
        horizontal
        data={props.bubbles}
        extraData={props}
        renderItem={(data)=>{
          
          if (data.item === 'fill') {
            return(
              <View style={{margin: 20}}><Ionicons name="ios-radio-button-on" size={20} color='#333' /></View>
              
            );
          }
          if(data.item === 'empty'){
            return(
              <View style={{margin: 20}}><Ionicons name="ios-radio-button-off" size={20} color='#333' /></View>
              
            )
          }
        }}
        />);
}

const styles = {
  bubblebar:{
    flexDirection: 'row',
    flexFlow: 'wrap'
  }
}
export default BubbleBar;