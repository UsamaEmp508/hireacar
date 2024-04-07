import React, { useContext } from 'react';
import { FlatList, View, Text, Image, StyleSheet } from 'react-native';
import { FONTSIZE } from '../../Theme/FontSize';
import { FONTFAMILY } from '../../Theme/FontFamily';
import { Theme, ThemeContext } from '../../Theme/ThemeContext';
import { darkTheme, lightTheme } from '../../Theme/Color';

const DATA = [
  {
    id: '1',
    title: 'Audi',
    image: require('../../Assets/Images/Home/brand1.jpg'), 
  },
  {
    id: '2',
    title: 'BMW',
    image: require('../../Assets/Images/Home/brand2.jpg'), 
  },
  {
    id: '3',
    title: 'Ford',
    image: require('../../Assets/Images/Home/brand3.jpg'), 
  },
  {
    id: '4',
    title: 'Mercedes',
    image: require('../../Assets/Images/Home/brand4.jpg'), 
  },
  {
    id: '5',
    title: 'Skoda',
    image: require('../../Assets/Images/Home/brand10.jpg'), 
  },
  {
    id: '6',
    title: 'Jeep',
    image: require('../../Assets/Images/Home/brand9.jpg'), 
  },


];



const Brands = () => {

    const themeContext = useContext(ThemeContext);

    const theme = themeContext?.isDarkTheme ? darkTheme : lightTheme;


    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
      
      <View style={[styles.image_container,{backgroundColor:theme.BackgroundSecondary}]}>   
          <Image source={item.image} style={styles.image} />
          
          </View>
          <Text style={styles.title}>{item.title}</Text>
        </View>
      );

  return (
    <FlatList
      data={DATA}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      horizontal={true}
      contentContainerStyle={{gap:40,marginVertical:10}}
    />
  );
};

const styles = StyleSheet.create({


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
});

export default Brands;
