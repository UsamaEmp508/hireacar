import React, { useContext } from 'react';
import { StyleSheet, View, Text, Image, Pressable } from 'react-native';
import { Theme, ThemeContext } from '../../Theme/ThemeContext';
import { darkTheme, lightTheme } from '../../Theme/Color';
import { useNavigation } from '@react-navigation/native'; 
import { FONTSIZE } from '../../Theme/FontSize';
import { FONTFAMILY } from '../../Theme/FontFamily';
import Animated, {FadeInDown} from 'react-native-reanimated';
import { TouchableOpacity } from 'react-native';
const CarItem = ({ car ,index}) => {
 
    const themeContext = useContext(ThemeContext);

    const theme = themeContext?.isDarkTheme ? darkTheme : lightTheme;
    const navigation = useNavigation(); // Initialize navigation hook

    const goToCarDetails = () => {
      // Navigate to CarDetails screen with the car id as parameter
      navigation.navigate('CarDetails', { id: car.id });
    };
  
 
    return (

      <Animated.View entering={FadeInDown.delay(200 * index)}>
    <Pressable onPress={goToCarDetails} style={[styles.container,{backgroundColor:theme.BackgroundSecondary}]} activeOpacity={0.7}>

      <Animated.Image source={car.image} style={styles.image}  sharedTransitionTag={car.name} />
     
     
     <View style={styles.detailsContainer}>

        <View style={styles.row}>   
        <Text style={styles.carName}>{car.name}</Text>
        <Text style={styles.rating}>Rating: {car.rating}</Text>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>{car.price}</Text>
          <Text style={styles.carType}>{car.type}</Text>
        </View>
      </View>
    </Pressable>

    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
  
 
borderRadius:10

  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginRight: 10,
    backgroundColor:"transparent"
  },

row:{
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center",
    marginTop:10
},

  detailsContainer: {
    paddingHorizontal:20,
    paddingVertical:10,

},
  carName: {
    fontSize:FONTSIZE.size_12,
    fontFamily:FONTFAMILY.Poppins_SemiBold,
    marginBottom: 5,
  },
  rating: {
    fontSize:FONTSIZE.size_12,
    fontFamily:FONTFAMILY.Poppins_SemiBold,
    marginBottom: 5,
  },
  priceContainer: {
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center"
  },
  price: {
    fontSize:FONTSIZE.size_12,
    fontFamily:FONTFAMILY.Poppins_SemiBold,
    marginRight: 5,
  },
  carType: {
    fontSize:FONTSIZE.size_12,
    fontFamily:FONTFAMILY.Poppins_SemiBold,
  },
});

export default CarItem;
