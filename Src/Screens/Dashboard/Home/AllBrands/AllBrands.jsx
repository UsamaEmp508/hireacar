import { ActivityIndicator, FlatList, Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useContext } from 'react'
import { lightTheme, darkTheme } from '../../../../Theme/Color';
import { ThemeContext } from '../../../../Theme/ThemeContext';
import Header from '../../../../Components/Header/Header';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { FONTSIZE } from '../../../../Theme/FontSize';
import { FONTFAMILY } from '../../../../Theme/FontFamily';
import { SPACING } from '../../../../Theme/Spacing';
const AllBrand = ({navigation}) => {

  const themeContext = useContext(ThemeContext);
  const theme = themeContext?.isDarkTheme ? darkTheme : lightTheme;
  
   
  const DATA = [
    {
      id: '1',
      title: 'Audi',
      image: require('../../../../Assets/Images/Home/brand1.jpg'), 
    },
    {
      id: '2',
      title: 'BMW',
      image: require('../../../../Assets/Images/Home/brand2.jpg'), 
    },
    {
      id: '3',
      title: 'Ford',
      image: require('../../../../Assets/Images/Home/brand3.jpg'), 
    },
    {
      id: '4',
      title: 'Mercedes',
      image: require('../../../../Assets/Images/Home/brand4.jpg'), 
    },
    {
      id: '5',
      title: 'Skoda',
      image: require('../../../../Assets/Images/Home/brand10.jpg'), 
    },
    {
      id: '6',
      title: 'Jeep',
      image: require('../../../../Assets/Images/Home/brand9.jpg'), 
    },
  
  
  ];
  


  const renderItem = ({ item,index }) => (
    <Animated.View entering={FadeInUp.delay(200 * index)}>
    <Pressable onPress={()=>navigation.navigate('Brand',{name:item.title}) }   style={{marginRight:50}}>  
    <View style={styles.image_container}>   
        <Image source={item.image} style={styles.image} />
        
        </View>
        <Text style={[styles.title,{color:theme.PrimarylightText}]}>{item.title}</Text>
        </Pressable>
      </Animated.View>
    );
  return (
    <View style={[styles.container,{backgroundColor:theme.primaryBackground}]}>


<Header text={'All Brands'}  />

<View style={styles.search}>

<View style={[styles.left,{backgroundColor:theme.InputFeild,borderColor:'#F1F1F0',borderWidth:1}]}> 
<Image source={require('../../../../Assets/Images/Home/Search_icon.png')} style={{tintColor:"#181B0E"}} />
<TextInput inputMode='text' style={styles.left_input} placeholder='Search Brand here.....' placeholderTextColor={theme.PrimarylightText} />

</View>





</View>
<FlatList
      data={DATA}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      numColumns={3}
      contentContainerStyle={{marginVertical:10,gap:20}}
    />
    </View>
  )
}

const styles = StyleSheet.create({

    container:{
        flex:1,
        paddingHorizontal:SPACING.space_20
      },
    image_container:{
  
  borderRadius:8,
  padding:5
  
    },
  
  
    image: {
      width: 60, 
      height: 60, 
      borderRadius: 10,
      
    },
    title: {
      marginTop: 5,
      fontSize:FONTSIZE.size_12,
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
  heading: {
    fontSize:FONTSIZE.size_16,
    fontFamily:FONTFAMILY.Poppins_SemiBold,
    marginBottom: 5,
  },
  });

export default AllBrand
