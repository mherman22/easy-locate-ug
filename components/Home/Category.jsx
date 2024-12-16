import { View, Text, FlatList, StyleSheet, Dimensions } from 'react-native'
import React from 'react'
import { collection, getDocs, query } from 'firebase/firestore'
import { db } from '../../config/FirebaseConfig'
import CategoryItem from './CategoryItem';
import Colors from '../../constants/Colors';
import { HOST_WITH_PORT } from '../../config/localhost';

const { width } = Dimensions.get('window');

export default function Category() {
    const [category, setCategory] = React.useState([]);

    const fetchCategories = async () => {
        try {
            const response = await fetch(`${HOST_WITH_PORT}/api/businesses/categories`);
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
            const data = await response.json();
            console.log("fetched categories: " + JSON.stringify(data));
            setCategory(data);
        } catch (err) {
            console.error('Error fetching categories:', err.message)
            Alert.alert('Error', `Failed to fetch category: ${err.message}`)
        }
    };

    React.useEffect(() => {
        fetchCategories();
    }, []);

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
