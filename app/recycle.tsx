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
          name: name || 'Unknown Puck/Disc',  // Default value if not found
          size: size || 'N/A',
          type: type || 'N/A',
          material: material || 'N/A',
          cost: JSON.parse(cost) || 0,
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
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Recycling Methods for {productDetails.name}</Text>

      {recyclingMethods.length > 0 ? (
        recyclingMethods.map((method, index) => (
          <View key={index} style={styles.methodContainer}>
            <Text style={styles.methodTitle}>{method.method_name}</Text>
            <Text style={styles.methodDescription}>{method.description}</Text>
            <Text style={styles.methodSteps}>Steps:</Text>
            {method.steps && method.steps.map((step, stepIndex) => (
              <Text key={stepIndex} style={styles.stepText}>{`${stepIndex + 1}. ${step}`}</Text>
            ))}
          </View>
        ))
      ) : (
        <Text style={styles.noMethodsText}>No recycling methods available.</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  methodContainer: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 2 },
  },
  methodTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
  },
  methodDescription: {
    fontSize: 16,
    marginBottom: 10,
  },
  methodSteps: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  stepText: {
    fontSize: 14,
    marginBottom: 5,
    paddingLeft: 10,
  },
  noMethodsText: {
    fontSize: 18,
    fontStyle: 'italic',
    color: '#888',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});

export default RecyclingMethods;
