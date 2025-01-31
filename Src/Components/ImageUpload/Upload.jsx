import React, {useContext, useState} from 'react';
import {View, Text, TouchableOpacity, Image, Alert, ScrollView} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { FONTFAMILY } from '../../Theme/FontFamily';
import { Theme, ThemeContext } from '../../Theme/ThemeContext';
import { darkTheme, lightTheme } from '../../Theme/Color';
import FastImage from 'react-native-fast-image';
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
  
const ImageUpload = ({onImageUrlsChange}) => {

  const themeContext = useContext(ThemeContext);

  const theme = themeContext?.isDarkTheme ? darkTheme : lightTheme;

  const [selectedImages, setSelectedImages] = useState([]);
  const [uploadedImageUrls, setUploadedImageUrls] = useState([]);

console.log('data from server',uploadedImageUrls)

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
    onImageUrlsChange(urls);
   
  };
  

  return (
    <View>
      <View
        style={{
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor:theme.BackgroundSecondary,
          width: '100%',
          height: 228,
        }}>
        <TouchableOpacity
          onPress={() => {
            openMediaPicker('photo');
          }}>
          <Text style={{fontSize:14,fontFamily:FONTFAMILY.Poppins_Medium,color:theme.PrimarylightText}}>Choose  photos</Text>
        </TouchableOpacity>
      </View>

      <ScrollView horizontal contentContainerStyle={{marginRight:20,marginVertical:10,marginTop:10}}>
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
marginVertical:15,
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
    </View>
  );
};

export default ImageUpload;
