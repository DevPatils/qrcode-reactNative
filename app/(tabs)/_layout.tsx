import { View, Text, Image } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import FontAwesome  from '@expo/vector-icons/FontAwesome'
import AntDesign from "@expo/vector-icons/AntDesign"

const TabIcon = ({ icon, color, name, focused }: any) => {
    return (
        <View className='item-center justify-center gap-2'>
            <Image
                source={icon}
                resizeMode='contain'
                tintColor={color}
                className='w-6 h-6 m-auto mt-8'
            />
            <Text
                className={`w-20 text-center ${focused ? ' font-pmedium' : 'font-pregular'} text-xs text-white`}
            >{name}</Text>
        </View>
    )
}
const TabLayout = () => {
    return (
        <>
            <Tabs
                screenOptions={{
                    tabBarShowLabel: false,
                    tabBarActiveTintColor: "#FFA001",
                    tabBarInactiveTintColor: "#cdcdE0",
                    tabBarStyle: {
                        backgroundColor: "#161622",
                        borderTopWidth: 1,
                        borderTopColor: "#232533",
                        height: 84
                    }
                }}>

                <Tabs.Screen name='market'
                    options={{
                        title: "Market",
                        headerShown:false,
                        tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
        
                    }}
                />
                <Tabs.Screen name='scan'
                    options={{
                        title: "Scan",
                        headerShown:false,
                        tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
                            
                    }}
                />
                <Tabs.Screen name='profile'
                    options={{
                        title: "Profile",
                        headerShown:false,
                        tabBarIcon:({color})=><AntDesign name='user' size={12} color={color}/>
                    }}
                />
                    <Tabs.Screen name='tutorials'
                    options={{
                        title: "Tutorial",
                        headerShown:false,
                        tabBarIcon:({color})=><AntDesign name='user' size={12} color={color}/>
                    }}
                />
            </Tabs>
        </>
    )
}

export default TabLayout