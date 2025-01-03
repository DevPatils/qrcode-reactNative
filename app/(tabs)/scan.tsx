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
import axios from 'axios';
import mime from 'mime';
import { BASE_URL } from '@/constants/url'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomButton from '@/components/CustomButton';
import { router } from 'expo-router';

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

  const navigateToMetrics = () => {
    router.replace('/metrics'); 
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
    // @ts-expect-error
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

      // Parse the backend response (which is a cleaned-up string)
      const cleanedResponse = response.data;

      let parsedResult = {};

      // Try to parse as JSON (if it follows JSON structure)
      try {
        parsedResult = JSON.parse(cleanedResponse);
        // @ts-expect-error
        console.log(parsedResult['Product Details']);
        // name, size, type, material, cost 

        //@ts-expect-error
        AsyncStorage.setItem('cost', parsedResult['Product Details'].Cost.estimate);
        //@ts-expect-error
        AsyncStorage.setItem('name', parsedResult['Product Details'].Name);
        //@ts-expect-error

        AsyncStorage.setItem('type', parsedResult['Product Details'].Type);
        //@ts-expect-error

        AsyncStorage.setItem('material', parsedResult['Product Details'].Material);
        //@ts-expect-error

        AsyncStorage.setItem('size', parsedResult['Product Details'].Size);


      } catch (error) {
        console.error('Failed to parse response:', error);
        alert('Failed to parse the prediction result.');
      }

      setResult(parsedResult);  // Set the parsed result
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

  const clearAsyncStorageKeys = async () => {
    try {
      await AsyncStorage.multiRemove(['cost', 'name', 'type', 'material', 'size']);
      Alert.alert('Success', 'Storage cleared successfully!');
    } catch (error) {
      console.error('Error clearing AsyncStorage:', error);
      Alert.alert('Error', 'Failed to clear storage.');
    }
  };
  

  const renderPointwiseDetails = (data: any) => {
    return Object.keys(data).map((key) => (
      <View key={key} className="mb-4">
        <Text className="text-lg font-bold text-gray-700">{key}:</Text>
        {typeof data[key] === 'object' ? (
          renderPointwiseDetails(data[key]) // Recursively handle nested objects
        ) : (
          <Text className="text-gray-600 ml-4">• {String(data[key]) || 'N/A'}</Text> // Convert to string safely
        )}
      </View>
    ));
  };
  
  
  const renderCost = (cost: any) => {
    if (cost && typeof cost === 'object') {
      return (
        <View>
          {/* <Text>- Estimated Price: {cost.estimate ? cost.estimate : 'N/A'}</Text>
          <Text>- Note: {cost.note ? cost.note : 'N/A'}</Text> */}
        </View>
      );
    }
    return <Text>- Cost: {cost || 'N/A'}</Text>;
  };
  
  
  const renderSupplyChainDetails = (data: any) => {
    return (
      <View className="bg-white p-4 rounded-lg shadow mb-4">
        <Text className="text-lg font-bold mb-2">Supply Chain Details</Text>
  
        {/* Raw Materials */}
        <Text className="text-md font-semibold mb-1">Raw Materials:</Text>
        {data["Raw Materials"] ? (
          renderPointwiseDetails(data["Raw Materials"])
        ) : (
          <Text className="text-gray-600 ml-4">• N/A</Text>
        )}
  
        {/* Manufacturing */}
        <Text className="text-md font-semibold mt-2 mb-1">Manufacturing:</Text>
        <Text>
          - Processes:{" "}
          {Array.isArray(data.Manufacturing?.Processes)
            ? data.Manufacturing?.Processes.join(", ")
            : data.Manufacturing?.Processes || "N/A"}
        </Text>
        <Text>
          - Hubs:{" "}
          {Array.isArray(data.Manufacturing?.Hubs)
            ? data.Manufacturing?.Hubs.join(", ")
            : data.Manufacturing?.Hubs || "N/A"}
        </Text>
  
        {/* Distribution */}
        {/* <Text className="text-md font-semibold mt-2 mb-1">Distribution:</Text>
        <Text>
          - Channels:{" "}
          {Array.isArray(data.Distribution?.channels)
            ? data.Distribution?.channels.join(", ")
            : data.Distribution?.channels || "N/A"}
        </Text> */}
      </View>
    );
  };
  
  

  return (
<View className="flex-1 bg-white">
  {/* Header */}
  <View className="flex-row justify-between items-center px-4 py-3 mt-10 border-b-4 border-black">
    <TouchableOpacity onPress={discardImage}>
      <Icon name="close" size={24} color="black" />
    </TouchableOpacity>
    <Text style={{fontFamily : "gilroy-bold"}} className="text-xl text-black uppercase tracking-wider">
      Scan your product
    </Text>
    <TouchableOpacity onPress={uploadImage}>
      <Icon name="check" size={24} color="black" />
    </TouchableOpacity>
  </View>

  {/* Main Section */}
  <View className="flex-1 justify-center items-center p-4">
    {image ? (
      <Image
        source={{ uri: image }}
        className="w-64 h-64 rounded-lg border-4 border-black"
      />
    ) : (
      <TouchableOpacity
        onPress={handleImageSelection}
        className="bg-slate-50 w-64 h-64 rounded-lg border-4 border-black flex items-center justify-center shadow-lg">
        <Icon name="camera-alt" size={48} color="black" />
        <Text className="text-black font-bold mt-2 uppercase">Tap to Scan</Text>
      </TouchableOpacity>
    )}

    {loading && (
      <ActivityIndicator size="large" color="black" className="mt-4" />
    )}
  </View>

  {/* Results Section */}
  {result && (
    <ScrollView className="bg-white p-4 border-t-4 border-black shadow-lg rounded-t-2xl">
      <Text className="text-center text-xl font-bold mb-4 uppercase tracking-wide">
        Prediction Details
      </Text>

      {/* Product Details */}
      <View className="bg-blue-200 p-4 border-4 border-black rounded-lg shadow mb-4">
        <Text className="text-lg font-bold uppercase mb-2">
          Product Details
        </Text>
        <Text>- Name: {result["Product Details"]?.Name || "N/A"}</Text>
        <Text>- Size: {result["Product Details"]?.Size || "N/A"}</Text>
        <Text>- Type: {result["Product Details"]?.Type || "N/A"}</Text>
        <Text>- Material: {result["Product Details"]?.Material || "N/A"}</Text>
        {renderCost(result["Product Details"]?.Cost)}
      </View>

      {/* Supply Chain Details */}
      <View className="bg-pink-200 p-4 border-4 border-black rounded-lg shadow mb-4">
        <Text className="text-lg font-bold uppercase mb-2">
          Supply Chain Details
        </Text>
        {renderSupplyChainDetails(result["Supply Chain Details"])}
      </View>
    </ScrollView>
  )}
  <CustomButton
    title="Clear Storage"
    handlepress={clearAsyncStorageKeys}
    containerStyles="bg-red-500 p-4 rounded-lg"
    textStyles="text-white font-bold"
    isLoading={false}
  />
  <CustomButton
    title="Navigate to Market"
    handlepress={() => router.replace('/market')}
    containerStyles="bg-green-500 p-4 rounded-lg"
    textStyles="text-white font-bold"
    isLoading={false}
  />
  <CustomButton
           title="View Environmental Metrics"
            handlepress={navigateToMetrics}
            containerStyles="bg-green-600 w-80 py-4 border-4 border-black rounded-md shadow-brutal mt-4"
            textStyles="text-white font-bold text-lg"
            isLoading={false}
        />

</View>

  );
}