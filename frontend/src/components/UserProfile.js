import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const UserProfile = ({ user }) => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("userId");
      router.replace("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        {user.avatar ? (
          <Ionicons name="person" size={24} color="white" />
        ) : (
          <Text style={styles.avatarText}>
            {user.username ? user.username[0].toUpperCase() : "?"}
          </Text>
        )}
        {user.isOnline && <View style={styles.onlineIndicator} />}
      </View>
      <View style={styles.userInfo}>
        <View style={styles.nameContainer}>
          <Text style={styles.username}>{user.username}</Text>
          {/* <Ionicons 
            name={user.isOnline ? "ellipse" : "time"} 
            size={16} 
            color={user.isOnline ? "#4CAF50" : "#666"}
            style={styles.statusIcon}
          /> */}
        </View>
        <Text style={styles.lastSeen}>
          {user.isOnline ? "Online" : `Last seen ${user.lastSeen}`}
        </Text>
      </View>
      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <Ionicons name="log-out-outline" size={24} color="#FF3B30" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 10,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    position: "relative",
  },
  avatarText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  onlineIndicator: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#4CAF50",
    borderWidth: 2,
    borderColor: "white",
  },
  userInfo: {
    flex: 1,
  },
  username: {
    fontSize: 16,
    fontWeight: "bold",
  },
  lastSeen: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },
  nameContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  statusIcon: {
    marginLeft: 5,
  },
  logoutButton: {
    padding: 8,
  },
});

export default UserProfile;
