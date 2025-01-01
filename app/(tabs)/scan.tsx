import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
  ScrollView,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { BASE_URL } from '@/constants/url';
import axios from 'axios';
import mime from 'mime';

export default function ScanImagePage() {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any | null>(null);

  const requestPermission = async (type: any) => {
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

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets?.length > 0) {
      setImage(result.assets[0].uri);
    }
  };

  const uploadImage = async () => {
    if (!image) {
      alert('Please select or capture an image first!');
      return;
    }

    setLoading(true);
    const newImageUri = image.startsWith('file://') ? image : `file://${image}`;

    const formData = new FormData();
    // @ts-expect-error: FormData accepts Blob or Buffer
    formData.append('image', {
      uri: newImageUri,
      type: mime.getType(newImageUri) || 'image/jpeg', // Default to image/jpeg if undefined
      name: newImageUri.split('/').pop(),
    });

    try {
      const response = await axios.post(`${BASE_URL}/predictimage`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json',
        },
      });

      if (response.data) {
        setResult(response.data);
      } else {
        Alert.alert('Error', 'Failed to get prediction');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Error uploading image.');
    } finally {
      setLoading(false);
    }
  };

  const discardImage = () => {
    setImage(null);
    setResult(null);
  };

  const renderPointwiseDetails = (data: any) => {
    return Object.keys(data).map((key) => (
      <View key={key} className="mb-4">
        <Text className="text-lg font-bold text-gray-700">{key}:</Text>
        {typeof data[key] === 'object' ? (
          renderPointwiseDetails(data[key])
        ) : (
          <Text className="text-gray-600 ml-4">• {data[key]}</Text>
        )}
      </View>
    ));
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
        <ScrollView className="bg-white p-4 rounded-t-2xl shadow-lg">
          <Text className="text-center text-xl font-bold mb-4">Prediction Details</Text>
          {renderPointwiseDetails(result)}
        </ScrollView>
      )}
    </View>
  );
}