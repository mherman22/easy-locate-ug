import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import React from 'react'
import Colors from '../../constants/Colors'

const { width } = Dimensions.get('window');

export default function CategoryItem({category, onCategoryPress}) {
    return (
        <TouchableOpacity onPress={() => onCategoryPress(category)} style={styles.container}>
            <View style={styles.iconContainer}>
                <Image source={{uri: category.icon}} style={styles.icon}/>
            </View>
            <Text style={styles.categoryName}>{category.name}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginRight: width * 0.0375,
    },
    iconContainer: {
        padding: width * 0.0375,
        backgroundColor: Colors.ICON_BG_COLOR,
        borderRadius: 99,
    },
    icon: {
        width: width * 0.1,
        height: width * 0.1,
    },
    categoryName: {
        fontSize: width * 0.025,
        textAlign: 'center',
        fontFamily: 'outfit-medium',
        marginTop: width * 0.0125,
    },
});
