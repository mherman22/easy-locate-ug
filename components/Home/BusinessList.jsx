import { View, Text, FlatList, StyleSheet, Dimensions } from 'react-native'
import React from 'react'
import { collection, getDocs, query } from 'firebase/firestore'
import { db } from '../../config/FirebaseConfig'
import Colors from '../../constants/Colors';
import BusinessListChild from './BusinessListChild';

const { width } = Dimensions.get('window');

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
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>Popular Businesses</Text>
                <Text style={styles.viewAllText}>View All</Text>
            </View>
            <FlatList 
                data={businessList} 
                renderItem={({item, index}) => (
                    <BusinessListChild key={index} business={item}/> 
                )}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.listContent}
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
