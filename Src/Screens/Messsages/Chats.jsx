import { FlatList, Image, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { styles } from './Styles'
import { lightTheme, darkTheme } from '../../Theme/Color';
import { ThemeContext } from '../../Theme/ThemeContext';
import {Skeleton} from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import { ChatState } from '../../Context/ChatProvider';
import { useQuery } from '@apollo/client';
import { FETCH_CHATS } from '../../Service/Queries';
import { getSender, getsenderimage } from '../../config/ChatLogics';
const Chats = () => {

  const themeContext = useContext(ThemeContext);

  const theme = themeContext?.isDarkTheme ? darkTheme : lightTheme;
  const isLoading = false;
const  navigation = useNavigation()

  const dummyChatData = [
    {
      id: 1,
      sender: 'Alice',
      message: 'when are you coming?',
      timestamp: '2 hour ago',
      image:require('../../Assets/Images/Message/image1.jpg')
    },
    {
      id: 2,
      sender: 'Bob',
      message: 'Send me d link bro',
      timestamp: '4min',
      image:require('../../Assets/Images/Message/image2.jpg')

    },
    {
      id: 3,
      sender: 'Alice',
      message: 'Update from your end ',
      timestamp: '3 days ago',
      image:require('../../Assets/Images/Message/image1.jpg')

    },
  ];
  


  // const { selectedChat, setSelectedChat, user, notification, setNotification, chats, setChats,  } = ChatState();

  // const { loading, error, data, refetch } = useQuery(FETCH_CHATS, {
  //   variables: { userId: 'fdfdsfsd' },
   
  // });

  // useEffect(() => {
  //   if (data) {
  //     setChats(data?.FetchChats);
  //     refetch();
  //   }
  // }, [data]); // Trigger useEffect when data changes



const setSelectedChat = (item)  => {
  console.log(item)
  navigation.navigate('Messages')
  //  setSelectedChat(chat)
}

// selectedChat === chat ? "#38B2AC" : "#E8E8E8",color:selectedChat === chat ? "white" : "black"
  
  const renderItem = ({ item }) => (
  <Pressable style={[styles.messageContainer]} onPress={() => setSelectedChat(item)}>
<View style={styles.left_message}>   

{/* src={getsenderimage(LoginUserId,chat.users)} */}
  <Image source={item.image} style={styles.image} />
      <View>   
      {/* {getSender(LoginUserId, chat.users)} */}
        
      <Text style={[styles.sender,{color:theme.primaryText}]}>{item.sender}</Text>
     


{/* {chat.latestMessage && (
                <StyledMessageText>     <b>{chat.latestMessage.sender.displayName} : </b>
                    {chat.latestMessage.content.length > 50
                      ? chat.latestMessage.content.substring(0, 51) + "..."
                      : chat.latestMessage.content}</StyledMessageText>
                )} */}


      <Text style={[styles.message,{color:theme.primaryText}]}>{item.message}</Text>


      </View>
      </View>

<View style={{justifyContent:"flex-end",alignItems:'flex-end'}}>  
 {/* chat.latestMessage && (
    <StyledTimestamp>{new Date(parseInt(chat.latestMessage.createdAt)).toString()}</StyledTimestamp> */}
<Text style={[styles.timestamp,{color:theme.primaryText}]}>{item.timestamp}</Text>
<View style={[styles.message_count,{color:theme.primaryText}]}>
<Text style={styles.count_Text}>4</Text>
</View>


   </View>
     
    </Pressable>
  );
  return (
    <View style={[styles.container,{backgroundColor:theme.primaryBackground}]}>
<Text style={[styles.screen_title,{color:theme.primaryText}]}>Message</Text>

  
  <View style={styles.search}>

<View style={[styles.left,{backgroundColor:theme.InputFeild,borderColor:'#F1F1F0',borderWidth:1}]}> 
<Image source={require('../../Assets/Images/Home/Search_icon.png')} style={{tintColor:themeContext.isDarkTheme ? '#FFF':null}} />
<TextInput inputMode='text' style={styles.left_input} placeholder='Search chat here.....' placeholderTextColor={theme.PrimarylightText} />

</View>





</View>

    <View >
    {isLoading ? (
              <FlatList
                data={Array.from({length: 8})}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({index}) => (
                  <View style={styles.messageContainer}>
                    <Skeleton circle width={40} height={40} />

                    <View style={{flex: 1, marginLeft: 10}}>
                      <Skeleton
                        animation="wave"
                        width={80}
                        height={8}
                        style={{borderRadius: 10}}
                      />

                      <Skeleton
                        animation="wave"
                        width={80}
                        height={6}
                        style={{borderRadius: 10, marginTop: 5}}
                      />
                    </View>
                    <View style={{alignItems: 'flex-end'}}>
                      <Skeleton
                        animation="wave"
                        width={60}
                        height={7}
                        style={{borderRadius: 10}}
                      />
                                        <Skeleton circle width={17} height={17} style={{marginTop:5}} />

                    </View>
                  </View>
                )}
              />
            ) : (


      <FlatList
        data={dummyChatData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />


            )}
    </View>




   
  </View>
  )
}

export default Chats

