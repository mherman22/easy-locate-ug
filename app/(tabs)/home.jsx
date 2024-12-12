import { ScrollView, View } from 'react-native'
import React from 'react'
import Header from '../../components/Home/Header'
import Slider from '../../components/Home/Slider'
import Category from '../../components/Home/Category'
import BusinessList from '../../components/Home/BusinessList'

export default function home() {
  return (
    <ScrollView>
      <Header/>
      <Slider/>
      <Category/>
      <BusinessList />
      <View style={{marginTop: 20}}/>
    </ScrollView>
  )
}