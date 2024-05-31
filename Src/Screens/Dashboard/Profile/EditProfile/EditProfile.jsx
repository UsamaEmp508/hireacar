import React, { useContext, useState, useEffect } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, Pressable, Alert, SafeAreaView } from 'react-native';
import { styles } from './EditStyle';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { launchImageLibrary } from 'react-native-image-picker';
import Header from '../../../../Components/Header/Header';
import { ThemeContext } from '../../../../Theme/ThemeContext';
import { darkTheme, lightTheme } from '../../../../Theme/Color';
import { FONTFAMILY } from '../../../../Theme/FontFamily';
import Entypo from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useMutation, useQuery } from '@apollo/client';
import { GET_USER_PROFILE } from '../../../../Service/Queries';
import { ChatState } from '../../../../Context/ChatProvider';

import { apolloClient as client } from '../../../../Service/graphql';
import { UPDATE_USER } from '../../../../Service/Mutation';
import ActivityIndicatorModal from '../../../../Components/ActivityIndicatorModal';

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
const EditProfile = ({ navigation }) => {
  const [activeInput, setActiveInput] = useState('');
  const themeContext = useContext(ThemeContext);
  const theme = themeContext?.isDarkTheme ? darkTheme : lightTheme;
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [cnic, setCnic] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [googleId, setGoogleId] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [editMode, setEditMode] = useState(false); // State variable for edit mode

  
const { user,deviceToken} = ChatState();
const [photo, setPhoto] = useState("");
  const { loading, data,refetch } = useQuery(GET_USER_PROFILE, {
    variables: { id: user?.userByGoogleId?.id }
  });
console.log('data',photo) 





  useEffect(() => {
    // Set initial values when edit mode is enabled
    setGoogleId(data?.user.googleId)
      setUsername(data?.user?.displayName);
      setEmail(data?.user?.email);
      setCnic(data?.user?.cnic);
      setContactNumber(data?.user.contactNumber);
      setPhoto(data?.user?.photoLink)
    
   
  }, [data]); // Run this effect whenever editMode changes

  const handleInputFocus = (inputName) => {
    setActiveInput(inputName);
  };

  const handleInputBlur = () => {
    setActiveInput('');
  };

  const openMediaPicker = (mediaType) => {
    const options = {
      mediaType: mediaType,
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchImageLibrary(options, async (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('Image picker error: ', response.error);
      } else {
        let imageUri = response.uri || (response.assets && response.assets[0]?.uri);
        setSelectedImage(imageUri);
        const fileName = imageUri.substring(imageUri.lastIndexOf('/') + 1); // Extract file name from URI
        const file = {
          uri: imageUri,
          name: fileName,
          type: 'image/jpeg', // Default to JPEG type
        };
      
        const imageUrl = await uploadImageToBlobStorage(file);
   
        console.log('response from server',imageUrl)
        setPhoto(imageUrl);
      }
    });
  };







  const myhandleSubmit = async (event) => {
    event.preventDefault();

    const upUser = {
  
      photoLink:photo,
googleId:googleId,
      displayName: username,
      email: email,
      cnic: cnic,
      contactNumber: contactNumber,
      deviceToken:"kcdhfkjdhjkghdfjkhg"
    };
    console.log('payload data',upUser)

    client.mutate({
        mutation: UPDATE_USER,
        variables: {
          id: data?.user.id, 
          user: upUser,
        },
      })
      .then((res) => {

        console.log('res',res)
     Alert.alert('Profile updated successfully');
    setEditMode(!editMode);
setSelectedImage(null)
refetch()
      })
      .catch((err) => {
        console.log(err);
        console.log(JSON.stringify(err, null, 2));
      });
  };









  return (
    <SafeAreaView style={{flex:1}}>   
    <KeyboardAwareScrollView style={[styles.container, { backgroundColor: theme.primaryBackground }]}>
      {loading && <ActivityIndicatorModal loaderIndicator={loading} />}
      <Header text='Profile' />


      



      <View style={[styles.name_contaier, { position: 'relative' }]}>
      <Image source={{ uri: selectedImage || photo }} style={styles.image} />
{editMode && (
        <TouchableOpacity style={{ width: 12, height: 12, position: 'absolute', bottom: 5, left: 55 }} onPress={() => openMediaPicker('photo')}>
          <Image source={require('../../../../Assets/Images/Profile/Camera.png')} style={{tintColor:themeContext?.isDarkTheme?"white":null}}/>
        </TouchableOpacity>
)}

        <View style={{ flex: 0.95 }}>
          <Text style={[styles.User_name, { color: theme.PrimarylightText }]}>{username}</Text>
          <Text style={[styles.user_lastname, { color: theme.PrimarylightText }]}>{email}</Text>
        </View>

        {!editMode   ? 

       <Entypo name="edit-2" size={20} color={theme.primaryText}   onPress={() => setEditMode(true)}/> 
:
       <AntDesign name="close" size={20} color={theme.primaryText}   onPress={() => setEditMode(false)}/> 

       
        }

      </View>

      <View style={styles.form_container}>
        <View style={styles.input_container}>
          <Text style={[styles.label, { color: theme.primaryText }]}>Username</Text>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: theme.BackgroundSecondary,
                borderWidth: activeInput === 'Username' ? 0.5 : 0,
                borderColor: activeInput === 'Username' ? '#F1F1F0' : 'transparent',
                color:theme.PrimarylightText,
marginTop:activeInput === 'Username' ? 10 : 0

              },
            ]}
            onFocus={() => handleInputFocus('Username')}
            onBlur={handleInputBlur}
            onChangeText={setUsername}
            editable={editMode} // Make the input editable based on editMode state
            value={username} // Set the initial value of the input field
          />
        </View>

        <View style={styles.input_container}>
          <Text style={[styles.label, { color: theme.primaryText }]}>Email Address</Text>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: theme.BackgroundSecondary,
                borderWidth: activeInput === 'Email' ? 0.5 : 0,
                borderColor: activeInput === 'Email' ? '#F1F1F0' : 'transparent',
                color:theme.PrimarylightText,
