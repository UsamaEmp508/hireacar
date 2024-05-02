import React, { useContext, useState } from 'react';
import { StyleSheet, View, Text, Image, Pressable, ScrollView, FlatList, Alert } from 'react-native';
import { Theme, ThemeContext } from '../../Theme/ThemeContext';
import { darkTheme, lightTheme } from '../../Theme/Color';
import { useNavigation } from '@react-navigation/native'; 
import { FONTSIZE } from '../../Theme/FontSize';
import { FONTFAMILY } from '../../Theme/FontFamily';
import Animated, {FadeInDown} from 'react-native-reanimated';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import FastImage from 'react-native-fast-image'
import Entypo from 'react-native-vector-icons/Entypo';
import { BottomSheet } from '@rneui/themed';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useMutation, useQuery } from '@apollo/client';
import { deleteCar } from '../../Service/Mutation';
import { GET_USER_PROFILE } from '../../Service/Queries';
import { ChatState } from '../../Context/ChatProvider';
import { TouchableOpacity } from 'react-native-gesture-handler';
const CarItem = ({ car,index,fullscreen,edit}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const themeContext = useContext(ThemeContext);
  const theme = themeContext?.isDarkTheme ? darkTheme : lightTheme;
  const navigation = useNavigation(); // Initialize navigation hook
  const [deleteMutation,{loading}] = useMutation(deleteCar);
  const { user} = ChatState();

  const {  error, data,refetch } = useQuery(GET_USER_PROFILE, {
    variables: { id: user?.userByGoogleId?.id }
  });
  const toggleBottomSheet = () => {
    setIsVisible(!isVisible);
  };




  
  const goToCarEdit = () => {
  
    navigation.navigate('Editcar',{ id: car.id });
  };




    const goToCarDetails = () => {
      // Navigate to CarDetails screen with the car id as parameter
      navigation.navigate('CarDetails', { id: car.id });
    };
;
  
const handleDelete = async (id) => {
  try {
    const data = await deleteMutation({ variables: { id: id } });
 
    if(data )
    {
      Alert.alert('Your Car Delete successfully')
      refetch();
      setIsVisible(false);
    }
  } catch (error) {
    console.error('Error deleting car:', error);
    // Handle error if necessary
  }
};
    return (
<SafeAreaProvider>  


{loading && <ActivityIndicatorModal loaderIndicator={loading} />}

      <Animated.View entering={FadeInDown.delay(200 * index)}>
    <Pressable  style={[styles.container,{backgroundColor:theme.BackgroundSecondary,width:fullscreen?300:200}]} activeOpacity={0.7}>

  
    
<View onPress={goToCarDetails}>   
   { car?.photos?.length > 0  &&
<FastImage
            style={[styles.image,{height:fullscreen?200:100,marginRight:fullscreen?0:10}]}
        source={{
            uri:car?.photos[1],
            priority: FastImage.priority.high,
        }}
        sharedTransitionTag={car?.name}

        resizeMode={FastImage.resizeMode.cover}
    />
   

      }

  
  </View>

     <View style={styles.detailsContainer}>

        <View style={styles.row}>   
        <Text style={[styles.carName,{color:theme.primaryText}]}>{car.name}</Text>
        <Text style={[styles.rating,{color:theme.PrimarylightText}]}>4.5</Text>
        </View>
        <View style={styles.priceContainer}>
          <Text style={[styles.price,{color:theme.PrimarylightText}]}>{car.hourlyPrice}</Text>
          <Text style={[styles.carType,{color:theme.PrimarylightText}]}>{car.carType}</Text>
          <Text style={[styles.carType,{color:theme.PrimarylightText}]}>{car.gearType}</Text>
    


        </View>
        <View style={styles.priceContainer}>

          <Text style={[styles.carType,{color:theme.PrimarylightText}]}>{car.gas}</Text>

          </View>
      </View>

      {edit &&
<Entypo name="dots-three-vertical" size={20} color={theme.primaryText}   style={{alignSelf:"flex-end",marginBottom:10}}  onPress={toggleBottomSheet} /> 
}
    </Pressable>



    <BottomSheet modalProps={{ presentationStyle: "overFullScreen" }} isVisible={isVisible}   onBackdropPress={() => setIsVisible(false)}>
  <View style={[styles.bottomSheetContainer, { backgroundColor: theme.BackgroundSecondary }]}>
    <Pressable onPress={() => handleDelete(car?.id)} style={{backgroundColor:"#1F4590",padding:10}}>
      <Text style={styles.bottomSheetItem}>Delete</Text>
    </Pressable>
    <Pressable onPress={goToCarEdit}  style={{backgroundColor:"#1F4590",padding:10,marginTop:20}} >
      <Text style={styles.bottomSheetItem}>Edit</Text>
    </Pressable>
  </View>
</BottomSheet>


    </Animated.View>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
  
alignSelf:'center',

overflow:'hidden',

  },
  image: {
    width: '100%',

   
  
    backgroundColor:"transparent"
  },

row:{
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center",
    marginTop:10,
    gap:10,
    borderBottomWidth:1,
    borderBottomColor:'#F3F2F3'
},

  detailsContainer: {
    paddingHorizontal:16,
    paddingVertical:10,

},
  carName: {
    fontSize:FONTSIZE.size_16,
    fontFamily:FONTFAMILY.Poppins_SemiBold,
    marginBottom: 5,
  },
  rating: {
    fontSize:FONTSIZE.size_12,
    fontFamily:FONTFAMILY.Poppins_SemiBold,
    marginBottom: 5,
  },
  priceContainer: {
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center",
    marginTop:10
  },
  price: {
    fontSize:FONTSIZE.size_12,
    fontFamily:FONTFAMILY.Poppins_SemiBold,
    marginRight: 5,
  },
  carType: {
    fontSize:FONTSIZE.size_12,
    fontFamily:FONTFAMILY.Poppins_SemiBold,
  },
  bottomSheetContainer: {
    backgroundColor: 'transparent',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  bottomSheetItem: {
    fontSize: FONTSIZE.size_16,
    fontFamily: FONTFAMILY.Poppins_SemiBold,
    
  },
});

export default CarItem;
