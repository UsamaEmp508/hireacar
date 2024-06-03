import React, { useContext } from 'react';
import { FlatList, View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { FONTSIZE } from '../../Theme/FontSize';
import { FONTFAMILY } from '../../Theme/FontFamily';
import { Theme, ThemeContext } from '../../Theme/ThemeContext';
import { darkTheme, lightTheme } from '../../Theme/Color';
import Animated, {FadeInDown, FadeInUp} from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native'; 

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

const Location = () => {
    const themeContext = useContext(ThemeContext);

    const theme = themeContext?.isDarkTheme ? darkTheme : lightTheme;
const navigation = useNavigation()

    const renderItem = ({ item,index }) => (
      <Animated.View entering={FadeInUp.delay(200 * index)}>
      <Pressable onPress={()=>navigation.navigate('location',{name:item.title}) }>  
      <View style={styles.image_container}>   
          <Image source={{uri:item.image}} style={styles.image} />
          
          </View>
        
          </Pressable>
        </Animated.View>
      );

  return (
    <FlatList
      data={DATA}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      horizontal={true}
      contentContainerStyle={{gap:25,marginVertical:10}}
    />
  );
};

const styles = StyleSheet.create({


  image_container:{

borderRadius:8,
padding:5

  },


  image: {
    width: 100, 
    height: 100, 
    borderRadius: 8,
    
  },
  title: {
    marginTop: 5,
    fontSize:FONTSIZE.size_12,
    fontFamily:FONTFAMILY.Poppins_SemiBold,
    textAlign:"center"
  },
});

export default Location