marginTop:activeInput === 'Email' ? 10 : 0
              },
            ]}
            onFocus={() => handleInputFocus('Email')}
            onBlur={handleInputBlur}
            onChangeText={setEmail}
            editable={editMode} // Make the input editable based on editMode state
            value={email} // Set the initial value of the input field
          />
        </View>

        <View style={styles.input_container}>
          <Text style={[styles.label, { color: theme.primaryText }]}>Cnic</Text>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: theme.BackgroundSecondary,
                borderWidth: activeInput === 'cnic' ? 0.5 : 0,
                borderColor: activeInput === 'cnic' ? '#F1F1F0' : 'transparent',
                color:theme.PrimarylightText,
marginTop:activeInput === 'cnic' ? 10 : 0


              },
            ]}
            onFocus={() => handleInputFocus('cnic')}
            onBlur={handleInputBlur}
            onChangeText={setCnic}
            editable={editMode} // Make the input editable based on editMode state
            value={cnic} // Set the initial value of the input field
          />
        </View>




        <View style={styles.input_container}>
          <Text style={[styles.label, { color: theme.primaryText }]}>contactNumber</Text>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: theme.BackgroundSecondary,
                borderWidth: activeInput === 'contactNumber' ? 0.5 : 0,
                borderColor: activeInput === 'contactNumber' ? '#F1F1F0' : 'transparent',
                color:theme.PrimarylightText,
                marginTop:activeInput === 'contactNumber' ? 10 : 0


              },
            ]}
            onFocus={() => handleInputFocus('contactNumber')}
            onBlur={handleInputBlur}
            onChangeText={setCnic}
            editable={editMode} // Make the input editable based on editMode state
            value={contactNumber} // Set the initial value of the input field
          />
        </View>

      </View>

 

      {editMode && (
        <TouchableOpacity
          style={{
            backgroundColor: '#21408E',
            borderRadius: 5,
            border: 'transpaernt',
            paddingVertical: 8,
            paddingHorizontal: 8,
            marginVertical: 15,
            fontSize: 16,
          }}
          onPress={myhandleSubmit}>
          <Text style={{ color: 'white', fontFamily: FONTFAMILY.Poppins_Medium, fontSize: 14, textAlign: "center" }}>Submit</Text>
        </TouchableOpacity>
      )}

    </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default EditProfile;
