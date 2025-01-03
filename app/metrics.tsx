import { View, Text, ScrollView, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomButton from '@/components/CustomButton';
import { router } from 'expo-router';

const Metrics = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Retrieve values from AsyncStorage
  const getProductDetailsFromStorage = async () => {
    try {
      
      const name = await AsyncStorage.getItem('name');
      const type = await AsyncStorage.getItem('type');
      const material = await AsyncStorage.getItem('material');

      const size = await AsyncStorage.getItem('size');
    
      console.log('name:', name);
      console.log('type:', type);
      console.log('material:', material);
      console.log('size:', size);
      if ( name && type && material && size) {
        return {
          
          name,
          type,
          material,
          size,
        };
      } else {
        console.log('Error: Missing some product details in AsyncStorage');
        return null;
      }
    } catch (error) {
      console.error('Error retrieving data from AsyncStorage:', error);
      return null;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const productDetails = await getProductDetailsFromStorage();

      if (productDetails) {
        try {
          const response = await fetch('https://sustain-server-hndkbfg6c8gvgwcc.southindia-01.azurewebsites.net/metricsImage', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(productDetails),
          });
          const jsonData = await response.json();
          setData(jsonData); // Set the response data
        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, []);
  const handleRecycle=()=>{
    router.replace('/recyclingMethods');
  }
  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Environmental Benefits of Recycling</Text>
      <Text style={styles.productName}>{data.product}</Text>


      <View style={styles.benefitContainer}>
        <Text style={styles.subTitle}>Carbon Emissions Saved: {data.environmental_benefits.carbon_emissions_saved.estimate} {data.environmental_benefits.carbon_emissions_saved.unit}</Text>
        <Text>{data.environmental_benefits.carbon_emissions_saved.explanation}</Text>
      </View>

      <View style={styles.benefitContainer}>
        <Text style={styles.subTitle}>Trees Saved: {data.environmental_benefits.trees_saved.estimate} {data.environmental_benefits.trees_saved.unit}</Text>
        <Text>{data.environmental_benefits.trees_saved.explanation}</Text>
      </View>

      <View style={styles.benefitContainer}>
        <Text style={styles.subTitle}>Water Saved: {data.environmental_benefits.water_saved.estimate} {data.environmental_benefits.water_saved.unit}</Text>
        <Text>{data.environmental_benefits.water_saved.explanation}</Text>
      </View>

      <View style={styles.benefitContainer}>
        <Text style={styles.subTitle}>Energy Saved: {data.environmental_benefits.energy_saved.estimate} {data.environmental_benefits.energy_saved.unit}</Text>
        <Text>{data.environmental_benefits.energy_saved.explanation}</Text>
      </View>

      <View style={styles.benefitContainer}>
        <Text style={styles.subTitle}>Landfill Space Saved: {data.environmental_benefits.landfill_space_saved.estimate} {data.environmental_benefits.landfill_space_saved.unit}</Text>
        <Text>{data.environmental_benefits.landfill_space_saved.explanation}</Text>
      </View>

      <Text style={styles.disclaimer}>{data.environmental_benefits.disclaimer}</Text>
    <CustomButton
     title='find recycling methods'
      handlepress={handleRecycle}
      containerStyles='margin-top: 20px;'
      textStyles='color: white;'
      isLoading={false}
     />
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
    marginBottom: 10,
  },
  productName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cost: {
    fontSize: 18,
    marginBottom: 20,
  },
  benefitContainer: {
    marginBottom: 20,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  disclaimer: {
    fontSize: 14,
    marginTop: 20,
    color: 'gray',
  },
});

export default Metrics;
