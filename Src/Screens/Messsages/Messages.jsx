import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useContext } from 'react'
import { styles } from './Styles'
import { lightTheme, darkTheme } from '../../Theme/Color';
import { ThemeContext } from '../../Theme/ThemeContext';
import {Skeleton} from '@rneui/themed';
const Messages = () => {

  const themeContext = useContext(ThemeContext);

  const theme = themeContext?.isDarkTheme ? darkTheme : lightTheme;
  const isLoading = true;


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
  
  
  const renderItem = ({ item }) => (
    <View style={styles.messageContainer}>
<View style={styles.left_message}>   
  <Image source={item.image} style={styles.image} />
      <View>   
      <Text style={[styles.sender,{color:theme.primaryText}]}>{item.sender}</Text>
      <Text style={[styles.message,{color:theme.primaryText}]}>{item.message}</Text>
      </View>
      </View>

<View style={{justifyContent:"flex-end",alignItems:'flex-end'}}>  

<Text style={[styles.timestamp,{color:theme.primaryText}]}>{item.timestamp}</Text>
<View style={[styles.message_count,{color:theme.primaryText}]}>
<Text style={styles.count_Text}>4</Text>
</View>


   </View>
     
    </View>
  );
  return (
    <View style={styles.container}>
<Text style={[styles.screen_title,{color:theme.primaryText}]}>Message</Text>

  
  <View style={styles.search}>

<View style={[styles.left,{backgroundColor:theme.InputFeild,borderColor:'#F1F1F0',borderWidth:1}]}> 
<Image source={require('../../Assets/Images/Home/Search_icon.png')} style={{tintColor:"#181B0E"}} />
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

export default Messages

