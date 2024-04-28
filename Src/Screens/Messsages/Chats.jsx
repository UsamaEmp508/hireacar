import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, FlatList, Image, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useQuery } from '@apollo/client';
import Moment from 'moment';
import { ChatState } from '../../Context/ChatProvider';
import { FETCH_CHATS } from '../../Service/Queries';
import { getSender, getsenderimage } from '../../config/ChatLogics';
import { styles } from './Styles';
import { lightTheme, darkTheme } from '../../Theme/Color';
import { ThemeContext } from '../../Theme/ThemeContext';
import { Skeleton } from '@rneui/base';

const Chats = () => {
  const themeContext = useContext(ThemeContext);
  const theme = themeContext?.isDarkTheme ? darkTheme : lightTheme;
  const navigation = useNavigation();
  const { selectedChat, setSelectedChat, user, setChats, chats } = ChatState();
  const { loading, data ,refetch } = useQuery(FETCH_CHATS, {
    variables: { userId: user?.userByGoogleId?.id },
  });


  const [searchQuery, setSearchQuery] = useState('');
  const [filteredChats, setFilteredChats] = useState([]);

  useEffect(() => {
    if (data) {
      setChats(data?.FetchChats);
      refetch();

    }
  }, [data]);

  useEffect(() => {
    // Filter chats based on sender's name when search query changes
    if (searchQuery.trim() !== '') {
      const filtered = chats.filter((chat) =>
        getSender(user?.userByGoogleId?.id, chat?.users).toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredChats(filtered);
    } else {
      setFilteredChats([]);
    }
  }, [searchQuery, chats]);

  const setSelectChat = (item) => {
    navigation.navigate('Messages');
    setSelectedChat(item);
  };

  const renderItem = ({ item }) => {
    const formattedTimestamp = Moment(parseInt(item?.latestMessage?.createdAt)).fromNow();
    return (
      <Pressable style={styles.messageContainer} onPress={() => setSelectChat(item)}>
        <View style={styles.left_message}>
          
          
          
          <Image source={{ uri: getsenderimage(user?.userByGoogleId?.id, item.users) }} style={styles.image} />



          <View>
            <Text style={[styles.sender, { color: theme.primaryText }]}>
              {getSender(user?.userByGoogleId?.id, item.users)}
            </Text>
            {item.latestMessage && (
              <Text style={[styles.message, { color: theme.primaryText }]}>
                {item.latestMessage?.sender?.displayName}: {item.latestMessage.content.length > 50
                  ? item.latestMessage.content.substring(0, 51) + '...'
                  : item.latestMessage.content}
              </Text>
            )}
          </View>
        </View>
        <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end' }}>
          {item.latestMessage && <Text style={[styles.timestamp, { color: theme.primaryText }]}>{formattedTimestamp}</Text>}
        </View>
      </Pressable>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.primaryBackground }]}>
      <Text style={[styles.screen_title, { color: theme.primaryText }]}>Message</Text>
      <View style={styles.search}>
        <View style={[styles.left, { backgroundColor: theme.InputFeild, borderColor: '#F1F1F0', borderWidth: 1 }]}>
          <Image source={require('../../Assets/Images/Home/Search_icon.png')} style={{ tintColor: themeContext.isDarkTheme ? '#FFF' : null }} />
          <TextInput
            inputMode="text"
            style={styles.left_input}
            placeholder="Search chat here....."
            placeholderTextColor={theme.PrimarylightText}
            value={searchQuery}
            onChangeText={(text) => setSearchQuery(text)}
          />
        </View>
      </View>
      <View>
        {loading ? (
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
            data={searchQuery.trim() !== '' ? filteredChats : chats}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
          />
        )}
      </View>
    </View>
  );
};

export default Chats;
