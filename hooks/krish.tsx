//home

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking } from 'react-native';

export default function Home() {
  const baseUrl = 'https://e741-2405-201-201d-b0f9-b589-a113-d267-27d0.ngrok-free.app';
  const handleGoogleSignIn = () => {
    Linking.openURL(`${baseUrl}/google`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to SustainScan</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={handleGoogleSignIn}
        accessibilityLabel="Sign in with Google"
      >
        <Text style={styles.buttonText}>Sign in with Google</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#4285F4',
    padding: 15,
    borderRadius: 8,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
