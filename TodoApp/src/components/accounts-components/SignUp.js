import React, {
  Component
} from 'react'
import {
  ScrollView,
  View,
  StyleSheet,
  Text
} from 'react-native'
import {
  TextInput,
  Button,
} from 'react-native-paper';
import deviceStorage from '../../services/deviceStorage'; 

class SignUp extends Component {
  state = {
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password1: '',
    password2: ''
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

  //Validates name. Allows some foreign characters.
  isValidName= (str) =>{
    const cityRegex = new RegExp("^([a-zA-Z\u0080-\u024F]+(?:. |-| |'))*[a-zA-Z\u0080-\u024F]*$");
    return cityRegex.test(str);
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
    // if (!this.isValidPassword(this.state.password1)) {
    //   mistakes = true;
    // }

    // if (!this.isValidName(this.state.firstName)) {
    //   mistakes = true;
    // }

    // if (!this.isValidName(this.state.lastName)) {
    //   mistakes = true;
    // }

    // if (!this.isOnlyLettersOrNumbers(this.state.username)) {
    //   mistakes = true;

    // }

    // if (!this.isValidEmail(this.state.email)) {
    //   mistakes = true;

    // }

    // if (!this.isValidName(this.state.city)) {
    //   mistakes = true;

    // }

    // if (this.state.password1 !== this.state.password2) {
    //   mistakes = true;

    // }
    if (!mistakes) {
      let newUser = {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        username: this.state.username,
        password: this.state.password1,
      }
      fetch('http://10.1.5.48:4000/user/signup', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      })
      .then((response) => {
        deviceStorage.saveKey("id_token", response.jwt);
        this.props.newJWT(response.jwt);
      })
      .catch((error) => {
        console.error(error);
      });
    }
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.signupContainer}>
            <Text>Get to Work</Text>
            <TextInput
              mode='outlined'
              style={styles.inputs}
              value={this.state.firstName}
              onChangeText = {this.firstNameChangedHandler}
              label="First Name"
            />
            <TextInput
              mode='outlined'
              style={styles.inputs}
              value={this.state.lastName}
              onChangeText = {this.lastNameChangedHandler}
              label="Last Name"
            />
            <TextInput
              mode='outlined'
              style={styles.inputs}
              value={this.state.email}
              onChangeText = {this.emailChangedHandler}
              label="Email"
            />
            <TextInput
              mode='outlined'
              style={styles.inputs}
              value={this.state.username}
              onChangeText = {this.usernameChangedHandler}
              label="Username"
            />
            <TextInput
              mode='outlined'
              style={styles.inputs}
              value={this.state.password1}
              onChangeText = {this.password1ChangedHandler}
              label="Password"
            />
            <TextInput
              mode='outlined'
              style={styles.inputs}
              value={this.state.password2}
              onChangeText = {this.password2ChangedHandler}
              label="Re-enter Password"
            />

            <Button
            style={styles.button}
              mode='contained'
              onPress={this.submitHandler}
              color='#F7E012'>Log In</Button>
            <Button
            style={styles.button}
              mode='text'
              onPress={this.props.toggleLogin}
              color='#bdbdbd'
            >Have an account? Log in!</Button>
          </View>
      </ScrollView>
          
    );
  }
}

const styles = StyleSheet.create({
  signupContainer:{
    padding: 30,
    alignItems: 'center',
    width: '100%'
  },
  inputs:{
    height: 60,
    width: '90%',
  },
  button: {
    margin: 10,
  }
})

export default SignUp