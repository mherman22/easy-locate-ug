import { View, Text, FlatList, Image, StyleSheet, Dimensions } from 'react-native';
import React from 'react';
import { db } from '../../config/FirebaseConfig';
import { query, collection, getDocs } from "firebase/firestore";

const { width } = Dimensions.get('window');

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
      setSliderList(prev => [...prev, dc.data()])
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>#Special for you</Text>
      <FlatList 
        data={sliderList} 
        renderItem={({item}) => (
          <Image 
            source={{uri: item.imageUrl}} 
            style={styles.sliderImage}
          />
        )}
        horizontal={true}
        contentContainerStyle={styles.listContent}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  title: {
    fontFamily: 'outfit-bold',
    fontSize: width * 0.04, // 4% of screen width
    paddingLeft: width * 0.05, // 5% of screen width
    paddingTop: width * 0.025,
    marginBottom: width * 0.012,
  },
  sliderImage: {
    width: width * 0.75, // 75% of screen width
    height: width * 0.375, // Maintaining 2:1 aspect ratio
    borderRadius: 15,
    marginRight: width * 0.037,
  },
  listContent: {
    paddingLeft: width * 0.05,
  },
});
