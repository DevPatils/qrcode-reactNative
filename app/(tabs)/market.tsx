import CustomButton from '@/components/CustomButton';
import React from 'react';
import { View, Text, Linking } from 'react-native';

const Market = () => {
  const handlePress = () => {
    const url = 'https://example.com';
    Linking.openURL(url);
  };

  return (
    <View className="flex-1 bg-gradient-to-b from-green-500 to-green-700 justify-center items-center px-5">
      <Text className="text-white text-3xl font-bold mb-2 text-center">
        Welcome to the Market
      </Text>
      <Text className="text-gray-200 text-lg text-center mb-6">
        Discover amazing deals and opportunities
      </Text>
      <CustomButton
        title="Visit Market"
        handlepress={handlePress}
        containerStyles="bg-green-600 rounded-full py-3 px-8 shadow-lg hover:bg-green-500"
        textStyles="text-white text-lg font-semibold"
        isLoading={false}
      />
    </View>
  );
};

export default Market;
