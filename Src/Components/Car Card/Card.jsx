import React, { useContext } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { Theme, ThemeContext } from '../../Theme/ThemeContext';
import { darkTheme, lightTheme } from '../../Theme/Color';
import { FONTSIZE } from '../../Theme/FontSize';
import { FONTFAMILY } from '../../Theme/FontFamily';
import Animated from 'react-native-reanimated';
const CarItem = ({ car }) => {
 
    const themeContext = useContext(ThemeContext);

    const theme = themeContext?.isDarkTheme ? darkTheme : lightTheme;
 
 
    return (
    <View style={[styles.container,{backgroundColor:theme.BackgroundSecondary}]}>

     <View>   
      <Animated.Image source={car.image} style={styles.image}  sharedTransitionTag="tag" />
     
      </View>
     
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
  
 paddingHorizontal:20,
paddingVertical:10,
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
