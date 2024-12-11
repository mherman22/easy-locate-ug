import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import Colors from '../../constants/Colors'

export default function CategoryItem({category, onCategoryPress}) {
  return (
    <TouchableOpacity onPress={() => onCategoryPress(category)}>
      <View style={{padding:15, backgroundColor: Colors.ICON_BG_COLOR, borderRadius:99, marginRight:15}}>
        <Image source={{uri: category.icon}} style={{width:35, height: 35}}/>
      </View>
      <Text style={{fontSize: 10, textAlign: 'center', fontFamily: 'outfit-medium', marginTop: 5}}>{category.name}</Text>
    </TouchableOpacity>
  )
}
