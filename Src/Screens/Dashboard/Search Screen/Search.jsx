import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { useQuery } from '@apollo/client';
import { GET_NEAREST_CARS } from '../../../Service/Queries';
import { useLocation } from '../../../Theme/LocationContext';
import Header from '../../../Components/Header/Header';
import { ThemeContext } from '../../../Theme/ThemeContext';
import { darkTheme, lightTheme } from '../../../Theme/Color';
import { SPACING } from '../../../Theme/Spacing';
import ActivityIndicatorModal from '../../../Components/ActivityIndicatorModal';
import CarItem from '../../../Components/Car Card/Card';
import { FlatList } from 'react-native-gesture-handler';

const Search = () => {

  const themeContext = useContext(ThemeContext);

  const theme = themeContext?.isDarkTheme ? darkTheme : lightTheme;
  const { state } = useLocation();

  const { location, completeAddress } = state;

  const { loading, error, data } = useQuery(GET_NEAREST_CARS, {
    variables: { latitude:location.latitude, longitude:location.longitude },
  });


  const renderItem = ({ item ,index}) => <CarItem car={item} index={index} fullscreen={true} />;


  return (
    <View style={[styles.container,{backgroundColor:theme.primaryBackground}]}>
<Header text={'Nearest Car'} />

{loading && <ActivityIndicatorModal loaderIndicator={loading} />}


{
data?.nearestCars?.length > 0  ?
<FlatList
data={data?.nearestCars}
renderItem={renderItem}
keyExtractor={(item) => item?.id}
contentContainerStyle={{gap:25,marginTop:10,paddingBottom:30}}
/>
:
<Text style={[styles.heading,{color:theme.primaryText,marginTop:20,textAlign:"center"}]}>No Cars available</Text>
}
    </View>
  )
}

export default Search

const styles = StyleSheet.create({


  container:{
    flex:1,
paddingHorizontal:SPACING.space_20
  
},

Header_Profile:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
paddingVertical:10



  },
  image_profile:{
    width:50,
    height:50,
    borderRadius:50,
   
  },
  image:{
    width:35,
    height:35,
   
  },
  header_text:{

   
    display: 'flex',
    flexDirection:'row',
    alignItems:'center',
    textAlign:'center',
fontStyle:"normal",
fontSize:18,
lineHeight:22,
fontWeight:"700",
textAlign:"center",
color:"#212325;"
  },

})