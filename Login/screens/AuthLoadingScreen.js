//import _ from 'lodash';
import React, { Component } from 'react';
import { View, Text, AsyncStorage, ActivityIndicator } from 'react-native';
import { createBottomTabNavigator, createSwitchNavigator, createStackNavigator } from 'react-navigation';

//import { AppLoading } from 'expo';
//import Slides from '../components/Slides';


class AuthLoadingScreen extends Component {
  constructor() {
    super()
    this.loadApp()
  }

  loadApp = async() => {
    const userToken = await AsyncStorage.getItem('userToken')

    this.props.navigation.navigate(userToken ? 'App': 'Auth')
  }

  render() {
    return (
      
        <View>
            <ActivityIndicator />
        </View>
      
    )
  }
}

export default AuthLoadingScreen;