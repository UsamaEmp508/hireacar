import React, { useContext,useEffect,useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Header from '../../../Components/Header/Header';
import { ThemeContext } from '../../../Theme/ThemeContext';
import { lightTheme, darkTheme } from '../../../Theme/Color';
import { SPACING } from '../../../Theme/Spacing';
import { FONTFAMILY } from '../../../Theme/FontFamily';
import Scroll from '../../../Components/Scollbarchat/Scroll';
import { ALL_MESSAGES } from '../../../Service/Queries';
import { SEND_MESSAGE } from '../../../Service/Mutation';
import { getSenderFull } from '../../../config/ChatLogics';
import { ChatState } from '../../../Context/ChatProvider';
import { useMutation, useQuery } from '@apollo/client';
import io from "socket.io-client";
var socket, selectedChatCompare;
const ENDPOINT = 'http://192.168.165.88:81'
const Messages = () => {
  const themeContext = useContext(ThemeContext);
  const theme = themeContext?.isDarkTheme ? darkTheme : lightTheme;

 
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);

  const { selectedChat, setSelectedChat, user, notification, setNotification,istyping, setIsTyping } =
  ChatState();

  const { loading:mesageLoading, error, data } = useQuery(ALL_MESSAGES, {
    variables: { chatId:selectedChat?.id },
  });
  const [sendMessage] = useMutation(SEND_MESSAGE)
  const [senderInfo, setSenderInfo] = useState(null); 
 

useEffect(() => {
  if (selectedChat) {
    // Fetch sender information using getSenderFull function
    const sender = getSenderFull(user?.userByGoogleId?.id, selectedChat?.users);
    // Update state with sender information
    setSenderInfo(sender);
  }
}, [selectedChat]);



const handleSendMessage = async (event) => {
  if (newMessage) {
    event.preventDefault();

    socket.emit("stoptyping", selectedChat.id);

    setNewMessage("");

    try {
      const result = await sendMessage({
        variables: {
          content: newMessage,
          chatId: selectedChat.id,
          userId: user?.userByGoogleId?.id
        },
      });


      socket.emit("new message", result.data.sendMessage);
      setMessages([...messages, result.data.sendMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  }
};



 

  

  useEffect(() => {
    socket = io(ENDPOINT);
   

    socket.emit("setup", user?.userByGoogleId?.id);
    
    socket.on("connected", () =>  setSocketConnected(true)
    
    );
    socket.on("typing", () => setIsTyping(true));
    socket.on("stoptyping", () => setIsTyping(false));

   
  }, []);

  useEffect(() => {
    if(data)
    {

      setMessages(data?.allMessages)
    }
socket.emit("join chat", selectedChat.id);
console.log('join chat',selectedChat?.id)
    selectedChatCompare = selectedChat;
    // eslint-disable-next-line
  }, [selectedChat,data]);

  useEffect(() => {

 socket.on("new message", (newMessageRecieved) => {
      console.log('message received',newMessageRecieved)
      
      if (
        !selectedChatCompare || // if chat is not selected or doesn't match current chat
        selectedChatCompare.id !== newMessageRecieved.chat.id
      ) {
        if (!notification.includes(newMessageRecieved)) {
          setNotification([newMessageRecieved, ...notification]);
          // setFetchAgain(!fetchAgain);
        }
      } else {
        setMessages([...messages, newMessageRecieved]);
      }
console.log('notification',notification)

    });


  });










  
 
  const typingHandler = (text) => {
    setNewMessage(text);

    if (!socketConnected) return;

    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat.id);
    }
    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit("stoptyping", selectedChat.id);
        setTyping(false);
      }
    }, timerLength);
  };
 

  return (
    <View style={[styles.container, { backgroundColor: theme.primaryBackground }]}>
      <Header text={'Messages'} />
     




<Scroll   messages={messages}  />



<View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, {  color: theme.PrimarylightText,backgroundColor: theme.BackgroundSecondary }]}
          placeholder="Type your message..."
          placeholderTextColor={theme.PrimarylightText}
          value={newMessage}
          onChangeText={typingHandler}
          multiline={true}
          verticalAlign='top'
          returnKeyType="send"
          onSubmitEditing={handleSendMessage}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Messages;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal:SPACING.space_20

  },
 
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    padding: 5,
  },
  input: {
    flex: 1,
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
    height:60
  },
  sendButton: {
    backgroundColor: '#21408E',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  sendButtonText: {
    color: 'white',
    fontFamily:FONTFAMILY.Poppins_Medium,
    fontSize: 14,

    
  },
});
