import React, { useContext } from 'react';
import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import FontAwesome as an example
import Feather from 'react-native-vector-icons/Feather'; // Import FontAwesome as an example
import Ionicons from 'react-native-vector-icons/Ionicons'; // Import FontAwesome as an example



import { ThemeContext } from '../../../Theme/ThemeContext';
import { darkTheme, lightTheme } from '../../../Theme/Color';
import { SPACING } from '../../../Theme/Spacing';
import { FONTSIZE } from '../../../Theme/FontSize';
import { FONTFAMILY } from '../../../Theme/FontFamily';

const Profile = () => {
  const themeContext = useContext(ThemeContext);
  const theme = themeContext?.isDarkTheme ? darkTheme : lightTheme;

 
  const handletoggletheme = themeContext?.toggleTheme
console.log('toggle theme',handletoggletheme)

  return (
    <View style={[styles.container, { backgroundColor: theme.primaryBackground }]}>
      <View style={[styles.body, { backgroundColor: theme.input_Background }]}>
        <View style={styles.profile_image}>
          <Image source={require('../../../Assets/Images/Message/image1.jpg')} style={styles.image} />
        </View>
        <Text style={[styles.profile_name, { color: theme.primaryText }]}>James S. Hernandez</Text>
        <Text style={[styles.profile_mail, { color: theme.PrimarylightText }]}>
          hernandex.redial@gmail.ac.in
        </Text>

   
        <TouchableOpacity style={styles.tile} onPress={() => console.log('Edit Profile')}>
          <View style={styles.inner_tile_left}>  
          <Feather name={themeContext?.isDarkTheme ? 'user' : 'user'} size={24} color={theme.primaryText} style={styles.leftIcon} />
          <Text style={[styles.tileText, { color: theme.primaryText }]}>Edit Profile</Text>
          </View>
          <Icon name={themeContext?.isDarkTheme ? 'angle-right' : 'angle-right'} size={24} color={theme.primaryText} style={styles.rightIcon} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.tile} onPress={() => console.log('My Cars')}>
          <View style={styles.inner_tile_left}>  
          <Ionicons name={themeContext?.isDarkTheme ? 'car-sport-outline' : 'car-sport-outline'} size={24} color={theme.primaryText} style={styles.leftIcon} />
          <Text style={[styles.tileText, { color: theme.primaryText }]}>My Cars</Text>
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

        <TouchableOpacity style={styles.tile} onPress={() => console.log('Logout')}>
          <View style={styles.inner_tile_left}>   
          <Icon name="sign-out" size={24} color={theme.primaryText} style={styles.leftIcon} />
          <Text style={[styles.tileText, { color: theme.primaryText }]}>Logout</Text>
          </View>
          <Icon name={themeContext?.isDarkTheme ? 'angle-right' : 'angle-right'} size={24} color={theme.primaryText} style={styles.rightIcon} />
        </TouchableOpacity>



      </View>
    </View>
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
    borderColor:'#21408E',
    borderWidth:4,
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
    width:'100%',
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
