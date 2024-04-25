import { ActivityIndicator, FlatList, Image, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { styles } from './Styles';
import { ThemeContext } from '../../../Theme/ThemeContext';
import { lightTheme, darkTheme } from '../../../Theme/Color';
import Brands from '../../../Components/BrandByCars/Brand';

import CarItem from '../../../Components/Car Card/Card';
import Location from '../../../Components/Location/Location';
import { useNavigation } from '@react-navigation/native';
import { GET_ALL_CARS } from '../../../Service/Queries';
import { useQuery } from '@apollo/client';
import { ChatState } from '../../../Context/ChatProvider';

const Home = () => {
  const { loading, error, data } = useQuery(GET_ALL_CARS);
    const themeContext = useContext(ThemeContext);

  const theme = themeContext?.isDarkTheme ? darkTheme : lightTheme;

  const navigation = useNavigation()


const { user} = ChatState();
  
  


  return (
    <ScrollView style={[styles.container,{backgroundColor:theme.primaryBackground}]}>
{/* header */}
<View style={styles.Header_Profile}>
<TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Image source={{uri:user?.userByGoogleId?.photoLink}} style={styles.image_profile} />
        </TouchableOpacity>

<TouchableOpacity onPress={() => navigation.navigate('Notification')}>
  <Image source={require('../../../Assets/Images/notifiaction.png')} style={[styles.image,{tintColor:'#1F4590'}]} />
</TouchableOpacity>

   </View>


<Text style={[styles.Header_heading,{color:theme.primaryText}]}>Hello {user?.userByGoogleId?.displayName}</Text>
<Text style={[styles.Header_Subheading,{color:theme.PrimarylightText}]}>Lets Find Your Favourite car here </Text>


{/* Search bar */}
    


<View style={styles.search}>

<View style={[styles.left,{backgroundColor:theme.InputFeild,borderColor:'#F1F1F0',borderWidth:1}]}> 
<Image source={require('../../../Assets/Images/Home/Search_icon.png')} style={{tintColor:themeContext.isDarkTheme ? '#FFF':null,width:20,height:18}} />
<TextInput inputMode='text' style={styles.left_input} placeholder='Search your car' placeholderTextColor={theme.PrimarylightText} />

</View>


<View style={[styles.right,{backgroundColor:"#1F4590"}]}> 
<Image source={require('../../../Assets/Images/Home/Filter.png')}  style={{width:20,height:18,tintColor:"#ffffff",} } />

</View>


</View>


{/* row */}



<View>   
<View style={styles.row}>
<Text style={[styles.row_heading_left,{color:theme.primaryText}]}>Trending Brands</Text>
<Pressable onPress={()=> navigation.navigate('AllBrands')} >
  <Text style={[styles.row_heading_right,{color:theme.primaryText}]}>   
  View All
  </Text>
  
  </Pressable>


</View>
<Brands/>
</View>

<View>   
<View style={styles.row}>
<Text style={[styles.row_heading_left,{color:theme.primaryText}]}>Location</Text>
<Pressable onPress={()=> navigation.navigate('AllLocation')} >
  <Text style={[styles.row_heading_right,{color:theme.primaryText}]}>   
  View All
  </Text>
  
  </Pressable>



</View>
<Location/>
</View>



<View style={styles.row}>
<Text style={[styles.row_heading_left,{color:theme.primaryText}]}>Popular Cars</Text>
<Pressable onPress={()=> navigation.navigate('AllCarPopular')} >
  <Text style={[styles.row_heading_right,{color:theme.primaryText}]}>   
  View All
  </Text>
  
  </Pressable>


</View>
<View>

{  error &&   <Text style={[styles.row_heading_right,{color:theme.primaryText}]}>Error fetching data</Text>}


      <FlatList
         data={data?.cars?.slice(0, 20)}
        renderItem={({ item, index }) => <CarItem car={item} index={index} fullscreen={false} />}
        keyExtractor={(item) => {
       
          return item.id;
        }}
        contentContainerStyle={{gap:10,marginVertical:10}}
        horizontal
        ListEmptyComponent={() => {
          if (loading) {
            return <ActivityIndicator size="large" color="#1F4590" style={{alignSelf:"center"}} />;
          } else {
            return null;
          }
        }}
      
      />
</View>



    <View style={styles.row}>
<Text style={[styles.row_heading_left,{color:theme.primaryText}]}>Cars By Price </Text>
<Pressable onPress={()=> navigation.navigate('AllCarPrice')} >
  <Text style={[styles.row_heading_right,{color:theme.primaryText}]}>   
  View All
  </Text>
  
  </Pressable>



</View>
    

<View>

{  error &&   <Text style={[styles.row_heading_right,{color:theme.primaryText}]}>Error fetching data</Text>}

      <FlatList
                       data={data?.cars?.slice(0, 20)}


                renderItem={({ item, index }) => <CarItem car={item} index={index} fullscreen={false} />}

                keyExtractor={(item) => {
       
                  return item.id;
                }}
        contentContainerStyle={{gap:10,marginVertical:10}}
        horizontal
        ListEmptyComponent={() => {
          if (loading) {
            return <ActivityIndicator size="large" color="#1F4590" />;
          } else {
            return null;
          }
        }}
      />
    </View>


    
    </ScrollView>
  )
}

export default Home
