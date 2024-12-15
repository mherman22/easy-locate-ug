import { View, Text, FlatList, StyleSheet, Dimensions, Alert, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import Colors from '../../constants/Colors';
import BusinessListChild from './BusinessListChild';
import { HOST_WITH_PORT } from '../../config/localhost';
import Ionicons from '@expo/vector-icons/Ionicons';

const { width } = Dimensions.get('window');

export default function BusinessList() {
    const [businesses, setBusinesses] = React.useState([]);

    const fetchBusinesses = async () => {
        try {
            const response = await fetch(`${HOST_WITH_PORT}/api/businesses`);
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
            const data = await response.json();
            console.log("fetched business: " + JSON.stringify(data));
            setBusinesses(data);
        } catch (err) {
            console.error('Error fetching businesses:', err.message)
            Alert.alert('Error', `Failed to add business: ${err.message}`)
        }
    };

    React.useEffect(() => {
        fetchBusinesses();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>Popular Businesses</Text>
                <TouchableOpacity onPress={fetchBusinesses}>
                    <Ionicons name="reload" size={16} color="black" />
                </TouchableOpacity>
            </View>
            <FlatList 
                data={businesses} 
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
