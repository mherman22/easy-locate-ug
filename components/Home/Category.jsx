import { View, Text, FlatList, Image } from 'react-native'
import React from 'react'
import { collection, getDocs, query } from 'firebase/firestore'
import { db } from '../../config/FirebaseConfig'
import CategoryItem from './CategoryItem';
import Colors from '../../constants/Colors';

export default function Category() {
    const [category, setCategory] = React.useState([]);

    React.useEffect(() => {
        getCategory();
    }, []);

    const getCategory = async() => {
        setCategory([]);
        const qry = query(collection(db, 'Category'));
        const querySnapshot = await getDocs(qry);

        querySnapshot.forEach(dc => {
            setCategory(prev => [...prev, dc.data()]);
        })
    }
  return (
    <View>
      <View style={{paddingLeft: 20, marginBottom: 5,display:'flex', flexDirection:'row',justifyContent:'space-between',marginTop: 5}}>
        <Text style={{paddingLeft: 10, fontFamily: 'outfit-bold', fontSize: 15}}>business Categories</Text>
        <Text style={{color: Colors.PRIMARY, fontFamily: 'outfit-medium'}}>View All</Text>
      </View>
      <FlatList 
          data={category} 
          renderItem={({item, index}) => (
            <CategoryItem category={item} key={index} onCategoryPress={(cat) => console.log(cat)}/>
          )}
          horizontal={true}
          style={{marginLeft: 20}}
          showsHorizontalScrollIndicator={false}
          />
    </View>
  )
}