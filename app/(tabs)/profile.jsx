import { View, Text } from 'react-native'
import React from 'react'
import UserInfo from '../../components/profile/UserInfo'
import MenuList from '../../components/profile/MenuList'

export default function profile() {
  return (
    <View style={{padding: 20}}>
      <Text style={{fontFamily: 'outfit-bold', fontSize: 35}}>profile</Text>
      <UserInfo/>
      <MenuList/>
    </View>
  )
}
