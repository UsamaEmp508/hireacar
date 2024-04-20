import { Image, Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { styles } from './Style'
import { ThemeContext } from '../../../Theme/ThemeContext'
import { lightTheme,darkTheme } from '../../../Theme/Color'
import { GoogleSignin, statusCodes, GoogleSigninButton } from '@react-native-google-signin/google-signin';
const Login = () => {

    
    const themeContext = useContext(ThemeContext);

  const theme = themeContext?.isDarkTheme ? darkTheme : lightTheme;
  const webClientId = "421313407099-ehfuivfr1dcibch496vpm0dss9ssks0c.apps.googleusercontent.com"; 

  useEffect(()=>{
      GoogleSignin.configure({
          webClientId: webClientId,
      })
  },[])


const googleLogin = async () => {
    try {
        await GoogleSignin.hasPlayServices();
        const userInfo = await GoogleSignin.signIn();
        console.log("userinfo", userInfo);

    } catch (error) {
        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            console.log(error)
        } else if (error.code === statusCodes.IN_PROGRESS) {
            console.log(error)
        } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            console.log(error)
        } else {
        }
    }
  };
  return (
    <View style={[styles.container,{backgroundColor:theme.primaryBackground}]}>
<TouchableOpacity style={[styles.logim_google,{borderColor:"#F1F1F0",borderWidth:1}]}   onPress={googleLogin}>
<Image source={require('../../../Assets/Images/Login/flat-color-icons_google.png')} />
      <Text style={[styles.title,{color:theme.primaryText}]}>Sign Up with Google</Text>

</TouchableOpacity>

    </View>
  )
}

export default Login
