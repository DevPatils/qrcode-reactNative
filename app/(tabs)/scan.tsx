import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { BASE_URL } from '@/constants/url';
import axios from 'axios';

export default function ScanImagePage() {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const requestPermission = async (type) => {
    const { status } =
      type === 'camera'
        ? await ImagePicker.requestCameraPermissionsAsync()
        : await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert('Permission Denied', `Access to ${type} is required!`);
    }

    return status === 'granted';
  };

  const handleImageSelection = async () => {
    const hasPermission = await requestPermission('camera');
    if (!hasPermission) return;

    const result = await ImagePicker.launchCameraAsync({ allowsEditing: true, quality: 1 });

    if (!result.canceled && result.assets?.length > 0) {
      setImage(result.assets[0].uri);
    }
  };

  const uploadImage = async () => {
    if (!image) {
      Alert.alert('Error', 'Please capture an image first!');
      return;
    }

    const formData = new FormData();
    const response = await fetch(image);
    const blob = await response.blob();
    formData.append('image', blob, `image.${image.split('.').pop()}`);

    setLoading(true);
    try {
      const { data } = await axios.post(`${BASE_URL}/predictimage`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setResult(data);
    } catch (error) {
      console.error('Upload Error:', error);
      Alert.alert('Error', 'Failed to upload image. Try again later.');
    } finally {
      setLoading(false);
    }
  };

  const discardImage = () => {
    setImage(null);
    setResult(null);
  };

  return (
    <View className="flex-1 bg-green-200">
      {/* Header */}
      <View className="flex-row justify-between items-center px-4 py-3 mt-10">
        <TouchableOpacity onPress={discardImage}>
          <Icon name="close" size={24} color="black" />
        </TouchableOpacity>
        <Text className="text-lg font-bold text-black">Scan your product</Text>
        <TouchableOpacity onPress={uploadImage}>
          <Icon name="check" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Camera Preview or Image */}
      <View className="flex-1 justify-center items-center">
        {image ? (
          <Image source={{ uri: image }} className="w-64 h-64 rounded-lg" />
        ) : (
          <TouchableOpacity
            onPress={handleImageSelection}
            className="bg-green-300 w-64 h-64 rounded-lg border-4 border-dashed border-gray-600 flex items-center justify-center">
            <Icon name="camera-alt" size={48} color="gray" />
            <Text className="text-gray-700 mt-2">Tap to Scan</Text>
          </TouchableOpacity>
        )}

        {loading && <ActivityIndicator size="large" color="#000" className="mt-4" />}
      </View>

      {/* Result Card */}
      {result && (
        <View className="bg-white p-4 rounded-t-2xl shadow-lg">
          <Text className="text-center text-xl font-bold">{result.points} Points</Text>
          <Text className="text-center text-gray-500 mt-1">{result.materialType}</Text>
        </View>
      )}
    </View>
  );
}
