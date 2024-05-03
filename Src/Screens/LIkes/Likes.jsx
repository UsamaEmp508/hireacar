import { StyleSheet, Text, TextInput, View,TouchableOpacity, Alert } from 'react-native'
import React, { useContext, useState } from 'react'
import { styles } from './Styles'
import { ThemeContext } from '../../Theme/ThemeContext'
import { darkTheme, lightTheme } from '../../Theme/Color'

import { FONTFAMILY } from '../../Theme/FontFamily'
import Animated, { FadeIn, FadeInDown, FadeInUp, useSharedValue } from 'react-native-reanimated';
import  Slider  from 'react-native-slider';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Toast from 'react-native-toast-message'
import {Picker} from '@react-native-picker/picker';
import ImageUpload from '../../Components/ImageUpload/Upload'
import { CheckBox, Image, color } from '@rneui/base'
import { apolloClient as client } from '../../Service/graphql'
import { ADD_NEW_CAR, ADD_NEW_LOCATION_MUTATION } from '../../Service/Mutation'
import Icon from 'react-native-vector-icons/FontAwesome';
import { useLocation } from '../../Theme/LocationContext'
import { useNavigation } from '@react-navigation/native'
import { ChatState } from '../../Context/ChatProvider'
import { useMutation } from '@apollo/client'


