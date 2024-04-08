import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, TouchableOpacity, View,Text } from 'react-native';
import { ThemeContext } from '../../Theme/ThemeContext';
import { lightTheme,darkTheme } from '../../Theme/Color';
import Profile from '../../Screens/Dashboard/Profile/Profile';
import Likes from '../../Screens/LIkes/Likes';
import { FONTFAMILY } from '../../Theme/FontFamily';
import Home from '../../Screens/Dashboard/Home/Home';
import Messages from '../../Screens/Messsages/Messages';

const Tab = createBottomTabNavigator();

const CustomTabBar = ({ state, descriptors, navigation }) => {


    const themeContext = useContext(ThemeContext);

    const theme = themeContext?.isDarkTheme ? darkTheme : lightTheme;


  const getTabBarIcon = (route, focused,label) => {
    let icon;
    if (route.name === 'Home') {
      icon =  require('../../Assets/Images/Navigator/Vector.png');
    } else if (route.name === 'Message') {
      icon =  require('../../Assets/Images/Navigator/messages1.png');
    } else if (route.name === 'Insight') {
      icon =  require('../../Assets/Images/Navigator/gg_insights.png');
    } else if (route.name === 'Profile') {
      icon =  require('../../Assets/Images/Navigator/iconamoon_profile-light.png');
    }
    return (
      <View style={{ alignItems: 'center',padding:10}}>
      <Image
        source={icon}
        style={{ width: 20, height: 20, tintColor: focused ? 'red' : theme.primaryText }}
      />
      <Text style={{ color: focused ? 'red' : theme.primaryText,
    fontSize: 12,
    
    letterSpacing: 0.12,
    fontFamily: FONTFAMILY.Poppins_Medium, marginTop:8}}>{label}</Text>
      </View>
    );
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: theme.BackgroundSecondary,
        padding:10
      
      }}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {getTabBarIcon(route, isFocused,label)}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default Navigator = () => {
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tab.Screen name="Home" component={Home}    options={{ headerShown: false }} />
      <Tab.Screen name="Insight" component={Likes}   options={{ headerShown: false }}  />
      <Tab.Screen name="Message" component={Messages}   options={{ headerShown: false }}  />

      <Tab.Screen name="Profile" component={Profile}    options={{ headerShown: false }} />
    </Tab.Navigator>
  );
};

