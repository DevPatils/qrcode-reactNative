import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { BASE_URL } from '@/constants/url'; // Ensure this is set
import { router } from 'expo-router';

export default function Metrics() {
  const [metrics, setMetrics] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [productDetails, setProductDetails] = useState<any>(null);

  const navigateToMetrics = () => {
    router.replace('/metrics'); 
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch product details from AsyncStorage
        const name = await AsyncStorage.getItem('name');
        const size = await AsyncStorage.getItem('size');
        const type = await AsyncStorage.getItem('type');
        const material = await AsyncStorage.getItem('material');
        const cost = await AsyncStorage.getItem('cost');

        // Log values for debugging
        console.log('Fetched values from AsyncStorage:', { name, size, type, material, cost });

        // Store the details in state
        setProductDetails({
          name: name || 'N/A',
          size: size || 'N/A',
          type: type || 'N/A',
          material: material || 'N/A',
          cost: cost || 'N/A',
        });

        // Check if all necessary data is available
        if (!name || !size || !type || !material || !cost) {
          setError('Missing product details');
          setLoading(false);
          return;
        }

        // Make the API call if all data is available
        const response = await axios.post(`${BASE_URL}/fetchMetrics`, {
          name,
          size,
          type,
          material,
          cost,
        });

        setMetrics(response.data);
      } catch (error) {
        setError('Failed to fetch metrics');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <View className="flex-1 bg-white p-4">
      
    

      {/* Render Product Details */}
      {productDetails && (
        <View className="mb-4">
          <Text className="text-xl font-bold">Product Details</Text>
          <Text>Name: {productDetails.name}</Text>
          <Text>Size: {productDetails.size}</Text>
          <Text>Type: {productDetails.type}</Text>
          <Text>Material: {productDetails.material}</Text>
          <Text>Cost: {productDetails.cost}</Text>
        </View>
      )}

      {/* Render Environmental Metrics */}
      {metrics && (
        <View>
          <Text className="text-xl font-bold">Environmental Metrics</Text>
          <Text>- Carbon Footprint: {metrics.carbonFootprint || 'N/A'}</Text>
          <Text>- Water Usage: {metrics.waterUsage || 'N/A'}</Text>
          <Text>- Energy Consumption: {metrics.energyConsumption || 'N/A'}</Text>
        </View>
      )}
    </View>
  );
}
