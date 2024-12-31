import React, { useState } from 'react';
import { View, Text, TextInput, Alert } from 'react-native';
import { router } from 'expo-router';
import CustomButton from '@/components/CustomButton';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignin = async() => {
    if (!email || !password) {
      Alert.alert('Error', 'Both fields are required!');
      return;
    }
    const response=await axios.post('https://9992-49-43-33-39.ngrok-free.app/user/login',{email,password})
    console.log(response.data)
    if(response.data.token!==null){
      // sessionStorage.setItem('token', response.data.token);
      AsyncStorage.setItem('token', response.data.token);
      Alert.alert('Success', 'Sign In successful!');
      
    }
    // Alert.alert('Success', 'Sign In successful!');
    console.log({ email, password });
  };

  return (
    <View className="flex-1 bg-green-300 justify-center items-center px-5">
      {/* Header */}
      <Text className="text-4xl font-bold text-black mb-6 font-pbold">Sign In</Text>

      {/* Email Input */}
      <TextInput
        className="w-80 border-black border-2 p-3 focus:outline-none focus:shadow-[2px_2px_0px_rgba(0,0,0,1)] focus:bg-[#FFA6F6] active:shadow-[2px_2px_0px_rgba(0,0,0,1)] mb-4"
        placeholder="Email"
        placeholderTextColor="#888"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      {/* Password Input */}
      <TextInput
        className="w-80 border-black border-2 p-3 focus:outline-none focus:shadow-[2px_2px_0px_rgba(0,0,0,1)] focus:bg-[#FFA6F6] active:shadow-[2px_2px_0px_rgba(0,0,0,1)] mb-6"
        placeholder="Password"
        placeholderTextColor="#888"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {/* Sign In Button */}
      <CustomButton
        title="Sign In"
        handlepress={handleSignin}
        containerStyles="w-80 bg-green-500 py-4 rounded-md border-2 border-black shadow-md"
        textStyles="text-white font-bold text-lg uppercase"
        isLoading={false}
      />

      {/* Redirect to Sign Up */}
      <View className="mt-6">
        <Text className="text-base text-black mb-2">Don't have an account?</Text>
        <CustomButton
          title="Sign up"
          handlepress={() => router.push('/sign-up')}
          containerStyles="bg-green-500 px-10 py-3 rounded-md border-2 border-black shadow-md"
          textStyles="text-white font-pbold text-lg"
          isLoading={false}
        />
      </View>
    </View>
  );
};

export default Signin;