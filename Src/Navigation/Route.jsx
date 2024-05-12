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
import MyCar from '../Screens/Dashboard/Profile/MyCar/MyCar';
import EditProfile from '../Screens/Dashboard/Profile/EditProfile/EditProfile';
import Login from '../Screens/Auth/Login/Login';
import AllBrands from '../Screens/Dashboard/Home/AllBrands/AllBrands';
import AllLocation from '../Screens/Dashboard/Home/All Location/AllLocation';
import AllcarPrice from '../Screens/Dashboard/Home/AllCarPrice/AllcarPrice';
import AllPopularCar from '../Screens/Dashboard/Home/AllPopularCars/AllPopularCar';
import { ChatState } from '../Context/ChatProvider';

import Googleinput from '../Components/GooglePLaces/Googleinput';
import { getData } from '../Utility/Storage/Storage';
import Notifications from '../Screens/Dashboard/Notification/Notification';
import EditCar from '../Screens/EditCar/EditCar';
import Search from '../Screens/Dashboard/Search Screen/Search';
const Route = () => {
  const {  user,setUser} = ChatState();
 
    const Stack = createNativeStackNavigator();

    useEffect(() => {
      const getDataFromStorage = async () => {
        const data = await getData();
        setUser(data);
    
      };
  
      getDataFromStorage();
    }, []);
  return (
    <NavigationContainer>   
    <Stack.Navigator screenOptions={{ headerShown: false }}  >
      {
        user ?
        <Stack.Group>    
   <Stack.Screen name={"dashboard"} component={Navigator} options={{ animation: 'slide_from_right'}} />
        <Stack.Screen name={navgiationStrings.AllBrands} component={AllBrands} options={{ animation: 'fade_from_bottom'}} />
        
        <Stack.Screen name={navgiationStrings.AllLocation} component={AllLocation} options={{ animation: 'fade_from_bottom'}} />
    
        
        
              <Stack.Screen name={navgiationStrings.Slider} component={Slider}   options={{ animation: 'slide_from_right'}} />
    
              <Stack.Screen name={navgiationStrings.CarDetails} component={CarDetails} options={{ animation: 'slide_from_right'}} />
              <Stack.Screen name={navgiationStrings.Brand} component={Brand} options={{ animation: 'fade_from_bottom'}} />
              <Stack.Screen name={navgiationStrings.location} component={LocationCars} options={{ animation: 'fade_from_bottom'}} />
    
              <Stack.Screen name={navgiationStrings.PrivacyPolicy} component={Policy} options={{ animation: 'fade_from_bottom'}} />
              <Stack.Screen name={navgiationStrings.TermsCondition} component={Terms} options={{ animation: 'fade_from_bottom'}} />
              <Stack.Screen name={navgiationStrings.Messages} component={Messages} options={{ animation: 'fade_from_bottom'}} />
    
              <Stack.Screen name={navgiationStrings.MyCar} component={MyCar} options={{ animation: 'fade_from_bottom'}} />
              <Stack.Screen name={navgiationStrings.EditProfile} component={EditProfile} options={{ animation: 'fade_from_bottom'}} />
              <Stack.Screen name={navgiationStrings.AllCarPopular} component={AllPopularCar} options={{ animation: 'fade_from_bottom'}} />
              <Stack.Screen name={navgiationStrings.AllCarPrice} component={AllcarPrice} options={{ animation: 'fade_from_bottom'}} />
              <Stack.Screen name={navgiationStrings.MapLocation} component={Googleinput} options={{ animation: 'fade_from_bottom'}} />
              <Stack.Screen name={navgiationStrings.Notification} component={Notifications} options={{ animation: 'fade_from_bottom'}} />

              <Stack.Screen name={navgiationStrings.Editcar} component={EditCar} options={{ animation: 'fade_from_bottom'}} />
              <Stack.Screen name={navgiationStrings.Search} component={Search} options={{ animation: 'fade_from_bottom'}} />



        </Stack.Group>  :

<Stack.Screen name={navgiationStrings.Login} component={Login} options={{ animation: 'fade_from_bottom'}} />


      }
        
     

              
              

      
      
 



     


          
 
    </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Route;
