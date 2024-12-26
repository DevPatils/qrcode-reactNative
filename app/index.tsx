import React, { useState } from 'react';
import { Button, Image, View, Platform, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

export default function Index() {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission to access gallery is required!');
        return;
      }
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaType.Images,  // Fixed deprecation warning
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const captureImage = async () => {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission to access camera is required!');
        return;
      }
    }

    let result = await ImagePicker.launchCameraAsync({
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
      alert('Please select or capture an image first!');
      return;
    }

    // Create FormData for uploading
    const formData = new FormData();
    formData.append('image', {
      uri: image,
      type: 'image/jpg',
      name: 'image.jpg',
    });

    try {
      const response = await fetch('https://bc21-49-43-33-162.ngrok-free.app/predictimage', {
        method: 'POST',
        body: formData,
      });

      // Check if response is valid and a JSON object
      const textResponse = await response.text();
      try {
        const jsonResponse = JSON.parse(textResponse);
        if (response.ok) {
          Alert.alert('Prediction Result', JSON.stringify(jsonResponse));
        } else {
          Alert.alert('Error', 'Failed to get prediction');
        }
      } catch (error) {
        console.error('Error parsing response:', error);
        Alert.alert('Error', 'Failed to parse the response.');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Error uploading image.');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Pick an image" onPress={pickImage} />
      <Button title="Capture a picture" onPress={captureImage} />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      <Button title="Upload Image" onPress={uploadImage} />
    </View>
  );
}
