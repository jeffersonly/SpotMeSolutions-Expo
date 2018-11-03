import React, { Component } from 'react';
import { Dimensions, StyleSheet, View, Text, TouchableHighlight, Image } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, AnimatedRegion, Region} from 'react-native-maps';
import { connect } from 'react-redux';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
//import DarkMapStyles from '../mapstyles/DarkMapStyles';
import MidnightCommander from '../mapstyles/MidnightCommander';
import {
  locationChanged,
  getCurrentLocation,
  getInputData,
  getAddressPredictions,
  getSelectedAddress,
  fetchSanJoseAPI
} from '../actions';

import garageMarker from '../images/garage.png';
//import carMarker from '../images/car_icon.png';
//import carMarker from '../images/car.png';
import banana from '../images/banana.png';
//import spotMarker from '../images/spotmarker.png';

// Can not access coord outside of render
//let coord = this.props.currentLocation;

class MapScreen extends Component {
  constructor(props) {
      super(props);
      this.state = {
        isMapReady: false,
        //Initial map region
        coordinate: new AnimatedRegion({
          latitude: 37.3382,
          longitude: -121.8863,
        }),
        //Updated map region based on search
        screenCoord: new AnimatedRegion({
          latitude: 37.3382,
          longitude: -121.8863,
          latitudeDelta: 0.0312,
          longitudeDelta: 0.03412
        })
      };
    }

    componentDidMount() {
      console.log(this.state);
    }

    //If the map ready boolean is true, the state of the map is changed (Redirected)
    onMapLayout = () => {
      this.setState({ isMapReady: true });
    }

    //Set to change the location based on the new coordinates that are held
    changeLoc(lat, lng) {
      const newCoord = {
        latitude: lat,
        longitude: lng
      };

      //Used for holding latitude and longitude of a loaded location
      const reg = new AnimatedRegion({
        latitude: lat,
        longitude: lng,
        latitudeDelta: 0.0312,
        longitudeDelta: 0.03412
      });

      //Redirects map to new location (animated load)
      this.state.coordinate.timing(newCoord).start();
      this.mapRef.animateToRegion(reg, 500);
    }

    render() {
      //console.log(coord);
      const coord = this.props.currentLocation;
      console.log(coord);

      return (
        <View style={styles.outerContainer}>
          <View style={styles.navigationBar}>
            <TouchableHighlight
              onPress={() => this.props.navigation.openDrawer()}
              underlayColor={'white'}
            >
              <Image source={require('../images/menu.png')} />
            
            </TouchableHighlight>
  
            <Text style={styles.companyText}>SpotMeSolutions</Text>
  
            <Image source={require('../images/icon.jpg')} />
          </View>

          <View style={styles.container}>
            <MapView
              provider={PROVIDER_GOOGLE}
              style={styles.map}
              region={this.state.screenCoord}
              //customMapStyle={MidnightCommander}
              onLayout={this.onMapLayout}
              ref={(instance) => {
                this.mapRef = instance;
              }}
            >
            {console.log(this.state.description)}
              { this.state.isMapReady && 
                <View >
                  <Marker.Animated 
                    coordinate={this.state.coordinate}
                    //Description is not being displayed
                    description={this.state.description}
                    image={banana}
                  />
                  <Marker
                    coordinate={{ latitude: 37.339222, longitude: -121.880724, }}
                    //Can later pull coord, title, descrip from API when implemented
                    title={'SJSU North Parking Garage'}
                    description={'Spots Filled: 977/1490'}
                    image={garageMarker}
                  />
                  <Marker
                    coordinate={{ latitude: 37.332303, longitude: -121.882986, }}
                    title={'SJSU West Parking Garage'}
                    description={'Spots Filled: 827/1135'}
                    image={garageMarker}
                  />
                  <Marker
                    coordinate={{ latitude: 37.333088, longitude: -121.880797, }}
                    title={'SJSU South Parking Garage'}
                    description={'Spots Filled: 1377/1500'}
                    image={garageMarker}
                  />
                </View> 
              }
              
            </MapView>

            <GooglePlacesAutocomplete 
              placeholder='Search a location or garage!' 
              minLength={2} //Minimum length of text entered for autocomplete results
              autoFocus={false}
              listViewDisplayed='false'
              returnKeyType={'default'}
              fetchDetails
              renderDescription={row => row.description}
              onPress={(data, details = null) => {
                this.changeLoc(details.geometry.location.lat, details.geometry.location.lng);

                return details;
              }}
              getDefaultValue={() => ''}
              query={{ key: 'AIzaSyAknyin7pzbkZ89IRg6QeQ0gC2sVjSKRpY' }}
              styles={{
                textInputContainer: {
                  width: '100%',
                  backgroundColor: '#42b8ba',
                  //backgroundColor: 'transparent'
                  zIndex: 99
                },
                listView: {
                  position: 'absolute',
                  backgroundColor: 'white',
                  //backgroundColor: 'transparent',
                  // height: Dimensions.get('window').height,
                  zIndex: 99,
                  top: 40
                },
                description: {
                  fontWeight: 'bold',
                  fontSize: 18,
                  height: 40
                  //color: 'white'
                },
              }}
            /> 
          </View>
        </View>
      );
    }
}

  const styles = {
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    map: {
      ...StyleSheet.absoluteFillObject,
      flex: 1,
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height
    },
    outerContainer: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'flex-start',
      borderRadius: 2,
      borderWidth: 2,
      borderColor: '#d6d7da'
    },
    companyText: {
      fontSize: 30,
      color: '#42b8ba',
      fontWeight: '900',
      alignItems: 'center',
      width: 380,
      textAlign: 'center'
    },
    navigationBar: {
      marginTop: 20,
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    mapAndSearchBarContainer: {
      alignItems: 'center',
  
      height: '90%',
      width: '100%'
    },
    inputContainer: {
      //height: 40,
      elevation: 1,
      backgroundColor: 'white',
      width: '90%',
      height: '10%',
      top: 40,
      borderRadius: 3,
      shadowOpacity: 0.75,
      shadowRadius: 1,
      shadowColor: 'gray',
      shadowOffset: { height: 0, width: 0 },
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center'
    },
    inputStyle: {
      color: '#000',
      padding: 10,
      height: 50,
      fontSize: 18,
      lineHeight: 23,
      flex: 2
    },
  };

  const mapStateToProps = ({ loc }) => {
    const {
      location,
      currentLocation,
      inputData,
      predictions,
      sanjose
    } = loc;
    return { location, currentLocation, inputData, predictions, sanjose };
  };
  const mapActionCreators = {
    locationChanged,
    getCurrentLocation,
    getInputData,
    getAddressPredictions,
    getSelectedAddress,
    fetchSanJoseAPI,
  };

export default connect(mapStateToProps, mapActionCreators)(MapScreen);
