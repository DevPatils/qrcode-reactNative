import React, { useState } from 'react';
import { Button, Image, View, Text, ScrollView, TouchableOpacity, ActivityIndicator, Alert, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function Index() {
  const [image, setImage] = useState<string | null>(null);
  const [predictionResult, setPredictionResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Gallery access permission is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const captureImage = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Camera access permission is required!');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const uploadImage = async () => {
    if (!image) {
      Alert.alert('Error', 'Please select or capture an image first!');
      return;
    }

    const formData = new FormData();
    formData.append('image', {
      uri: image,
      type: 'image/jpg',
      name: 'image.jpg',
    } as any);

    setLoading(true);
    try {
      const response = await axios.post('https://923a-2405-201-201d-b0f9-c9c6-7221-9d4c-445c.ngrok-free.app/predictimage', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setPredictionResult(response.data);
    } catch (error) {
      console.error('Error uploading image:', error);
      Alert.alert('Error', 'Failed to upload the image.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Scan Image</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={pickImage}>
          <Icon name="photo-library" size={24} color="#FFF" />
          <Text style={styles.buttonText}>Pick an Image</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={captureImage}>
          <Icon name="camera-alt" size={24} color="#FFF" />
          <Text style={styles.buttonText}>Capture a Picture</Text>
        </TouchableOpacity>
      </View>

      {image && (
        <Image source={{ uri: image }} style={styles.image} />
      )}

      <TouchableOpacity style={styles.uploadButton} onPress={uploadImage}>
        <Icon name="cloud-upload" size={24} color="#FFF" />
        <Text style={styles.uploadButtonText}>Upload Image</Text>
      </TouchableOpacity>

      {loading && <ActivityIndicator size="large" color="#4F46E5" style={styles.loading} />}

      {predictionResult && (
        <View style={styles.resultContainer}>
          <Text style={styles.sectionTitle}>Supply Chain Process:</Text>
          <Text style={styles.sectionContent}>{predictionResult.supplyChainProcess}</Text>

          <Text style={styles.sectionTitle}>Carbon Emissions Estimate:</Text>
          <Text style={styles.sectionContent}>{predictionResult.carbonEmissionsEstimate}</Text>

          <Text style={styles.sectionTitle}>Recommendations:</Text>
          <Text style={styles.sectionContent}>{predictionResult.recommendations}</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F3F4F6',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#4F46E5',
    padding: 15,
    borderRadius: 8,
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 5,
    flexDirection: 'row',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginVertical: 20,
  },
  uploadButton: {
    backgroundColor: '#10B981',
    padding: 15,
    borderRadius: 8,
    width: '80%',
    alignItems: 'center',
    marginBottom: 15,
    flexDirection: 'row',
  },
  uploadButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  loading: {
    marginVertical: 20,
  },
  resultContainer: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 10,
    marginTop: 20,
    width: '100%',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111',
    marginBottom: 10,
  },
  sectionContent: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
    lineHeight: 24,
  },
});
