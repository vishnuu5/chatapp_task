import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Message = ({ message, isOwnMessage }) => {
  return (
    <View style={[
      styles.messageContainer,
      isOwnMessage ? styles.ownMessage : styles.otherMessage
    ]}>
      {!isOwnMessage && (
        <Text style={styles.senderName}>{message.senderName}</Text>
      )}
      <Text style={styles.messageText}>{message.text}</Text>
      <View style={styles.messageFooter}>
        <Text style={styles.timestamp}>
          {new Date(message.timestamp).toLocaleTimeString()}
        </Text>
        {isOwnMessage && (
          <Ionicons 
            name={message.read ? "checkmark-done" : "checkmark"} 
            size={16} 
            color={message.read ? "#4CAF50" : "#666"}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  messageContainer: {
    maxWidth: '80%',
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
  },
  ownMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#DCF8C6',
  },
  otherMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFFFFF',
  },
  senderName: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
    fontWeight: 'bold',
  },
  messageText: {
    fontSize: 16,
  },
  messageFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 4,
  },
  timestamp: {
    fontSize: 12,
    color: '#666',
    marginRight: 4,
  },
});

export default Message;