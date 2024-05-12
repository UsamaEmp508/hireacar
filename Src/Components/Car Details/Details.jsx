import React, { useContext, useEffect, useRef,useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TextInput ,TouchableOpacity} from 'react-native';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import { FONTSIZE } from '../../Theme/FontSize';
import { FONTFAMILY } from '../../Theme/FontFamily';
import Header from '../DetailsHeader/Header';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { ThemeContext } from '../../Theme/ThemeContext';
import { darkTheme, lightTheme } from '../../Theme/Color';
import MapView, { Marker } from 'react-native-maps';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'; // Import FontAwesome as an example
import { Avatar, Icon, ListItem } from '@rneui/base';
import { BORDERRADIUS } from '../../Theme/BorderRadius';
import { SPACING } from '../../Theme/Spacing';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Import FontAwesome as an example
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'; // Import FontAwesome as an example
import { useMutation, useQuery } from '@apollo/client';
import { FETCH_CHATS } from '../../Service/Queries';
import { ACCESS_CHAT } from '../../Service/Mutation';

import { useNavigation } from '@react-navigation/native';
import { ChatState } from '../../Context/ChatProvider';
import FastImage from 'react-native-fast-image';
  

 // Import FontAwesome as an example

const Details = ({ data }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [expanded1, setExpanded1] = useState(false);

  const [expanded2, setExpanded2] = useState(false);

  const [expanded3, setExpanded3] = useState(false);

  const carouselRef = useRef(null);
  const themeContext = useContext(ThemeContext);
const navigation = useNavigation()
  const theme = themeContext?.isDarkTheme ? darkTheme : lightTheme;
  const { selectedChat, setSelectedChat, user, setChats, chats } = ChatState();





  const [accessChat,{loading:chatLoading}] = useMutation(ACCESS_CHAT);


  
const {  data:chatdataalready } = useQuery(FETCH_CHATS, {
  variables: { userId:user?.userByGoogleId?.id },
});


useEffect(() => {

  setChats(chatdataalready?.FetchChats)
   }, [chatdataalready])

  const renderPagination = () => (
    <Pagination
      dotsLength={data?.photos.length}
      activeDotIndex={activeIndex}
      containerStyle={styles.paginationContainer}
      dotStyle={styles.paginationDot}
      inactiveDotStyle={styles.paginationInactiveDot}
      inactiveDotOpacity={0.4}
      inactiveDotScale={0.6}
    />
  );

  const handleAccessChat = async () => {
    try {
      // Check if chat already exists between car owner and current user
      const existingChat = chats?.find(
        (chat) =>
          chat.users.some((user) => user.id === data?.owner?.id) &&
          chat.users.some((user) => user.id === user?.userByGoogleId?.id )
      );
      if (existingChat) {
        // If chat already exists, show toast message
        setSelectedChat(existingChat); // Set the selected chat
  
       navigation.navigate('dashboard', {
        screen: 'Chats',
 
      });
        return; // Exit the function
      }
  
      // If chat does not exist, proceed to access chat mutation
      const result = await accessChat({
        variables: { id: data?.owner?.id, currentUser: user?.userByGoogleId?.id  },
      });
  
      const chatdata = result.data.accessChat;
  
      if (chatdata) {
       setSelectedChat(chatdata)
       navigation.navigate('dashboard', {
        screen: 'Chats',
 
      });
  
      }
    } catch (error) {
      console.error("Error accessing chat:", error);
      // Handle error if necessary
    }
  };
  


  const handleSnapToItem = (index) => {
    setActiveIndex(index);
    // Check if carouselRef.current exists
    if (carouselRef.current) {
      // Access the snapToItem method
      carouselRef.current.snapToItem(index);
      // Check if it's the last item
      if (index === data.photos.length - 1) {
        // Scroll back to the first item after a delay
        setTimeout(() => {
          carouselRef.current.snapToItem(0);
        }, 1000); // Adjust the delay as needed
      }
    }
  };
  
  return (
    <ScrollView>
      <Header />



      <Carousel
        data={data?.photos}
        ref={carouselRef}
        renderItem={({ item }) => (
          <FastImage
            source={{uri:item}}
            style={styles.image}
            sharedTransitionTag={data?.name}
          />
        )}
        sliderWidth={400}
        itemWidth={400}
       
        layout={'default'}
        onSnapToItem={handleSnapToItem}
        autoplay={true} 
        autoplayInterval={3000} 
      />
      {renderPagination()}

      <View style={{paddingHorizontal:20}}>  
      <Animated.View entering={FadeIn.delay(600)} style={{marginTop:60,}}>
      <Text style={[styles.carName,{color:theme.primaryText}]}>{data.name}</Text>
      <Text style={[styles.priceSubHeading,{color:theme.PrimarylightText}]}>{data.City} Pakistan</Text>
      </Animated.View>
      <Animated.View entering={FadeInDown.delay(800)} style={{marginTop:10}}>
    
     
      <View style={styles.row_car_info}>   
<MaterialIcons name={'hourglass-full'} size={24} color={theme.primaryText} style={styles.leftIcon} />

<Text style={[styles.priceHeading,{color:theme.primaryText}]}>HOURLY PRICE:<Text style={[styles.priceSubHeading,{color:theme.PrimarylightText}]}> PKR {data?.hourlyPrice}  </Text> </Text>

</View>

<View style={styles.row_car_info}>   
<MaterialCommunityIcons name={'hours-24'} size={24} color={theme.primaryText} style={styles.leftIcon} />
<Text style={[styles.priceHeading,{color:theme.primaryText}]}>DAILY PRICE:<Text style={[styles.priceSubHeading,{color:theme.PrimarylightText}]}> PKR {data?.dailyPrice}/-  </Text> </Text>


</View>
<View style={styles.row_car_info}>   
<MaterialCommunityIcons name={'calendar-month'} size={24} color={theme.primaryText} style={styles.leftIcon} />
<Text style={[styles.priceHeading,{color:theme.primaryText}]}>MONTHLY PRICE:<Text style={[styles.priceSubHeading,{color:theme.PrimarylightText}]}> PKR {data?.monthlyPrice}/- </Text> </Text>


</View>
</Animated.View>
      <Text style={[styles.carName,{color:theme.primaryText,marginVertical:10}]}> Features and Classifications  </Text>  

      <View style={styles.infoRow}>
      <MaterialCommunityIcons name={'calendar-month'} size={24} color={theme.PrimarylightText} style={styles.leftIcon} />

        <Text style={[styles.priceHeading,{color:theme.PrimarylightText}]}>Year: {data?.year}</Text>
</View>


<View style={styles.infoRow}>

<Ionicons name={'color-palette-outline'} size={24} color={theme.PrimarylightText} style={styles.leftIcon} />

<Text style={[styles.priceHeading,{color:theme.PrimarylightText}]}>Color: {data?.color}</Text>
</View>

<View style={styles.infoRow}>

<Ionicons name={'car-sport-outline'} size={24} color={theme.PrimarylightText} style={styles.leftIcon} />

<Text style={[styles.priceHeading,{color:theme.PrimarylightText}]}>Car Type: {data?.carType}</Text>
</View>

<View style={styles.infoRow}>

<MaterialCommunityIcons name={'calendar-month'} size={24} color={theme.PrimarylightText} style={styles.leftIcon} />

<Text style={[styles.priceHeading,{color:theme.PrimarylightText}]}>Transmission: {data?.gearType}</Text>
</View>

<View style={styles.infoRow}>

<FontAwesome6 name={'person'} size={24} color={theme.PrimarylightText} style={styles.leftIcon} />

<Text style={[styles.priceHeading,{color:theme.PrimarylightText}]}>Driver: Available</Text>
</View>

<View style={styles.infoRow}>

<MaterialCommunityIcons name={'gas-station-outline'} size={24} color={theme.PrimarylightText} style={styles.leftIcon} />

<Text style={[styles.priceHeading,{color:theme.PrimarylightText}]}>Gas: {data?.gas}</Text>
</View>

<View style={styles.infoRow}>

<MaterialCommunityIcons name={'city'} size={24} color={theme.PrimarylightText} style={styles.leftIcon} />

<Text style={[styles.priceHeading,{color:theme.PrimarylightText}]}>City: {data?.City}</Text>
</View>

<View style={styles.infoRow}>

<MaterialCommunityIcons name={'calendar-month'} size={24} color={theme.PrimarylightText} style={styles.leftIcon} />

<Text style={[styles.priceHeading,{color:theme.PrimarylightText}]}>Availability: {data?.isAvailable}</Text>
</View>



       


      
<Text style={[styles.carName,{color:theme.primaryText}]}>Additional Information</Text>
<View style={[styles.input_container, { backgroundColor: theme.BackgroundSecondary, marginVertical: 10,  borderColor: '#000',
            borderWidth:1 }]}>
          
              <TextInput
                style={[styles.input, { color: theme.PrimarylightText,verticalAlign:"top" }]}
               
                placeholderTextColor={theme.PrimarylightText}
              multiline={true}
              numberOfLines={6}
              editable={false} // Make the TextInput read-only
              value={data?.features} // Set the initial value to the features data
              />
             
            </View>






<MapView
 style={styles.map}
initialRegion={{
latitude: data?.location?.latitude,
longitude:data?.location?.longitude,
latitudeDelta: 0.0922,
longitudeDelta: 0.0421,
}}
zoomControlEnabled={true}
>
<Marker
          coordinate={{
            latitude: data?.location?.latitude,
            longitude:data?.location?.longitude,
          }}
          title={data?.location?.city}
          description="This is where the car is located"
        />


</MapView>






<ListItem.Accordion
  content={

    <ListItem.Content  style={{backgroundColor:theme.BackgroundSecondary}}>
      <ListItem.Title style={[styles.priceHeading,{color:theme.primaryText}]}>How can I rent a car?</ListItem.Title>
    </ListItem.Content>
  }
  isExpanded={expanded}
  onPress={() => {
    setExpanded(!expanded);
  }}
  expandIcon={{color:theme.primaryText}}
  
  containerStyle={{backgroundColor:theme.BackgroundSecondary,color:theme.PrimarylightText}}
>
  <ListItem  containerStyle={{backgroundColor:theme.BackgroundSecondary}}>
    <ListItem.Content  style={{backgroundColor:theme.BackgroundSecondary}}>
      <ListItem.Title style={[styles.priceSubHeading,,{color:theme.PrimarylightText}]}>To rent a car, you can simply browse our available cars, select the one you like, and proceed with the booking process. Make sure to provide all necessary details and complete the payment to confirm your reservation.</ListItem.Title>
    </ListItem.Content>
  </ListItem>
</ListItem.Accordion>

<ListItem.Accordion
  content={
    <ListItem.Content>
      <ListItem.Title style={[styles.priceHeading,{color:theme.primaryText}]}>What documents do I need to rent a car?</ListItem.Title>
    </ListItem.Content>
  }
  isExpanded={expanded1}
  onPress={() => {
    setExpanded1(!expanded1);
  }}
  containerStyle={{backgroundColor:theme.BackgroundSecondary}}

>
  <ListItem containerStyle={{backgroundColor:theme.BackgroundSecondary}}>
    <ListItem.Content>
      <ListItem.Title style={[styles.priceSubHeading,,{color:theme.PrimarylightText}]}>Typically, you'll need a valid driver's license, a credit card for payment, and sometimes additional identification documents. Make sure to check our specific requirements or contact our customer support for more details.</ListItem.Title>
    </ListItem.Content>
  </ListItem>
</ListItem.Accordion>

<ListItem.Accordion
  content={
    <ListItem.Content>
      <ListItem.Title style={[styles.priceHeading,{color:theme.primaryText}]}>Can I modify or cancel my reservation?</ListItem.Title>
    </ListItem.Content>
  }
  isExpanded={expanded2}
  onPress={() => {
    setExpanded2(!expanded2);
  }}
  containerStyle={{backgroundColor:theme.BackgroundSecondary}}

>
  <ListItem containerStyle={{backgroundColor:theme.BackgroundSecondary}}>
    <ListItem.Content>
      <ListItem.Title style={[styles.priceSubHeading,,{color:theme.PrimarylightText}]}>Yes, you can modify or cancel your reservation, depending on our policies. Please check the terms and conditions at the time of booking. Some reservations may be subject to cancellation fees.</ListItem.Title>
    </ListItem.Content>
  </ListItem>
</ListItem.Accordion>

<ListItem.Accordion
  content={
    <ListItem.Content>
      <ListItem.Title style={[styles.priceHeading,{color:theme.primaryText}]}>What if I return the car late?</ListItem.Title>
    </ListItem.Content>
  }
  isExpanded={expanded3}
  onPress={() => {
    setExpanded3(!expanded3);
  }}
  containerStyle={{backgroundColor:theme.BackgroundSecondary}}

>
  <ListItem containerStyle={{backgroundColor:theme.BackgroundSecondary}}>
    <ListItem.Content>
      <ListItem.Title style={[styles.priceSubHeading,,{color:theme.PrimarylightText}]}>If you return the car late, you may incur additional charges. We recommend returning the car on time to avoid any extra fees. However, if you foresee a delay, please contact our support team to discuss your options.</ListItem.Title>
    </ListItem.Content>
  </ListItem>
</ListItem.Accordion>







<View style={styles.ownerInformation}>
      <Text style={[styles.priceHeading,{color:theme.primaryText,marginVertical:10,textAlign:"center"}]}>Owner Information</Text>
      <View style={styles.infoRow}>
      <Avatar
            rounded
            source={{
              uri: data?.owner?.photoLink,
            }}
          />
        <View style={styles.sectionContent}>
          <Text style={[styles.priceSubHeading,{color:theme.PrimarylightText}]}>{data?.owner?.displayName}</Text>
          <Text style={[styles.priceSubHeading,{color:theme.PrimarylightText}]}>{data?.owner?.email}</Text>
          <Text style={[styles.priceSubHeading,{color:theme.PrimarylightText}]}>{data?.owner?.contactNumber}</Text>
        </View>
        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={handleAccessChat}>
            <MaterialIcons name="message" size={24} color="#B1B3B4" style={styles.icon} />
          </TouchableOpacity>
          <MaterialIcons name="call" size={24} color="#B1B3B4" style={styles.icon} />
        </View>
      </View>
    </View>







      </View>






    

    </ScrollView>
  );
};

