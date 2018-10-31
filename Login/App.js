import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity,  ActivityIndicator, AsyncStorage } from 'react-native';
import { createBottomTabNavigator, createSwitchNavigator, createStackNavigator, createDrawerNavigator } from 'react-navigation';
import AuthLoadingScreen from './screens/AuthLoadingScreen'
import WelcomeScreen from './screens/Welcome';
import Signup from './screens/Signup';
import Signin from './screens/Signin';
import HomeScreen from './screens/HomeScreen';
import SettingsScreen from './screens/SettingsScreen';
import LogoTitle from './components/LogoTitle';

import Icon from 'react-native-vector-icons/Ionicons'

const AuthStackNavigator = createStackNavigator({
    // navigationOptions: ({ navigation }) => ({
    //   // title: 'Your App',
    //   headerTitle: <LogoTitle />
    // }),
  Welcome: WelcomeScreen,
  Signin: Signin,
  Signup: Signup,
  // headerTitle: <LogoTitle />
})

const AppTabNavigator = createBottomTabNavigator({
  HomeScreen: {
    screen: HomeScreen,
  },
  Settings: {
    screen: SettingsScreen
  }
})

const AppStackNavigator = createStackNavigator({
  AppTabNavigator:{
    screen: AppTabNavigator,
    navigationOptions: ({ navigation }) => ({
      // title: 'Your App',
      headerTitle: <LogoTitle />,
      headerLeft: (
        <TouchableOpacity onPress={() => navigation.toggleDrawer()} >
          <View style={{ paddingHorizontal: 10 }}>
            <Icon name="md-menu" size={24} />
          </View>
        </TouchableOpacity>
      )
    })
  }
})

// const AppDrawerNavigator = createDrawerNavigator({
//   Home: AppStackNavigator
// })

const AppDrawerNavigator = createDrawerNavigator({
  Home: AppStackNavigator
})

export default createSwitchNavigator({
  AuthLoadingScreen: AuthLoadingScreen,
  Auth: AuthStackNavigator,
  App: AppDrawerNavigator
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
