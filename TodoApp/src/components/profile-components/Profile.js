import React, {Component} from 'react'
import {StyleSheet, View, Text, Image, ScrollView} from 'react-native'
import {Button, FAB, Divider,} from 'react-native-paper'
import axios from 'axios';
import {rootUrl} from '../../config/constants'
import ProfileForm from '../forms/ProfileForm'

class Profile extends Component{
  state = {
    title: '',
    location: '',
    bio: '',
    showProfileForm: false,
    stats: null
  }

  calculateStats = (data) =>{
    let stats = {
      totalActions: 0,
      completedTasks: 0
    }
    for(let i = 0; i < data.length; i++){
      if(data[i].isCompleted) stats.completedTasks += 1;
      for(let j = 0; j < data[i].updates.length; j++){
        let amountUpdated = data[i].updates[j].soFar;
        if(j >0){
          amountUpdated -= data[i].updates[j-1].soFar
        }
        stats.totalActions += amountUpdated;
      }
    }
    this.setState({
      stats
    });
  }

  submitHandler = (updatedProfile) =>{
    axios({
      method: 'Put',
      url: `${rootUrl}/user/profile/update/${this.props.currentUser.username}`,
      data:{
        profile: updatedProfile,
      }
    })
    .then((res)=>{
      console.log(res.data)
      this.setState({
        title: updatedProfile.title,
        location: updatedProfile.location,
        bio: updatedProfile.bio,
        showProfileForm: false
      });
    });
  }


  componentDidMount(){
    console.log(`${rootUrl}/user/profile/${this.props.currentUser.username}`)
    axios.get(`${rootUrl}/user/profile/${this.props.currentUser.username}`)
    .then((res)=>{
      console.log(res.data)
      this.setState({
        title: res.data.title,
        location: res.data.location,
        bio: res.data.bio
      });
    });
    this.calculateStats(this.props.stats);
  }

  componentWillReceiveProps(){
    this.calculateStats(this.props.stats);
  }

  render(){
    return(
      <ScrollView
      style={{flex: 1, backgroundColor: '#F6D258'}}>
        <View style={styles.profile}>
      <View style={styles.header}>
        <Image
            style={styles.bee}
            source={require('../../assets/profile-bee.png')}
          />
        <Text style={styles.title}>{this.props.currentUser.username}</Text>
      </View>
      
      <Text style={styles.sectionHeader}>my profile info</Text>
      {this.props.currentUser && 
      <View style={styles.info}>
          <Text style={{
            fontSize: 22
          }}>{this.props.currentUser.firstName} {this.props.currentUser.lastName}</Text>
          <Text style={{
            color: '#424242'
          }}>{this.state.title}</Text>
          <Text style={{
            color: '#424242'
          }}>{this.state.location}</Text>
          <Divider style={styles.divider}/>          

          <Text style={styles.bio}>{this.state.bio}</Text>
          <Divider style={styles.divider}/>

          <Button
          icon="mode-edit"
          onPress={()=>{this.setState({showProfileForm: true})}}>Edit My Profile</Button>
        
      </View>
      }
      <Text style={styles.sectionHeader}>my stats</Text>
      {this.state.stats &&
      <View style={styles.info}>

        <View style={styles.statHeader}> 
          <Image
            style={styles.icon}
            source={require('../../assets/apitherapy.png')}
          />
          <Text style={styles.text}>Total Actions</Text>  
        </View>
        <View style={styles.stats}>
          <Text style={styles.number}>{this.state.stats.totalActions}</Text>
          <Text>Actions</Text>
        </View>

        <View style={styles.statHeader}> 
        <Image
            style={styles.icon}
            source={require('../../assets/honey.png')}
          />
          <Text style={styles.text}>Tasks Completed</Text> 
        </View>
        <View style={styles.stats}>
          <Text style={styles.number}>{this.state.stats.completedTasks}</Text>
          <Text>Tasks</Text>
        </View>
        
        
        
      </View>
      }
      {this.state.showProfileForm &&
      <ProfileForm 
        submitHandler={this.submitHandler} 
        title= {this.state.title}
        bio= {this.state.bio}
        location= {this.state.location}
        hideProfileForm={()=>this.setState({showProfileForm: false})}/> 
      }

      

        
        <View style={styles.settings}>
            <Button
            
            mode='text'
            onPress={this.props.deleteJWT}
            color='#424242'>
            Log Out
            </Button>
        </View>
      </View>
      </ScrollView>
      
    )
  }
}

const styles = StyleSheet.create({
  profile:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F6D258',
  },

  header:{
    flexDirection: 'row',
    flewWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  sectionHeader:{
    fontSize: 20, 
    color: '#1b1b1b', 
    letterSpacing: 3, 
    margin: 5
  },
  bee: {
    width: 150, 
    height: 150, 
    margin: 20
  },
  divider:{
    color: '#F6D258',
    marginTop: 10,
    marginBottom: 10
  },
  info:{
    width: '100%',
    padding: 20,
    marginBottom: 40,
    backgroundColor: '#FFF',
  },
  title:{
    fontSize: 24,
    margin: 15
  },
  text:{
    fontSize: 18
  },
  bio:{
    fontSize: 18,
    marginTop: 5
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 10,
    top: 0,
  },
  icon: {
    height: 40,
    width: 40,
    margin: 10
  },
  number:{
    fontSize: 36,
    margin: 3,
    marginLeft: 40
  },
  statHeader:{
    flexDirection: 'row',
    alignItems: 'center'
  },
  stats: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  }

})

export default Profile;
