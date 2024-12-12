import { View, Text, FlatList, Image, TouchableOpacity, Share, Dimensions } from 'react-native'
import React from 'react'
import Colors from '../../constants/Colors';
import { useRouter } from 'expo-router';
import { useAuth } from '@clerk/clerk-expo';

export default function MenuList() {
    const router = useRouter();
    const {signOut} = useAuth();

    const onPress = (item) => {
        if (item.path == 'logout') {
            signOut();
            return;
        } else if (item.path == 'share') {
            Share.share({message: 'Download the EasyLocate UG Business Directory App', 
                url: 'https://mherman22.github.io/mherman22-portfolio/'
            })
            return;
        }
        router.push(item.path);
    }

    const menu = [
        {
            id: 1,
            name: "Add Business",
            icon: require('../../assets/images/add.png'),
            path: '/business/addBusiness'
        },
        {
            id: 2,
            name: "My Business",
            icon: require('../../assets/images/EasyLocateUG-.png'),
            path: ''
        },
        {
            id: 3,
            name: "Share",
            icon: require('../../assets/images/EasyLocateUG-.png'),
            path: 'share'
        },
        {
            id: 4,
            name: "Logout",
            icon: require('../../assets/images/check-out.png'),
            path: 'logout'
        }
    ];
  return (
    <View style={{marginTop: 50}}>
      <FlatList
        data={menu}
        numColumns={2}
        renderItem={({item, index}) => (
            <TouchableOpacity onPress={() => onPress(item)} style={{display: 'flex', flexDirection: 'row', gap: 10, alignItems: 'center', flex: 1, padding: 10, borderRadius: 15, borderWidth: 2, margin: 10, backgroundColor: Colors.WHITE, borderColor: Colors.PRIMARY}}>
                <Image source={item.icon} style={{width: 40, height: 40}}/>
                <Text style={{fontFamily: 'outfit-medium', fontSize: 16, flex: 1}}>{item.name}</Text>
            </TouchableOpacity>
  )}
      />
      <Text style={{fontFamily: 'outfit-regular', fontSize: 10, color: Colors.GREY, marginTop: 50, textAlign: 'center'}}>Developed by mherman22 @2024</Text>
    </View>
  )
}
