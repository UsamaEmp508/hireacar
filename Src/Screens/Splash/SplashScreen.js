import React from 'react';
import {Image, StatusBar, StyleSheet, Text, View} from 'react-native';
import { FONTFAMILY } from '../../Theme/FontFamily';

const SplashScreen = () => {
  return (
    <View style={styles.splashContainer}>
      <Image
        style={styles.splashLogo}
        source={require('../../Assets/Images/download.png')}
      />

      <Text style={styles.slugText}>Drive, Discover, Dominate</Text>

    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  slugText: {
    fontSize: 14,
    color: '#21408E',
    flexWrap: 'wrap',
    paddingHorizontal: 40,
    textAlign: 'center',
    fontFamily:FONTFAMILY.Sora_Regular,
    marginTop:20
  },
  splashLogo: {
    width: 171,
   
    resizeMode: 'contain',
  },
  
 
});
