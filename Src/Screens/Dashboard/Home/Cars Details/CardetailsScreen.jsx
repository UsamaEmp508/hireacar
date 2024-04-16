import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import Details from '../../../../Components/Car Details/Details';
import { FONTFAMILY } from '../../../../Theme/FontFamily';
import { FONTSIZE } from '../../../../Theme/FontSize';
import Animated, {FadeIn, FadeInDown} from 'react-native-reanimated';
import Header from '../../../../Components/DetailsHeader/Header';
import { ThemeContext } from '../../../../Theme/ThemeContext';
import { darkTheme, lightTheme } from '../../../../Theme/Color';

const CardetailsScreen = ({route}) => {

    const { id } = route.params;

    const themeContext = useContext(ThemeContext);

    const theme = themeContext?.isDarkTheme ? darkTheme : lightTheme;

    const carData = [
      {
        id: '1',
        image: [
          
          require('../../../../Assets/Images/Home/car1-660x440.jpg'), 
          require('../../../../Assets/Images/Home/car5-660x440.jpg'),
          require('../../../../Assets/Images/Home/car6-660x440.jpg'),
          require('../../../../Assets/Images/Home/car8-660x440.jpg'),
          require('../../../../Assets/Images/Home/car11-660x440.jpg'),
  
        ],
        name: 'Toyota Camry',
        rating: 4.5,
        price: '$25,000',
        type: 'Sedan',
      },
      {
        id: '2',
        image: [
          
          require('../../../../Assets/Images/Home/car11-660x440.jpg'), 
          require('../../../../Assets/Images/Home/car5-660x440.jpg'),
          require('../../../../Assets/Images/Home/car6-660x440.jpg'),
          require('../../../../Assets/Images/Home/car8-660x440.jpg'),
          require('../../../../Assets/Images/Home/car11-660x440.jpg'),
  
        ],
        name: 'Honda Civic',
        rating: 4.3,
        price: '$22,000',
        type: 'Sedan',
      },
      {
        id: '3',
        image: [
          
          require('../../../../Assets/Images/Home/car3-660x440.jpg'), 
          require('../../../../Assets/Images/Home/car5-660x440.jpg'),
          require('../../../../Assets/Images/Home/car6-660x440.jpg'),
          require('../../../../Assets/Images/Home/car8-660x440.jpg'),
          require('../../../../Assets/Images/Home/car11-660x440.jpg'),
  
        ],
        name: 'Toyota Camry',
        rating: 4.5,
        price: '$25,000',
        type: 'Sedan',
      },
      {
        id: '4',
        image: [
          
          require('../../../../Assets/Images/Home/car5-660x440.jpg'), 
          require('../../../../Assets/Images/Home/car5-660x440.jpg'),
          require('../../../../Assets/Images/Home/car6-660x440.jpg'),
          require('../../../../Assets/Images/Home/car8-660x440.jpg'),
          require('../../../../Assets/Images/Home/car11-660x440.jpg'),
  
        ],
        name: 'Honda Civic',
        rating: 4.3,
        price: '$22,000',
        type: 'Sedan',
      },
      {
        id: '5',
        image: [
          require('../../../../Assets/Images/Home/car8-660x440.jpg'), 
          require('../../../../Assets/Images/Home/car5-660x440.jpg'),
          require('../../../../Assets/Images/Home/car6-660x440.jpg'),
          require('../../../../Assets/Images/Home/car8-660x440.jpg'),
          require('../../../../Assets/Images/Home/car11-660x440.jpg'),
  
        ],
        name: 'Honda Civic',
        rating: 4.3,
        price: '$22,000',
        type: 'Sedan',
      },
      {
        id: '6',
          image: [
          
          require('../../../../Assets/Images/Home/car1-660x440.jpg'), 
          require('../../../../Assets/Images/Home/car5-660x440.jpg'),
          require('../../../../Assets/Images/Home/car6-660x440.jpg'),
          require('../../../../Assets/Images/Home/car8-660x440.jpg'),
          require('../../../../Assets/Images/Home/car11-660x440.jpg'),
  
        ],
        name: 'Honda Civic',
        rating: 4.3,
        price: '$22,000',
        type: 'Sedan',
      },
    
    ];
  
   
  
   
    const selecteddata = carData.find((data)=> data.id === id)

console

  return (
      <View style={[styles.container,{backgroundColor:theme.primaryBackground}]}>


<Details data={selecteddata} />
    </View>
  )
}

export default CardetailsScreen

const styles = StyleSheet.create({

  container: {
  flex:1
 
   
    
      },
    
})