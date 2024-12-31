import React, { useState } from 'react';
import { View, Text, TextInput, Alert } from 'react-native';
import { router } from 'expo-router';
import CustomButton from '@/components/CustomButton';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    if (!username || !email || !password) {
      Alert.alert('Error', 'All fields are required!');
      return;
    }

    try {
      const response = await axios.post('https://fb64-49-43-33-162.ngrok-free.app/user/signUp', {
        name: username,
        email,
        password,
      });
      console.log(response.data);

      if (response.data.message === 'User created') {
        Alert.alert('Success', 'User created successfully!');
        setUsername('');
        setEmail('');
        setPassword('');
        await AsyncStorage.setItem('token', response.data.token);
       router.replace('/scan');
      } else {
        Alert.alert('Error', 'Failed to create user!');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'An error occurred during sign-up.');
    }
  };

  return (
    <View className="flex flex-1 bg-yellow-200 justify-center items-center p-5">
      {/* Header */}
      <Text className="text-5xl font-bold text-green-800 uppercase tracking-wide mb-5 bg-white border-4 border-black p-2 shadow-brutal">
        Sign Up
      </Text>

      {/* Username Input */}
      <TextInput
        className="w-80 border-black border-4 p-4 bg-yellow-100 focus:outline-none focus:shadow-[4px_4px_0px_rgba(0,0,0,1)] focus:bg-white mb-5"
        placeholder="Username"
        placeholderTextColor="#666"
        value={username}
        onChangeText={setUsername}
      />

      {/* Email Input */}
      <TextInput
        className="w-80 border-black border-4 p-4 bg-yellow-100 focus:outline-none focus:shadow-[4px_4px_0px_rgba(0,0,0,1)] focus:bg-white mb-5"
        placeholder="Email"
        placeholderTextColor="#666"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      {/* Password Input */}
      <TextInput
        className="w-80 border-black border-4 p-4 bg-yellow-100 focus:outline-none focus:shadow-[4px_4px_0px_rgba(0,0,0,1)] focus:bg-white mb-7"
        placeholder="Password"
        placeholderTextColor="#666"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {/* Signup Button */}
      <CustomButton
        title="Sign Up"
        handlepress={handleSignup}
        containerStyles="bg-green-600 w-80 py-4 border-4 border-black rounded-md shadow-brutal"
        textStyles="text-white font-bold text-lg"
        isLoading={false}
      />

      {/* Redirect to Sign In */}
      <View className="mt-8 flex items-center">
        <Text className="text-lg text-green-900 mb-4">Already have an account?</Text>
        <CustomButton
          title="Sign In"
          handlepress={() => router.push('/sign-in')}
          containerStyles="bg-blue-500 w-80 py-3 border-4 border-black rounded-md shadow-brutal"
          textStyles="text-white font-bold text-lg"
          isLoading={false}
        />
      </View>
    </View>
  );
};

export default Signup;
