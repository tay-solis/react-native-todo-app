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
  import axios from 'axios'
  
  class Login extends Component {
    state = {
      username: '',
      password: ''
    }

    usernameChangedHandler = (val) => {
      this.setState({
        username: val
      });
    }
    passwordChangedHandler = (val) =>{
      this.setState({
        password: val
      });
    }

    submitHandler = () => {
        let user = {
          username: this.state.username,
          password: this.state.password,
        }
        axios({
          method: 'POST',
          url: 'http://10.1.5.48:4000/user/login',
          data: user,
          config:{
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
          }
        })
        .then((res) => {
          let user = res.data.user;
          deviceStorage.saveKey("id_token", res.data.jwt);
          deviceStorage.saveKey("currentUser", JSON.stringify(user));
          this.props.newJWT(res.jwt, user);
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
              secureTextEntry={true}
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
              color='#F6D258'>Log In</Button>
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