const Likes = () => {
  const [CarBrand, setCarBrand] = useState(null);
  const [Year, setYear] = useState(null);
  const progress = useSharedValue(100);
const navigation = useNavigation()
  const [dailyPrice, setDailyPrice] = useState(100); // Initial daily price
const [monthlyPrice, setMonthlyPrice] = useState(100); // Initial monthly price
const [hourlyPrice, setHourlyPrice] = useState(100); // Initial hourly price

  const [Gas, setGas] = useState(null);
  const [gearType, setGearType] = useState(null);
  const [modelYear, setModelYear] = useState([]);
  const [City, setCity] = useState([]);

  const [transmission, setTransmission] = useState('');
  const [carType, setCarType] = useState('');
  const [Color, setColor] = useState(null);
  const [thumbnailUrl, setThumbnailUrl] = useState(null);
  const [Driver, setDriver] = useState(null);
  const [Misctext, setMisctext] = useState('');
  const [Images, setImages] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const themeContext = useContext(ThemeContext);
  const [currentStep, setCurrentStep] = useState(0);

  const totalSteps = 4; // Total number of steps
  const { state } = useLocation();
  const { location, completeAddress } = state;
  const theme = themeContext?.isDarkTheme ? darkTheme : lightTheme;
  const min = 100;
  const max = 100000;


  const { selectedChat, setSelectedChat, user, setChats, chats } = ChatState();
 

console.log('location data',location)

  const years = Array.from({ length: 22 }, (_, i) => new Date().getFullYear() - i); // last 22 years
  const yearOptions = years.map((year) => ({ label: String(year), value: year }));
  const gas = ['Petrol', 'Diesel', 'Electric'];
  const gasOptions = gas.map((gas) => ({ label: gas, value: gas }));


  const [addCar, { loading, error }] = useMutation(ADD_NEW_CAR);

  const handleImageUrlsChange = (urls) => {
    setImageUrls(urls);
  };


  const carTypeOptions = [
    { label: 'SUV', value: 0 },
    { label: '4WD', value: 1 },
    { label: 'Saloon', value: 2 },
    { label: 'Hatchback', value: 3 },
    { label: 'Coupe', value: 4 },
    { label: 'Sports', value: 5 },
  ];


console.log('car options',carType)


  const carColorOptions = [
    { label: 'Black', value: 'Black' },
    { label: 'White', value: 'White' },
    { label: 'Silver', value: 'Silver' },
    { label: 'Blue', value: 'Blue' },
    { label: 'Red', value: 'Red' },
    { label: 'Green', value: 'Green' },
  ];
  
  
  const driverOptions = [
    { label: 'With Driver', value: 'With Driver' },
    { label: 'Without Driver', value: 'Without Driver' },
  ];

  const transmissionOptions = [
    { label: 'Manual', value: 'Manual' },
    { label: 'Automatic', value: 'Automatic' },
  ];


  const carBrands = ['Toyota Corolla', 'Toyota Camry', 'Toyota Hilux', 'Toyota Revo', 'Toyota Tundra', 'Toyota Yaris', 'Honda Accord', 'Honda Civic', 'Honda City', 'Honda BRV', 'Honda Cd 70', 'Honda CG 125', 'Suzuki Swift', 'Suzuki Cultus', 'Suzuki Liana', 'Suzuki Alto', 'BMW 1 Series', 'BMW 3 Series', 'BMW 5 Series', 'BMW 6 Series','Kia', 'Ford', 'MG', 'BMW', 'Mercedes', 'Porsche'];

  const carBrandOptions = carBrands.map((brand) => ({ label: brand, value: brand }));

  const validateStep = (step) => {
    switch (step) {
      case 0:
        return true;
      case 1:
        case 1:
          return location && location.latitude !== undefined && location.longitude !== undefined;
        
         case 2:
        return  imageUrls.length > 0;
      case 3:
        return CarBrand !== null && Year !== null && Gas !== null && gearType !== null && carType !== null;
      case 4:
        return Color !== null && Driver !== null && hourlyPrice !== 0 && dailyPrice !== 0 && monthlyPrice !== 0 && Misctext !== '';
      default:
        return false;
    }
  };
  
  
  // Function to handle next button click
  const handleNext = () => {
    // Validate current step before allowing to move to the next step
    const isValidStep = validateStep(currentStep);
    if (isValidStep) {
      setCurrentStep((prevStep) => prevStep + 1);
    } else {
  

      Toast.show({
        type: 'error',
        text1: 'Please fill in all required fields before proceeding.'
      });
    }
  };
  
  // Function to handle previous button click
  const handlePrevious = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };
  
  const progressPercentage = (currentStep / totalSteps) * 100;

  const SuccessStep = () => (
    <FadeInDownContainer>
      <Text>Thank you for submitting your car!</Text>
      <Text>Your data is under review. You'll receive an email confirmation once your car is online.</Text>
      <Link to="/UserProfile">
        <h4>Back to Profile</h4>
      </Link>
    </FadeInDownContainer>
  );


  const handleSubmit = () => {
    
  
  

    client
    .mutate({
      mutation: ADD_NEW_LOCATION_MUTATION,
      variables: {
        newLocationData: {
          city: state?.completeAddress?.city,
          latitude: completeAddress?.location?.lat || 0, 
          longitude: completeAddress?.location?.lng || 0,
        },
      },
    })
    .then((res) => {
      const locationId = res.data.addNewLocation.id;
      console.log("Location ID generated:", locationId);
      const carData = {
        name: CarBrand,
        monthlyPrice: monthlyPrice,
        dailyPrice: dailyPrice,
        hourlyPrice: hourlyPrice,
        carType: carType,
        gearType: transmission,
        City: state?.completeAddress?.city,
        photos: imageUrls, // Assuming imageUrls contains the URLs of uploaded photos
        year: modelYear,
        color: Color,
        features: Misctext,
        isAvailable: true,
        gas: Gas,
        thumbnailUrl: '', // Assuming you have a thumbnail URL
        owner: "c0bd5c43-fa2d-4901-93d4-fa91f1193dd7",
        location: locationId
      };


      console.log('payload data',carData)
      addCar({
        variables: {
          newCarData: carData,
      },
    })
      .then((res) => {
        // Handle success
        console.log('Car added successfully:', res.data);
        Alert.alert('Car added successfully');
      })
      .catch((error) => {
        // Handle error
        console.error('Error adding car:', error);
        Alert.alert('Error adding car. Please try again.');
      });



    })
    .catch((error) => {
      console.error("Error in the first mutation:", error);
    });

  };
  

    
  return (
    <KeyboardAwareScrollView  style={[styles.container,{backgroundColor:theme.primaryBackground}]}>


<View style={styles.rowContainer}>
              <View
                style={[
                  styles.rectangular,
                  {
                    backgroundColor:
                      currentStep === 0 ||
                      currentStep === 1 ||
                      currentStep === 2 ||
                      currentStep === 3 ||
                      currentStep === 4 
                        ? '#21408E'
                        : theme.primaryText,
                  },
                ]}></View>
              <View
                style={[
                  styles.rectangular,
                  {
                    backgroundColor:
                  
                    currentStep === 1 ||
                    currentStep === 2 ||
                    currentStep === 3 ||
                    currentStep === 4 
                    ? '#21408E'
                    : theme.primaryText,
                  },
                ]}></View>
              <View
                style={[
                  styles.rectangular,
                  {
                    backgroundColor:
                      currentStep === 2 || currentStep === 3 || currentStep === 4 
                      ? '#21408E'
                      : theme.primaryText,
                  },
                ]}></View>
              <View
                style={[
                  styles.rectangular,
                  {
                    backgroundColor:
                      currentStep === 3 || currentStep === 4 
                      ? '#21408E'
                        : theme.primaryText,
                  },
                ]}></View>
              <View
                style={[
                  styles.rectangular,
                  {
                    backgroundColor:
                      currentStep === 4  ?  '#21408E'
                      : theme.primaryText,
                  },
                ]}></View>
            
            </View>

{currentStep === 0 && (


<Animated.View  entering={FadeInUp.delay(800)} style={{marginTop:20}}>
      <View style={styles.stepContainer}>
        <Text style={[styles.stepNumber,{color:theme.primaryText}]}>1</Text>
        <View style={styles.stepContent}>
          <Text style={[styles.stepTitle,{color:theme.primaryText}]}>Tell us about your car</Text>
          <Text style={[styles.stepDescription,{color:theme.PrimarylightText}]}>Share some basic information such as where it is and how many people can sit in it.</Text>
        </View>
      </View>

      <View style={styles.stepContainer}>
        <Text style={[styles.stepNumber,{color:theme.primaryText}]}>2</Text>
        <View style={styles.stepContent}>
          <Text style={[styles.stepTitle,{color:theme.primaryText}]}>Make it stand out</Text>
          <Text style={[styles.stepDescription,{color:theme.PrimarylightText}]}>Add 5 or more photos plus a title and description - we’ll help you out.</Text>
        </View>
      </View>

      <View style={styles.stepContainer}>
        <Text style={[styles.stepNumber,{color:theme.primaryText}]}>3</Text>
        <View style={styles.stepContent}>
          <Text style={[styles.stepTitle,{color:theme.primaryText}]}>Finish up and publish</Text>
          <Text style={[styles.stepDescription,{color:theme.PrimarylightText}]}>Choose if you’d like to start, set a daily price and publish.</Text>
        </View>
      </View>
    </Animated.View>

)}

{currentStep === 1 && (



<View entering={FadeInUp.delay(800)} style={{ marginTop: 20 }}>
<Text style={[styles.label,{color:theme.primaryText}]}>Pick Your cars Location</Text>

<TouchableOpacity
      style={[styles.dateAndTimeOpacities, { marginBottom: 10,backgroundColor:theme.BackgroundSecondary }]}
      onPress={() => navigation.navigate('MapLocation')}
    >
      <Icon name="map-marker" size={20} color={theme.primaryText} /> 
      <Text style={[styles.detailText,{color:theme.PrimarylightText}]}>{state?.completeAddress ? state?.completeAddress.line1 : "Select Your Location"}</Text>
    </TouchableOpacity>


  
</View>


)}

{currentStep === 2 && (
<Animated.View  entering={FadeInUp.delay(800)} style={{marginTop:20}} >  
<Text style={[styles.label,{color:theme.primaryText}]}> Add some photos of your car   </Text>




<ImageUpload onImageUrlsChange={handleImageUrlsChange} />
</Animated.View>
)}


{currentStep === 3 && (


<Animated.View entering={FadeInUp.delay(800)} style={{marginTop:20}}>
      <Text style={[styles.label,{color:theme.primaryText}]}>Select Your Car's Information</Text>

      <View style={styles.inputContainer}>
        <Text style={[styles.label,{color:theme.primaryText}]}>Car Brand</Text>
        <Text style={[styles.note,{color:theme.PrimarylightText}]}>Note: If the car brand is not available, please enter your custom brand name.</Text>
        <Picker
       style={[styles.dropdown,{backgroundColor:theme.BackgroundSecondary,borderRadius:10}]}
       itemStyle={{fontFamily:FONTFAMILY.Poppins_Medium,fontSize:14}}
        selectedValue={CarBrand}
       mode='dropdown'
       onValueChange={value => setCarBrand(value)}>
        
        {carBrandOptions.map((brand, index) => (
          <Picker.Item key={index} label={brand.label} value={brand.label} />
        ))}
      </Picker>
      </View>

        <View style={styles.inputContainer}>
          <Text style={[styles.label,{color:theme.PrimarylightText}]}>Model Year</Text>
          <Picker
       style={[styles.dropdown,{backgroundColor:theme.BackgroundSecondary,borderRadius:10}]}
       itemStyle={{fontFamily:FONTFAMILY.Poppins_Medium,fontSize:14}}
        selectedValue={modelYear}
       mode='dropdown'

        onValueChange={value => setModelYear(value)}>
          
        {yearOptions.map((brand, index) => (
          <Picker.Item key={index} label={brand.label} value={brand.value} />
        ))}
      </Picker>
        </View>

        <View style={styles.inputContainer}>
          <Text style={[styles.label,{color:theme.PrimarylightText}]}>Runs On</Text>
          <Picker
    style={[styles.dropdown,{backgroundColor:theme.BackgroundSecondary,borderRadius:10}]}
    itemStyle={{fontFamily:FONTFAMILY.Poppins_Medium,fontSize:14}}
        selectedValue={Gas}
        onValueChange={value => setGas(value)}>
        {gasOptions.map((brand, index) => (
          <Picker.Item key={index} label={brand.label} value={brand.label} />
        ))}
      </Picker>
        </View>

        <View style={styles.inputContainer}>
          <Text style={[styles.label,{color:theme.PrimarylightText}]}>Transmission</Text>
          <Picker
      style={[styles.dropdown,{backgroundColor:theme.BackgroundSecondary,borderRadius:10}]}
      itemStyle={{fontFamily:FONTFAMILY.Poppins_Medium,fontSize:14}}
      mode='dropdown'
        selectedValue={transmission}
        onValueChange={value => setTransmission(value)}>
        {transmissionOptions.map((brand, index) => (
          <Picker.Item key={index} label={brand.label} value={brand.label} />
        ))}
      </Picker>
        </View>

      
        <View style={styles.inputContainer}>
          <Text style={[styles.label,{color:theme.PrimarylightText}]}>Car Type</Text>
          {carTypeOptions.map((option) => (
        <CheckBox
          key={option.label}
          title={option.label}
          checked={carType === option.label}
          onPress={() => setCarType(option.label)}
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
          checkedColor='#21408E'
          uncheckedColor={theme.PrimarylightText}
          textStyle={{color:theme.PrimarylightText,fontFamily:FONTFAMILY.Poppins_Regular}}
          containerStyle={{backgroundColor:theme.BackgroundSecondary}}
        />
      ))}
        </View>
    </Animated.View>

    )}


{currentStep === 4 && (


<Animated.View entering={FadeInUp.delay(800)} style={{marginTop:20}}>
      <Text style={[styles.label,{color:theme.primaryText}]}>Select Your cars Price</Text>

      <View style={styles.inputContainer}>
        <Text style={[styles.label,{color:theme.primaryText}]}>Car Color</Text>
        <Picker
       style={[styles.dropdown,{backgroundColor:theme.BackgroundSecondary,borderRadius:10}]}
       itemStyle={{fontFamily:FONTFAMILY.Poppins_Medium,fontSize:14}}
        selectedValue={Color}
       mode='dropdown'
       onValueChange={value => setColor(value)}>
        
        {carColorOptions.map((brand, index) => (
          <Picker.Item key={index} label={brand.label} value={brand.label} />
        ))}
      </Picker>
      </View>

        <View style={styles.inputContainer}>
          <Text style={[styles.label,{color:theme.PrimarylightText}]}>Driver Option</Text>
          {driverOptions.map((option) => (
          <CheckBox
          key={option.value}
          title={option.label}
          checked={Driver === option.label}
          onPress={() => setDriver(option.label)}
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
          checkedColor='#21408E'
          uncheckedColor={theme.PrimarylightText}
          textStyle={{color:theme.PrimarylightText,fontFamily:FONTFAMILY.Poppins_Regular}}
          containerStyle={{backgroundColor:theme.BackgroundSecondary}}
        />
          ))}
        </View>

        <View style={styles.inputContainer}>
          <Text style={[styles.label,{color:theme.PrimarylightText}]}>Hourly Price</Text>
          <Slider
  style={styles.slider}
  minimumValue={min}
  step={100}
  maximumValue={max}
  value={hourlyPrice}
  onValueChange={(value) => setHourlyPrice(value)}
  minimumTrackTintColor="#21408E"
  maximumTrackTintColor="#fff"
  thumbTintColor="#21408E"
/>
<Text style={[styles.note,{color:theme.PrimarylightText}]}>  {hourlyPrice}/pkr </Text>

        </View>

       
        <View style={styles.inputContainer}>
          <Text style={[styles.label,{color:theme.PrimarylightText}]}>Daily Price</Text>
          <Slider
  style={styles.slider}
  minimumValue={min}
  step={100}
  maximumValue={max}
  value={dailyPrice}
  onValueChange={(value) => setDailyPrice(value)}
  minimumTrackTintColor="#21408E"
  maximumTrackTintColor="#fff"
  thumbTintColor="#21408E"
/>
<Text style={[styles.note,{color:theme.PrimarylightText}]}>  {dailyPrice}/pkr </Text>
        </View>
        <View style={styles.inputContainer}>
          <Text style={[styles.label,{color:theme.PrimarylightText}]}>Monthly Price</Text>
          <Slider
  style={styles.slider}
  minimumValue={min}
  step={100}
  maximumValue={max}
  value={monthlyPrice}
  onValueChange={(value) => setMonthlyPrice(value)}
  minimumTrackTintColor="#21408E"
  maximumTrackTintColor="#fff"
  thumbTintColor="#21408E"
/>
<Text style={[styles.note,{color:theme.PrimarylightText}]}>  {monthlyPrice}/pkr </Text>

        </View>
      

        <Text style={[styles.label,{color:theme.PrimarylightText}]}>Description</Text>
        <View style={[styles.input_container, { backgroundColor: theme.BackgroundSecondary, marginVertical: 10,  borderColor: '#000',
            borderWidth:1 }]}>
          
              <TextInput
                style={ { color: theme.PrimarylightText,flex:1 }}
               value={Misctext}
              onChangeText={text => setMisctext(text)}
                placeholderTextColor={theme.PrimarylightText}
              multiline={true}
              numberOfLines={6}
              />
             
            </View>



        <TouchableOpacity
      
        style={{
          backgroundColor: '#21408E',
          borderRadius: 5,
        
          border: 'transpaernt',
          paddingVertical: 8,
          paddingHorizontal: 8,
marginVertical:15,
          fontSize: 16,
        }}  onPress={handleSubmit}>
        <Text style={{color: 'white',fontFamily:FONTFAMILY.Poppins_Medium,fontSize:14,textAlign:"center"}}>Submit</Text>
      </TouchableOpacity>
    
    </Animated.View>

    )}


 




    <View style={styles.buttonContainer}>
      {/* Show the "Previous" button if the current step is greater than 0 */}
      {currentStep > 0 && (
        <TouchableOpacity onPress={handlePrevious} style={styles.button}>
          <Text style={[styles.buttonText,{color:'#000'}]}>Previous</Text>
        </TouchableOpacity>
      )}
      {/* Show the "Next" button if the current step is not the last step */}
      {currentStep < totalSteps && (
        <TouchableOpacity onPress={handleNext} style={[styles.button, { backgroundColor: '#21408E' }]}>
          <Text style={[styles.buttonText, { color: '#fff' }]}>Next</Text>
        </TouchableOpacity>
      )}
    </View>


     

    </KeyboardAwareScrollView>
  )
}

export default Likes
