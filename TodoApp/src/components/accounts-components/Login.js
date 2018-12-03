import React, {
    Component
  } from 'react'
  import {
    View,
    StyleSheet,
    Modal,
  } from 'react-native'
  import {
    TextInput,
    Button,
  } from 'react-native-paper';
  import deviceStorage from '../../services/deviceStorage'; 
  
  class Login extends Component {
    state = {
      username: '',
      password: ''
    }

    usernameChangeHandler(val) {
      this.setState({
        username: val
      });
    }
    passwordChangeHandler(val) {
      this.setState({
        password: val
      });
    }

    submitHandler = () => {
        let user = {
          username: this.state.username,
          password: this.state.password,
        }
        fetch('http://10.1.5.48:4000/user/login', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: user,
        })
        .then((response) => {
          deviceStorage.saveKey("id_token", response.jwt);
          deviceStorage.saveKey("currentUser", response.user);
          this.props.newJWT(response.jwt, response.user);
        })
        .catch((error) => {
          console.error(error);
        });
      }
  
    render() {
      return (
          <View style={styles.form}>
            <TextInput
              mode='outlined'
              style={styles.inputs}
              value={this.state.username}
              onChangeText = {this.usernameChangedHandler}
              onSubmitEditing = {this.submitHandler}
              label="Username"
            />
            <TextInput
              mode='outlined'
              style={styles.inputs}
              value={this.state.password}
              onChangeText = {this.passwordChangedHandler}
              onSubmitEditing = {this.submitHandler}
              label="Password"
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
            >Nevermind</Button>
          </View>
      );
    }
  }
  
  const styles = StyleSheet.create({
    form:{
      flex:1,
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
    },
    inputs:{
      width:'70%',
      height: 60
    },
  })
  
  export default Login;