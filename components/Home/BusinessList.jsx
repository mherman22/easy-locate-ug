import { View, Text, FlatList, Image } from 'react-native'
import React from 'react'
import { collection, getDocs, query } from 'firebase/firestore'
import { db } from '../../config/FirebaseConfig'
import Colors from '../../constants/Colors';
import BusinessListChild from './BusinessListChild';

export default function BusinessList() {
    const [businessList, setBusinessList] = React.useState([]);

    React.useEffect(() => {
        getBusinessList();
    }, []);

    const getBusinessList = async () => {
        setBusinessList([]);
        const qry = query(collection(db, 'BusinessList'));
        const querySnapShot = await getDocs(qry);

        querySnapShot.forEach(dc => {
            setBusinessList(prev => [...prev, dc.data()]);
        })
    }
  return (
    <View>
        <View style={{paddingLeft: 20, marginBottom: 5, display:'flex', flexDirection:'row',justifyContent:'space-between',marginTop: 5}}>
            <Text style={{paddingLeft: 10, fontFamily: 'outfit-bold', fontSize: 15}}>Popular Businesses</Text>
            <Text style={{color: Colors.PRIMARY, fontFamily: 'outfit-medium'}}>View All</Text>
        </View>
        <FlatList 
          data={businessList} 
          renderItem={({item, index}) => (
            <BusinessListChild key={index} business={item}/> 
          )}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          />
    </View>
  )
}
