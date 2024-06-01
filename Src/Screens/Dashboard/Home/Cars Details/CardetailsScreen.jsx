import { ActivityIndicator, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import Details from '../../../../Components/Car Details/Details';
import { FONTFAMILY } from '../../../../Theme/FontFamily';
import { FONTSIZE } from '../../../../Theme/FontSize';
import Animated, {FadeIn, FadeInDown} from 'react-native-reanimated';
import Header from '../../../../Components/DetailsHeader/Header';
import { ThemeContext } from '../../../../Theme/ThemeContext';
import { darkTheme, lightTheme } from '../../../../Theme/Color';
import { GET_CAR_BY_ID } from '../../../../Service/Queries';
import { useQuery } from '@apollo/client';
import ActivityIndicatorModal from '../../../../Components/ActivityIndicatorModal';

const CardetailsScreen = ({route}) => {

    const { id } = route.params;

    const themeContext = useContext(ThemeContext);
    const { loading, error, data } = useQuery(GET_CAR_BY_ID, {
      variables: { id }
    });




    const theme = themeContext?.isDarkTheme ? darkTheme : lightTheme;

  
   
   
  
   
console.log('id',id,data)

  return (
      <SafeAreaView style={[styles.container,{backgroundColor:theme.primaryBackground}]}>
 <ActivityIndicatorModal loaderIndicator={loading} />


<Details data={data?.car} />
    </SafeAreaView>
  )
}

export default CardetailsScreen

const styles = StyleSheet.create({

  container: {
  flex:1
 
   
    
      },
    
})