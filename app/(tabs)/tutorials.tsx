import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, ScrollView, Linking } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const Tutorial = () => {
  const [productDetails, setProductDetails] = useState({
    name: '',
    size: '',
    type: '',
    material: '',
    cost: '',
  });
  const [loading, setLoading] = useState(true);
  const [videos, setVideos] = useState([]);
  
  const YOUTUBE_API_KEY = 'AIzaSyDoVneLwDPj-u3gALxJDIByjW4N1493pFA';

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const name = await AsyncStorage.getItem('name');
        const size = await AsyncStorage.getItem('size');
        const type = await AsyncStorage.getItem('type');
        const material = await AsyncStorage.getItem('material');
        const cost = await AsyncStorage.getItem('cost');
        
        const details = {
          name: name || 'N/A',
          size: size || 'N/A',
          type: type || 'N/A',
          material: material || 'N/A',
          cost: cost || 'N/A',
        };
        
        setProductDetails(details);

        // Check if product details are available
        if (details.name !== 'N/A') {
          await fetchYouTubeVideos(`Recycling ${details.name} tutorial`);
        }
      } catch (error) {
        console.error('Error fetching details from AsyncStorage:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchDetails();
  }, []);

  const fetchYouTubeVideos = async (query: string) => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/search`, {
          params: {
            part: 'snippet',
            maxResults: 5,
            q: query,
            key: "AIzaSyDoVneLwDPj-u3gALxJDIByjW4N1493pFA",
          },
        }
      );
      setVideos(response.data.items);
    } catch (error) {
      console.error('Error fetching YouTube videos:', error);
    }
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-gray-100 p-5">
      <Text className="text-2xl font-bold mb-5 text-center">Product Details</Text>
      <Text className="text-lg mb-2 text-gray-800">Name: {productDetails.name}</Text>
      <Text className="text-lg mb-2 text-gray-800">Size: {productDetails.size}</Text>
      <Text className="text-lg mb-2 text-gray-800">Type: {productDetails.type}</Text>
      <Text className="text-lg mb-2 text-gray-800">Material: {productDetails.material}</Text>
      <Text className="text-lg mb-2 text-gray-800">Cost: {productDetails.cost}</Text>

      <Text className="text-2xl font-bold mt-8 mb-5 text-center">YouTube Tutorials</Text>
      {videos.length > 0 ? (
        videos.map((video, index) => (
          <View key={index} className="mb-5">
            <Text className="text-lg font-bold text-gray-800">{video.snippet.title}</Text>
            <Text className="text-sm text-gray-600">Channel: {video.snippet.channelTitle}</Text>
            <Text
              className="text-sm text-blue-600"
              onPress={() => Linking.openURL(`https://www.youtube.com/watch?v=${video.id.videoId}`)}
            >
              Watch Video
            </Text>
          </View>
        ))
      ) : (
        <Text className="text-center text-gray-800">No videos found.</Text>
      )}
    </ScrollView>
  );
};

export default Tutorial;
