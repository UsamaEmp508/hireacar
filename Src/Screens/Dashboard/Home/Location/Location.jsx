import { FlatList, Image, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useContext } from 'react'
import CarItem from '../../../../Components/Car Card/Card';
import { styles } from './Style';
import { lightTheme, darkTheme } from '../../../../Theme/Color';
import { ThemeContext } from '../../../../Theme/ThemeContext';
import Header from '../../../../Components/Header/Header';
import { useQuery } from '@apollo/client';
import { GET_ALL_CARS } from '../../../../Service/Queries';
const LocationCars = ({route}) => {
  const { name } = route.params;
  const themeContext = useContext(ThemeContext);
  const { loading, error, data } = useQuery(GET_ALL_CARS);
  const theme = themeContext?.isDarkTheme ? darkTheme : lightTheme;
 
  const selectedbrands = data?.cars?.filter((data)=> data.City === name)



const renderItem = ({ item ,index}) => <CarItem car={item} index={index} fullscreen={true} />;

  return (
    <View style={styles.container}>


<Header text={'Cars By Location'} />

<View style={styles.search}>

<View style={[styles.left,{backgroundColor:theme.InputFeild,borderColor:'#F1F1F0',borderWidth:1}]}> 
<Image source={require('../../../../Assets/Images/Home/Search_icon.png')} style={{tintColor:"#181B0E"}} />
<TextInput inputMode='text' style={styles.left_input} placeholder='Search Car here.....' placeholderTextColor={theme.PrimarylightText} />

</View>





</View>

{
selectedbrands.length < 1    ?
 
      <Text style={[styles.heading,{color:theme.primaryText,marginTop:20,textAlign:"center"}]}>No data available</Text>
:
      <FlatList
        data={selectedbrands}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{gap:25,marginTop:20,paddingBottom:30}}
        ListEmptyComponent={() => {
          if (loading) {
            return <ActivityIndicator size="large" color="#1F4590" />;
          } else {
            return null;
          }
        }}
      />

}
    </View>
  )
}

export default LocationCars
