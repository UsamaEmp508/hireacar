import React, { useEffect } from "react";
import { ThemeProvider, createTheme } from '@rneui/themed';
import Route from "./Src/Navigation/Route";
import { ApolloProvider } from "@apollo/client";
import { Theme } from "./Src/Theme/ThemeContext";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message'
import messaging from '@react-native-firebase/messaging';
import ChatProvider from "./Src/Context/ChatProvider";
import { apolloClient } from "./Src/Service/graphql";


export default function App() {
  const theme = createTheme({
    lightColors: {
      primary: '#e7e7e8',
    },
    darkColors: {
      primary: '#000',
    },
    mode: 'light',
  });

  // Notifee.init({});


  useEffect(() => {
    const getFcmToken = async () => {
      const fcmToken = await messaging().getToken();
      if (fcmToken) {
          console.log("Your Firebase Token is:", fcmToken);
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


 


  return (
    <GestureHandlerRootView style={{ flex: 1 }}>   
      <ThemeProvider theme={theme}> 
      <ApolloProvider client={apolloClient} >   

      <Theme>  
       <ChatProvider >     
   <Route/>
   </ChatProvider>
   </Theme>  
   </ApolloProvider>
      </ThemeProvider>
      <Toast
position='top'
bottomOffset={20}
/>
      </GestureHandlerRootView>
  );
}