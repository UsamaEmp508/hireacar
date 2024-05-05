import { Image, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { styles } from './Style'
import { ThemeContext } from '../../../Theme/ThemeContext'
import { lightTheme,darkTheme } from '../../../Theme/Color'
import { GoogleSignin, statusCodes, GoogleSigninButton } from '@react-native-google-signin/google-signin';
import { ChatState } from '../../../Context/ChatProvider'
import { Button } from '@rneui/base'
import messaging from '@react-native-firebase/messaging';
import { CREATE_USER_MUTATION } from '../../../Service/Mutation'
import { GET_USER_QUERY_BY_GOOGLE_ID } from '../../../Service/Queries'
import { useMutation } from '@apollo/client'
import { apolloClient as client } from '../../../Service/graphql';
import ActivityIndicatorModal from '../../../Components/ActivityIndicatorModal'
import { storeData } from '../../../Utility/Storage/Storage'
const Login = ({navigation}) => {

const { setUser,  setdevicetoken,devicetoken} = ChatState();
const [userdata, setUserdata] = useState(null);
const [createUser] = useMutation(CREATE_USER_MUTATION);
const [systemUserId, setSystemUserId] = useState(null); 
    const themeContext = useContext(ThemeContext);
    const [loading, setLoading] = useState(false);
  const theme = themeContext?.isDarkTheme ? darkTheme : lightTheme;
  const webClientId = "421313407099-ehfuivfr1dcibch496vpm0dss9ssks0c.apps.googleusercontent.com"; 

  console.log("state value is ", devicetoken);


  useEffect(()=>{
      GoogleSignin.configure({
          webClientId: webClientId,
      })
  },[])


const googleLogin = async () => {
    try {
      setLoading(true);
        await GoogleSignin.hasPlayServices();
        const userInfo = await GoogleSignin.signIn();
    
        setUserdata(userInfo);
       
          
    } catch (error) {
     // Stop loading indicator

        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            console.log(error)
        } else if (error.code === statusCodes.IN_PROGRESS) {
            console.log(error)
        } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            console.log(error)
        } else {
        }
      }
        finally{
          setLoading(false); 
        }
      }
        
    
      useEffect(() => {
        const getFcmToken = async () => {
          const fcmToken = await messaging().getToken();
          if (fcmToken) {
              setdevicetoken(fcmToken)
              console.log("Your Firebase state token is:", fcmToken);
             

    
          } else {
              console.log("Failed", "No Token Received");
          }
        };
    
    
    
    
    
    
    
    
        const requestPermission = async () => {
          const authStatus = await messaging().requestPermission();
          const enabled =
            authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
            authStatus === messaging.AuthorizationStatus.PROVISIONAL;
          if (enabled) {
            getFcmToken();
            console.log('Authorization status:', authStatus);
          }
        };
    
        requestPermission();
      }, []);



  



  

  
      const sendNotification = async () => {
        try {
          const response = await fetch('https://fcm.googleapis.com/v1/projects/hireacar-5d299/messages:send', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCgXA1+1Gv/p1T8\nBHoxid99bJLkznb2T3ETbAKZTZiZl89uXmrMvxDBbCdkBXe8SMU2ZCWR0yrg9hyD\n7KQooVO1Iaez3fO50jNexw+soKcyDzIYpEqcKHVpuEbeeNwqvY4AgtzBC1srl3+J\nDDsvmF2i8jwoVW6r1seIv+a1Qmjlqmpnx/nZvsZCPEFYOXryaA+k/GCdqg4o6bNf\ny/B7W/G9C7ZEon8KJyVJFxY7LEyMW1crlfSfJJvU7wQCOB3KqSYl0wUG7P6JNIF8\nYwYOqQx6E/rR9HsSwVKDBQ27xqM53k9pu6p+EZB0NKIqrpZSHjr43QKgrZCnHIC0\nen227xabAgMBAAECggEASKBYRlxLi25MGZWnh98jFomBX9o4W6awFjVBWhAgMFPm\nkNx3L0LLgmaK0ox9ZYtpshAaSdijH16nnIIk+PfT0wGqk9ZOh5axSFgMe8kI4C2s\nqSdjWSUjxB0/D4waXssZ0JZ0B4QupugGzVl6RryRj/Z4k2XZ6T6tgPw0r1wj6PuU\nk046Vx5xf7Li8/9KzdZ9Pw9upboxzdxGlYs4oY/ehXJRzai1HCf85I3IYZW2PdFY\n3d9WvvwsTKCFaj7fgJYF0rWC0+XX6vH6SK5oik6Q0Bc9aWsI2JAX5gD5Fm5rbBLi\nqn46u8Kf8ULiJWTgACZdp4shHTGDLKEKsgXA54FjKQKBgQDgnOxvG9LRpcG9I6Hf\nyAapq67Apc8GHdx5GpOY7aXmWskQE9g2S+VjSARMghmD3xr/M9ffORosbkge2LRo\nZkxSBfSKrwV9YFShIiRQUaZ1XXx5Ohh1pa7Ise3JUANb3BoWBToyWCkCe41RWM0N\n3h4SQ12A1lvAIoDx82Ub3mdbeQKBgQC2xJfh9mda8uNdHTQkIvBfYk0dPTs5g992\n4Q51PgngtrZic2eNdpiVk7QtfQI+Kjd+LbCC45BfhAEHgi9CkJUPN0u0Dan8FWVl\ngJtbUCDiW7ipCslm7gLKI/OQTtbR2zrz16qT9YumUx8lhTxR07z5BLPQzxIhIAbI\nrs2xUnHpswKBgQDPcF3zp3Cmaj1pXrUrJWLx5Dr6dKej8IQj3GWgASsMeZ/jl1BB\npQpvDJ3bwvOplK0sMEcYQ3ZmvlshEeZb3M5zmkhkpIufZQ4D2rJK832WOwawNvVM\nAf5QH/OJzrmrZrU4zQ8YW89UGaNEE40dV5vSJiD+0fnekn8f9TfV6yrtkQKBgDSz\nx+A+v1r4gxuMmkZ5VLsMi5QM3hEdt8h96T9hnlOQHFOTV57xPdqT9vbO/2CRp+LY\npfd4S19fnzRdE+er7W+v0EKhVgz81npIdYQFPRZIwJzuIVlu9Jr5dvh743IsN3mt\nDOERgy149phJLTWjSvC7rGZf76hhpdMkpOenEHYFAoGBAKAiqLpLs072qJSd/qjZ\nBCa/j77ErJI/NZikPTa+kf/YKP1MODxwdjxFA7O+E9wzEWtC7YqOsws8bu8ihdiD\ngruLSTsV/cgxG8q7HNo8I89HQe3DjGoaH/qJHYeUGwtM4RK9QfEuKwJyMHXG1vz5\n8WOWPzZYcADJcWtUiDUEdV++'
            },
            body: JSON.stringify({
              message: {
                token: 'eIwKu37rR9WeVI59a3VnG0:APA91bEcH8RsOdMZTvsZSuii26YllkHUlRtmFhLgzFE6KVnITXwUUX2ZVi51zyAqxwp3rTTLwPShHOgr8Sxr9R4SRzRVoAGCNyozQ-2MdxbU-AfC9Rf2kR93316BXcdq9ASNdg_tZzGQ',
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
  















  useEffect(() => {
    const getUser = async () => {
      try {
     
       
        
          const { data } = await client.query({
            query: GET_USER_QUERY_BY_GOOGLE_ID,
            variables: {
              id: userdata.user.id,
            },
          });
          const userByGoogleId = data.userByGoogleId;
setUser(data)
storeData(data)
          if (userByGoogleId === null) {

            const newUser = {
              googleId: userdata.user.id,
                  displayName: userdata.user.name,
                  email: userdata.user.email,
                  photoLink: userdata.user.photo,
                  deviceToken:devicetoken
           
            };

            try {
              const { data } = await createUser({
                variables: {
                  newUserData: newUser,
                },
              });
          
         setUser(data)
         storeData(data)
            } catch (error) {
              console.log(error);
              // Handle error during user creation
            }
          } else {
         
            setSystemUserId(userByGoogleId.id); 

          
        } 
      } catch (error) {
        console.error(error);
      }
      
    };

    getUser();
  }, [userdata]);






  return (
    <View style={[styles.container,{backgroundColor:theme.primaryBackground}]}>

{loading && <ActivityIndicatorModal loaderIndicator={loading} />}


<TouchableOpacity style={[styles.logim_google,{borderColor:"#F1F1F0",borderWidth:1,marginVertical:30}]}   onPress={ googleLogin}>
<Image source={require('../../../Assets/Images/Login/flat-color-icons_google.png')} />
      <Text style={[styles.title,{color:theme.primaryText}]}>Login with Google</Text>

</TouchableOpacity>




<TouchableOpacity style={[styles.logim_google,{borderColor:"#F1F1F0",borderWidth:1,marginVertical:30}]}   onPress={sendNotification}>
      <Text style={[styles.title,{color:theme.primaryText}]}>Send Notification</Text>

</TouchableOpacity>

    </View>
  )
}

export default Login
