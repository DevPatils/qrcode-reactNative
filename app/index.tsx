import CustomButton from '@/components/CustomButton';
import { router } from 'expo-router';
import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
// import SessionStorage from 'react-native-session-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import "../global.css"


const IndexPage = () => {
  const handleClick = async () => {
    const token = await AsyncStorage.getItem('token')
    if (token == null) {

      console.log(token)
      router.push('/sign-up');
    }
    
  }
  return (
    <View className="flex-1 bg-blue-300 justify-center items-center px-5">
      {/* Header */}
      <Text className="text-4xl font-pbold text-black uppercase tracking-widest mb-5 shadow-red">
        NOTES APP
      </Text>

      {/* Description */}
      <Text className="text-base text-black bg-yellow-300 px-4 py-2 border-2 border-black mb-7 shadow-md">
        Keep your ideas raw and unfiltered.
      </Text>

      {/* Create New Note Button */}
      <CustomButton
        title='Create New Note'
        handlepress={() => handleClick()}
        containerStyles='bg-green-500 px-10 py-3 rounded-md border-2 border-black shadow-md'
        textStyles='text-white font-pbold text-lg'
        isLoading={false}
      ></CustomButton>
    </View>
  );

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6', // Light gray background
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  headerText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#000',
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginBottom: 20,
    textShadowColor: '#ff0000', // Bright red shadow
    textShadowOffset: { width: 4, height: 4 },
    textShadowRadius: 0,
  },
  descriptionText: {
    fontSize: 16,
    color: '#000',
    backgroundColor: '#ffeb3b', // Bright yellow
    padding: 10,
    borderWidth: 2,
    borderColor: '#000',
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
  },
  button: {
    backgroundColor: '#4caf50', // Bold green
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 0, // Sharp edges
    borderWidth: 3,
    borderColor: '#000',
    shadowColor: '#000',
    shadowOffset: { width: 6, height: 6 },
    shadowOpacity: 1,
    shadowRadius: 0,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    textTransform: 'uppercase',
  },
});

export default IndexPage;