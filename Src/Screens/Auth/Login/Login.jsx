import { Image, Text, TouchableOpacity, View ,Platform, SafeAreaView} from 'react-native'
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

const { setUser,devicetoken} = ChatState();
const [userdata, setUserdata] = useState(null);
const [createUser] = useMutation(CREATE_USER_MUTATION);
const [systemUserId, setSystemUserId] = useState(null); 
    const themeContext = useContext(ThemeContext);
    const [loading, setLoading] = useState(false);
  const theme = themeContext?.isDarkTheme ? darkTheme : lightTheme;

  const webClientId = "421313407099-ehfuivfr1dcibch496vpm0dss9ssks0c.apps.googleusercontent.com"; 
  const [saveToken, {  error }] = useMutation(SaveToken);
 


  useEffect(()=>{
      GoogleSignin.configure({
          webClientId: webClientId,
      })
  },[])


const googleLogin = async () => {
    try {

        await GoogleSignin.hasPlayServices();
        const userInfo = await GoogleSignin.signIn();

        getUser(userInfo);
             
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
       
      }
        
    
    
      



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
      



  







    const getUser = async (userInfo) => {
      try {
     
       
        
          const { data } = await client.query({
            query: GET_USER_QUERY_BY_GOOGLE_ID,
            variables: {
              id: userInfo.user.id,
            },
          });
          const userByGoogleId = data.userByGoogleId;
          handleSaveToken(userInfo?.user?.id,devicetoken,Platform.OS)
console.log('data',data)

setUser(data)
storeData(data)
          if (userByGoogleId === null) {

            const newUser = {
              googleId: userInfo.user.id,
                  displayName: userInfo.user.name,
                  email: userInfo.user.email,
                  photoLink: userInfo.user.photo,
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








  return (
    <SafeAreaView style={[styles.container,{backgroundColor:theme.primaryBackground}]}>

{loading && <ActivityIndicatorModal loaderIndicator={loading} />}


<TouchableOpacity style={[styles.logim_google,{borderColor:"#F1F1F0",borderWidth:1,marginVertical:30}]}   onPress={ googleLogin}>
<Image source={require('../../../Assets/Images/Login/flat-color-icons_google.png')} />
      <Text style={[styles.title,{color:theme.primaryText}]}>Login with Google</Text>

</TouchableOpacity>






    </SafeAreaView>
  )
}

export default Login
