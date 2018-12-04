import React, {
  Component
} from 'react'
import {
  View,
  StyleSheet,
  ScrollView
} from 'react-native'
import {
  TextInput,
  Button,
  HelperText,
} from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import deviceStorage from '../../services/deviceStorage'; 

import axios from 'axios'


class SignUp extends Component {
  state = {
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password1: '',
    password2: '',
    hasBeenEdited: false,
    errorMessage: '',
    errorMessageShow: false
  }


  firstNameChangedHandler=(val)=> {
    this.setState({
      firstName: val
    });
  }
  lastNameChangedHandler=(val)=> {
    this.setState({
      lastName: val
    });
  }
  usernameChangedHandler=(val)=> {
    this.setState({
      username: val
    });
  }
  emailChangedHandler=(val)=> {
    this.setState({
      email: val
    });
  }
  password1ChangedHandler=(val)=> {
    this.setState({
      password1: val
    });
  }
  password2ChangedHandler=(val)=> {
    this.setState({
      password2: val
    });
  }
  //Regex for Forms

  isOnlyLettersOrNumbers= (str) =>{
    const alphanumericRegex = new RegExp("^[a-zA-Z0-9_]*$");
    return alphanumericRegex.test(str)
  }

  isOnlyLetters= (str) =>{
    const alphanumericRegex = new RegExp("^[a-zA-Z]*$");
    return alphanumericRegex.test(str)
  }

  isValidPassword= (str) =>{
    const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    return strongRegex.test(str);
  }

  isValidEmail= (str) =>{
    const emailRegex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
    return emailRegex.test(str);
  }

  submitHandler = () => {
    
    let mistakes = false;
    this.setState({hasBeenEdited: true})
    if (!this.isValidPassword(this.state.password1)) {
      mistakes = true;
    }

    if (!this.isOnlyLetters(this.state.firstName)) {
      mistakes = true;
    }

    if (!this.isOnlyLetters(this.state.lastName)) {
      mistakes = true;
    }

    if (!this.isOnlyLettersOrNumbers(this.state.username)) {
      mistakes = true;

    }

    if (!this.isValidEmail(this.state.email)) {
      mistakes = true;

    }

    if (this.state.password1 !== this.state.password2) {
      mistakes = true;

    }

    if (!mistakes) {
      let newUser = {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        username: this.state.username,
        password: this.state.password1,
      }
      axios({
        method: 'POST',
        url: 'http://10.1.5.48:4000/user/signup',
        data: newUser,
        config:{
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        }
      })
      .then(res => {
        let user = res.data.user;
        deviceStorage.saveKey("id_token", res.data.jwt);
        deviceStorage.saveKey("currentUser", JSON.stringify(user));
        this.props.newJWT(res.jwt, user);
      })
      .catch(error => {
        alert(error);
      });
    }
  }

  render() {
    return (
      <KeyboardAwareScrollView style={styles.signupContainer} behavior="position" enabled>
      <ScrollView>
        
      </ScrollView>
        <View style={styles.signupContainer}>
            <TextInput
              mode='outlined'
              style={styles.inputs}
              value={this.state.firstName}
              onChangeText = {this.firstNameChangedHandler}
              label="First Name"
            />
            <HelperText
              type="error"
              visible={!this.isOnlyLetters(this.state.firstName) && this.state.hasBeenEdited}
            >
            Name can only have letters (a-z, A-Z).
            </HelperText>

            <TextInput
              mode='outlined'
              style={styles.inputs}
              value={this.state.lastName}
              onChangeText = {this.lastNameChangedHandler}
              label="Last Name"
            />
            <HelperText
              type="error"
              visible={!this.isOnlyLetters(this.state.lastName) && this.state.hasBeenEdited}
            >
            Name can only have letters (a-z, A-Z).
            </HelperText>

            <TextInput
              mode='outlined'
              style={styles.inputs}
              value={this.state.email}
              onChangeText = {this.emailChangedHandler}
              label="Email"
            />
            <HelperText
              type="error"
              visible={!this.isValidEmail(this.state.email) && this.state.hasBeenEdited}
            >
            Invalid email.
            </HelperText>

            <TextInput
              mode='outlined'
              style={styles.inputs}
              value={this.state.username}
              onChangeText = {this.usernameChangedHandler}
              label="Username"
            />
            <HelperText
              type="error"
              visible={!this.isValidEmail(this.state.email) && this.state.hasBeenEdited}
            >
            Username can only contain letters and numbers.
            </HelperText>

            <TextInput
              mode='outlined'
              secureTextEntry={true}
              style={styles.inputs}
              value={this.state.password1}
              onChangeText = {this.password1ChangedHandler}
              label="Password"
            />
            <TextInput
              mode='outlined'
              secureTextEntry={true}
              style={styles.inputs}
              value={this.state.password2}
              onChangeText = {this.password2ChangedHandler}
              label="Re-enter Password"
            />
            <HelperText
              type="error"
              visible={!this.isValidPassword(this.state.password1) && this.state.hasBeenEdited}
            >
            Password must contain: uppercase and lowercase letter, special character(!@#$%^&*), and number.
            </HelperText>
            <HelperText
              type="error"
              visible={this.state.password1 !== this.state.password2}
            >
            Passwords do not match.
            </HelperText>

            <Button
            style={styles.button}
              mode='contained'
              onPress={this.submitHandler}
              color='#F6D258'>Sign Up</Button>
            <Button
            style={styles.button}
              mode='text'
              onPress={this.props.toggleLogin}
              color='#bdbdbd'
            >Have an account? Log in!</Button>
          </View>
      </KeyboardAwareScrollView>
        
          
    );
  }
}

const styles = StyleSheet.create({
  signupContainer:{
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  },
  inputs:{
    height: 60,
    width:300,
  },
  button: {
  }
})

export default SignUp