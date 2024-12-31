import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import { NavigationProp } from '@react-navigation/native';
import { router } from 'expo-router';
import CustomButton from '@/components/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Signup = ({ navigation }: { navigation: NavigationProp<any> }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async() => {
    if (!username || !email || !password) {
      Alert.alert('Error', 'All fields are required!');
      return;
    }
    const response=await axios.post('https://0759-49-43-33-162.ngrok-free.app/user/signup',{name:username,email,password})
    console.log(response.data)
    if(response.data.message==="User created"){
      Alert.alert('Success', 'User created successfully!');
      setUsername('');
      setEmail('');
      setPassword('');
      AsyncStorage.setItem('token', response.data.token);
    //   router.replace('/createnotes')
    }
    console.log({ username, email, password });
  };

  return (
    <View className="flex-1 bg-green-300 justify-center items-center px-5">
      {/* Header */}
      <Text className="text-4xl font-bold text-black mb-6 font-pbold">Sign Up</Text>

      {/* Username Input */}
      <TextInput
        className="w-80 border-black border-2 p-3 focus:outline-none focus:shadow-[2px_2px_0px_rgba(0,0,0,1)] focus:bg-[#FFA6F6] active:shadow-[2px_2px_0px_rgba(0,0,0,1)] mb-4"
        placeholder="Username"
        placeholderTextColor="#888"
        value={username}
        onChangeText={setUsername}
      />

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

      {/* Signup Button */}
      <TouchableOpacity
        className="w-80 bg-green-500 py-4 rounded-md items-center border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)]"
        onPress={handleSignup}
      >
        <Text className="text-white font-bold text-lg uppercase">Sign Up</Text>
      </TouchableOpacity>

      {/* Redirect to Sign In */}
      <View className="mt-6">
        <Text className="text-base text-black mb-2">Already have an account?</Text>
        <CustomButton
          title="Sign In"
          handlepress={() => router.push('/sign-in')}
          containerStyles="bg-green-500 px-10 py-3 rounded-md border-2 border-black shadow-md"
          textStyles="text-white font-pbold text-lg"
          isLoading={false}
        />
      </View>
    </View>
  );
};

export default Signup;