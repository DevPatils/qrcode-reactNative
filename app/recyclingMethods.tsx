import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { BASE_URL } from '@/constants/url';  

const RecyclingMethods = () => {
  const [productDetails, setProductDetails] = useState({
    name: '',
    size: '',
    type: '',
    material: '',
    cost: ''
  });
  const [recyclingMethods, setRecyclingMethods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const name = await AsyncStorage.getItem('name');
        const size = await AsyncStorage.getItem('size');
        const type = await AsyncStorage.getItem('type');
        const material = await AsyncStorage.getItem('material');
        const cost = await AsyncStorage.getItem('cost');

        if (!name || !size || !type || !material || !cost) {
          setError('Missing product details');
          setLoading(false);
          return;
        }

        setProductDetails({
          name,
          size,
          type,
          material,
          cost,
        });

        const response = await axios.post(`${BASE_URL}/recyclingMethods`, {
          name,
          size,
          type,
          material,
          cost: JSON.parse(cost),
        });

        const parsedResponse = JSON.parse(response.data);
        setRecyclingMethods(parsedResponse.recycling_methods);
      } catch (error) {
        setError('Failed to fetch recycling methods');
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, []);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Recycling Methods for {productDetails.name}</Text>
      {recyclingMethods.map((method, index) => (
        <View key={index} style={styles.methodContainer}>
          
          <Text style={styles.methodTitle}>{method.method_name}</Text>
          <Text style={styles.methodDescription}>{method.description}</Text>
          <Text style={styles.stepsHeader}>Steps:</Text>
          {method.steps.map((step, stepIndex) => (
            <Text key={stepIndex} style={styles.step}>
              {stepIndex + 1}. {step}
            </Text>
          ))}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  methodContainer: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
  },
  methodTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  methodDescription: {
    marginTop: 5,
    fontSize: 16,
  },
  stepsHeader: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  step: {
    fontSize: 14,
    marginLeft: 10,
    marginTop: 5,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
});

export default RecyclingMethods;
