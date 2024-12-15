import { View, Text } from 'react-native'
import React from 'react'
import { useNavigation } from 'expo-router';

export default function myBusiness() {
    const navigation = useNavigation();
    
    React.useEffect(() => {
        navigation.setOptions({
            headerTitle: 'My Businesses',
            headerShown: true
        })
    }, []) 
  return (
    <View>
      <Text>myBusiness</Text>
    </View>
  )
}
