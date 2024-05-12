import { ActivityIndicator, Image, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { styles } from './Styles';
import { ThemeContext } from '../../../Theme/ThemeContext';
import { lightTheme, darkTheme } from '../../../Theme/Color';
import Brands from '../../../Components/BrandByCars/Brand';

import CarItem from '../../../Components/Car Card/Card';
import Location from '../../../Components/Location/Location';
import { useNavigation } from '@react-navigation/native';
import { GET_ALL_CARS, GET_USER_PROFILE } from '../../../Service/Queries';
import { useQuery } from '@apollo/client';
import { ChatState } from '../../../Context/ChatProvider';
import { Skeleton } from '@rneui/base';
import { FlatList } from 'react-native-gesture-handler';
import { useLocation, useLocationActions } from '../../../Theme/LocationContext';
import Ionicons from 'react-native-vector-icons/Ionicons'

import ActivityIndicatorModal from '../../../Components/ActivityIndicatorModal';
const apiKey = "AIzaSyCqDlu3XKQ-VZ5xBTmksn4QqP2doT4Rh_A";

const Home = () => {
  const { loading, error, data } = useQuery(GET_ALL_CARS);
    const themeContext = useContext(ThemeContext);

  const theme = themeContext?.isDarkTheme ? darkTheme : lightTheme;

  
  const { setLocation,setCompleteAddress } = useLocationActions();

  const [searchText, setSearchText] = useState("");
  const [searchTrue, setSearchTrue] = useState(true);
  const [searchResults, setSearchResults] = useState([]);
  const navigation = useNavigation()
const { user} = ChatState();

  const { loading:userprofileloading, data:userprofile } = useQuery(GET_USER_PROFILE, {
    variables: { id: user?.userByGoogleId?.id }
  });

useEffect(() => {
  if (searchTrue === true) {
    handleSearch();
  }
}, [searchText]);



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

        setCompleteAddress({
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

        setLocation({
          latitude: location.lat,
          longitude: location.lng,
        });
navigation.navigate('Search')
        
      }
    })
    .catch((error) => {
      console.error("Error fetching place details:", error);
    });
};



  


  return (
    <ScrollView style={[styles.container,{backgroundColor:theme.primaryBackground}]}>
{/* header */}
<View style={styles.Header_Profile}>


{userprofileloading && <ActivityIndicatorModal loaderIndicator={userprofileloading} />}

<TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Image source={{uri:userprofile?.user?.photoLink}} style={styles.image_profile} />
        </TouchableOpacity>

<TouchableOpacity onPress={() => navigation.navigate('Notification')}>
  <Image source={require('../../../Assets/Images/notifiaction.png')} style={[styles.image,{tintColor:'#1F4590'}]} />
</TouchableOpacity>

   </View>


<Text style={[styles.Header_heading,{color:theme.primaryText}]}>Hello {userprofile?.user?.displayName}</Text>
<Text style={[styles.Header_Subheading,{color:theme.PrimarylightText}]}>Lets Find Your Favourite car here </Text>


{/* Search bar */}
    


<View style={styles.search}>

<View style={[styles.left,{backgroundColor:theme.BackgroundSecondary,borderColor:theme.primaryBackground,borderWidth:1}]}> 
<Image source={require('../../../Assets/Images/Home/Search_icon.png')}  style={{tintColor:themeContext.isDarkTheme ? '#FFF':null,width:16,height:18}} />
<TextInput inputMode='text' style={[styles.left_input,{color:theme.primaryText}]} placeholder='Search By location' placeholderTextColor={theme.PrimarylightText}  value={searchText}
          onChangeText={(text) => {
            setSearchTrue(true);
            setSearchText(text);
          }} />
{searchText.length > 0 && (
          <TouchableOpacity onPress={() => setSearchText("")}>
            <Ionicons name="close" size={24} color={theme.primaryText} style={styles.closeIcon} />
          </TouchableOpacity>
        )}
</View>


<View style={[styles.right,{backgroundColor:"#1F4590"}]}> 
<Image source={require('../../../Assets/Images/Home/Filter.png')}  style={{width:20,height:18,tintColor:"#ffffff",} } />

</View>


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


{/* row */}






<View style={styles.row}>
<Text style={[styles.row_heading_left,{color:theme.primaryText}]}>Popular Cars</Text>
<Pressable onPress={()=> navigation.navigate('AllCarPopular')} >
  <Text style={[styles.row_heading_right,{color:theme.primaryText}]}>   
  View All
  </Text>
  
  </Pressable>


</View>
<View>

{  error &&   <Text style={[styles.row_heading_right,{color:theme.primaryText}]}>Error fetching data</Text>}
{loading ? (
           <FlatList
           data={Array.from({length: 8})}
           showsHorizontalScrollIndicator={false}
           horizontal
           keyExtractor={(item, index) => index.toString()}
           renderItem={({index}) => (
               <Skeleton  animation="wave"
               width={200} height={200} style={{marginRight:10}} />

        
                                

           )}
         />
        ) : (

      <FlatList
         data={data?.cars?.slice(0, 20)}
        renderItem={({ item, index }) => <CarItem car={item} index={index} fullscreen={false} />}
        keyExtractor={(item) => {
       
          return item.id;
        }}
        pagingEnabled
        contentContainerStyle={{gap:10,marginVertical:10}}
        horizontal
       
      />
        )}
</View>



    <View style={styles.row}>
<Text style={[styles.row_heading_left,{color:theme.primaryText}]}>Cars By Price </Text>
<Pressable onPress={()=> navigation.navigate('AllCarPrice')} >
  <Text style={[styles.row_heading_right,{color:theme.primaryText}]}>   
  View All
  </Text>
  
  </Pressable>



</View>
    

<View>

{  error &&   <Text style={[styles.row_heading_right,{color:theme.primaryText}]}>Error fetching data</Text>}


{loading ? (
           <FlatList
           data={Array.from({length: 8})}
           showsHorizontalScrollIndicator={false}
           horizontal
           keyExtractor={(item, index) => index.toString()}
           renderItem={({index}) => (
               <Skeleton  animation="pulse"
               width={200} height={200} style={{marginRight:10}} />

        
                                

           )}
         />
        ) : (

      <FlatList
                       data={data?.cars?.slice(0, 20)}


                renderItem={({ item, index }) => <CarItem car={item} index={index} fullscreen={false} />}

                keyExtractor={(item) => {
       
                  return item.id;
                }}
                pagingEnabled
        contentContainerStyle={{gap:10,marginVertical:10}}
        horizontal
       
      />
        )}
    </View>

    <View>   
<View style={styles.row}>
<Text style={[styles.row_heading_left,{color:theme.primaryText}]}>Trending Brands</Text>
<Pressable onPress={()=> navigation.navigate('AllBrands')} >
  <Text style={[styles.row_heading_right,{color:theme.primaryText}]}>   
  View All
  </Text>
  
  </Pressable>


</View>
<Brands/>
</View>

<View>   
<View style={styles.row}>
<Text style={[styles.row_heading_left,{color:theme.primaryText}]}>Location</Text>
<Pressable onPress={()=> navigation.navigate('AllLocation')} >
  <Text style={[styles.row_heading_right,{color:theme.primaryText}]}>   
  View All
  </Text>
  
  </Pressable>



</View>
<Location/>
</View>

    
    </ScrollView>
  )
}

export default Home
