import React from 'react';
import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{headerShown: false}}>
      <Tabs.Screen name='home' options={{tabBarLabel: 'Home', tabBarIcon: ({color})=> <Ionicons name="home" size={24} color={color} />}}/>
      <Tabs.Screen name='explore' options={{tabBarLabel: 'Explore', tabBarIcon: ({color})=> <Ionicons name="search" size={24} color={color} />}}/>
      <Tabs.Screen name='profile' options={{tabBarLabel: 'Profile', tabBarIcon: ({color})=> <Ionicons name="person" size={24} color={color} />}}/>
  </Tabs>
  )
}