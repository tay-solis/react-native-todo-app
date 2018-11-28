import React from 'react'
import {FlatList} from 'react-native'
import { Ionicons } from '@expo/vector-icons';

const BubbleBar = (props) => {
    return (<FlatList
        horizontal
        data={props.bubbles}
        extraData={props}
        renderItem={(data)=>{
          
          if (data.item === 'fill') {
            console.log('filled bubble')
            return(
              <Ionicons name="ios-radio-button-on" size={20} color='#333' />
            );
          }
          if(data.item === 'empty'){
            return(
              <Ionicons name="ios-radio-button-off" size={20} color='#333' />
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