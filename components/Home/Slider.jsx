import { View, Text, FlatList, Image } from 'react-native';
import React from 'react';
import { db } from '../../config/FirebaseConfig';
import {query, collection, getDocs} from "firebase/firestore";

export default function Slider() {
  const [sliderList, setSliderList] = React.useState([]);

  React.useEffect(() => {
    getSliders();
  }, []);

    const getSliders = async () => {
      setSliderList([]);
        const qry = query(collection(db, '/Slider'));
        const querySnapshot = await getDocs(qry);

        querySnapshot.forEach(dc => {
          console.log(dc.data());
          setSliderList(prev => [...prev, dc.data()])
        })
    };
  return (
    <View>
      <Text style={{fontFamily: 'outfit-bold', fontSize: 15, paddingLeft: 20, paddingTop: 10, marginBottom: 5}}>#Special for you</Text>
      <FlatList 
          data={sliderList} 
          renderItem={({item, index}) => (
            <Image source={{uri: item.imageUrl}} style={{width:300, height: 150, borderRadius: 15, marginRight: 15}}/>
          )}
          horizontal={true}
          style={{paddingLeft: 20}}
          showsHorizontalScrollIndicator={false}
          />
    </View>
  )
}
