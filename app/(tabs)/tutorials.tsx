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

    // The page reload is triggered by setting the state again
    return () => {
      // This will trigger a re-render and reset loading state
      setLoading(true);
      setVideos([]);
      setProductDetails({
        name: '',
        size: '',
        type: '',
        material: '',
        cost: '',
      });
    };
  }, []); // Empty dependency ensures it only runs when the component is mounted

  const fetchYouTubeVideos = async (query: string) => {
    try {
      const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
        params: {
          part: 'snippet',
          maxResults: 5,
          q: query,
          key: YOUTUBE_API_KEY,
        },
      });
      setVideos(response.data.items);
    } catch (error) {
      console.error('Error fetching YouTube videos:', error);
    }
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-black">
        <ActivityIndicator size="large" color="white" />
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-black p-8">
      {/* Product Details Section */}
      <Text className="text-4xl font-extrabold text-white mb-8 text-center">Product Details</Text>
      <View className="bg-gray-900 p-6 mb-8 rounded-lg shadow-2xl">
        <Text className="text-xl font-bold text-white mb-2">Name: {productDetails.name}</Text>
        <Text className="text-xl font-bold text-white mb-2">Size: {productDetails.size}</Text>
        <Text className="text-xl font-bold text-white mb-2">Type: {productDetails.type}</Text>
        <Text className="text-xl font-bold text-white mb-2">Material: {productDetails.material}</Text>
        <Text className="text-xl font-bold text-white mb-2">Cost: {productDetails.cost}</Text>
      </View>

      {/* YouTube Videos Section */}
      <Text className="text-4xl font-extrabold text-white mt-8 mb-6 text-center">YouTube Tutorials</Text>
      {videos.length > 0 ? (
        videos.map((video, index) => (
          <View key={index} className="mb-8 bg-gray-800 p-6 rounded-lg shadow-xl">
            <Text className="text-xl font-bold text-white mb-2">{video.snippet.title}</Text>
            <Text className="text-md text-gray-300 mb-4">Channel: {video.snippet.channelTitle}</Text>
            <Text
              className="text-lg font-semibold text-blue-400"
              onPress={() => Linking.openURL(`https://www.youtube.com/watch?v=${video.id.videoId}`)}
            >
              Watch Video
            </Text>
          </View>
        ))
      ) : (
        <Text className="text-center text-white">No videos found.</Text>
      )}
    </ScrollView>
  );
};

export default Tutorial;
