import { ActivityIndicator, FlatList, Image, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useContext } from 'react'
import CarItem from '../../../../Components/Car Card/Card';
import { styles } from '../AllBrands/Style';
import { lightTheme, darkTheme } from '../../../../Theme/Color';
import { ThemeContext } from '../../../../Theme/ThemeContext';
import Header from '../../../../Components/Header/Header';
import { useQuery } from '@apollo/client';
import { GET_ALL_CARS } from '../../../../Service/Queries';
import { Skeleton } from '@rneui/base';
const Brand = ({route}) => {
  const { name } = route.params;
  const themeContext = useContext(ThemeContext);
  const { loading, error, data } = useQuery(GET_ALL_CARS);
  const theme = themeContext?.isDarkTheme ? darkTheme : lightTheme;
  const isloading = true
   
const selectedbrands = data?.cars?.filter((data)=> data.name === name)

const renderItem = ({ item ,index}) => <CarItem car={item} index={index} fullscreen={true} />;



  return (
    <View style={[styles.container,{backgroundColor:theme.primaryBackground}]}>


<Header text={'Cars By Brands'}  />

<View style={styles.search}>

<View style={[styles.left,{backgroundColor:theme.InputFeild,borderColor:'#F1F1F0',borderWidth:1}]}> 
<Image source={require('../../../../Assets/Images/Home/Search_icon.png')} style={{tintColor:themeContext?.isDarkTheme?"#fff" :"#181B0E"}} />
<TextInput inputMode='text' style={styles.left_input} placeholder='Search Car here.....' placeholderTextColor={theme.PrimarylightText} />

</View>





</View>
{
selectedbrands?.length < 1    ?
 
      <Text style={[styles.heading,{color:theme.primaryText,marginTop:20,textAlign:"center"}]}>No data available</Text>
:


isloading ? (
  <FlatList
  data={Array.from({length: 8})}
  showsVerticalScrollIndicator={false}
contentContainerStyle={{alignSelf:"center",marginTop:10}}
  keyExtractor={(item, index) => index.toString()}
  renderItem={({index}) => (
      <Skeleton  animation="wave"
      width={300} height={200} style={{marginBottom:10}} />


                       

  )}
/>
) : (


      <FlatList
        data={selectedbrands}
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
)

}
    </View>
  )
}

export default Brand
