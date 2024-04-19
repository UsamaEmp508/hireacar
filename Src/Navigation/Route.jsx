import React, { useState, useEffect } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import navgiationStrings from '../Constant/navgiationStrings';
import { Brand, CarDetails, Slider } from '../Screens';
import Navigator from './Tab Navigation/Tab'
import LocationCars from '../Screens/Dashboard/Home/Location/Location';
import Policy from '../Screens/Dashboard/Profile/PrivacyPolicy/Policy';
import Terms from '../Screens/Dashboard/Profile/Terms and Condition/Terms';
import Messages from '../Screens/Messsages/Mesages/Messages';
const Route = () => {

    const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>   
    <Stack.Navigator screenOptions={{ headerShown: false }} >
    
          <Stack.Screen name={"dashboard"} component={Navigator} options={{ animation: 'slide_from_right'}} />
          <Stack.Screen name={navgiationStrings.Slider} component={Slider}   options={{ animation: 'slide_from_right'}} />

          <Stack.Screen name={navgiationStrings.CarDetails} component={CarDetails} options={{ animation: 'slide_from_right'}} />
          <Stack.Screen name={navgiationStrings.Brand} component={Brand} options={{ animation: 'fade_from_bottom'}} />
          <Stack.Screen name={navgiationStrings.location} component={LocationCars} options={{ animation: 'fade_from_bottom'}} />

          <Stack.Screen name={navgiationStrings.PrivacyPolicy} component={Policy} options={{ animation: 'fade_from_bottom'}} />
          <Stack.Screen name={navgiationStrings.TermsCondition} component={Terms} options={{ animation: 'fade_from_bottom'}} />
          <Stack.Screen name={navgiationStrings.Messages} component={Messages} options={{ animation: 'fade_from_bottom'}} />


 
    </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Route;
