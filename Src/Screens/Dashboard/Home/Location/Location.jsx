import { FlatList, Image, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useContext } from 'react'
import CarItem from '../../../../Components/Car Card/Card';
import { styles } from './Style';
import { lightTheme, darkTheme } from '../../../../Theme/Color';
import { ThemeContext } from '../../../../Theme/ThemeContext';
import Header from '../../../../Components/Header/Header';
const LocationCars = ({route}) => {
  const { name } = route.params;
  const themeContext = useContext(ThemeContext);

  const theme = themeContext?.isDarkTheme ? darkTheme : lightTheme;
  const carData = [
    {
      id: '1',
      image: require('../../../../Assets/Images/Home/car1-660x440.jpg'), 
      name: 'Toyota Camry',
      brand: 'Ford',
      rating: 4.5,
      price: '$25,000',
      type: 'Sedan',
      city: 'Lahore'
    },
    {
      id: '2',
      image: require('../../../../Assets/Images/Home/car3-660x440.jpg'),
      name: 'Ford',
      brand: 'Ford',
      rating: 4.3,
      price: '$22,000',
      type: 'Sedan',
      city: 'Islamabad'
    },
    {
      id: '3',
      image: require('../../../../Assets/Images/Home/car5-660x440.jpg'),
      name: 'Ford',
      brand: 'Ford',
      rating: 4.5,
      price: '$25,000',
      type: 'Sedan',
      city: 'Quetta'
    },
    {
      id: '4',
      image: require('../../../../Assets/Images/Home/car6-660x440.jpg'),
      name: 'Ford',
      brand: 'Ford',
      rating: 4.3,
      price: '$22,000',
      type: 'Sedan',
      city: 'Karachi'
    },
    {
      id: '5',
      image: require('../../../../Assets/Images/Home/car8-660x440.jpg'),
      name: 'Ford',
      brand: 'Ford',
      rating: 4.3,
      price: '$22,000',
      type: 'Sedan',
      city: 'Skoda'
    },
    {
      id: '6',
      image: require('../../../../Assets/Images/Home/car9-660x440.jpg'),
      name: 'Ford',
      brand: 'Ford',
      rating: 4.3,
      price: '$22,000',
      type: 'Sedan',
      city: 'Multan'
    },
    {
      id: '7',
      image: require('../../../../Assets/Images/Home/car11-660x440.jpg'),
      name: 'Ford',
      brand: 'Ford',
      rating: 4.4,
      price: '$20,000',
      type: 'Sedan',
      city: 'Muzaffarabad'
    },
    {
      id: '8',
      image: require('../../../../Assets/Images/Home/car12-660x440.jpg'),
      name: 'Ford Mustang',
      brand: 'Ford',
      rating: 4.7,
      price: '$30,000',
      type: 'Coupe',
      city: 'Gwadar'
    },
    {
      id: '9',
      image: require('../../../../Assets/Images/Home/car13-660x440.jpg'),
      name: 'Ford',
      brand: 'Ford',
      rating: 4.6,
      price: '$28,000',
      type: 'Coupe',
      city: 'Jhelum'
    },
    {
      id: '10',
      image: require('../../../../Assets/Images/Home/car14-660x440.jpg'),
      name: 'BMW 3 Series',
      brand: 'BMW',
      rating: 4.8,
      price: '$35,000',
      type: 'Sedan',
      city: 'Lahore'
    },
    {
      id: '11',
      image: require('../../../../Assets/Images/Home/car17-660x440.jpg'),
      name: 'Audi A4',
      brand: 'Audi',
      rating: 4.7,
      price: '$32,000',
      type: 'Sedan',
      city: 'Islamabad'
    },
    {
      id: '12',
      image: require('../../../../Assets/Images/Home/car19-660x440.jpg'),
      name: 'Ford',
      brand: 'Ford',
      rating: 4.8,
      price: '$38,000',
      type: 'Sedan',
      city: 'Quetta'
    },
    {
      id: '13',
      image: require('../../../../Assets/Images/Home/car20-660x440.jpg'),
      name: 'Nissan Altima',
      brand: 'Nissan',
      rating: 4.5,
      price: '$24,000',
      type: 'Sedan',
      city: 'Karachi'
    },
  ];
  
   
const selectedbrands = carData.filter((data)=> data.city === name)

console.log('brands data ',selectedbrands)

const renderItem = ({ item ,index}) => <CarItem car={item} index={index} />;

  return (
    <View style={styles.container}>


<Header text={'Cars By Location'} />

<View style={styles.search}>

<View style={[styles.left,{backgroundColor:theme.InputFeild,borderColor:'#F1F1F0',borderWidth:1}]}> 
<Image source={require('../../../../Assets/Images/Home/Search_icon.png')} style={{tintColor:"#181B0E"}} />
<TextInput inputMode='text' style={styles.left_input} placeholder='Search Car here.....' placeholderTextColor={theme.PrimarylightText} />

</View>





</View>


      <FlatList
        data={selectedbrands}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{gap:25,marginTop:10,paddingBottom:30}}
      />
    </View>
  )
}

export default LocationCars
