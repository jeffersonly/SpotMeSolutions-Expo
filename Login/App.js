import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator, AsyncStorage } from 'react-native';
import { createBottomTabNavigator, createSwitchNavigator, createStackNavigator } from 'react-navigation';
import AuthLoadingScreen from './screens/AuthLoadingScreen'
import WelcomeScreen from './screens/Welcome';
import Signup from './screens/Signup';
import Signin from './screens/Signin';

const AuthStackNavigator = createStackNavigator({
  Welcome: WelcomeScreen,
  Signin: Signin,
  Signup: Signup
})

export default createSwitchNavigator({
  AuthLoadingScreen: AuthLoadingScreen,
  Auth: AuthStackNavigator
})
// export default class App extends React.Component {
//   render() {
//     const MainNavigator = createSwitchNavigator({
//       AuthLoading: AuthLoadingScreen
//     })
//     // const MainNavigator = createBottomTabNavigator({
//     //   Sign_In: { 
//     //     screen: WelcomeScreen, 
//     //     navigationOptions: () => ({
//     //       title: "Sign In"
//     //     })
//     //   },
//     //   Sign_Up: { 
//     //     screen: Signup,
//     //     navigationOptions: () => ({
//     //       title: "Get Started"
//     //     })
//     //   }, 
//     // }, {
//     //     tabBarOptions: { 
//     //       // activeTintColor: "#58D7B5", 
//     //       // inactiveTintColor: "grey", 
//     //       // activeBackgroundColor: "#fff",
//     //       // inactiveBackgroundColor: "#fff",
//     //       style: {
//     //         backgroundColor: '#03A9F4',
//     //         borderTopColor: "transparent"
//     //       }
//     //     }
//     // });
//     return (
//       <View style={styles.container}>
//         <MainNavigator />
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     //backgroundColor: '#fff',
//     // alignItems: 'center',
//     // justifyContent: 'center',
//   },
// });
