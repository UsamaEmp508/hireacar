import { StyleSheet, Text, TextInput, View,TouchableOpacity } from 'react-native'
import React, { useContext, useState } from 'react'
import { styles } from './Styles'
import { ThemeContext } from '../../Theme/ThemeContext'
import { darkTheme, lightTheme } from '../../Theme/Color'
import DropDownPicker from 'react-native-dropdown-picker';
import { FONTFAMILY } from '../../Theme/FontFamily'
import Animated, { FadeIn, FadeInDown, FadeInUp, useSharedValue } from 'react-native-reanimated';
import { Slider } from 'react-native-awesome-slider';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Toast from 'react-native-toast-message'
import {Picker} from '@react-native-picker/picker';
import ImageUpload from '../../Components/ImageUpload/Upload'
const Likes = () => {
  const [CarBrand, setCarBrand] = useState(null);
  const [Year, setYear] = useState(null);
  const [dailyPrice, setDailyPrice] = useState(0);
  const [monthlyPrice, setMonthlyPrice] = useState(0);
  const [hourlyPrice, setHourlyPrice] = useState(0);
  const [Gas, setGas] = useState(null);
  const [gearType, setGearType] = useState(null);
  const [modelYear, setModelYear] = useState('');
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
  const [Location, setLocation] = useState(null);
  const [selectedIndex, setIndex] = useState(0);
  const totalSteps = 4; // Total number of steps

  const theme = themeContext?.isDarkTheme ? darkTheme : lightTheme;
  const [open, setOpen] = useState(false);
  const [role, setrole] = useState();
  const progress = useSharedValue(30);
  const min = useSharedValue(0);
  const max = useSharedValue(100);
const [adminRef,SetadminRef] = useState()
  const [items, setItems] = useState([
    { label: 'Karachi', value: 'Karachi' },
    { label: 'Lahore', value: 'Lahore' },
    { label: 'Islamabad', value: 'Islamabad' },
  ]);


  const handleMapPress = (event) => {
    const { coordinate } = event.nativeEvent;
    const selectedLocation = {
      latitude: coordinate.latitude,
      longitude: coordinate.longitude,
    };
    setLocation(selectedLocation);
    updateFormData({ Location: selectedLocation });

    // Extract latitude and longitude and print to console
    const latitude = selectedLocation.latitude;
    const longitude = selectedLocation.longitude;
    console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
  };
  const years = Array.from({ length: 22 }, (_, i) => new Date().getFullYear() - i); // last 22 years
  const yearOptions = years.map((year) => ({ label: String(year), value: year }));
  const gas = ['Petrol', 'Diesel', 'Electric'];
  const gasOptions = gas.map((gas) => ({ label: gas, value: gas }));

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
        return  true ;
         case 2:
        return  true;
      case 3:
        return true;
      case 4:
        return true;
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
    
  return (
    <KeyboardAwareScrollView  style={styles.container}>



{currentStep === 0 && (


<Animated.View  entering={FadeInUp.delay(800)} style={{marginTop:20}}>
      <View style={styles.stepContainer}>
        <Text style={[styles.stepNumber,{color:theme.primaryText}]}>1</Text>
        <View style={styles.stepContent}>
          <Text style={[styles.stepTitle,{color:theme.primaryText}]}>Tell us about your car</Text>
          <Text style={[styles.stepDescription,{color:theme.primaryText}]}>Share some basic information such as where it is and how many people can sit in it.</Text>
        </View>
      </View>

      <View style={styles.stepContainer}>
        <Text style={[styles.stepNumber,{color:theme.primaryText}]}>2</Text>
        <View style={styles.stepContent}>
          <Text style={[styles.stepTitle,{color:theme.primaryText}]}>Make it stand out</Text>
          <Text style={[styles.stepDescription,{color:theme.primaryText}]}>Add 5 or more photos plus a title and description - we’ll help you out.</Text>
        </View>
      </View>

      <View style={styles.stepContainer}>
        <Text style={[styles.stepNumber,{color:theme.primaryText}]}>3</Text>
        <View style={styles.stepContent}>
          <Text style={[styles.stepTitle,{color:theme.primaryText}]}>Finish up and publish</Text>
          <Text style={[styles.stepDescription,{color:theme.primaryText}]}>Choose if you’d like to start, set a daily price and publish.</Text>
        </View>
      </View>
    </Animated.View>

)}

{currentStep === 1 && (


<Animated.View  entering={FadeInUp.delay(800)} style={{marginTop:20}}>

<DropDownPicker
open={open}
value={role}
items={items}

setOpen={setOpen}
setValue={setrole}
setItems={setItems}
stickyHeader={true}
style={{
  backgroundColor: theme.input_Background,
  borderRadius:12,
  paddingHorizontal:18,
  paddingVertical:2,
borderWidth:1,
  marginVertical:12,
  borderColor: '#000',
marginBottom:100
}}
labelStyle={{
    fontFamily: FONTFAMILY.Poppins_Medium,

}}
textStyle={{
  fontSize: 14,
  fontFamily: FONTFAMILY.Poppins_Medium,

}}

/>
  </Animated.View>
)}

{currentStep === 2 && (
<Animated.View  entering={FadeInUp.delay(800)} style={{marginTop:20}} >  
<Text style={styles.label}> Add some photos of your car   </Text>




<ImageUpload onImageUrlsChange={handleImageUrlsChange} />
</Animated.View>
)}


{currentStep === 3 && (


<Animated.View entering={FadeInUp.delay(800)} style={{marginTop:20}}>
      <Text style={styles.label}>Select Your Car's Information</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Car Brand</Text>
        <Text style={styles.note}>Note: If the car brand is not available, please enter your custom brand name.</Text>
        <Picker
        style={styles.input}
        selectedValue={CarBrand}
       mode='dialog'
       onValueChange={value => setCarBrand(value)}>
        
        {carBrandOptions.map((brand, index) => (
          <Picker.Item key={index} label={brand.label} value={brand.value} />
        ))}
      </Picker>
      </View>

      {CarBrand && (
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Model Year</Text>
          <Picker
        style={styles.input}
        selectedValue={modelYear}
        onValueChange={value => setModelYear(value)}>
        {modelYear.map((brand, index) => (
          <Picker.Item key={index} label={brand.label} value={brand.value} />
        ))}
      </Picker>
        </View>
      )}

      {modelYear && (
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Runs On</Text>
          <Picker
        style={styles.input}
        selectedValue={Gas}
        onValueChange={value => setGas(value)}>
        {gasOptions.map((brand, index) => (
          <Picker.Item key={index} label={brand.label} value={brand.value} />
        ))}
      </Picker>
        </View>
      )}

      {Gas && (
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Transmission</Text>
          <Picker
        style={styles.input}
        selectedValue={transmission}
        onValueChange={value => setTransmission(value)}>
        {transmissionOptions.map((brand, index) => (
          <Picker.Item key={index} label={brand.label} value={brand.value} />
        ))}
      </Picker>
        </View>
      )}

      {transmission && (
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Car Type</Text>
          {carTypeOptions.map((option) => (
        <CheckBox
          key={option.value}
          title={option.label}
          checked={carType === option.value}
          onPress={() => setCarType(option.value)}
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
        />
      ))}
        </View>
      )}
    </Animated.View>

    )}



    <View style={styles.progressContainer}>
      <View style={[styles.progressBar, { width: `${progressPercentage}%`, backgroundColor: currentStep === totalSteps && monthlyPrice ? 'green' : '#21408E' }]} />
    </View>
    <View style={styles.buttonContainer}>
      {/* Show the "Previous" button if the current step is greater than 0 */}
      {currentStep > 0 && (
        <TouchableOpacity onPress={handlePrevious} style={styles.button}>
          <Text style={styles.buttonText}>Previous</Text>
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
