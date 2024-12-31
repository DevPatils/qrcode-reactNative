import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

const AuthLayout = () => {
    return (
        <>


            <Stack>
                <Stack.Screen
                    name='sign-up'
                    options={{
                        headerShown: true
                    }} />
                <Stack.Screen
                    name='sign-in'
                    options={{
                        headerShown: true
                    }} />



            </Stack>
            <StatusBar backgroundColor='#161612' style='light' />
        </>
    )
}

export default AuthLayout