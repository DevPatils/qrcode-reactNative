import React, { useState } from 'react';
import {
  Button,
  Image,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function Index() {
  const [image, setImage] = useState<string | null>(null);
  const [predictionResult, setPredictionResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const baseUrl = 'https://e741-2405-201-201d-b0f9-b589-a113-d267-27d0.ngrok-free.app';

  const requestPermission = async (type: 'camera' | 'mediaLibrary') => {
    const { status } =
      type === 'camera'
        ? await ImagePicker.requestCameraPermissionsAsync()
        : await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert('Permission Denied', `Access to ${type} is required!`);
    }

    return status === 'granted';
  };

  const handleImageSelection = async (source: 'camera' | 'gallery') => {
    const hasPermission = await requestPermission(source === 'camera' ? 'camera' : 'mediaLibrary');
    if (!hasPermission) return;

    const result =
      source === 'camera'
        ? await ImagePicker.launchCameraAsync({ allowsEditing: true, quality: 1 })
        : await ImagePicker.launchImageLibraryAsync({ allowsEditing: true, quality: 1 });

    if (!result.canceled && result.assets?.length > 0) {
      setImage(result.assets[0].uri);
    }
  };

  const uploadImage = async () => {
    if (!image) {
      Alert.alert('Error', 'Please select or capture an image first!');
      return;
    }

    const formData = new FormData();
    const response = await fetch(image);
    const blob = await response.blob();
    formData.append('image', blob, `image.${image.split('.').pop()}`);

    setLoading(true);
    try {
      const { data } = await axios.post(`${baseUrl}/predictimage`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setPredictionResult(data);
    } catch (error) {
      console.error('Upload Error:', error);
      Alert.alert('Error', 'Failed to upload image. Try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Scan Image</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleImageSelection('gallery')}
            accessibilityLabel="Pick an image from gallery"
          >
            <Icon name="photo-library" size={24} color="#FFF" />
            <Text style={styles.buttonText}>Pick an Image</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleImageSelection('camera')}
            accessibilityLabel="Capture an image using camera"
          >
            <Icon name="camera-alt" size={24} color="#FFF" />
            <Text style={styles.buttonText}>Capture a Picture</Text>
          </TouchableOpacity>
        </View>

        {image && <Image source={{ uri: image }} style={styles.image} />}
        <TouchableOpacity
          style={[styles.uploadButton, loading && styles.disabledButton]}
          onPress={uploadImage}
          disabled={loading}
        >
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F3F4F6' },
  container: { flexGrow: 1, alignItems: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#333', marginBottom: 20 },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-between', width: '80%', marginBottom: 15 },
  button: { flex: 1, flexDirection: 'row', alignItems: 'center', marginHorizontal: 5, backgroundColor: '#4F46E5', padding: 15, borderRadius: 8 },
  buttonText: { color: '#FFF', fontSize: 16, fontWeight: 'bold', marginLeft: 8 },
  image: { width: 200, height: 200, borderRadius: 10, marginVertical: 20 },
  uploadButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#10B981', padding: 15, borderRadius: 8, width: '80%', marginBottom: 15 },
  uploadButtonText: { color: '#FFF', fontSize: 16, fontWeight: 'bold', marginLeft: 8 },
  disabledButton: { backgroundColor: '#9CA3AF' },
  loading: { marginVertical: 20 },
  resultContainer: { backgroundColor: '#FFF', padding: 20, borderRadius: 10, marginTop: 20, width: '100%' },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  sectionContent: { fontSize: 16, color: '#555', marginBottom: 20 },
});
