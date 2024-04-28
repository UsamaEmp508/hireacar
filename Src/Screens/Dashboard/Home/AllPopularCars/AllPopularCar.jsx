
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useContext } from 'react'
import CarItem from '../../../../Components/Car Card/Card';
import { ThemeContext } from '../../../../Theme/ThemeContext';
import { useQuery } from '@apollo/client';
import { GET_ALL_CARS } from '../../../../Service/Queries';
import { SPACING } from '../../../../Theme/Spacing';
import { FONTSIZE } from '../../../../Theme/FontSize';
import { FONTFAMILY } from '../../../../Theme/FontFamily';
import { darkTheme, lightTheme } from '../../../../Theme/Color';
import Header from '../../../../Components/Header/Header';

const AllPopularCar = () => {
  const themeContext = useContext(ThemeContext);
  const { loading, error, data } = useQuery(GET_ALL_CARS);
  const theme = themeContext?.isDarkTheme ? darkTheme : lightTheme;
 
  



const renderItem = ({ item ,index}) => <CarItem car={item} index={index} fullscreen={true} />;
  return (
    <View style={[styles.container,{backgroundColor:theme.primaryBackground}]}>


    <Header text={'Popular Cars'} />
    
    <View style={styles.search}>
    
    <View style={[styles.left,{backgroundColor:theme.InputFeild,borderColor:'#F1F1F0',borderWidth:1}]}> 
    <Image source={require('../../../../Assets/Images/Home/Search_icon.png')} style={{tintColor:"#181B0E"}} />
    <TextInput inputMode='text' style={styles.left_input} placeholder='Search Car here.....' placeholderTextColor={theme.PrimarylightText} />
    
    </View>
    
    
    
    
    
    </View>
    
    {
   data?.length < 1    ?
     
          <Text style={[styles.heading,{color:theme.primaryText,marginTop:20,textAlign:"center"}]}>No data available</Text>
    :
          <FlatList
            data={data?.cars}
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

export default AllPopularCar

const styles = StyleSheet.create({
   
    container:{
        flex:1,
        paddingHorizontal:SPACING.space_20
      },
      screen_title:{
        fontSize:FONTSIZE.size_18,
        fontFamily:FONTFAMILY.Poppins_SemiBold,
        textAlign:"center"
      },
  
      search:{
        marginTop:SPACING.space_10,
        flexDirection:"row",
        gap:15,
        alignItems:"center",
    },
  
    left:{
        flexDirection:"row",
    flex:1,
       gap:15,
  
       paddingHorizontal:SPACING.space_16,
        alignItems:"center",
        paddingVertical:SPACING.space_4,
        borderRadius:SPACING.space_15
    },
  
  left_input:{
  flex:1,
  fontSize:FONTSIZE.size_14,
  fontFamily:FONTFAMILY.Poppins_Regular
  
  },
  
  right:{
  justifyContent:"center",
  alignItems:"center",
  padding:10,
  borderRadius:10
  },
  


})