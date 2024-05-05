
import React, { createContext, useContext, useEffect, useState } from "react";


const ChatContext = createContext();

const ChatProvider = ({ children  }) => {
  const [selectedChat, setSelectedChat] = useState(false);
  const [user, setUser] = useState();
  const [notification, setNotification] = useState([]);
  const [chats, setChats] = useState([]);
  const [istyping, setIsTyping] = useState(false);
  const [devicetoken, setdevicetoken] = useState();


  
  return (
    <ChatContext.Provider
      value={{
        selectedChat,
        setSelectedChat,
        user,
        setUser,
        notification,
        setNotification,
        chats,
        setChats,
      istyping,
      setIsTyping,
      setdevicetoken,
      devicetoken
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const ChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;
