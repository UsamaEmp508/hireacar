import { ActivityIndicator, FlatList, Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useContext } from 'react'
import { lightTheme, darkTheme } from '../../../../Theme/Color';
import { ThemeContext } from '../../../../Theme/ThemeContext';
import Header from '../../../../Components/Header/Header';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { FONTSIZE } from '../../../../Theme/FontSize';
import { FONTFAMILY } from '../../../../Theme/FontFamily';
import { SPACING } from '../../../../Theme/Spacing';
import FastImage from 'react-native-fast-image';
const AllLocation = ({navigation}) => {

  const themeContext = useContext(ThemeContext);
  const theme = themeContext?.isDarkTheme ? darkTheme : lightTheme;
  
   
  const DATA = [
    {
      id: '1',
      title: 'Lahore',
      image: 'https://hireacar.pk/static/media/lahore.efac906c911bfe166ca7.png', 
    },
    {
      id: '2',
      title: 'islamabad',
      image: 'https://hireacar.pk/static/media/islamabad.4404e3083b7dab02df13.png', 
    },
    {
      id: '3',
      title: 'quetta',
      image: 'https://hireacar.pk/static/media/quetta.580e80cb698b44c30ad8.png', 
    },
    {
      id: '4',
      title: 'karachi',
      image: 'https://hireacar.pk/static/media/karachi.3047c02fc6be7d8fc646.png', 
    },
    {
      id: '5',
      title: 'Skoda',
      image: 'https://hireacar.pk/static/media/peshawar.036f33d2528299c94897.png', 
    },
    {
      id: '6',
      title: 'multan',
      image: 'https://hireacar.pk/static/media/multan.e9a86021d5346f3387d8.png', 
    },
    {
      id: '7',
      title: 'muzaffarabad',
      image: 'https://hireacar.pk/static/media/muzaffarabad.9247477fa645f25b4f49.png', 
    },
    {
      id: '8',
      title: 'gwadar',
      image: 'https://hireacar.pk/static/media/gwadar.9b022bd390554e57803a.png', 
    },
    {
      id: '9',
      title: 'jhelum',
      image: '  https://hireacar.pk/static/media/jhelum.04812e7ba88893e14500.png', 
    },
  
  ];
  
  


  const renderItem = ({ item,index }) => (
    <Animated.View entering={FadeInUp.delay(200 * index)}>
    <Pressable onPress={()=>navigation.navigate('location',{name:item.title}) } style={{marginRight:80}}>  
    <View style={styles.image_container}>   
        <FastImage source={{uri:item.image}} style={styles.image} />
        
        </View>
      
        </Pressable>
      </Animated.View>
    );
  return (
    <View style={[styles.container,{backgroundColor:theme.primaryBackground}]}>


<Header text={'All Location'}  />

<View style={styles.search}>

<View style={[styles.left,{backgroundColor:theme.InputFeild,borderColor:'#F1F1F0',borderWidth:1}]}> 
<Image source={require('../../../../Assets/Images/Home/Search_icon.png')} style={{tintColor:themeContext?.isDarkTheme?"#fff" :"#181B0E"}} />
<TextInput inputMode='text' style={styles.left_input} placeholder='Search Location here.....' placeholderTextColor={theme.PrimarylightText} />

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
        width: 80, 
        height: 80, 
        borderRadius: 8,
        
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

export default AllLocation
