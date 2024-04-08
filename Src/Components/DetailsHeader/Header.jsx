import {Image, Pressable, StyleSheet} from 'react-native';
import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Animated, {FadeIn} from 'react-native-reanimated';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {SharedElementStackParamList} from '../navigator/SharedElementNavigator';
import AntDesign  from 'react-native-vector-icons/AntDesign';
import Entypo  from 'react-native-vector-icons/Entypo';

const Header = () => {
  const inset = useSafeAreaInsets();
  const navigation =
    useNavigation();
  return (
    <Animated.View
      style={[styles.container, {top: inset.top}]}
      entering={FadeIn.delay(400)}>
      <Pressable
        onPress={() => {
          navigation.goBack();
        }}>
          <Entypo name="chevron-with-circle-left" size={32} color="black" />
      </Pressable>
      <Pressable
        onPress={() => {
          console.log('LIKE');
        }}>
           <AntDesign name="like2" size={32} color="black" />
      </Pressable>
    </Animated.View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 20,
    right: 20,
    zIndex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  chevron: {
    width: 44,
    height: 44,
  },
});