import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { BASE_URL } from '@/constants/url';

const RecyclingMethods = () => {
  const [productDetails, setProductDetails] = useState({
    name: '',
    size: '',
    type: '',
    material: '',
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

        if (!name || !size || !type || !material ) {
          setError('Missing product details');
          setLoading(false);
          return;
        }

        setProductDetails({
          name: name || 'N/A',
          size: size || 'N/A',
          type: type || 'N/A',
          material: material || 'N/A',
        });

        // Fetch recycling methods from the backend API
        const response = await axios.post(`${BASE_URL}/recyclingMethods`, {
          name,
          size,
          type,
          material,
        });

        setRecyclingMethods(response.data.recycling_methods);
      } catch (error) {
        setError('Failed to fetch recycling methods');
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recycling Methods for {productDetails.name}</Text>
      {recyclingMethods.length > 0 ? (
        recyclingMethods.map((method, index) => (
          <View key={index} style={styles.methodContainer}>
       
            <Text style={styles.methodName}>{method.method_name}</Text>
            <Text>{method.description}</Text>
            <Text style={styles.stepsTitle}>Steps:</Text>
            {method.steps.map((step, stepIndex) => (
              <Text key={stepIndex} style={styles.step}>
                {stepIndex + 1}. {step}
              </Text>
            ))}
          </View>
        ))
      ) : (
        <Text>No recycling methods found.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  methodContainer: {
    marginBottom: 20,
  },
  methodName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  stepsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  step: {
    fontSize: 14,
    marginLeft: 10,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default RecyclingMethods;
