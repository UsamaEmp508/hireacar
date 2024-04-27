import React, { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  PermissionsAndroid,
} from "react-native";
import MapView, { Marker } from "react-native-maps";

import Geolocation from "react-native-geolocation-service";

import { heightPercentageToDP } from "react-native-responsive-screen";
import Ionicons from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useLocation, useLocationActions } from "../../Theme/LocationContext";
import Header from "../Header/Header";

const apiKey = "AIzaSyCqDlu3XKQ-VZ5xBTmksn4QqP2doT4Rh_A";

const Googleinput = ({navigation}) => {

  const { state } = useLocation();
  const { location, completeAddress } = state;
  console.log('state data',state)
  const { setLocation,setCompleteAddress } = useLocationActions();
  const [completeLocation, setCompleteLocation] = useState(completeAddress);
  const [addLoc, setAddLoc] = useState(location);
  const [searchText, setSearchText] = useState("");
  const [searchTrue, setSearchTrue] = useState(true);
  const [searchResults, setSearchResults] = useState([]);

  const mapRef = useRef(null);


  useEffect(() => {
    if (searchTrue === true) {
      handleSearch();
    }
  }, [searchText]);

  useEffect(() => {
    if (mapRef.current && addLoc.latitude && addLoc.longitude) {
      mapRef.current.animateToRegion({
        latitude: addLoc.latitude,
        longitude: addLoc.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    }
  }, [addLoc]);

  const handleSearch = () => {
    fetch(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${searchText}&key=${apiKey}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.predictions) {
          setSearchResults(data.predictions);
        }
      })
      .catch((error) => {
        console.error("Error fetching autocomplete data:", error);
      });
  };

  const handleSelectLocation = (placeId, resultAddress) => {
    fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${apiKey}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (
          data.result &&
          data.result.geometry &&
          data.result.geometry.location
        ) {
          // Extract address components
          const location = data.result.geometry.location;
          const components = data.result.address_components;
          let country = null;
          let state = null;
          let city = null;
          let zipcode = null;
          let line1 = null;

          line1 = data.result.formatted_address;

          // Iterate through address components
          for (let i = 0; i < components.length; i++) {
            const component = components[i];
            if (component.types.includes("country")) {
              country = component.long_name;
            } else if (
              component.types.includes("administrative_area_level_1")
            ) {
              state = component.long_name;
            } else if (component.types.includes("locality")) {
              city = component.long_name;
            } else if (component.types.includes("postal_code")) {
              zipcode = component.long_name;
            }
          }

          setCompleteLocation({
            city,
            country,
            line1,
            line2: resultAddress,
            location: {
              coordinates: [location.lng, location.lat],
              type: "Point",
            },
            state,
            type: "",
            zipcode,
          });

          setAddLoc({
            latitude: location.lat,
            longitude: location.lng,
          });

          
        }
      })
      .catch((error) => {
        console.error("Error fetching place details:", error);
      });
  };

  const getAddressFromCoordinates = async (lat, lng) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`
      );
      const data = await response.json();
      if (data.results.length > 0) {
        const result = data.results[0];

        // Extract address components
        const components = result.address_components;
        let country = null;
        let state = null;
        let city = null;
        let zipcode = null;
        let line1 = null;
        line1 = result.formatted_address;

        // Iterate through address components
        for (let i = 0; i < components.length; i++) {
          const component = components[i];
          if (component.types.includes("country")) {
            country = component.long_name;
          } else if (component.types.includes("administrative_area_level_1")) {
            state = component.long_name;
          } else if (component.types.includes("locality")) {
            city = component.long_name;
          } else if (component.types.includes("postal_code")) {
            zipcode = component.long_name;
          }
        }
        setCompleteLocation({
          city,
          country,
          line1,
          line2: "",
          location: {
            coordinates: [lng, lat],
            type: "Point",
          },
          state,
          type: "",
          zipcode,
        });

    
      }
    } catch (error) {
      console.error("Error fetching address:", error);
    }
  };




  const requestLocationPermission = async () => {
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: "Geolocation Permission",
            message: "Can we access your location?",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK",
          }
        );
        if (granted === "granted") {
          Geolocation.getCurrentPosition(
            (position) => {
           
              setAddLoc({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
              });
              getAddressFromCoordinates(
                position.coords.latitude,
                position.coords.longitude,
                ""
              );
            },
            (error) => {
              console.log('error',error)
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
          );
        } else {
          return false;
        }
      } else {
        // On iOS, permission is not required beforehand
        Geolocation.getCurrentPosition(
          (position) => {
         
            setAddLoc({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
            getAddressFromCoordinates(
              position.coords.latitude,
              position.coords.longitude,
              ""
            );
          },
          (error) => {
            console.log('error',error)
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
      }
    } catch (err) {
      return false;
    }
  };


  

 

  const handleChoose = async () => {
    if (addLoc && addLoc.latitude && addLoc.longitude) {
      await getAddressFromCoordinates(location.latitude, location.longitude);
    setLocation(addLoc);

    setCompleteAddress(completeLocation)
      navigation.goBack()

    } else {
      console.error("Location coordinates are not available.");
    }
    setSearchText("");
  };

  return (
    <View style={styles.container}>

{/* <View style={{position:"absolute",bottom:20,left:10,right:10}}>
<Header text={'Location'} />


</View> */}

<MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          latitude: addLoc?.latitude || 37.78825,
          longitude: addLoc?.longitude || -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
      
        <Marker
          // draggable
          coordinate={{
            latitude: addLoc?.latitude || 37.78825,
            longitude: addLoc?.longitude || -122.4324,
          }}
          // onDragEnd={onMarkerDragEnd}
        />
      </MapView>

      <View style={styles.searchContainer}>
      <AntDesign name="search1" size={24} color="#000" style={styles.searchIcon} />
        <TextInput
          style={styles.input}
          value={searchText}
          onChangeText={(text) => {
            setSearchTrue(true);
            setSearchText(text);
          }}
          placeholderTextColor={'#000000'}
          placeholder="Search location..."
        />
         {searchText.length > 0 && (
          <TouchableOpacity onPress={() => setSearchText("")}>
            <Ionicons name="close" size={24} color="#000" style={styles.closeIcon} />
          </TouchableOpacity>
        )}
      </View>
      {searchResults.length > 0 && (
        <View style={styles.suggestionsContainer}>
          {searchResults.map((result, index) => (
            <TouchableOpacity
              key={index}
              style={styles.suggestion}
              onPress={() => {
                setSearchTrue(false);
                setSearchText(result.description);
                handleSelectLocation(result.place_id, result.description);
                setSearchResults([]);
              }}
            >
              <Text style={{color:"#000"}}>{result.description}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
      <TouchableOpacity
        style={styles.currentLocationContainer}
        onPress={requestLocationPermission}
      >
         <Ionicons name="locate" size={24} color="#000" />
      </TouchableOpacity>
<TouchableOpacity style={styles.chooseBtnContainer} onPress={handleChoose}>   
      <View style={styles.button} >
        <Text style={styles.buttonText}>Select Location</Text>
      </View>
      </TouchableOpacity>
    </View>
  )
}

export default Googleinput

const styles = StyleSheet.create({

  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  searchContainer: {
    position: "absolute",
    top: 80,
    right: 10,
    left: 10,
    flexDirection:"row",
    alignItems:"center",
    backgroundColor: "#FFFFFF",
    borderColor:"#21408E",
              borderWidth:2,
              borderRadius: 5,
              paddingHorizontal: 10,
              gap:5
  },
  input: {
    flex: 1,
    
   
    marginRight: 10,
    color: "#000",
  },
  chooseBtnContainer: {
    position: "absolute",
    bottom: 40,
    right: 10,
    left: 10,
  },
  button: {
   
    backgroundColor: "#21408E",
    paddingVertical: 15,
    paddingHorizontal: 15,

    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  currentLocationContainer: {
    width: 40,
    height: 40,
    resizeMode: "contain",
    padding: 7,
    position: "absolute",
    backgroundColor: "#FFFFFF",
    color:'#000',
        borderRadius: 100,
    bottom: 200,
    right: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.5,
    shadowRadius: 2.0,
    elevation: 8,
  },
  currentIcon: {
    width: "100%",
    height: "100%",
    // resizeMode: 'cover',
  },

  suggestionsContainer: {
    position: "absolute",
    top: 134,
    right: 10,
    left: 10,
    backgroundColor: "#FFFFFF",
    color:"#000000",
    borderRadius: 5,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  suggestion: {
    paddingVertical: 5,
    color:"#000"
  },

})