import { View, Text, Image, StyleSheet, Dimensions } from 'react-native'
import React from 'react'
import Colors from '../../constants/Colors'

const { width } = Dimensions.get('window');

export default function BusinessListChild({business}) {
    return (
        <View style={styles.container}>
            <Image source={{uri: business.imageUrl}} style={styles.image}/>
            <View style={styles.infoContainer}>
                <Text style={styles.businessName}>{business.name}</Text>
                <Text style={styles.location}>{business.location}</Text>
                <View style={styles.ratingContainer}>
                    <View style={styles.ratingWrapper}>
                        <Image source={require('../../assets/images/star.png')} style={styles.starIcon}/>
                        <Text style={styles.ratingText}>4.5</Text>
                    </View>
                    <Text style={styles.categoryTag}>{business.category}</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginRight: width * 0.05,
        padding: width * 0.025,
        borderRadius: 15,
        backgroundColor: Colors.WHITE,
        width: width * 0.6,
    },
    image: {
        width: '100%',
        height: width * 0.4,
        borderRadius: 15,
    },
    infoContainer: {
        marginTop: width * 0.02,
        gap: width * 0.0125,
    },
    businessName: {
        fontFamily: 'outfit-bold',
        fontSize: width * 0.045,
    },
    location: {
        fontFamily: 'outfit-regular',
        fontSize: width * 0.035,
        color: Colors.GREY,
    },
    ratingContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: width * 0.05,
    },
    ratingWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: width * 0.025,
    },
    starIcon: {
        width: width * 0.04,
        height: width * 0.04,
    },
    ratingText: {
        fontSize: width * 0.035,
    },
    categoryTag: {
        fontFamily: 'outfit-regular',
        fontSize: width * 0.025,
        backgroundColor: Colors.PRIMARY,
        paddingVertical: width * 0.0125,
        paddingHorizontal: width * 0.025,
        borderRadius: 10,
        color: Colors.WHITE,
    },
});
