import { FlatList, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { styles } from './Styles';
import { ThemeContext } from '../../../Theme/ThemeContext';
import { lightTheme, darkTheme } from '../../../Theme/Color';
import Brands from '../../../Components/BrandByCars/Brand';
import Material from 'react-native-vector-icons/MaterialCommunityIcons'
import Popular from '../../../Components/Popular Cars/Popular';

const Home = () => {

    const themeContext = useContext(ThemeContext);

  const theme = themeContext?.isDarkTheme ? darkTheme : lightTheme;



  return (
    <ScrollView style={[styles.container,{backgroundColor:theme.primaryBackground}]}>
{/* header */}



<Text style={[styles.Header_heading,{color:theme.primaryText}]}>Hello Johnson</Text>
<Text style={[styles.Header_Subheading,{color:theme.primaryText}]}>Lets Find Your Favourite car here </Text>


{/* Search bar */}
    


<View style={styles.search}>

<View style={[styles.left,{backgroundColor:theme.InputFeild,borderColor:'#F1F1F0',borderWidth:1}]}> 
<Image source={require('../../../Assets/Images/Home/Search_icon.png')} style={{tintColor:"#181B0E"}} />
<TextInput inputMode='text' style={styles.left_input} placeholder='Search your car' placeholderTextColor={theme.PrimarylightText} />

</View>


<View style={[styles.right,{backgroundColor:"#C3E54B"}]}> 
<Image source={require('../../../Assets/Images/Home/Filter.png')}  style={{width:28,height:25,tintColor:"#ffffff"} } />

</View>


</View>


{/* row */}



<View>   
<View style={styles.row}>
<Text style={[styles.row_heading_left,{color:theme.primaryText}]}>Trending Brands</Text>
<Text style={[styles.row_heading_right,{color:theme.primaryText}]}>View All</Text>


</View>
<Brands/>
</View>
<View style={styles.row}>
<Text style={[styles.row_heading_left,{color:theme.primaryText}]}>Popular Cars</Text>
<Text style={[styles.row_heading_right,{color:theme.primaryText}]}>View All</Text>


</View>
<Popular/>



    
    
    </ScrollView>
  )
}

export default Home
