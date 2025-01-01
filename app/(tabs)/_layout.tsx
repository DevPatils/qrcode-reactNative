import { View, Text, Image } from 'react-native';
import React from 'react';
import { Tabs } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AntDesign from '@expo/vector-icons/AntDesign';
import IonIcons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const TabIcon = ({ icon, color, name, focused }:any) => {
    return (
        <View className="items-center justify-center gap-2">
            <Image
                source={icon}
                resizeMode="contain"
                style={{ tintColor: color }}
                className="w-6 h-6 m-auto mt-8"
            />
            <Text
                className={`w-20 text-center ${focused ? 'font-bold' : 'font-medium'} text-xs ${color}`}
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
                    tabBarActiveTintColor: "#FFA001",
                    tabBarInactiveTintColor: "#CDCDCD",
                    tabBarStyle: {
                        backgroundColor: "#161622",
                        borderTopWidth: 4,
                        borderTopColor: "#000000",
                        height: 90,
                        shadowColor: "#000000",
                        shadowOffset: { width: 0, height: 4 },
                        shadowOpacity: 0.2,
                        shadowRadius: 4,
                    },
                }}
            >
                <Tabs.Screen
                    name="market"
                    options={{
                        title: "Market",
                        headerShown: false,
                        tabBarIcon: ({ color }) => (
                            <AntDesign name="shoppingcart" size={24} color={color} className="bg-[#FFA001] p-1 rounded-sm" />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="scan"
                    options={{
                        title: "Scan",
                        headerShown: false,
                        tabBarIcon: ({ color }) => (
                            <IonIcons name="scan" size={24} color={color} className="bg-[#E0F7FA] p-1 rounded-sm" />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="tutorials"
                    options={{
                        title: "Tutorial",
                        headerShown: false,
                        tabBarIcon: ({ color }) => (
                            <MaterialIcons name="travel-explore" size={24} color={color} className="bg-[#FFCDD2] p-1 rounded-sm" />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="profile"
                    options={{
                        title: "Profile",
                        headerShown: false,
                        tabBarIcon: ({ color }) => (
                            <AntDesign name="user" size={24} color={color} className="bg-[#C8E6C9] p-1 rounded-sm" />
                        ),
                    }}
                />
            </Tabs>
        </>
    );
};

export default TabLayout;
