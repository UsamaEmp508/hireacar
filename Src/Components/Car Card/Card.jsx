import React, { useContext, useState } from 'react';
import { StyleSheet, View, Text, Image, Pressable, ScrollView, FlatList } from 'react-native';
import { Theme, ThemeContext } from '../../Theme/ThemeContext';
import { darkTheme, lightTheme } from '../../Theme/Color';
import { useNavigation } from '@react-navigation/native'; 
import { FONTSIZE } from '../../Theme/FontSize';
import { FONTFAMILY } from '../../Theme/FontFamily';
import Animated, {FadeInDown} from 'react-native-reanimated';
import Carousel, { Pagination } from 'react-native-snap-carousel';

const CarItem = ({ car,index}) => {
  const [activeIndex, setActiveIndex] = useState(0);
 
    const themeContext = useContext(ThemeContext);

    const theme = themeContext?.isDarkTheme ? darkTheme : lightTheme;
    const navigation = useNavigation(); // Initialize navigation hook

    const goToCarDetails = () => {
      // Navigate to CarDetails screen with the car id as parameter
      navigation.navigate('CarDetails', { id: car.id });
    };
;
  
   
    return (

      <Animated.View entering={FadeInDown.delay(200 * index)}>
    <Pressable onPress={goToCarDetails} style={[styles.container,{backgroundColor:theme.BackgroundSecondary}]} activeOpacity={0.7}>

  
    <Animated.Image
            source={car.image[0]}
            style={styles.image}
            sharedTransitionTag={car?.name}
          />
   


  


     <View style={styles.detailsContainer}>

        <View style={styles.row}>   
        <Text style={[styles.carName,{color:theme.primaryText}]}>{car.name}</Text>
        <Text style={[styles.rating,{color:theme.PrimarylightText}]}>{car.rating}</Text>
        </View>
        <View style={styles.priceContainer}>
          <Text style={[styles.price,{color:theme.PrimarylightText}]}>{car.price}</Text>
          <Text style={[styles.carType,{color:theme.PrimarylightText}]}>{car.type}</Text>
        </View>
      </View>
    </Pressable>

    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
  
 
borderRadius:10,
overflow:'hidden',

  },
  image: {
    width: '100%',
    height: 100,
    borderRadius: 10,
    marginRight: 10,
    backgroundColor:"transparent"
  },

row:{
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center",
    marginTop:10,
    gap:10,
    borderBottomWidth:1,
    borderBottomColor:'#F3F2F3'
},

  detailsContainer: {
    paddingHorizontal:16,
    paddingVertical:10,

},
  carName: {
    fontSize:FONTSIZE.size_16,
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
    alignItems:"center",
    marginTop:10
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
