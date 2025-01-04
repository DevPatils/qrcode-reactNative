import CustomButton from '@/components/CustomButton';
import React, { useEffect } from 'react';
import { View, Text, Linking } from 'react-native';
import axios from 'axios';

const Market = () => {
  

  const handleMarketData = async() => {
    const response = await axios.get('https://sustain-server-hndkbfg6c8gvgwcc.southindia-01.azurewebsites.net/market/all-products')
    console.log(response.data.products)
  }

  useEffect(() => {
    handleMarketData();
  } , [])
  const handlePress = () => {
    const url = 'https://market-place-sand.vercel.app/';
    Linking.openURL(url);
  };

  return (
    <View className="flex-1 bg-gradient-to-b from-green-500 to-green-700 justify-center items-center px-5">
      <Text className="text-green-pea-700 text-4xl font-bold mb-2 text-center">
        Welcome to the Market
      </Text>
      <Text className="text-neutral-500 text-lg text-center mb-6">
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
