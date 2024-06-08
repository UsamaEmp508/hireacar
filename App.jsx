import React, { useEffect,useState } from "react";
import Route from "./Src/Navigation/Route";
import messaging from '@react-native-firebase/messaging';
import { ChatState } from "./Src/Context/ChatProvider";
import notifee from '@notifee/react-native';
import { Platform } from "react-native";
import { StyleSheet,View } from "react-native";
import SplashScreen from "./Src/Screens/Splash/SplashScreen";
export default function App() {
  const { notification, setNotification } = ChatState();


useEffect(() => {
  if (Platform.OS === 'android') {
    messaging().requestPermission();
  }
    messaging()
    .getToken()
    .then(token => {
      console.log('token ------->>', token);


    });
}, [])





  useEffect(() => {
    let unsubscribe;
    if (!notification) {
      setNotification(true);
    }
    
    if (notification) {
      unsubscribe = messaging().onMessage(async remoteMessage => {
        console.log('Message handled in the foreground!', remoteMessage);
        const { title, body } = remoteMessage.notification;

        try {
if(Platform.OS  === 'ios')
{
  await notifee.requestPermission()
}

          // Display the notification using Notifee
          const channelId = await notifee.createChannel({
            id: 'default85',
            name: 'Default Channel85',
          });

          await notifee.displayNotification({
            title,
            body,
            android: {
              channelId,
            },

          });
        } catch (error) {
          console.error('Error displaying notification:', error);
        }
      });
    }

    // Clean up the listener on unmount or when notification state changes
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [notification]);






  return  <View style={styles.container}>
  {loader  ? <SplashScreen/> :  <Route/>   }
</View>;
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
