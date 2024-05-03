import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useState ,useEffect} from 'react'
import { ThemeContext } from '../../Theme/ThemeContext';
import { darkTheme, lightTheme } from '../../Theme/Color';
import { useNavigation, useRoute } from '@react-navigation/native';
import { GET_CAR_BY_ID } from '../../Service/Queries';
import { UPDATE_CAR } from '../../Service/Mutation';
import { BORDERRADIUS } from '../../Theme/BorderRadius';
import { SPACING } from '../../Theme/Spacing';
import { useMutation, useQuery } from '@apollo/client';
import  Slider  from 'react-native-slider';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { Switch } from '@rneui/themed';
import Header from '../../Components/Header/Header';
import { Image } from '@rneui/base';
import { launchImageLibrary } from 'react-native-image-picker';
import { FONTFAMILY } from '../../Theme/FontFamily';
const EditCar = () => {
    const themeContext = useContext(ThemeContext);
    const theme = themeContext?.isDarkTheme ? darkTheme : lightTheme;


    const [dailyPrice, setDailyPrice] = useState(0);
    const [monthlyPrice, setMonthlyPrice] = useState(0);
    const [hourlyPrice, setHourlyPrice] = useState(0);
    const [isAvailable, setIsAvailable] = useState(false);
    const [Misctext, setMisctext] = useState('');
const navigation = useNavigation();
    const route = useRoute();
    const {id} = route.params;
  
    const [updateCarMutation, { loading: updateLoading, error: updateError }] = useMutation(UPDATE_CAR);
  
    const { loading, error, data } = useQuery(GET_CAR_BY_ID, {
      variables: { id: id }
    });
    const [checked, setChecked] = useState(false);
    const [selectedImages, setSelectedImages] = useState([]);
    const [uploadedImageUrls, setUploadedImageUrls] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
   
    

    const min = 100;
    const max = 100000;
  

    useEffect(() => {
        if (data && data.car) {
          setDailyPrice(data.car.dailyPrice);
          setMonthlyPrice(data.car.monthlyPrice);
          setHourlyPrice(data.car.hourlyPrice);
          setMisctext(data.car.features);
          setChecked(data.car.isAvailable);
          setSelectedImages(data.car.photos)
        }
      }, [data]);
    
      const onSubmit = async () => {
        try {
          const { data: responseData } = await updateCarMutation({
            variables: {
              id: id,
              updateCarData: {
                monthlyPrice: monthlyPrice,
                dailyPrice: dailyPrice,
                hourlyPrice: hourlyPrice,
                features: Misctext,
                isAvailable: isAvailable,
                photos:uploadedImageUrls
              },
            },
          });
          if (responseData) {
            Alert.alert('Car Update Successfully');
            navigation.navigate("dashboard",{screen:'Profile'});
          }
        } catch (error) {
          console.error('Error updating car:', error);
        }
      };


      const containerName = 'carpictures';
const blobEndpoint = 'https://hacblob.blob.core.windows.net/';
const sasToken ='?sp=racwdli&st=2024-04-30T04:14:42Z&se=2025-05-02T12:14:42Z&sv=2022-11-02&sr=c&sig=Gou1kUymMG%2Bq%2FudWWfVoDKoEdF%2FTNSbtYFGhBYJgAFo%3D';
  const uploadImageToBlobStorage = async file => {
    try {
      const uniqueFileName = `${Date.now()}-${file.name}`;
      const urlWithSasToken = `${blobEndpoint}${containerName}/${uniqueFileName}${sasToken}`;
  
      // Determine the content type based on the file extension
      let contentType = 'image/jpeg'; // Default to JPEG type
      if (file.type === 'image/png' || file.name.endsWith('.png')) {
          contentType = 'image/png';
      }
    
  
      await fetch(urlWithSasToken, {
        method: 'PUT',
        body: file,
        headers: {
          'Content-Type': 'multipart/form-data',
          'x-ms-blob-type': 'BlockBlob',
        },
      });
  
      // Return the actual image URL without SAS token
      const url = `${blobEndpoint}${containerName}/${uniqueFileName}`;
      return url;
    } catch (error) {
      console.error('Error uploading image:', error);
      return null;
    }
  };






  const handleRemoveImage = index => {
    setSelectedImages(prevImages => prevImages.filter((_, i) => i !== index));
  };

  const openMediaPicker = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
      saveToPhotos: true,
    };
  
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('Image picker error: ', response.error);
      } else {
        console.log('response', response);
        let imageUri = response.assets && response.assets[0]?.uri;
        console.log('image uri', imageUri);
        setSelectedImages([...selectedImages, imageUri]); // Update here
      }
    });
  };
  
  const handleImageUpload = async () => {
    if (selectedImages.length === 0) {
      Alert.alert('Error', 'Please select an image to upload.');
      return;
    }
  
    const urls = [];
  
    for (const imageUri of selectedImages) {
      const fileName = imageUri.substring(imageUri.lastIndexOf('/') + 1); // Extract file name from URI
      const file = {
        uri: imageUri,
        name: fileName,
        type: 'image/jpeg', // Default to JPEG type
      };
    
      const imageUrl = await uploadImageToBlobStorage(file);
      console.log('response from server',imageUrl)
      if (imageUrl) {
        urls.push(imageUrl);
      }
    }
    console.log('uploaded image url', urls);
    setUploadedImageUrls(urls);
  
    setSelectedImages([]); 
    setImageUrls(urls);
   
  };

  
  return (
    <KeyboardAwareScrollView  style={[styles.container,{backgroundColor:theme.primaryBackground}]}>

<Header text={'Edit Profile'}  /> 


<View
        style={{
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor:theme.BackgroundSecondary,
          width: '100%',
          height: 228,
          marginTop:20
        }}>
        <TouchableOpacity
          onPress={() => {
            openMediaPicker('photo');
          }}>
          <Text style={{fontSize:14,fontFamily:FONTFAMILY.Poppins_Medium,color:theme.PrimarylightText}}>Choose  photos</Text>
        </TouchableOpacity>
      </View>

      <ScrollView horizontal contentContainerStyle={{marginRight:20,marginTop:20}}>
        {/* Display thumbnails of selected images */}
        {selectedImages?.map((image, index) => (
          <View
            key={index}
            style={{ display: 'inline-block'}}>
            <Image
              source={{uri:`${image}` }}
              style={{width: 100, height: 100, marginRight: 5,position: 'relative',}}
            />
            <TouchableOpacity
              onPress={() => handleRemoveImage(index)}
              style={{
                position: 'absolute',
                top: 0,
                left: 1,
                backgroundColor: 'gray',
                padding: 5,
              }}>
              <Text style={{color: 'white'}}>&#x2715;</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity
        onPress={handleImageUpload}
        style={{
          backgroundColor: '#21408E',
          borderRadius: 5,
        
          border: 'transpaernt',
          paddingVertical: 8,
          paddingHorizontal: 8,
marginBottom:15,
          fontSize: 16,
        }}>
        <Text style={{color: 'white',fontFamily:FONTFAMILY.Poppins_Medium,fontSize:14,textAlign:"center"}}>Upload Photos</Text>
      </TouchableOpacity>

      <View>
        {/* Display uploaded images */}
        {uploadedImageUrls.map((url, index) => (
          <FastImage
            key={index}
            source={{uri: url }}
            style={{width: 100, height: 100, margin: 5}}
          />
       ))} 
      </View>




<View style={styles.inputContainer}>

<Text style={[styles.label,{color:theme.PrimarylightText}]}>Car Available</Text>



<Switch
      value={checked}
      onValueChange={(value) => setChecked(value)}
    />

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
      }}  onPress={onSubmit}>
      <Text style={{color: 'white',fontFamily:FONTFAMILY.Poppins_Medium,fontSize:14,textAlign:"center"}}>Submit</Text>
    </TouchableOpacity>

    </KeyboardAwareScrollView>
  )
}

export default EditCar

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 25,
      },
     


    inputContainer: {
        marginVertical: 20,
      },
      input_container: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        width: '100%',
      
      borderRadius: BORDERRADIUS.radius_12,
        paddingHorizontal: SPACING.space_18,
        paddingVertical: SPACING.space_2,
        ...Platform.select({
          ios: {
            shadowColor: 'black',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 10,
          },
          android: {
            elevation: 0.5,
          },
        }),
      },
     
      input: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        padding: 10,
      },

      label:{
        fontSize: 18,
        marginVertical:5,
            fontFamily:FONTFAMILY.Poppins_Bold,
      },
})