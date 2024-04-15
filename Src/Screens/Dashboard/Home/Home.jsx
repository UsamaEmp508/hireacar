import { FlatList, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { styles } from './Styles';
import { ThemeContext } from '../../../Theme/ThemeContext';
import { lightTheme, darkTheme } from '../../../Theme/Color';
import Brands from '../../../Components/BrandByCars/Brand';

import CarItem from '../../../Components/Car Card/Card';
import Location from '../../../Components/Location/Location';

const Home = () => {

    const themeContext = useContext(ThemeContext);

  const theme = themeContext?.isDarkTheme ? darkTheme : lightTheme;



  const carData = [
    {
      id: '1',
      image: require('../../../Assets/Images/Home/car1-660x440.jpg'), // Replace with your image source
      name: 'Toyota Camry',
      rating: 4.5,
      price: '$25,000',
      type: 'Sedan',
    },
    {
      id: '2',
      image: require('../../../Assets/Images/Home/car3-660x440.jpg'), // Replace with your image source
      name: 'Honda Civic',
      rating: 4.3,
      price: '$22,000',
      type: 'Sedan',
    },
    {
      id: '3',
      image: require('../../../Assets/Images/Home/car5-660x440.jpg'), // Replace with your image source
      name: 'Toyota Camry',
      rating: 4.5,
      price: '$25,000',
      type: 'Sedan',
    },
    {
      id: '4',
      image: require('../../../Assets/Images/Home/car6-660x440.jpg'), // Replace with your image source
      name: 'Honda Civic',
      rating: 4.3,
      price: '$22,000',
      type: 'Sedan',
    },
    {
      id: '5',
      image: require('../../../Assets/Images/Home/car8-660x440.jpg'), // Replace with your image source
      name: 'Honda Civic',
      rating: 4.3,
      price: '$22,000',
      type: 'Sedan',
    },
    {
      id: '6',
      image: require('../../../Assets/Images/Home/car11-660x440.jpg'), // Replace with your image source
      name: 'Honda Civic',
      rating: 4.3,
      price: '$22,000',
      type: 'Sedan',
    },
  
  ];

  const renderItem = ({ item ,index}) => <CarItem car={item} index={index} />;



  return (
    <ScrollView style={[styles.container,{backgroundColor:theme.primaryBackground}]}>
{/* header */}



<Text style={[styles.Header_heading,{color:theme.primaryText}]}>Hello Johnson</Text>
<Text style={[styles.Header_Subheading,{color:theme.PrimarylightText}]}>Lets Find Your Favourite car here </Text>


{/* Search bar */}
    


<View style={styles.search}>

<View style={[styles.left,{backgroundColor:theme.InputFeild,borderColor:'#F1F1F0',borderWidth:1}]}> 
<Image source={require('../../../Assets/Images/Home/Search_icon.png')} style={{tintColor:themeContext.isDarkTheme ? '#FFF':null,width:20,height:18}} />
<TextInput inputMode='text' style={styles.left_input} placeholder='Search your car' placeholderTextColor={theme.PrimarylightText} />

</View>


<View style={[styles.right,{backgroundColor:"#1F4590"}]}> 
<Image source={require('../../../Assets/Images/Home/Filter.png')}  style={{width:20,height:18,tintColor:"#ffffff",} } />

</View>


</View>


{/* row */}



<View>   
<View style={styles.row}>
<Text style={[styles.row_heading_left,{color:theme.primaryText}]}>Trending Brands</Text>
<Text style={[styles.row_heading_right,{color:theme.primaryText}]}>View All</Text>


</View>
<Brands/>
</View>

<View>   
<View style={styles.row}>
<Text style={[styles.row_heading_left,{color:theme.primaryText}]}>Location</Text>
<Text style={[styles.row_heading_right,{color:theme.primaryText}]}>View All</Text>


</View>
<Location/>
</View>



<View style={styles.row}>
<Text style={[styles.row_heading_left,{color:theme.primaryText}]}>Popular Cars</Text>
<Text style={[styles.row_heading_right,{color:theme.primaryText}]}>View All</Text>


</View>
<View>
      <FlatList
        data={carData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{gap:10,marginVertical:10}}
        horizontal
      />
    </View>


    <View style={styles.row}>
<Text style={[styles.row_heading_left,{color:theme.primaryText}]}>Cars By Price </Text>
<Text style={[styles.row_heading_right,{color:theme.primaryText}]}>View All</Text>


</View>
    

<View>
      <FlatList
        data={carData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{gap:10,marginVertical:10}}
        horizontal
      />
    </View>


    
    </ScrollView>
  )
}

export default Home
