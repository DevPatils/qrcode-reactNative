import React, { useState } from 'react';
import { Button, Image, View, Platform, Alert, Text, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios'; // Import Axios

export default function Index() {
  const [image, setImage] = useState(null);
  const [predictionResult, setPredictionResult] = useState(null); // Store prediction results

  const pickImage = async () => {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission to access gallery is required!');
        return;
      }
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaType.Images,
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

    const formData = new FormData();
    formData.append('image', {
      uri: image,
      type: 'image/jpg',
      name: 'image.jpg',
    });

    try {
      // Make the request using Axios
      const response = await axios.post('https://4169-49-43-32-139.ngrok-free.app/predictimage', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Important for uploading images
        },
      });
      console.log(response.data)
      setPredictionResult(response.data);
      // Handle the response data
      // const jsonResponse = response.data;
      // if (jsonResponse) {
      //   setPredictionResult(jsonResponse); // Set the prediction result in state
      // } else {
      //   Alert.alert('Error', 'Failed to get prediction');
      // }
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Error uploading image.');
    }
  };

  const renderBoldText = (text) => (
    <Text style={{ fontWeight: 'bold' }}>{text}</Text>
  );

  return (
    <ScrollView style={{ flex: 1, padding: 20 }} contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Pick an image" onPress={pickImage} />
      <Button title="Capture a picture" onPress={captureImage} />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200, marginVertical: 20 }} />}
      <Button title="Upload Image" onPress={uploadImage} />

      {/* Display Prediction Result */}
      {predictionResult ? (
        <View style={{ marginTop: 20, alignItems: 'flex-start' }}>
          <Text style={{color:"white"}}>
            {predictionResult.carbonEmissionsEstimate}

          </Text>
          <Text>
            {predictionResult.supplyChainProcess}
            </Text>
          <Text>
            {predictionResult.recommendations}
            </Text>
        </View>
      ) : null}
    </ScrollView>
  );
}
