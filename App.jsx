import React, { useEffect } from "react";
import { ThemeProvider, createTheme } from '@rneui/themed';
import Route from "./Src/Navigation/Route";
import { ApolloProvider } from "@apollo/client";
import { Theme } from "./Src/Theme/ThemeContext";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message'
import messaging from '@react-native-firebase/messaging';
import ChatProvider, { ChatState } from "./Src/Context/ChatProvider";
import { apolloClient } from "./Src/Service/graphql";
import { LocationProvider } from "./Src/Theme/LocationContext";

import notifee from '@notifee/react-native';

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




  messaging().onMessage(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);

    const { title, body } = remoteMessage.notification;
  
    try {
      // Display the notification using Notifee
      const channelId = await notifee.createChannel({
        id: 'default3',
        name: 'Default Channel3',
     
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



 


  return (
    <GestureHandlerRootView style={{ flex: 1 }}>   
      <ApolloProvider client={apolloClient} >   
      <ChatProvider >  
    
      <ThemeProvider theme={theme}> 

      <Theme>  
        <LocationProvider>      
     
   <Route/>
   </LocationProvider>
   </Theme>  
      </ThemeProvider>
   </ChatProvider>

   </ApolloProvider>
    
   <Toast
position='top'
bottomOffset={20}
/>

      </GestureHandlerRootView>
  );
}