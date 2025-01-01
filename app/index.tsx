import React from 'react';
import { View, Text, Image } from 'react-native';
import CustomButton from '@/components/CustomButton';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LandingPage = () => {
  const handleScanClick = async () => {
    const token = await AsyncStorage.getItem('token')
    if (token == null) {

      console.log(token)
      
      router.push('/(auth)/sign-up');
    }
    router.push('/(tabs)/scan');
  }


  const handleLearnMoreClick = () => {
    // router.push('/about');
  };

  return (
    <View className="flex flex-1 bg-yellow-200 justify-center items-center p-5">
      {/* Header */}
      <Text className="text-5xl font-bold text-green-800 uppercase tracking-wide mb-5 bg-white border-4 border-black p-2 shadow-brutal">
        ECOCYCLE
      </Text>

      {/* Image */}
      <Image
        source={require('@/assets/images/recycler.png')}
        style={{ width: 250, height: 250 }}
        className="mb-5 shadow-brutal"
      />

      {/* Tagline */}
      <Text className="text-lg text-green-900 bg-yellow-100 px-6 py-3 border-4 border-black mb-7 rounded-md shadow-brutal text-center">
        Redefining sustainability, one product at a time.
      </Text>

      {/* Description */}
      <Text className="text-sm text-green-900 bg-white px-4 py-3 border-4 border-black mb-7 rounded-md shadow-brutal text-center">
        Snap a photo of any product to uncover its journey, measure its environmental impact, and explore creative ways to recycle or upcycle it. Join us in building a sustainable future!
      </Text>

      {/* Buttons */}
      <View className="flex flex-row gap-4">
        {/* Scan Product Button */}
        <CustomButton
          title="Scan a Product"
          handlepress={handleScanClick}
          containerStyles="bg-green-600 px-6 py-3 border-4 border-black rounded-md shadow-brutal"
          textStyles="text-white font-bold text-lg"
          isLoading={false}
        />

        {/* Learn More Button */}
        <CustomButton
          title="Learn More"
          handlepress={handleLearnMoreClick}
          containerStyles="bg-blue-500 px-6 py-3 border-4 border-black rounded-md shadow-brutal"
          textStyles="text-white font-bold text-lg"
          isLoading={false}
        />
      </View>
    </View>
  );
};

export default LandingPage;
