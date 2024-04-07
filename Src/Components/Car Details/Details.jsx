import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Animated from 'react-native-reanimated';
import { FONTSIZE } from '../../Theme/FontSize';
import { FONTFAMILY } from '../../Theme/FontFamily';

const Details = ({data}) => {
  
  return (
      <View style={styles.container}>
      <Animated.Image source={data.image} style={styles.image}  sharedTransitionTag="tag" />
     
      <Text style={styles.carName}>Name: {data.name}</Text>
      <Text style={styles.rating}>Rating: {data.rating}</Text>
      <Text style={styles.price}>Price: {data.price}</Text>
      <Text style={styles.carType}>Type: {data.type}</Text>
      {/* You can render additional details here */}
    </View>
  )
}

export default Details

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
})