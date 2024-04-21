import { Image, Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { styles } from './Style'
import { ThemeContext } from '../../../Theme/ThemeContext'
import { lightTheme,darkTheme } from '../../../Theme/Color'
import { GoogleSignin, statusCodes, GoogleSigninButton } from '@react-native-google-signin/google-signin';
import { ChatState } from '../../../Context/ChatProvider'
import { Button } from '@rneui/base'
import messaging from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';
const Login = ({navigation}) => {

const { selectedChat, setSelectedChat, user, notification, setNotification,chats,setChats,LoginUserId,setUser} = ChatState();
    
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
       
          if(userInfo)

          {
            const newUser = {
                googleId: userInfo.user.id,
                displayName: userInfo.user.name,
                email: userInfo.user.email,
                photoLink: userInfo.user.photo,
                
            
              };
              setUser(newUser);
              navigation.navigate('dashboard')
          }
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


  const sendNotification = async () => {
    try {
      const response = await fetch('https://fcm.googleapis.com/v1/projects/myproject-b5ae1/messages:send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ya29.ElqKBGN2Ri_Uz...HnS_uNreA'
        },
        body: JSON.stringify({
          message: {
            token: 'ezlI_I84Re6PqXGasZuxkN:APA91bHrB1y0iSLYlUd6UqPAhsew6KSXkUikNR0gru7LoPuK2yj88hnBuyaYG7qCD-1QVCRhBspyZ120LWYaj-nPo1E_4jG2eZN8GcFhAKlHJcyAFjdKMe8RLf0bjTYZr4cVBYjoZMUH',
            notification: {
              title: 'New Message',
              body: 'You have a new message!',
            },
            data: {
              score: '5x1',
            },
            android: {
              direct_boot_ok: true,
            },
          }
        }),
      });
      
      const data = await response.json();
      console.log('Notification sent successfully:', data);
    } catch (error) {
      console.error('Error sending notification:', error);
    }
  };
  
  

  
//   // Example usage
  




  messaging().onMessage(async remoteMessage => {
    const { title, body } = remoteMessage.data;
  
    try {
      // Display the notification using Notifee
      const channelId = await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
      });
  
      await notifee.displayNotification({
        title,
        body,
        android: {
          channelId,
          smallIcon: 'ic_launcher', // Replace with your app's small icon
        },
      });
    } catch (error) {
      console.error('Error displaying notification:', error);
    }
  });





  async function onDisplayNotification() {
    // Request permissions (required for iOS)
    await notifee.requestPermission()

    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });

    // Display a notification
    await notifee.displayNotification({
      title: 'Notification Title',
      body: 'Main body content of the notification',
      android: {
        channelId,
      
        // pressAction is needed if you want the notification to open the app when pressed
        pressAction: {
          id: 'default',
        },
      },
    });
  }


  return (
    <View style={[styles.container,{backgroundColor:theme.primaryBackground}]}>
<TouchableOpacity style={[styles.logim_google,{borderColor:"#F1F1F0",borderWidth:1,marginVertical:30}]}   onPress={googleLogin}>
<Image source={require('../../../Assets/Images/Login/flat-color-icons_google.png')} />
      <Text style={[styles.title,{color:theme.primaryText}]}>Login with Google</Text>

</TouchableOpacity>



<TouchableOpacity style={[styles.logim_google,{borderColor:"#F1F1F0",borderWidth:1,marginVertical:30}]}   onPress={sendNotification}>
      <Text style={[styles.title,{color:theme.primaryText}]}>Send Notification</Text>

</TouchableOpacity>




<Button title="Display Notification" onPress={() => onDisplayNotification()} />

    </View>
  )
}

export default Login
