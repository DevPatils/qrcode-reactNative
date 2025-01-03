import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, ScrollView, Linking, TouchableOpacity, Image, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import WebView from 'react-native-webview';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign';

const Tutorial = () => {
  const [productDetails, setProductDetails] = useState({
    name: '',
    size: '',
    type: '',
    material: '',
  });
  const [loading, setLoading] = useState(true);
  interface YouTubeVideo {
    id: { videoId: string };
    snippet: {
      title: string;
      channelTitle: string;
    };
  }

  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const YOUTUBE_API_KEY = 'AIzaSyDoVneLwDPj-u3gALxJDIByjW4N1493pFA';

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const name = await AsyncStorage.getItem('name');
        const size = await AsyncStorage.getItem('size');
        const type = await AsyncStorage.getItem('type');
        const material = await AsyncStorage.getItem('material');
        // const cost = await AsyncStorage.getItem('cost');

        const details = {
          name: name || 'N/A',
          size: size || 'N/A',
          type: type || 'N/A',
          material: material || 'N/A',
          // cost: cost || 'N/A',
        };

        setProductDetails(details);

        if (details.name !== 'N/A') {
          await fetchYouTubeVideos(`how to Recycle and upcycle ${details.name} `);
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
          maxResults: 10,
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
  const renderProductDetail = (label: string, value: string, icon: string) => (
    <View className="flex-row items-center bg-white p-4 rounded-xl mb-3 shadow-sm">
      <MaterialIcons name={icon} size={24} color="#06281b" style={{ marginRight: 12 }} />
      <View>
        <Text className="text-sm text-gray-500">{label}</Text>
        <Text className="text-lg font-semibold text-gray-800">{value}</Text>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#06281b" />
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <SafeAreaView className="flex flex-col w-full px-5 py-4">
        {/* Header Section */}
        <View className="mb-6">
          <Text className="text-3xl font-bold text-green-pea-900 mb-2">Recycle Guide</Text>
          <Text className="text-base text-gray-600">Learn how to recycle your items properly</Text>
        </View>

        {/* Product Details Card */}
        <View className="bg-white rounded-2xl p-5 mb-6 shadow-sm">
          <Text className="text-xl font-bold mb-4 text-green-pea-800">Product Details</Text>
          {renderProductDetail("Product Name", productDetails.name, "inventory")}
          {renderProductDetail("Size", productDetails.size, "straighten")}
          {renderProductDetail("Type", productDetails.type, "category")}
          {renderProductDetail("Material", productDetails.material, "layers")}
          {/* {renderProductDetail("Cost", productDetails.cost, "payments")} */}
        </View>

        {/* Tutorials Section */}
        <View className="mb-6">
          <Text className="text-xl font-bold mb-4 text-green-pea-800">Recycling Tutorials</Text>
          {videos.length > 0 ? (
            videos.map((video, index) => (
              <TouchableOpacity
                key={index}
                className="mb-4 bg-white rounded-xl overflow-hidden shadow-sm"
                onPress={() => setSelectedVideo(video.id.videoId)}
              >
                <Image
                  source={{ uri: `https://img.youtube.com/vi/${video.id.videoId}/hqdefault.jpg` }}
                  className="w-full h-48"
                  resizeMode="cover"
                />
                <View className="p-4">
                  <View className="flex-row items-center mb-2">
                    <AntDesign name="youtube" size={20} color="red" />
                    <Text className="text-sm font-medium text-gray-500 ml-2">
                      {video.snippet.channelTitle}
                    </Text>
                  </View>
                  <Text className="text-lg font-bold text-gray-800 leading-tight">
                    {video.snippet.title}
                  </Text>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <View className="bg-white rounded-xl p-6 items-center">
              <MaterialIcons name="video-library" size={48} color="#06281b" />
              <Text className="text-center text-gray-600 mt-3">No tutorials found</Text>
            </View>
          )}
        </View>
      </SafeAreaView>

      <Modal
        visible={selectedVideo !== null}
        animationType="slide"
        transparent={true}
      >
        <View className="flex-1 bg-black/80 justify-center items-center">
          <View className="w-full h-[350] bg-white rounded-t-3xl overflow-hidden">
            <View className="flex-row justify-between items-center p-4 bg-green-pea-800">
              <Text className="text-lg font-bold text-white">Tutorial Video</Text>
              <TouchableOpacity
                onPress={() => setSelectedVideo(null)}
                className="bg-white/20 p-2 rounded-full"
              >
                <AntDesign name="close" size={24} color="white" />
              </TouchableOpacity>
            </View>
            {selectedVideo && (
              <WebView
                source={{
                  uri: `https://www.youtube.com/embed/${selectedVideo}?rel=0&autoplay=1&showinfo=0&controls=1`,
                }}
                allowsFullscreenVideo={true}
                style={{ flex: 1 }}
              />
            )}
          </View>
        </View>
      </Modal>
      <View className='flex w-full justify-center items-center'>
        <TouchableOpacity
          onPress={() => Linking.openURL(`https://www.youtube.com/results?search_query=${encodeURIComponent(`how to Recycle and upcycle ${productDetails.name}`)}`)}
          className="flex-row w-64 items-center justify-center bg-green-pea-500 py-4 px-6 rounded-xl mb-6"
        >
          <AntDesign name="youtube" size={24} color="white" style={{ marginRight: 8 }} />
          <Text className="text-white font-semibold text-lg">View More</Text>
        </TouchableOpacity>
      </View>

    </ScrollView>
  );
};

export default Tutorial;
