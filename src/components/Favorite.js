/*import React, { Component } from 'react';
import { Text, View, Image, Button, Dimensions } from 'react-native';

class Favorite extends Component {
render() {
  return (
    <View style={styles.containerStyle}>

    <View style={styles.imageStyle}>
    <Button
    onPress={() => this.props.navigation.openDrawer()}
    title='Back'
    />
    <Text 
    style={styles.headerText}
    >
    Favorite </Text>

      <Image
        source={require('../images/icon.jpg')}
      />
    </View>


      <View style={styles.garageNameStyle}>
        <View style={styles.detailStyleLeftColumn}>
          <Text style={styles.subHeaderText}>Garage</Text>
        </View>

        <View style={styles.detailStyleRightColumn}>
          <Text style={styles.subHeaderText}>Occupancy</Text>
        </View>
      </View>

      <View style={styles.garageNameStyle}>
        <View style={styles.detailStyleLeftColumn}>
          <Text style={styles.detailText}>SanFrancisco </Text>
        </View>
        <View style={styles.detailStyleRightColumn}>
          <Text style={styles.detailText}>L1 80/100</Text>
          <Text style={styles.detailText}>L2 100/100</Text>
          <Text style={styles.detailText}>L3 70/100</Text>
          <Text style={styles.detailText}>L4 90/100</Text>
        </View>
      </View>

      <View style={styles.garageNameStyle}>
        <View style={styles.detailStyleLeftColumn}>
          <Text style={styles.detailText}>San Jose state</Text>
        </View>
        <View style={styles.detailStyleRightColumn}>
          <Text style={styles.detailText}>50/200</Text>
        </View>
      </View>

      <View style={styles.garageNameStyle}>
        <View style={styles.detailStyleLeftColumn}>
          <Text style={styles.detailText}>Santa Clara</Text>
        </View>
        <View style={styles.detailStyleRightColumn}>
          <Text style={styles.detailText}>80/150</Text>
        </View>
      </View>
    </View>
  );
}
}
const styles = {
  containerStyle: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height

  },
  imageStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 15
  },
  garageNameStyle: {
    flex: 0,
    flexDirection: 'row'
  },
  headerStyle: {
    margin: 30,
    flexDirection: 'row'
  },
  detailStyleLeftColumn: {
    width: 150,
    marginLeft: 40,
    marginTop: 10,
    marginBottom: 10,
    marginRight: 10
  },
  detailStyleRightColumn: {
    width: 150,
    margin: 10
  },
  headerText: {
      fontSize: 30,
      color: '#379b8c',
      fontWeight: '900'
  
  },
  detailText: {
    fontSize: 20
  },
  subHeaderText: {
    fontSize: 25,
    textDecorationLine: 'underline'
  }
};
export default Favorite;*/

import React, { Component } from 'react';
import { Platform, Text, View, StyleSheet } from 'react-native';
import { Constants, Location, Permissions } from 'expo';

export default class Favorite extends Component {
  state = {
    location: null,
    errorMessage: null,
  };

  componentWillMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
      this.getLocationAsync();
    }
  }

  getLocationAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    const location = await Location.getCurrentPositionAsync({});
    this.setState({ location });
  };
 
  render() {
    let longitude = 'Waiting..';
    let latitude = 'Waiting..';
    if (this.state.errorMessage) {
      longitude = this.state.errorMessage;
      latitude = this.state.errorMessage;
    } else if (this.state.location) {
      longitude = JSON.stringify(this.state.location.coords.longitude);
      latitude = JSON.stringify(this.state.location.coords.latitude);
    }

    return (
      <View style={styles.container}>
        <Text>
          {longitude} {' '}
          {latitude}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
});
