import React, { useState, useEffect } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import navgiationStrings from '../Constant/navgiationStrings';
import { Slider } from '../Screens';
import Navigator from './Tab Navigation/Tab'
const Route = () => {

    const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>   
    <Stack.Navigator screenOptions={{ headerShown: false }} >
    
          <Stack.Screen name={"dashboard"} component={Navigator} />
          <Stack.Screen name={navgiationStrings.Slider} component={Slider} />
 
    </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Route;
