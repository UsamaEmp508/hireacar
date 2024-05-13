import { Image, Text, TouchableOpacity, View ,Platform} from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { styles } from './Style'
import { ThemeContext } from '../../../Theme/ThemeContext'
import { lightTheme,darkTheme } from '../../../Theme/Color'
import { GoogleSignin, statusCodes, GoogleSigninButton } from '@react-native-google-signin/google-signin';
import { ChatState } from '../../../Context/ChatProvider'
import { Button } from '@rneui/base'
import messaging from '@react-native-firebase/messaging';
import { CREATE_USER_MUTATION, SaveToken } from '../../../Service/Mutation'
import { GET_USER_QUERY_BY_GOOGLE_ID } from '../../../Service/Queries'
import { useMutation } from '@apollo/client'
import { apolloClient as client } from '../../../Service/graphql';
import ActivityIndicatorModal from '../../../Components/ActivityIndicatorModal'
import { storeData } from '../../../Utility/Storage/Storage'
const Login = ({navigation}) => {

const { setUser} = ChatState();
const [userdata, setUserdata] = useState(null);
const [createUser] = useMutation(CREATE_USER_MUTATION);
const [systemUserId, setSystemUserId] = useState(null); 
    const themeContext = useContext(ThemeContext);
    const [loading, setLoading] = useState(false);
  const theme = themeContext?.isDarkTheme ? darkTheme : lightTheme;
  const [devicetoken, setDeviceToken] = useState(null);
  const webClientId = "421313407099-ehfuivfr1dcibch496vpm0dss9ssks0c.apps.googleusercontent.com"; 
  const [saveToken, {  error }] = useMutation(SaveToken);
 


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
       const  token = await messaging().getToken();
          if (token) {
              console.log("Your Firebase state token is:", token);
              setDeviceToken(token);

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



      const handleSaveToken = async (userId, devicetoken, platform) => {
        console.log("save token login screen", userId, devicetoken, platform);
      
        try {
          const { data } = await saveToken({
            variables: {
              data: {
                userId,
                deviceId:devicetoken,
                platform,
              },
            },
          });
          console.log('Token saved:', data.saveToken);
        } catch (err) {
          console.error('Error saving token:', err);
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
          handleSaveToken(userdata?.user?.id,devicetoken,Platform.OS)


setUser(data)
storeData(data)
          if (userByGoogleId === null) {

            const newUser = {
              googleId: userdata.user.id,
                  displayName: userdata.user.name,
                  email: userdata.user.email,
                  photoLink: userdata.user.photo,
            };





            try {
              const { data } = await createUser({
                variables: {
                  newUserData: newUser,
                },
              });
              handleSaveToken(userdata?.user?.id, devicetoken, Platform.OS);

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






    </View>
  )
}

export default Login
