import { faL } from "@fortawesome/free-solid-svg-icons";
import React, { createContext, useContext, useEffect, useState } from "react";


const ChatContext = createContext();

const ChatProvider = ({ children,LoginUserId  }) => {
  const [selectedChat, setSelectedChat] = useState(false);
  const [user, setUser] = useState();
  const [notification, setNotification] = useState([]);
  const [chats, setChats] = useState([]);
  console.log('user id ',LoginUserId)

  useEffect(() => {

    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      // Parse the JSON string back into an object and set it as the user state
      setUser(JSON.parse(storedUser));
    }
  }, []);
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
        LoginUserId
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
