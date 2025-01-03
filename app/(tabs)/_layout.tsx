import { View, Text, Image } from 'react-native';
import React from 'react';
import { Tabs } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AntDesign from '@expo/vector-icons/AntDesign';
import IonIcons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const TabIcon = ({ icon, color, name, focused }: any) => {
  return (
    <View className="items-center justify-center gap-2">
      <Image
        source={icon}
        resizeMode="contain"
        style={{ tintColor: color }}
        className="w-6 h-6 m-auto mt-8"
      />
      <Text
        className={`w-20 text-center ${focused ? 'font-bold' : 'font-medium'} text-xs ${
          focused ? 'text-[#799937]' : 'text-black'
        }`}
      >
        {name}
      </Text>
    </View>
  );
};

const TabLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: true,
          tabBarActiveTintColor: "#06281b",
          tabBarInactiveTintColor: "#000000",
          tabBarPosition: 'bottom',
          tabBarStyle: {
            paddingTop: 5,
            borderRadius: 15,
            backgroundColor: "#FFFFFF",
            borderTopColor: "#000000",
            height: 60,
            shadowColor: "#000000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.2,
            shadowRadius: 3,
          },
        }}
      >
        <Tabs.Screen
          name="market"
          options={{
            title: "Market",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <AntDesign name="shoppingcart" size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="scan"
          options={{
            title: "Scan",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <IonIcons name="scan" size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="tutorials"
          options={{
            title: "Tutorial",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <MaterialIcons name="travel-explore" size={24} color={color} />
            ),
          }}
        />
      </Tabs>
    </>
  );
};

export default TabLayout;