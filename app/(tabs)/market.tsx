import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Market = () => {
  const [productDetails, setProductDetails] = useState({
    name: '',
    size: '',
    type: '',
    material: '',
    cost: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const name = await AsyncStorage.getItem('name');
        const size = await AsyncStorage.getItem('size');
        const type = await AsyncStorage.getItem('type');
        const material = await AsyncStorage.getItem('material');
        const cost = await AsyncStorage.getItem('cost');

        setProductDetails({
          name: name || 'N/A',
          size: size || 'N/A',
          type: type || 'N/A',
          material: material || 'N/A',
          cost: cost || 'N/A',
        });
      } catch (error) {
        console.error('Error fetching details from AsyncStorage:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, []);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-100 p-5">
      <Text className="text-2xl font-bold mb-5 text-center">Product Details</Text>
      <Text className="text-lg mb-2 text-gray-800">Name: {productDetails.name}</Text>
      <Text className="text-lg mb-2 text-gray-800">Size: {productDetails.size}</Text>
      <Text className="text-lg mb-2 text-gray-800">Type: {productDetails.type}</Text>
      <Text className="text-lg mb-2 text-gray-800">Material: {productDetails.material}</Text>
      <Text className="text-lg mb-2 text-gray-800">Cost: {productDetails.cost}</Text>
    </View>
  );
};

export default Market;
