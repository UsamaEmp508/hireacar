

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
import notifee , { AndroidStyle } from '@notifee/react-native';


messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);

    messaging().onMessage(async remoteMessage => {
    
      const { title, body } = remoteMessage.data;
    
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
  
  
  
  });
  




AppRegistry.registerComponent(appName, () => App);
