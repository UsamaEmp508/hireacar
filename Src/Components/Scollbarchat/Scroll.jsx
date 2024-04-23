import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { ThemeContext } from '../../Theme/ThemeContext';
import { darkTheme, lightTheme } from '../../Theme/Color';
import { FlatList } from 'react-native-gesture-handler';
import { FONTFAMILY } from '../../Theme/FontFamily';
import { SPACING } from '../../Theme/Spacing';

const Scroll = () => {

    const themeContext = useContext(ThemeContext);
    const theme = themeContext?.isDarkTheme ? darkTheme : lightTheme;

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



        // {messages &&
        //   messages?.map((m, i) => (
        //     <div style={{ display: "flex",alignItems:"center",gap:'.6rem' }} key={m.id}>
        //       {(isSameSender(messages, m, i, LoginUserId) ||
        //         isLastMessage(messages, i, LoginUserId)) && (
               
        //           <Tooltip title={m.sender.displayName} placement="bottom-start" arrow>
        //           <Avatar
        //             mt="7px"
        //             mr={1}
        //             size="sm"
        //             cursor="pointer"
        //             name={m.sender.displayName}
        //             src={m.sender.photoLink}
        //           />
        //         </Tooltip>
        //       )}
        //       <span
        //         style={{
        //           backgroundColor: `${
        //             m.sender.id === LoginUserId ? "#BEE3F8" : "#B9F5D0"
        //           }`,
        //           marginLeft: isSameSenderMargin(messages, m, i, LoginUserId),
        //           marginTop: isSameUser(messages, m, i, LoginUserId) ? 3 : 30,
        //           borderRadius: "20px",
        //           padding: "5px 15px",
        //           maxWidth: "75%",
        //         }}
        //       >
        //         {m.content}
        //       </span>
        //     </div>
        //   ))}
    
    
        <View style={[styles.messageContainer, { alignSelf: item.sender === sender ? 'flex-end' : 'flex-start' }]}>
          <View style={[styles.messageBubble, { backgroundColor: item.sender === sender ? theme.primaryColor : theme.secondaryColor }]}>
            <Text style={[styles.content, { color: item.sender === sender ? theme.primaryText : theme.primaryText }]}>
              {item.content}
            </Text>
          </View>
        </View>
    
    
    
    
      );
  return (
     <FlatList
        data={dummyMessages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingHorizontal: SPACING.space_20,marginTop:20 }}
      />

  )
}

export default Scroll

const styles = StyleSheet.create({
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

})