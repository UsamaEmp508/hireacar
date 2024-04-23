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
          'Authorization': 'Bearer MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC6baENAR/OuKaV\nLox5m8PfsI2Pch4f+oq2mL8lvoczU92h3uh9ZY4h2IpFicmTzaP5UIPNdb/SxIG3\n61agmG/nXJoRlYosf7wOcjJqUShcQPXmA7TUEMdJmqrhgdjM9wHAzR/efEpTXFRv\nRYSGRGsaKzLExTp+C565lIcIwvHOwb+d3P/LAWxifD60MJqBeAw1nGtK0htEMNXq\nC5PU2mlfjmlX4MGTjHijE4weNYqS5MSSW7t3lASYBnsOEwcGdmN2XUtQSn94ZsKi\n9qy4Jz+MkL63UXuRBpiT9sF7qcord6zHv31KVRS1mypmR0dlCIoUHfrUwDWiJ5SJ\nVq0kxn8FAgMBAAECggEAGp/Qecp4z+2IANMqha2MrjQJK3zJN5jw2X38Anhw15A5\nHUZ33nyz7Tp/GMpCSwT5z3/DqwKPeBrPScRm1T2f8aNEb5FzL8K4STne4Fch0/cF\nByntV8HjrCvWDqmcHD2EdxP0YrJObRRJDLEZaZF42D5mHDrsjRa8vtUq6cHphbTg\ncW134lOxjwlyAzBjT9LivyaZAKO69xV84JaBYMrlZX3Q4Sna2K+Mq7+vNwZZEHtt\nmTARZirBH+o53dCKXO3uv+SgXtCEVb/kGLB6vv/mf0FWlKQyIUqbKkTb9+E36NZ/\nvkEg31yjfefWGfHeVlEOAbHjWtqos86GtgPs57MkWwKBgQDcaDweMKf5aZwijt3p\nDG8CD2lKokMF1hkgVNDw1Hx2v2H5wS39c+zJYodgmpBDBKwJfS5ZCyTfDPGc3ZmD\n9uWCPgig0PtCQng4YCxnnQRMisXy7gS/fBsp56nM+Y0GwREY+z7fVVq869k5+6Ix\n9GiI8bEOetPCw4jkQs5/OvsCbwKBgQDYiK9UBX+RLRAOc9bfBQYf7xqFNg67a4lY\nApJJanUcER4NZVzeAs+36h6ZbA2K34n6NSyoQpvi6NINoU3B/BHTSf1hAR/qj0VD\ncdVSZkumIVjaQYt1daElUZZf8J9f1uv75KhbGHP3k56Eq3g7jLtm9W87rcU8/MFi\nS00WeCH/ywKBgQC5kaEcIgcq/PoSNosrzeYgq+0Qg3E+lrXs/Lw2KBDqwdOxvi4E\nePfhzm0AruHLK0HVc2n0WmeezH0Yf5LjAprVf3kwPQNvFBu4C3EXg6G8+BIVqMSi\nm9EbBQt3opxUFXVZvR+AVZLiAQiRwwUaXhctRaC2+j8UeiDlXkIR6QyxTQKBgHfU\nTJLG6C3DLluRJ5wL/7O0coy9ubFmdX9LDQGr9Fsv7d2j9py2GZXB7mUhMu1jf8wD\nmU8UbYhJJ9V7KrjrckHndF02bh80YjRMzqznB35Mfgtqsm6yRheM6xb05n33RmkD\nxVeEVMjx3Iu3CLaLzznPIVt5cumpRqvK2EJTAR25AoGACcHmJprTrlod1lMdA1DD\nVs70WxzU3l0AhL9dyPblphcsu6sNxCUOC7kS1i3Vu9s+2Qei6BUccubmLmfBkG82\ngUjJLtI/G/8DmGrpLkqKsR63Pb9BZhW7oK1XVrrjtUfmwmm50hPW3nGfkzOCnmT2\nkynVT+lege3d6MgXiomN7Fc'
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
