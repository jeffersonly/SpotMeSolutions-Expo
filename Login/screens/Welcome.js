//import _ from 'lodash';
import React, { Component } from 'react';
import { View, Text, AsyncStorage , Button} from 'react-native';
import { createBottomTabNavigator, createSwitchNavigator, createStackNavigator } from 'react-navigation';

//import { AppLoading } from 'expo';
import Slides from '../components/Slides';

const SLIDE_DATA = [
  { text: 'Welcome to SpotMe', color: '#03A9F4' },
  { text: 'Stop wasting time, trying to find parking', color: '#009688' },
  { text: 'Set your location, get real-time parking data', color: '#03A9F4' }
];

class WelcomeScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Slides data={SLIDE_DATA} />
        <View style={{ flexDirection:'row', margin: 30}} >
          <Button title="Sign In" onPress={() => this.props.navigation.navigate('Signin')} />
          <Button title="Get Started" onPress={() => this.props.navigation.navigate('Signup')} />
        </View>
      </View>
    )
  }
}

export default WelcomeScreen;