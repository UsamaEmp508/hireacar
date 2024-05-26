import React, { useContext } from 'react';
import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import Feather from 'react-native-vector-icons/Feather'; 
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'; 



import { ThemeContext } from '../../../Theme/ThemeContext';
import { darkTheme, lightTheme } from '../../../Theme/Color';
import { SPACING } from '../../../Theme/Spacing';
import { FONTSIZE } from '../../../Theme/FontSize';
import { FONTFAMILY } from '../../../Theme/FontFamily';
import { useNavigation } from '@react-navigation/native';


import { ChatState } from '../../../Context/ChatProvider';
import { removeData } from '../../../Utility/Storage/Storage';
import { GET_USER_PROFILE } from '../../../Service/Queries';
import { useMutation, useQuery } from '@apollo/client';
import { SaveToken } from '../../../Service/Mutation';
import { ScrollView } from 'react-native-gesture-handler';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

const Profile = () => {
  const themeContext = useContext(ThemeContext);
  const theme = themeContext?.isDarkTheme ? darkTheme : lightTheme;
const navigation = useNavigation()
const { user,setUser} = ChatState();
const [saveToken, {  error }] = useMutation(SaveToken);
console.log('user',user)
const { loading:userprofileloading, data:userprofile } = useQuery(GET_USER_PROFILE, {
  variables: { id: user?.userByGoogleId?.id }
});

const handleSaveToken = async (userId, deviceId, platform) => {
console.log(deviceId,userId,platform)

  try {
    const { data } = await saveToken({
      variables: {
        data: {
          userId,
          deviceId,
          platform,
        },
      },
    });
    console.log('Token saved:', data.saveToken);
  } catch (err) {
    console.error('Error saving token:', err);
  }
};


  const handletoggletheme = themeContext?.toggleTheme
const Logout = async () => {
    
  GoogleSignin.revokeAccess()
  GoogleSignin.signOut()
  
  handleSaveToken(user?.userByGoogleId?.googleId,"",Platform.OS,)
  removeData();
  setUser(null)
};

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.primaryBackground, }]}>
      <View style={[styles.body, { backgroundColor: theme.input_Background,marginBottom:40 }]}>
        <View style={styles.profile_image}>
          <Image source={{uri:userprofile?.user?.photoLink}} style={styles.image} />
        </View>
        <Text style={[styles.profile_name, { color: theme.primaryText }]}>{userprofile?.user?.displayName}</Text>
        <Text style={[styles.profile_mail, { color: theme.PrimarylightText }]}>{user?.userByGoogleId?.email} </Text>

   
        <TouchableOpacity style={styles.tile} onPress={() => navigation.navigate('EditProfile')}>
          <View style={styles.inner_tile_left}>  
          <Feather name={themeContext?.isDarkTheme ? 'user' : 'user'} size={24} color={theme.primaryText} style={styles.leftIcon} />
          <Text style={[styles.tileText, { color: theme.primaryText }]}>Edit Profile</Text>
          </View>
          <Icon name={themeContext?.isDarkTheme ? 'angle-right' : 'angle-right'} size={24} color={theme.primaryText} style={styles.rightIcon} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.tile} onPress={() => navigation.navigate('MyCar')}>
          <View style={styles.inner_tile_left}>  
          <Ionicons name={themeContext?.isDarkTheme ? 'car-sport-outline' : 'car-sport-outline'} size={24} color={theme.primaryText} style={styles.leftIcon} />
          <Text style={[styles.tileText, { color: theme.primaryText }]}>My Cars</Text>
          </View>
          <Icon name={themeContext?.isDarkTheme ? 'angle-right' : 'angle-right'} size={24} color={theme.primaryText} style={styles.rightIcon} />
        </TouchableOpacity>



        <TouchableOpacity style={styles.tile} onPress={() =>  navigation.navigate('PrivacyPolicy') }>
          <View style={styles.inner_tile_left}>  
          <MaterialIcons name={themeContext?.isDarkTheme ? 'privacy-tip' : 'privacy-tip'} size={24} color={theme.primaryText} style={styles.leftIcon} />
          <Text style={[styles.tileText, { color: theme.primaryText }]}>Privacy Policy</Text>
          </View>
          <Icon name={themeContext?.isDarkTheme ? 'angle-right' : 'angle-right'} size={24} color={theme.primaryText} style={styles.rightIcon} />
        </TouchableOpacity>


        <TouchableOpacity style={styles.tile} onPress={() =>  navigation.navigate('TermsCondition')}>
          <View style={styles.inner_tile_left}>  
          <Ionicons name={themeContext?.isDarkTheme ? 'car-sport-outline' : 'car-sport-outline'} size={24} color={theme.primaryText} style={styles.leftIcon} />
          <Text style={[styles.tileText, { color: theme.primaryText }]}>Terms and Condition</Text>
          </View>
          <Icon name={themeContext?.isDarkTheme ? 'angle-right' : 'angle-right'} size={24} color={theme.primaryText} style={styles.rightIcon} />
        </TouchableOpacity>
    

        <TouchableOpacity style={styles.tile} onPress={() =>  navigation.navigate('Contact')}>
          <View style={styles.inner_tile_left}>  
          <Ionicons name={themeContext?.isDarkTheme ? 'car-sport-outline' : 'car-sport-outline'} size={24} color={theme.primaryText} style={styles.leftIcon} />
          <Text style={[styles.tileText, { color: theme.primaryText }]}>Contact Support</Text>
          </View>
          <Icon name={themeContext?.isDarkTheme ? 'angle-right' : 'angle-right'} size={24} color={theme.primaryText} style={styles.rightIcon} />
        </TouchableOpacity>
    

        <TouchableOpacity style={styles.tile} onPress={handletoggletheme}>
          <View style={styles.inner_tile_left}>  
          <Icon name={themeContext?.isDarkTheme ? 'moon-o' : 'sun-o'} size={24} color={theme.primaryText} style={styles.leftIcon} />

          <Text style={[styles.tileText, { color: theme.primaryText }]}>Dark Mode</Text>
          
          </View>
          <Icon name={themeContext?.isDarkTheme ? 'angle-right' : 'angle-right'} size={24} color={theme.primaryText} style={styles.rightIcon} />
        </TouchableOpacity>

        
        <TouchableOpacity style={styles.tile} onPress={Logout}>
          <View style={styles.inner_tile_left}>   
          <Icon name="sign-out" size={24} color={theme.primaryText} style={styles.leftIcon} />
          <Text style={[styles.tileText, { color: theme.primaryText }]}>Logout</Text>
          </View>
          <Icon name={themeContext?.isDarkTheme ? 'angle-right' : 'angle-right'} size={24} color={theme.primaryText} style={styles.rightIcon} />
        </TouchableOpacity>


      </View>
    </ScrollView>
  );
}

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: SPACING.space_24,
    paddingVertical:SPACING.space_10
  },
 
  profile_image:{
   
    alignSelf:'center',
    marginTop:-SPACING.space_30,
    
    
  },
  image:{
    width:100,
    height:100,
    borderRadius:100,
 
  },
  profile_name:{
    fontSize:FONTSIZE.size_24,
    fontFamily:FONTFAMILY.Poppins_SemiBold,
    textAlign:'center'
  },
  profile_mail:{
    fontSize:FONTSIZE.size_12,
    fontFamily:FONTFAMILY.Poppins_SemiBold,

    textAlign:'center',
    marginBottom:SPACING.space_20

},
body:{
 
    flex:1,
    borderRadius:16,
    shadowColor: 'rgba(0, 0, 0, 0.08)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 1,
    marginTop:50
},
tile: {
    flexDirection: 'row',
    justifyContent:"space-between",
    alignItems: 'center',
    padding: 10,
    margin: 5,
  },
  leftImage: {
    width: 22,
    height: 20,
    marginRight: 10,
  },
  rightImage: {
    width: 10,
    height: 17,
    marginLeft: 10,
  },
  textContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  title: {
    fontSize: FONTSIZE.size_14,
    fontFamily:FONTFAMILY.Poppins_SemiBold,

},
tileText:{
  fontSize: FONTSIZE.size_14,
  fontFamily:FONTFAMILY.Poppins_SemiBold,
},
inner_tile_left:{
  flexDirection: 'row',
  alignItems: 'center',
  gap:10
}
});
