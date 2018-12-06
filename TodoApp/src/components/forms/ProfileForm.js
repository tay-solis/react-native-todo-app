import React, {Component} from 'react'
import {View, StyleSheet, Modal,} from 'react-native'
import { TextInput,  Button, } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'


class ProfileForm extends Component{
    state = {
        title: '',
        bio: '',
        location: ''
      }
    
      titleChangedHandler = (val) =>{
        this.setState({
          title: val,
        });
      }
      bioChangedHandler = (val) =>{
        this.setState({
          bio: val,
        });
      }
      locationChangedHandler = (val) =>{
        this.setState({
          location: val,
        });
      }
    
      submitHandler = ()=>{
        if(this.state.title.trim() === '' ||
          this.state.bio.trim() === '' ||
          this.state.location.trim() === '') return alert('You missed a spot ;)');
        let editedProfile = {
          title: this.state.title,
          bio: this.state.bio,
          location: this.state.location
        }
        return this.props.submitHandler(editedProfile)
      }

      componentDidMount(){
        this.setState({
          bio: this.props.bio,
          title: this.props.title,
          location: this.props.location
        });
      }
    
      render(){
        return(
          <Modal
            animationType="fade">
            <KeyboardAwareScrollView style={styles.form} behavior="position" enabled>
              <View style={styles.inputsContainer}>
              <TextInput
                mode='outlined'
                style={styles.inputs}
                value={this.state.title}
                onChangeText = {this.titleChangedHandler}
                label="Title"
                placeholder="Artist, Writer, Princess..."
              />
              <TextInput
                mode='outlined'
                style={styles.inputs}
                value={this.state.location}
                onChangeText = {this.locationChangedHandler}
                label="Location"
                placeholder="The Vacuum of Space..."
              />
              <TextInput
                mode='outlined'
                style={styles.bio}
                value={this.state.bio}
                onChangeText = {this.bioChangedHandler}
                label="Bio"
                multiline='true'
                placeholder="I'm just an amazing artist, what can I say?"
              />
              <Button
              style={styles.button}
                mode='contained'
                onPress={this.submitHandler}
                color='#F6D258'>Edit My Profile</Button>
              </View>
              <Button
              style={styles.button}
                mode='text'
                onPress={this.props.hideProfileForm}
                color='#bdbdbd'
              >Nevermind</Button>
            </KeyboardAwareScrollView>
    
    
          </Modal>
    
        );
      }
}

const styles = StyleSheet.create({
    form:{
      flex:1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    inputsContainer:{
      width: '100%',
      justifyContent: 'space-around',
      alignItems: 'center',
  
    },
    inputs:{
      width: 350,
      height: 60
    },
    bio:{
      height: 180,
      width: 350,
      marginBottom: 10
    },
    button:{
    }
  })

export default ProfileForm