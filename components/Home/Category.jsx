import { View, Text, FlatList, StyleSheet, Dimensions } from 'react-native'
import React from 'react'
import { collection, getDocs, query } from 'firebase/firestore'
import { db } from '../../config/FirebaseConfig'
import CategoryItem from './CategoryItem';
import Colors from '../../constants/Colors';

const { width } = Dimensions.get('window');

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
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>business Categories</Text>
                <Text style={styles.viewAllText}>View All</Text>
            </View>
            <FlatList 
                data={category} 
                renderItem={({item, index}) => (
                    <CategoryItem category={item} key={index} onCategoryPress={(cat) => console.log(cat)}/>
                )}
                horizontal={true}
                contentContainerStyle={styles.listContent}
                showsHorizontalScrollIndicator={false}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    headerContainer: {
        paddingHorizontal: width * 0.05,
        marginBottom: width * 0.0125,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: width * 0.0125,
    },
    headerText: {
        fontFamily: 'outfit-bold',
        fontSize: width * 0.04,
    },
    viewAllText: {
        color: Colors.PRIMARY,
        fontFamily: 'outfit-medium',
        fontSize: width * 0.035,
    },
    listContent: {
        paddingLeft: width * 0.05,
    },
});
