import React, { FC,useContext } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { styles } from './Style';
import { lightTheme,darkTheme } from '../../Theme/Color';
import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from '../../Theme/ThemeContext';

import AntDesign  from 'react-native-vector-icons/AntDesign';


const Header = ({ text }) => {
  const themeContext = useContext(ThemeContext);
  const theme = themeContext?.isDarkTheme ? darkTheme : lightTheme;
  const Navigation = useNavigation();


  return (
    <>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => Navigation.goBack()}>
        <AntDesign name="arrowleft" size={32} color={theme.primaryText} />
        </TouchableOpacity>
        <Text style={[styles.heading, { color: theme.primaryText,flex:1 }]}>{text}</Text>
        <View></View>
      </View>
    </>
  );
}

export default Header;