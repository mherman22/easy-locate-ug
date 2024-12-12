import { View, Text } from 'react-native'
import React from 'react'
import { useNavigation } from 'expo-router'

export default function addBusiness() {
    const navigation = useNavigation();

    React.useEffect(() => {
        navigation.setOptions({
            headerTitle: 'Add New Business',
            headerShown: true
        })
    }, []);
  return (
    <View>
      <Text>addBusiness</Text>
    </View>
  )
}
