import React, {useContext, useEffect, useState} from 'react';
import {Text, View, TouchableOpacity, Image, SafeAreaView} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import {ThemeContext} from '../../../Theme/ThemeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {styles} from './SliderStyle';
import {lightTheme, darkTheme} from '../../../Theme/Color';
import Icon from 'react-native-vector-icons/AntDesign'; // Import FontAwesome5 icon
const slides = [
  {
    key: '1',
    title: 'Rent a Car with the Best Price, Best Service',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed hendrerit sapien euismod justo tincidunt, in bibendum felis dapibus. Duis quis felis nec magna pharetra condimentum eget at quam. Maecenas sit amet elit nec nunc fermentum dictum.',
    image: require('../../../Assets/Images/Onboarding/image2slide.png'),
  },
  {
    key: '2',
    title: 'Rent a Car with the Best Price, Best Service',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed hendrerit sapien euismod justo tincidunt, in bibendum felis dapibus. Duis quis felis nec magna pharetra condimentum eget at quam. Maecenas sit amet elit nec nunc fermentum dictum.',
    image: require('../../../Assets/Images/Onboarding/image1slide.png'),
  },
  {
    key: '3',
    title: 'Rent a Car with the Best Price, Best Service',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed hendrerit sapien euismod justo tincidunt, in bibendum felis dapibus. Duis quis felis nec magna pharetra condimentum eget at quam. Maecenas sit amet elit nec nunc fermentum dictum.',
    image: require('../../../Assets/Images/Onboarding/image2slide.png'),
  },
];

const Slider = ({navigation}) => {
  const themeContext = useContext(ThemeContext);
  const appIntroSliderRef = React.useRef();

  const theme = themeContext?.isDarkTheme ? darkTheme : lightTheme;

  const renderItem = ({item, index}) => {
    const isLast = index === slides.length - 1;

    return (
      <SafeAreaView style={{flex: 1}}>
        <View
          style={[styles.container, {backgroundColor: theme.sliderBackground}]}>
          <View style={styles.slide}>
            <Text style={[styles.title, {color: theme.WhiteColor}]}>
              {item.title}
            </Text>
            <Text style={[styles.text, {color: theme.WhiteColor}]}>
              {item.text}
            </Text>
          </View>
          <Image source={item.image} />
          {isLast && (
            <TouchableOpacity
              style={styles.Button}
              activeOpacity={0.4}
              onPress={() => navigation.navigate('Login')}>
              <Text style={styles.button_text}>Get Started</Text>
            </TouchableOpacity>
          )}
        </View>
      </SafeAreaView>
    );
  };

  const renderDoneButton = () => (
    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
      <Text style={styles.buttonText}>Get Started</Text>
      <Icon name="arrowright" size={30} color="#517fa4" />
    </TouchableOpacity>
  );

  const renderNextButton = () => (
    <TouchableOpacity
      style={styles.nextButton}
      onPress={() =>
        appIntroSliderRef.current?.goToSlide(
          appIntroSliderRef.current?.state.activeIndex + 1,
        )
      }>
      <Text style={styles.nextButtonText}>Next</Text>
    </TouchableOpacity>
  );

  return (
    <AppIntroSlider
      renderItem={renderItem}
      data={slides}
      ref={appIntroSliderRef}
      showPrevButton={false}
      renderNextButton={renderNextButton}
      renderDoneButton={renderDoneButton}
      showNextButton={true}
      showDoneButton={false}
      dotStyle={styles.dotstyle}
      activeDotStyle={styles.activeDotStyle}
    />
  );
};

export default Slider;
