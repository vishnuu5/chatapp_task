import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { useRouter } from 'expo-router';
import axios from 'axios';
import { API_URL } from '../config/api';

const SignupScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSignup = async () => {
    try {
      if (!username || !password) {
        alert('Please fill in all fields');
        return;
      }
      
      if (username.length < 3) {
        alert('Username must be at least 3 characters long');
        return;
      }

      if (password.length < 6) {
        alert('Password must be at least 6 characters long');
        return;
      }

      const response = await axios.post(`${API_URL}/api/auth/signup`, {
        username,
        password
      });
      await AsyncStorage.setItem('token', response.data.token);
      await AsyncStorage.setItem('userId', response.data.user._id);
      await AsyncStorage.setItem('username', response.data.user.username);
      alert('Signup successful');
      router.push('/login');
    } catch (error) {
      console.error(error);
      if (error.response?.data?.message) {
        alert(error.response.data.message);
      } else {
        alert('Signup failed. Please try again.');
      }
    }
};

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Sign Up" onPress={handleSignup} />
      <Text 
        style={styles.link}
        onPress={() => router.push('/login')}
      >
        Already have an account? Login
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  link: {
    marginTop: 15,
    color: 'blue',
    textAlign: 'center',
  },
});

export default SignupScreen;