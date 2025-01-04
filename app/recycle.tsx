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

        // Set product details state
        setProductDetails({
          name: name || 'N/A',
          size: size || 'N/A',
          type: type || 'N/A',
          material: material || 'N/A',
          cost: cost || 'N/A',
        });

        // If the cost is a stringified number, parse it to a number, otherwise default to 0
        const parsedCost = isNaN(cost) ? 0 : parseFloat(cost);

        // Make the API request with parsed cost
        const response = await axios.post(`${BASE_URL}/recyclingMethods`, {
          name: name || 'Unknown Puck/Disc',
          size: size || 'N/A',
          type: type || 'N/A',
          material: material || 'N/A',
          cost: parsedCost,
        });

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
    return <ActivityIndicator size="large" color="#4CAF50" />;
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
    backgroundColor: '#F1F8E9',  // A soft light green background
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#388E3C',  // Dark green for good contrast
    marginBottom: 20,
    textAlign: 'center',
  },
  methodContainer: {
    marginBottom: 20,
    padding: 20,
    backgroundColor: '#E8F5E9',  // Lighter green
    borderRadius: 12,
    shadowColor: '#388E3C',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  methodTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#2C6B2F',  // Darker green for headings
    marginBottom: 12,
  },
  methodDescription: {
    fontSize: 18,
    color: '#1B5E20',  // Medium green
    marginBottom: 12,
  },
  methodSteps: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#388E3C',  // Matching the title color
    marginBottom: 8,
  },
  stepText: {
    fontSize: 16,
    marginBottom: 8,
    paddingLeft: 15,
    color: '#2C6B2F',  // Medium dark green
  },
  noMethodsText: {
    fontSize: 18,
    fontStyle: 'italic',
    color: '#4CAF50',  // A friendly green for no content state
    textAlign: 'center',
  },
  errorText: {
    fontSize: 18,
    color: '#D32F2F',  // Red color for errors
    textAlign: 'center',
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#F1F8E9',
  },
});

export default RecyclingMethods;
