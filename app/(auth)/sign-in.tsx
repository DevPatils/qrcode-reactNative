import React, { useState } from 'react';
import { View, Text, TextInput, Alert } from 'react-native';
import { router } from 'expo-router';
import CustomButton from '@/components/CustomButton';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Both fields are required!');
      return;
    }

    try {
      const response = await axios.post('https://6493-2405-201-2011-94-9cd5-18bf-5edd-ca76.ngrok-free.app/user/login', { email, password });
      console.log(response.data);

      if (response.data.token) {
        await AsyncStorage.setItem('token', response.data.token);
        Alert.alert('Success', 'Sign In successful!');
      } else {
        Alert.alert('Error', 'Invalid credentials!');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'An error occurred during sign-in.');
    }
  };

  return (
    <View className="flex flex-1 bg-yellow-200 justify-center items-center p-5">
      {/* Header */}
      <Text className="text-5xl font-bold text-green-800 uppercase tracking-wide mb-5 bg-white border-4 border-black p-2 shadow-brutal">
        Sign In
      </Text>

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

      {/* Sign In Button */}
      <CustomButton
        title="Sign In"
        handlepress={handleSignin}
        containerStyles="bg-green-600 w-80 py-4 border-4 border-black rounded-md shadow-brutal"
        textStyles="text-white font-bold text-lg"
        isLoading={false}
      />

      {/* Redirect to Sign Up */}
      <View className="mt-8 flex items-center">
        <Text className="text-lg text-green-900 mb-4">Don't have an account?</Text>
        <CustomButton
          title="Sign Up"
          handlepress={() => router.push('/sign-up')}
          containerStyles="bg-blue-500 w-80 py-3 border-4 border-black rounded-md shadow-brutal"
          textStyles="text-white font-bold text-lg"
          isLoading={false}
        />
      </View>
    </View>
  );
};

export default Signin;
