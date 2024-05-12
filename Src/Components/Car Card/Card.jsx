import React, { useContext, useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Text, Image, Pressable, Alert, useWindowDimensions } from 'react-native';
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
import { FlatList, ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

import AntDesign from 'react-native-vector-icons/AntDesign'; // Import FontAwesome as an example
import ActivityIndicatorModal from '../ActivityIndicatorModal';

const CarItem = ({ car,index,fullscreen,edit}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const themeContext = useContext(ThemeContext);
  const theme = themeContext?.isDarkTheme ? darkTheme : lightTheme;
  const navigation = useNavigation(); // Initialize navigation hook
  const [deleteMutation,{loading}] = useMutation(deleteCar);
  const { user} = ChatState();
  const scrollViewRef = useRef(null);
  const {  refetch } = useQuery(GET_USER_PROFILE, {
    variables: { id: user?.userByGoogleId?.id }
  });

  const windowWidth = useWindowDimensions().width;
  const handleScroll = (pageIndex) => {
    const pageWidth = windowWidth; // Assuming SCREEN_WIDTH is defined
    const offsetX = pageIndex * pageWidth;
    scrollViewRef.current.scrollTo({
      animated: true,
      x: offsetX,
      y: 0,
    });
    setCurrentPage(pageIndex); // Update currentPage state
  };
  

  useEffect(() => {
    let autoplayInterval;
  
    const startAutoplay = () => {
      autoplayInterval = setInterval(() => {
        const nextIndex = (currentPage + 1) % car.photos.length;
        handleScroll(nextIndex);
      }, 3000); // Adjust autoplay interval as needed
    };
  
    const stopAutoplay = () => clearInterval(autoplayInterval);
  
    if (scrollViewRef.current) {
      startAutoplay();
    }
  
    return () => stopAutoplay(); // Clear interval on component unmount
  }, [currentPage, car.photos.length]);
  












  const toggleBottomSheet = () => {
    setIsVisible(!isVisible);
};

  
  const goToCarEdit = () => {
  
    navigation.navigate('Editcar',{ id: car.id });
};

    const goToCarDetails = () => {
    
      navigation.navigate('CarDetails', { id: car.id });
};
  
const handleDelete = async (id) => {
  try {
    const data = await deleteMutation({ variables: { id: id } });
 
    if(data)
    {
      Alert.alert('Your Car Delete successfully')
      refetch();
      setIsVisible(false);
    }
  } catch (error) {
    console.error('Error deleting car:', error);
    
  }
};

    return (
<SafeAreaProvider>  


{loading && <ActivityIndicatorModal loaderIndicator={loading} />}

      <Animated.View entering={FadeInDown.delay(200 * index)}>
    <Pressable  style={[styles.container,{backgroundColor:theme.BackgroundSecondary,width:fullscreen?300:280}]} activeOpacity={0.7}>

  
    
<Pressable onPress={goToCarDetails}>   
   { car?.photos?.length > 0  &&

<>  
<ScrollView  horizontal
        scrollEnabled
        pagingEnabled
        showsHorizontalScrollIndicator={false}
     
        ref={scrollViewRef}
        scrollEventThrottle={16}  >
                    {car?.photos?.map((photo, index) => (
                        <FastImage
                            key={index}
                            style={[styles.image, { height: fullscreen ? 200 : 150, marginRight: fullscreen ? 0 : 10, }]}
                            source={{
                                uri: photo,
                                
                            }}
                            sharedTransitionTag={car?.name}
                          resizeMode='cover'
                        />
                    ))}
                </ScrollView>

                <View style={styles.navigationIcons}>
  <AntDesign
    name="arrowleft"
    size={24}
    color="white"
    onPress={() => handleScroll(currentPage - 1)}
  />
  <AntDesign
    name="arrowright"
    size={24}
    color="white"
    onPress={() => handleScroll(currentPage + 1)}
  />
</View>

      </>
      }

  
  </Pressable>

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
    <Pressable onPress={() => handleDelete(car?.id)} style={{padding:10,}}>
      <Text style={[styles.bottomSheetItem,{color:theme.PrimarylightText}]}>Delete</Text>
    </Pressable>
    <Pressable onPress={goToCarEdit}  style={{padding:10,marginTop:20}} >
      <Text style={[styles.bottomSheetItem,{color:theme.PrimarylightText}]}>Edit</Text>
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
    width: 300,

   
  
    backgroundColor:"transparent"
  },

row:{
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center",
    marginTop:30,
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
  navigationIcons: {
    position: 'absolute',
    bottom:-25,
    right: '40%',
 justifyContent:"center",
 alignItems:"center",

    borderRadius: 10,
    flexDirection:"row",
    gap:10
  },
  paginationItem:{
    height:5,
    width:20,
    marginRight:10
  }
});

export default CarItem;
