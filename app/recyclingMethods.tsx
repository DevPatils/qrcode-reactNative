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
          name: name || 'N/A',
          size: size || 'N/A',
          type: type || 'N/A',
          material: material || 'N/A',
          cost: cost || 'N/A',
        });

        const response = await axios.post(`${BASE_URL}/recyclingMethods`, {
          name,
          size,
          type,
          material,
          cost: JSON.parse(cost),
        });

        // Parse and set the response data
        setRecyclingMethods(response.data.recycling_methods || []);
      } catch (error) {
        setError('Failed to fetch recycling methods');
        console.error(error);
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
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Recycling Methods for {productDetails.name}</Text>
      {recyclingMethods.length > 0 ? (
        recyclingMethods.map((method, index) => (
          <View key={index} style={styles.methodContainer}>
            <Text style={styles.methodTitle}>{method.method_name}</Text>
            <Text style={styles.description}>{method.description}</Text>
            <Text style={styles.stepsHeader}>Steps:</Text>
            {method.steps.map((step, idx) => (
              <Text key={idx} style={styles.step}>
                {idx + 1}. {step}
              </Text>
            ))}
          </View>
        ))
      ) : (
        <Text style={styles.noMethods}>No recycling methods available</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  methodContainer: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    elevation: 2,
  },
  methodTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    marginTop: 8,
    fontSize: 14,
    color: '#555',
  },
  stepsHeader: {
    marginTop: 12,
    fontSize: 16,
    fontWeight: 'bold',
  },
  step: {
    fontSize: 14,
    color: '#333',
    marginVertical: 4,
  },
  noMethods: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 16,
    color: '#999',
  },
});

export default RecyclingMethods;