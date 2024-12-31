import React, { useEffect } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';
import { createStackNavigator } from '@react-navigation/stack';
import Index from './index';
import "../global.css";
import { Stack } from 'expo-router';


SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();  
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });


  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();  
    }
  }, [loaded]);

  if (!loaded) {
    return null;  
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar style="auto" />  
      <Stack>
      <Stack.Screen name='index' options={{headerShown:false}}/>
      <Stack.Screen name='(auth)' options={{headerShown:false}}/>
      {/* <Stack.Screen name='(tabs)' options={{headerShown:false}}/> */}
    </Stack>
    </SafeAreaView>
  );
}
