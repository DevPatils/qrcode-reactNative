import React from 'react';
import { View, Text, Image } from 'react-native';
import CustomButton from '@/components/CustomButton';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts } from 'expo-font';

const LandingPage = () => {
  const [loaded, error] = useFonts({
    'gilroy-medium': require('../assets/fonts/Gilroy-Medium.ttf'),
    'gilroy-medium-italic': require('../assets/fonts/Gilroy-MediumItalic.ttf'),
    'gilroy-regular': require('../assets/fonts/Gilroy-Regular.ttf'),
    'gilroy-regular-italic': require('../assets/fonts/Gilroy-RegularItalic.ttf'),
    'gilroy-light': require('../assets/fonts/Gilroy-Light.otf'),
    'gilroy-bold': require('../assets/fonts/Gilroy-ExtraBold.otf')
  })

  const handleScanClick = async () => {
    const token = await AsyncStorage.getItem('token')
    if (token == null) {

      console.log(token)

      router.push('/(auth)/sign-up');
    }
    router.push('/(tabs)/scan');
  }


  const handleLearnMoreClick = () => {
    // router.push('/about');
  };

  return (
    <View className="flex flex-1  bg-white py-16 px-6">
      {/* Header */}
      <View className='my-2'>
        <Text className='text-3xl'>Hello, <Text style={{ fontFamily: 'gilroy-medium-italic' }} className='text-kaitoke-green-800'>Krish</Text></Text>
        <Text style={{ fontFamily: 'gilroy-regular-italic' }} className='text-lg text-neutral-600'>Let's Be the part of a change with</Text>
      </View>
      <Text style={{ fontFamily: 'gilroy-bold' }} className="mt-2 text-5xl text-kaitoke-green-800 bg-white">
        ECOCYCLE
      </Text>

      <View className='px-2 py-4 mt-4 bg-green-pea-500 rounded-xl flex flex-col'>
        <View className='flex flex-row w-full justify-evenly'>
          <View className='flex flex-col justify-center items-center text-center'>
            <Text style={{ fontFamily: "gilroy-bold" }} className='flex text-white text-xl'>Coins</Text>
            <Image source={require('../assets/images/wmremove-transformed-removebg-preview.png')} className='h-20 w-20' />
            <Text style={{ fontFamily: "gilroy-bold" }} className='flex text-white pt-2'>520</Text>
          </View>
          <View className='w-0.5 bg-white'></View>
          <View className='flex flex-col justify-center items-center text-center'>
            <Text style={{ fontFamily: "gilroy-bold" }} className='flex text-white text-xl'>Co2</Text>
            <Image source={require('../assets/images/image-removebg-preview (1) (2).png')} className='h-20 w-20' />
            <Text style={{ fontFamily: "gilroy-bold" }} className='flex text-white pt-2'>320</Text>
          </View>
          <View className='w-0.5 bg-white'></View>
          <View className='flex flex-col justify-center items-center text-center'>
            <Text style={{ fontFamily: "gilroy-bold" }} className='flex text-white text-xl'>Recycled</Text>
            <Image source={require('../assets/images/people-recycling-concept_23-2148519354-removebg-preview.png')} className='h-20 w-20' />
            <Text style={{ fontFamily: "gilroy-bold" }} className='flex text-white pt-2'>27</Text>
          </View>
        </View>
      </View>

      <Text style={{ fontFamily: "gilroy-medium-italic" }} className="text-lg text-green-900 py-3 my-2 rounded-md">
        Redefining sustainability, one product at a time.
      </Text>

      <View className='flex flex-row justify-between items-center rounded-xl py-4 bg-green-pea-300'>
        <View className='flex flex-col px-3 flex-1'>
          <Text style={{ fontFamily: "gilroy-medium" }} className='text-lg uppercase text-green-800'>Recycle 5 plastics</Text>
          <Text style={{ fontFamily: "gilroy-bold" }} className='text-3xl text-green-pea-900'>WIN 100 POINTS</Text>
        </View>
        <Image source={require('../assets/images/image-removebg-preview (2) (1).png')} className='h-32 w-32' />
      </View>

      <Text style={{fontFamily : "gilroy-bold"}} className='my-6 text-2xl text-black'>Frequent Upcycled Items : </Text>
      <View className='flex flex-row w-full gap-4'>
        <View className='flex justify-center items-center bg-pink-100 p-4 rounded-2xl'>
          <Image source={require('../assets/images/71UrhGHbUVL-removebg-preview.png')} className='h-14 w-12'></Image>
        </View>
        <View className='flex justify-center items-center bg-gray-100 p-4 rounded-2xl'>
          <Image source={require('../assets/images/1000ml-Clear-Glass-Round-Tall-Juice-Bottle-w-Black-Cap-Ideon-removebg-preview.png')} className='h-14 w-12'></Image>
        </View>
        <View className='flex justify-center items-center bg-green-100 p-4 rounded-2xl'>
          <Image source={require('../assets/images/OIP-removebg-preview.png')} className='h-14 w-12'></Image>
        </View>
        <View className='flex justify-center items-center bg-blue-100 p-4 rounded-2xl'>
          <Image source={require('../assets/images/R-removebg-preview.png')} className='h-14 w-12'></Image>
        </View>
      </View>

      <View className='flex justify-evenly w-full bg-slate-50 h-auto'>
        
      </View>
      <View className="flex flex-col justify-center items-center my-6">
        //@ts-nocheck
        <CustomButton
          title={<Image source={require('../assets/images/qr-code.png')} className="h-12 w-12" />}
          handlepress={handleScanClick}
          containerStyles="bg-green-pea-300 p-6 rounded-[50%]"
          textStyles="text-white font-bold text-lg"
          isLoading={false}
        />
        <Text style={{fontFamily : "gilroy-bold"}} className='text-2xl text-green-pea-800'>Scan Now!</Text>
      </View>
    </View>
  );
};

export default LandingPage;
