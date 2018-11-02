//import _ from 'lodash';
import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, AsyncStorage } from 'react-native';
//import { AppLoading } from 'expo';
//import Slides from '../components/Slides';

class Signin extends Component {

  signIn = async () => {
    await AsyncStorage.setItem('userToken', 'Colin')
    this.props.navigation.navigate('App')
  }
  render() {
    return (
    <View>
        <Button title="Sign in with Facebook" onPress={this.signIn} />
    </View>
    )
  }
}

export default Signin;