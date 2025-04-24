import React, { useState, useEffect } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import io from "socket.io-client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Message from "../components/Message";
import ChatInput from "../components/ChatInput";
import UserProfile from "../components/UserProfile";
import { SOCKET_URL } from "../config/api";

const socket = io(SOCKET_URL);

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const [userId, setUserId] = useState(null);
  const [users, setUsers] = useState({});

  useEffect(() => {
    const setupSocket = async () => {
      const storedUserId = await AsyncStorage.getItem("userId");
      const storedUsername = await AsyncStorage.getItem("username");
      setUserId(storedUserId);
      setUsers(prev => ({
        ...prev,
        [storedUserId]: {
          username: storedUsername,
          isOnline: true,
        }
      }));
      socket.emit("join", storedUserId);
    };

    setupSocket();

    socket.on("receiveMessage", (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    socket.on("userStatus", ({ userId, isOnline, lastSeen }) => {
      setUsers(prev => ({
        ...prev,
        [userId]: {
          ...prev[userId],
          isOnline,
          lastSeen: lastSeen || prev[userId]?.lastSeen,
        }
      }));
    });

    socket.on("error", (error) => {
      console.error("Socket error:", error);
    });

    return () => {
      socket.off("receiveMessage");
      socket.off("userStatus");
      socket.off("error");
    };
  }, []);

  const handleSend = (messageText) => {
    if (messageText.trim() && userId) {
      const messageData = {
        senderId: userId,
        message: messageText,
        senderName: users[userId]?.username || "User",
      };
      socket.emit("sendMessage", messageData);
    }
  };

  const renderMessage = ({ item }) => (
    <Message
      message={{
        text: item.message,
        timestamp: item.timestamp,
        senderName: users[item.senderId]?.username || "User",
        read: item.read,
      }}
      isOwnMessage={item.senderId === userId}
    />
  );

  return (
    <View style={styles.container}>
      <UserProfile 
        user={{
          ...users[userId],
          username: users[userId]?.username || "User",
          isOnline: true,
          lastSeen: users[userId]?.lastSeen
        }}
      />
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item, index) => index.toString()}
        style={styles.messagesList}
        inverted={false}
        contentContainerStyle={styles.messagesContainer}
      />
      <ChatInput onSend={handleSend} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  messagesList: {
    flex: 1,
  },
  messagesContainer: {
    padding: 10,
    paddingBottom: 20,
  },
});

export default ChatScreen;
