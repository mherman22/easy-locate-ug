import { View, Text, Image } from 'react-native'
import React from 'react'
import Colors from '../../constants/Colors'

export default function BusinessListChild({business}) {
  return (
    <View style={{marginLeft: 20, padding: 10, borderRadius: 15, backgroundColor: Colors.WHITE}}>
      <Image source={{uri: business.imageUrl}} style={{width:200, height: 130, borderRadius: 15}}/>
      <View style={{marginTop: 7, gap: 5}}>
         <Text style={{fontFamily: 'outfit-bold', fontSize: 17}}>{business.name}</Text>
         <Text style={{fontFamily: 'outfit-regular', fontSize: 13, color: Colors.GREY}}>{business.location}</Text>
         <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: 20}}>
            <View style={{display: 'flex', flexDirection: 'row', gap: 10}}>
                <Image source={require('../../assets/images/star.png')} style={{width: 15, height: 15}}/>
                <Text>4.5</Text>
            </View>
            <Text style={{fontFamily: 'outfit-regular', fontSize: 10, backgroundColor: Colors.PRIMARY, padding: 5, borderRadius: 10, color: Colors.WHITE}}>{business.category}</Text>
         </View>
      </View>
    </View>
  )
}
