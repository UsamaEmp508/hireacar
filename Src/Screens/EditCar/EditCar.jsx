import { StyleSheet, Text, View } from 'react-native'
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
import { TextInput } from 'react-native-gesture-handler';
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


    const min = 100;
    const max = 100000;
  

    useEffect(() => {
        if (data && data.car) {
          setDailyPrice(data.car.dailyPrice);
          setMonthlyPrice(data.car.monthlyPrice);
          setHourlyPrice(data.car.hourlyPrice);
          setMisctext(data.car.features);
          setIsAvailable(data.car.isAvailable);
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
              },
            },
          });
          if (responseData) {
            toast.success('Car Update Successfully');
            navigation.navigate('UserProfile');
          }
        } catch (error) {
          console.error('Error updating car:', error);
        }
      };
  return (
    <KeyboardAwareScrollView  style={[styles.container,{backgroundColor:theme.primaryBackground}]}>


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
        marginBottom: 20,
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
})