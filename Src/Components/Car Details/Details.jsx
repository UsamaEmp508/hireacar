import { StyleSheet, Text, View,Image } from 'react-native'
import React from 'react'
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import { FONTSIZE } from '../../Theme/FontSize';
import { FONTFAMILY } from '../../Theme/FontFamily';
import Header from '../DetailsHeader/Header';

const Details = ({data}) => {
  
  return (
      <View >
      <Header />

<Animated.Image source={data?.image} style={styles.image}  sharedTransitionTag={data?.name} />
<Animated.View
    
      entering={FadeIn.delay(600)}>   
<Text style={styles.carName}>Name: {data?.name}</Text>
<Text style={styles.rating}>Rating: {data?.rating}</Text>

</Animated.View>

<Animated.View entering={FadeInDown.delay(800)}>
<Text style={styles.price}>Price: {data?.price}</Text>
<Text style={styles.carType}>Type: {data?.type}</Text>


</Animated.View>
    </View>
  )
}

export default Details

const styles = StyleSheet.create({
 
      image: {
        width: '100%',
        height: 150,
  
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

})