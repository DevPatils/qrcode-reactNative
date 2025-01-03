import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BarChart } from "react-native-chart-kit";
import CustomButton from '@/components/CustomButton';
import { router } from 'expo-router';

interface MetricCardProps {
  title: string;
  value: string | number;
  unit: string;
  explanation: string;
}

const MetricCard = ({ title, value, unit, explanation }: MetricCardProps) => (
  <View style={styles.card}>
    <View style={styles.cardHeader}>
      <Text style={styles.cardTitle}>{title}</Text>
    </View>
    <View style={styles.cardContent}>
      <Text style={styles.metricValue}>
        {value} {unit}
      </Text>
      <Text style={styles.explanation}>{explanation}</Text>
    </View>
  </View>
);

const Metrics = () => {
  interface EnvironmentalBenefit {
    estimate: string;
    unit: string;
    explanation: string;
  }
  
  interface ApiResponse {
    product: string;
    environmental_benefits: {
      carbon_emissions_saved: EnvironmentalBenefit;
      water_saved: EnvironmentalBenefit;
      energy_saved: EnvironmentalBenefit;
      landfill_space_saved: EnvironmentalBenefit;
      disclaimer: string;
    };
  }
  
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);

  const getProductDetailsFromStorage = async () => {
    try {
      const name = await AsyncStorage.getItem('name');
      const type = await AsyncStorage.getItem('type');
      const material = await AsyncStorage.getItem('material');
      const size = await AsyncStorage.getItem('size');

      if (name && type && material && size) {
        return { name, type, material, size };
      }
      return null;
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
          const response = await fetch(
            'https://sustain-server-hndkbfg6c8gvgwcc.southindia-01.azurewebsites.net/metricsImage',
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(productDetails),
            }
          );
          const jsonData = await response.json();
          setData(jsonData);
        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, []);

  const handleRecycle = () => {
    // router.replace('/recycling-methods');
  };

  if (loading || !data) {
    return <Text>Loading...</Text>;
  }

  const chartData = {
    labels: ["Carbon", "Water", "Energy", "Landfill"],
    datasets: [{
      data: [
        parseFloat(data.environmental_benefits.carbon_emissions_saved.estimate),
        parseFloat(data.environmental_benefits.water_saved.estimate),
        parseFloat(data.environmental_benefits.energy_saved.estimate),
        parseFloat(data.environmental_benefits.landfill_space_saved.estimate)
      ]
    }]
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Environmental Impact</Text>
      <Text style={styles.productName}>{data.product}</Text>

      <View style={styles.chartContainer}>
        <BarChart
          data={chartData}
          width={Dimensions.get("window").width - 40}
          height={220}
          yAxisLabel=""
          yAxisSuffix=""
          chartConfig={{
            backgroundColor: "#ffffff",
            backgroundGradientFrom: "#ffffff",
            backgroundGradientTo: "#ffffff",
            decimalPlaces: 1,
            color: (opacity = 1) => `rgba(96, 165, 250, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      </View>

      <MetricCard
        title="Carbon Emissions Saved"
        value={data.environmental_benefits.carbon_emissions_saved.estimate}
        unit={data.environmental_benefits.carbon_emissions_saved.unit}
        explanation={data.environmental_benefits.carbon_emissions_saved.explanation}
      />

      <MetricCard
        title="Water Saved"
        value={data.environmental_benefits.water_saved.estimate}
        unit={data.environmental_benefits.water_saved.unit}
        explanation={data.environmental_benefits.water_saved.explanation}
      />

      <MetricCard
        title="Energy Saved"
        value={data.environmental_benefits.energy_saved.estimate}
        unit={data.environmental_benefits.energy_saved.unit}
        explanation={data.environmental_benefits.energy_saved.explanation}
      />

      <MetricCard
        title="Landfill Space Saved"
        value={data.environmental_benefits.landfill_space_saved.estimate}
        unit={data.environmental_benefits.landfill_space_saved.unit}
        explanation={data.environmental_benefits.landfill_space_saved.explanation}
      />

      <Text style={styles.disclaimer}>
        {data.environmental_benefits.disclaimer}
      </Text>

      <CustomButton
        title="Find Recycling Methods"
        handlepress={handleRecycle}
        containerStyles="margin-top: 20px;"
        textStyles="color: white;"
        isLoading={false}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  productName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  chartContainer: {
    marginVertical: 20,
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  cardHeader: {
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardContent: {
    marginTop: 8,
  },
  metricValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#60a5fa',
    marginBottom: 4,
  },
  explanation: {
    fontSize: 14,
    color: '#666',
  },
  disclaimer: {
    fontSize: 14,
    color: '#666',
    marginTop: 20,
    marginBottom: 20,
  },
});

export default Metrics;