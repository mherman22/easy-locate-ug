import { View, Text, Image, TextInput } from 'react-native';
import React from 'react';
import { useUser } from '@clerk/clerk-expo';
import Ionicons from '@expo/vector-icons/Ionicons';
import Colors from '../../constants/Colors';

export default function Header() {
    const user = useUser();
  return (
    <View style={{padding:10, paddingTop: 15, backgroundColor: Colors.PRIMARY, borderBottomLeftRadius: 20, borderBottomRightRadius: 20}}>
      <View style={{display: 'flex', flexDirection: 'row', gap: 10, alignItems: 'center'}}>
        <Image source={{uri: user?.user.imageUrl}} style={{width: 40,height: 40, borderRadius:99,}}/>
        <View>
            <Text style={{color: '#fff'}}>Welcome,</Text>
            <Text style={{fontFamily: 'outfit-medium', color: '#fff'}}>{user?.user.firstName}</Text>
        </View>
      </View>
      <View style=
                {{display: 'flex', 
                flexDirection: 'row',
                alignItems: 'center', 
                backgroundColor: '#fff', 
                gap: 10,
                padding: 3, 
                marginVertical: 16, 
                marginTop: 15, 
                borderRadius: 8}}>
        <Ionicons name="search" size={18} color={Colors.PRIMARY} />
        <TextInput placeholder='Search ...'/>
      </View>
    </View>
  )
}