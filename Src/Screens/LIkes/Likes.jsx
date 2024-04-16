import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { styles } from './Styles'
import { ThemeContext } from '../../Theme/ThemeContext'
import { darkTheme, lightTheme } from '../../Theme/Color'
import DropDownPicker from 'react-native-dropdown-picker';
import { FONTFAMILY } from '../../Theme/FontFamily'
import { useSharedValue } from 'react-native-reanimated';
import { Slider } from 'react-native-awesome-slider';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
const Likes = () => {
  const [hourlyPrice, setHourlyPrice] = useState(0);
  const [dailyPrice, setDailyPrice] = useState(0);
  const [monthlyPrice, setMonthlyPrice] = useState(0);
  const [misctext, setMisctext] = useState('');
  const themeContext = useContext(ThemeContext);

  const theme = themeContext?.isDarkTheme ? darkTheme : lightTheme;
  const [open, setOpen] = useState(false);
  const [role, setrole] = useState();
  const progress = useSharedValue(30);
  const min = useSharedValue(0);
  const max = useSharedValue(100);
const [adminRef,SetadminRef] = useState()
  const [items, setItems] = useState([
    {label: 'User', value: 'user'},
    {label: 'Admin', value: 'admin'}
  ]);
  return (
    <KeyboardAwareScrollView  style={styles.container}>
  
      <View style={[styles.input_container, { backgroundColor: theme.input_Background, marginTop: 10,  borderColor: '#000',
            borderWidth:1 }]}>
          
              <TextInput
                style={[styles.input, { color: theme.PrimarylightText }]}
                placeholder="UserName"
                placeholderTextColor={theme.PrimarylightText}
              
              />
             
            </View>
            <View style={[styles.input_container, { backgroundColor: theme.input_Background, marginTop: 10,  borderColor: '#000',
            borderWidth:1 }]}>
          
              <TextInput
                style={[styles.input, { color: theme.PrimarylightText }]}
                placeholder="UserName"
                placeholderTextColor={theme.PrimarylightText}
              
              />
             
            </View>
            <View style={[styles.input_container, { backgroundColor: theme.input_Background, marginTop: 10,  borderColor: '#000',
            borderWidth:1 }]}>
          
              <TextInput
                style={[styles.input, { color: theme.PrimarylightText }]}
                placeholder="UserName"
                placeholderTextColor={theme.PrimarylightText}
              
              />
             
            </View>
            <View style={[styles.input_container, { backgroundColor: theme.input_Background, marginTop: 10,  borderColor: '#000',
            borderWidth:1 }]}>
          
              <TextInput
                style={[styles.input, { color: theme.PrimarylightText }]}
                placeholder="UserName"
                placeholderTextColor={theme.PrimarylightText}
              
              />
             
            </View>
            <View style={[styles.input_container, { backgroundColor: theme.input_Background, marginTop: 10,  borderColor: '#000',
            borderWidth:1 }]}>
          
              <TextInput
                style={[styles.input, { color: theme.PrimarylightText }]}
                placeholder="UserName"
                placeholderTextColor={theme.PrimarylightText}
              
              />
             
            </View>

       
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
  
      }}
      labelStyle={{
          fontFamily: FONTFAMILY.Poppins_Medium,

      }}
      textStyle={{
        fontSize: 14,
        fontFamily: FONTFAMILY.Poppins_Medium,

      }}

/>

<Slider
      style={styles.SLider_container}
      progress={progress}
      minimumValue={min}
      maximumValue={max}
    />

    </KeyboardAwareScrollView>
  )
}

export default Likes
