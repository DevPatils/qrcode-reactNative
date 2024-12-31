import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import CustomButton from '@/components/CustomButton';
import { router } from 'expo-router';
import "../global.css";

const LandingPage = () => {
  const handleScanClick = () => {
    // router.push('/scan-qr');
    router.push('/sign-up');
  };

  const handleLearnMoreClick = () => {
    // router.push('/about');
  };

  return (
    <View className="flex-1 bg-green-100 justify-center items-center px-5">
      {/* Header */}
      <Text className="text-5xl font-pbold text-green-800 uppercase tracking-widest mb-5 shadow-lg">
        ECOCYCLE
      </Text>

      {/* Tagline */}
      <Text className="text-lg text-green-900 bg-yellow-100 px-6 py-3 border-2 border-green-800 mb-7 rounded-lg shadow-md text-center">
        Redefining sustainability, one product at a time.
      </Text>

      {/* Description */}
      <Text className="text-sm text-green-900 bg-white px-4 py-3 border border-green-800 mb-7 shadow-sm rounded-md text-center">
        Snap a photo of any product to uncover its journey, measure its environmental impact, and explore creative ways to recycle or upcycle it. Join us in building a sustainable future!
      </Text>

      {/* Illustration */}
      <Image
        source={{ uri: 'https://example.com/product-scan-illustration.png' }} 
        style={styles.image}
      />

      {/* Scan Product Button */}
      <CustomButton
        title='Scan a Product'
        handlepress={handleScanClick}
        containerStyles='bg-green-600 px-10 py-3 rounded-md border-2 border-green-800 shadow-md mt-5'
        textStyles='text-white font-pbold text-lg'
        isLoading={false}
      />

      {/* Learn More Button */}
      <CustomButton
        title='Learn More'
        handlepress={handleLearnMoreClick}
        containerStyles='bg-blue-500 px-10 py-3 rounded-md border-2 border-green-800 shadow-md mt-4'
        textStyles='text-white font-pbold text-lg'
        isLoading={false}
      ></CustomButton>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6ffe6',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  image: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#2d6a4f',
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginBottom: 20,
    textShadowColor: '#95d5b2',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 2,
  },
  taglineText: {
    fontSize: 18,
    color: '#1b4332',
    backgroundColor: '#d9f99d',
    padding: 10,
    borderWidth: 2,
    borderColor: '#2d6a4f',
    marginBottom: 20,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
  },
  button: {
    backgroundColor: '#2d6a4f',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 8,
    borderWidth: 3,
    borderColor: '#1b4332',
    shadowColor: '#000',
    shadowOffset: { width: 6, height: 6 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    textTransform: 'uppercase',
  },
});

export default LandingPage;
