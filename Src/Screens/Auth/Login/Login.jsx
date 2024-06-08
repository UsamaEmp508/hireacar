import { Image, Text, TouchableOpacity, View, Platform, SafeAreaView } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { styles } from './Style';
import { ThemeContext } from '../../../Theme/ThemeContext';
import { lightTheme, darkTheme } from '../../../Theme/Color';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { ChatState } from '../../../Context/ChatProvider';
import messaging from '@react-native-firebase/messaging';
import { CREATE_USER_MUTATION, SaveToken } from '../../../Service/Mutation';
import { GET_USER_QUERY_BY_GOOGLE_ID } from '../../../Service/Queries';
import { useMutation } from '@apollo/client';
import { apolloClient as client } from '../../../Service/graphql';
import ActivityIndicatorModal from '../../../Components/ActivityIndicatorModal';
import { storeData } from '../../../Utility/Storage/Storage';

const Login = ({ navigation }) => {
  const { setUser, devicetoken } = ChatState();
  const [createUser] = useMutation(CREATE_USER_MUTATION);
  const [systemUserId, setSystemUserId] = useState(null);
  const themeContext = useContext(ThemeContext);
  const [loading, setLoading] = useState(false);
  const theme = themeContext?.isDarkTheme ? darkTheme : lightTheme;
  const webClientId = "1022459501790-n7gfhobegikjhrt3r9594p3s5kabfdjn.apps.googleusercontent.com";
  const [saveToken, { error }] = useMutation(SaveToken);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: webClientId,
    });
  }, []);

  const googleLogin = async () => {
    try {
      setLoading(true); // Set loading to true when login begins
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      const { idToken, user } = await GoogleSignin.signIn();
      console.log('userinfo', user);
      getUser(user);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('Sign in cancelled', error);
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Sign in in progress', error);
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('Play services not available', error);
      } else {
        console.log('Some other error', error);
      }
      setLoading(false); // Set loading back to false on error
    }
  };

  const handleSaveToken = async (userId, devicetoken, platform) => {
    console.log("save token login screen", userId, devicetoken, platform);
    try {
      await saveToken({
        variables: {
          data: {
            userId,
            deviceId: devicetoken,
            platform,
          },
        },
      });
    } catch (err) {
      console.error('Error saving token:', err);
    }
  };

  const getUser = async (userInfo) => {
    try {
      const { data } = await client.query({
        query: GET_USER_QUERY_BY_GOOGLE_ID,
        variables: {
          id: userInfo.id,
        },
      });
      const userByGoogleId = data.userByGoogleId;
      handleSaveToken(userInfo.id, devicetoken, Platform.OS);
      console.log('data', data);

      setUser(data);
      storeData(data);

      if (userByGoogleId === null) {
        const newUser = {
          googleId: userInfo.id,
          displayName: userInfo.name,
          email: userInfo.email,
          photoLink: userInfo.photo,
        };

        try {
          const { data } = await createUser({
            variables: {
              newUserData: newUser,
            },
          });
          handleSaveToken(data?.createUser?.id, devicetoken, Platform.OS);
          setUser(data);
          storeData(data);
        } catch (error) {
          console.log(error);
        }
      } else {
        setSystemUserId(userByGoogleId.id);
      }
      setLoading(false); // Set loading back to false after login process is completed
    } catch (error) {
      console.error(error);
      setLoading(false); // Set loading back to false on error
    }
  };
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.primaryBackground }]}>
      {loading && <ActivityIndicatorModal loaderIndicator={loading} />}
      <TouchableOpacity style={[styles.logim_google, { borderColor: "#F1F1F0", borderWidth: 1, marginVertical: 30, paddingHorizontal: 80 }]} onPress={googleLogin}>
        <Image source={require('../../../Assets/Images/Login/flat-color-icons_google.png')} />
        <Text style={[styles.title, { color: theme.primaryText }]}>Login with Google</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Login;
