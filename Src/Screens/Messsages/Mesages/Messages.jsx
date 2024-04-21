import React, { useContext,useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Header from '../../../Components/Header/Header';
import { ThemeContext } from '../../../Theme/ThemeContext';
import { lightTheme, darkTheme } from '../../../Theme/Color';
import { SPACING } from '../../../Theme/Spacing';
import { FONTFAMILY } from '../../../Theme/FontFamily';

const Messages = () => {
  const themeContext = useContext(ThemeContext);
  const theme = themeContext?.isDarkTheme ? darkTheme : lightTheme;
  const [messageText, setMessageText] = useState('');
  const sender = "You"; // Static sender
  const receiver = "Friend"; // Static receiver

  const dummyMessages = [
    {
      id: 1,
      sender: sender,
      content: 'Hey, how are you?',
      timestamp: new Date().getTime(),
    },
    {
      id: 2,
      sender: receiver,
      content: 'I am good, thanks for asking!',
      timestamp: new Date().getTime() + 1000,
    },
    {
      id: 3,
      sender: sender,
      content: 'Do you have any plans for the weekend?',
      timestamp: new Date().getTime() + 2000,
    },
  ];

  const renderItem = ({ item }) => (
    <View style={[styles.messageContainer, { alignSelf: item.sender === sender ? 'flex-end' : 'flex-start' }]}>
      <View style={[styles.messageBubble, { backgroundColor: item.sender === sender ? theme.primaryColor : theme.secondaryColor }]}>
        <Text style={[styles.content, { color: item.sender === sender ? theme.primaryText : theme.primaryText }]}>
          {item.content}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.primaryBackground }]}>
      <Header text={'Messages'} />
      <FlatList
        data={dummyMessages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingHorizontal: SPACING.space_20,marginTop:20 }}
      />

<View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, {  color: theme.PrimarylightText,backgroundColor: theme.BackgroundSecondary }]}
          placeholder="Type your message..."
          placeholderTextColor={theme.PrimarylightText}
          value={messageText}
          onChangeText={setMessageText}
          multiline={true}
        />
        <TouchableOpacity style={styles.sendButton} >
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
  messageContainer: {
    flexDirection: 'row',
    
    marginBottom: 10,
  },
  messageBubble: {
    padding: 10,
    borderRadius: 10,
    maxWidth: '100%', // Adjust as needed
  },
  content: {
    fontSize: 14,
    fontFamily:FONTFAMILY.Poppins_Medium
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
