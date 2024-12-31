import { TouchableOpacity, Text } from 'react-native'
import React from 'react'

const CustomButton = ({ title, handlepress, containerStyles, textStyles, isLoading }: { title: string, handlepress: any, containerStyles: string, textStyles: string, isLoading: boolean }) => {
    return (
        <TouchableOpacity onPress={handlepress} activeOpacity={0.8}
            className={`bg-secondary rounded-xl min-h-[62px] justify-center items-center ${containerStyles} ${isLoading ? 'opacity-50' : ''} `} disabled={isLoading}>
            <Text className={`${textStyles} text-primary font-psemibold text-lg`}>{title}</Text>
        </TouchableOpacity>
    )
}

export default CustomButton