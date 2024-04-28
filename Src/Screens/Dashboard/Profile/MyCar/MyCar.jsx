import { StyleSheet, Text, TextInput, View,Image, FlatList } from 'react-native'
import React, { useContext } from 'react'
import Header from '../../../../Components/Header/Header'
import { ThemeContext } from '../../../../Theme/ThemeContext';
import { darkTheme, lightTheme } from '../../../../Theme/Color';
import { SPACING } from '../../../../Theme/Spacing';
import { FONTSIZE } from '../../../../Theme/FontSize';
import { FONTFAMILY } from '../../../../Theme/FontFamily';
import CarItem from '../../../../Components/Car Card/Card';
import { useQuery } from '@apollo/client';
import { ChatState } from '../../../../Context/ChatProvider';
import { GET_USER_PROFILE } from '../../../../Service/Queries';

const MyCar = () => {

    const themeContext = useContext(ThemeContext);

  const theme = themeContext?.isDarkTheme ? darkTheme : lightTheme;
  const { user} = ChatState();

  const { loading, error, data,refetch } = useQuery(GET_USER_PROFILE, {
    variables: { id: user?.userByGoogleId?.id }
  });
console.log('data',data)
      const renderItem = ({ item ,index}) => <CarItem car={item} index={index} />;

    return (
    <View style={[styles.container,{backgroundColor:theme.primaryBackground}]}>

      <Header text={'My Car'}  />

<View style={styles.search}>

<View style={[styles.left,{backgroundColor:theme.InputFeild,borderColor:'#F1F1F0',borderWidth:1}]}> 
<Image source={require('../../../../Assets/Images/Home/Search_icon.png')} style={{tintColor:"#181B0E"}} />
<TextInput inputMode='text' style={styles.left_input} placeholder='Search Car here.....' placeholderTextColor={theme.PrimarylightText} />

</View>





</View>

{
data?.user?.cars.length > 0  ?
<FlatList
data={data?.user?.cars}
renderItem={renderItem}
keyExtractor={(item) => item.id}
contentContainerStyle={{gap:25,marginTop:10,paddingBottom:30}}
/>
:
<Text style={[styles.heading,{color:theme.primaryText,marginTop:20,textAlign:"center"}]}>No Cars available</Text>
}
     
    </View>
  )
}

export default MyCar

const styles = StyleSheet.create({

    container:{
        flex:1,
        paddingHorizontal:SPACING.space_20
      },
      screen_title:{
        fontSize:FONTSIZE.size_18,
        fontFamily:FONTFAMILY.Poppins_SemiBold
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