export default Details;

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 200,

    backgroundColor: 'transparent',
  },
  carName: {
    fontSize:FONTSIZE.size_18,
    fontFamily:FONTFAMILY.Poppins_SemiBold,
    marginBottom: 5,
  },
  rating: {
    fontSize:FONTSIZE.size_12,
    fontFamily:FONTFAMILY.Poppins_SemiBold,
    marginBottom: 5,
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
  paginationContainer: {
    position: 'absolute',
    top: 200,
    alignSelf: 'center',
  },
  paginationDot: {
    width: 30,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
    backgroundColor: '#21408E',
  },
  paginationInactiveDot: {
    width: 15,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 8,
    backgroundColor: '#cccccc',
  },
  row_car_info:{
    flexDirection:"row",
    alignItems:"center",
    gap:20,
    marginBottom:10
  },
  priceHeading:
  {
    fontSize:FONTSIZE.size_16,
    fontFamily:FONTFAMILY.Poppins_SemiBold,
  },
  priceSubHeading:
  {
    fontSize:FONTSIZE.size_14,
    fontFamily:FONTFAMILY.Poppins_Medium,
  },
 
  map: {
    width:"100%",
    height:200,
    marginBottom:10
  },
  infoRow:{
    borderWidth:1,
    borderColor:'#BDBDBD',
    flexDirection:"row",
  alignItems:"center",
  gap:20,
  paddingHorizontal:20,
  paddingVertical:6,
  borderRadius:10,
  marginBottom:10
  },
  ownerInformation: {
    marginVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#B1B3B4',
  },
  heading: {
    fontSize: 18,
    textAlign: 'center',
    color: '#000',
    fontWeight: '600',
    fontFamily: 'Poppins',
    lineHeight: 32,
    marginBottom: 16,
  },
  infoRow: {
    alignItems: 'center',
    gap:20,
    marginBottom: 8,
    paddingHorizontal: 8,
    flexDirection: 'row',
borderWidth:1,
borderColor:'#BDBDBD',
padding:8,
borderRadius:8
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
  },
  sectionContent: {
    flex: 1,
    marginLeft: 8,
  },
  
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:"center",
gap:10   
  },
  icon: {
    borderWidth: 1,
    borderColor: '#BDBDBD',
    padding: 5,
    borderRadius: 8,
    alignSelf:'center'
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
    flex: 1,
    fontFamily: FONTFAMILY.Mulish_Bold,
    fontSize: FONTSIZE.size_14,
  },
});
