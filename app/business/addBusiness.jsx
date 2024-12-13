import React, { useState, useEffect } from 'react'
import { View, Text, Image, TouchableOpacity, TextInput, ScrollView, StyleSheet, Dimensions, Platform } from 'react-native'
import { useNavigation } from 'expo-router'
import Colors from '../../constants/Colors'
import * as ImagePicker from 'expo-image-picker'
import RNPickerSelect from 'react-native-picker-select'
import { collection, getDocs, query } from 'firebase/firestore'
import { db, storage } from '../../config/FirebaseConfig'
import { ref, uploadBytes } from 'firebase/storage'

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window')

export default function addBusiness() {
    const [image, setImage] = useState(null)
    const [category, setCategory] = useState([])
    const navigation = useNavigation()

    const [name, setName] = useState(null)
    const [location, setLocation] = useState(null)
    const [contact, setContact] = useState(null)
    const [categorry, setCategorry] = useState(null)
    const [about, setAbout] = useState(null)
    const [website, setWebsite] = useState(null)

    useEffect(() => {
        getCategory()
        navigation.setOptions({
            headerTitle: 'Add New Business',
            headerShown: true
        })
    }, []);

    const onAddNewBusiness = async () => {
      try {
        if (!image) {
          throw new Error('No image selected. Please upload an image.');
        }
    
        const fileName = `${Date.now().toString()}.jpg`;
    
        const response = await fetch(image);
    
        if (!response.ok) {
          throw new Error('Failed to fetch the image. Please try again.');
        }
    
        const blob = await response.blob();
    
        const imageRef = ref(storage, `easylocateug/${fileName}`);
    
        const uploadResult = await uploadBytes(imageRef, blob);
    
        console.log('Image uploaded successfully!', uploadResult);
        alert('Business added successfully!');
      } catch (error) {
        console.error('Error adding new business:', error.message);
        alert(`Failed to add business: ${error.message}`);
      }
    };    

    const getCategory = async () => {
        setCategory([])
        const qry = query(collection(db, 'Category'))
        const querySnapshot = await getDocs(qry)

        querySnapshot.forEach(dc => {
            setCategory(prev => [...prev, {
                label: (dc.data()).name,
                value: (dc.data()).name
            }])
        })
    }

    const pictureImport = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images', 'videos'],
            allowsEditing: true,
            quality: 1,
        })

        if (!result.canceled) {
            setImage(result.assets[0].uri)
        }
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
          <Text style={{fontFamily: 'outfit-bold', fontSize: 25}}>Add New Business</Text>
            <Text style={styles.subtitle}>Please add all the required details to create a new business</Text>
            <TouchableOpacity style={styles.imageContainer} onPress={pictureImport}>
                {!image ? (
                    <Image source={require('../../assets/images/camera (1).png')} style={styles.cameraIcon} />
                ) : (
                    <Image source={{ uri: image }} style={styles.businessImage} />
                )}
            </TouchableOpacity>
            <View style={styles.formContainer}>
                <TextInput
                    onChangeText={setName}
                    placeholder='Business Name'
                    style={styles.input}
                />
                <TextInput
                    onChangeText={setLocation}
                    placeholder='Location'
                    style={styles.input}
                />
                <TextInput
                    onChangeText={setContact}
                    placeholder='Contact'
                    style={styles.input}
                />
                <TextInput
                    onChangeText={setWebsite}
                    placeholder='Website Url'
                    style={styles.input}
                />
                <TextInput
                    onChangeText={setAbout}
                    multiline
                    numberOfLines={100}
                    placeholder='About'
                    style={[styles.input, styles.textArea]}
                />
                <View style={styles.pickerContainer}>
                    <RNPickerSelect
                        placeholder={{ label: 'Select a Category...', value: null }}
                        onValueChange={(value) => setCategorry(value)}
                        items={category}
                        style={pickerSelectStyles}
                    />
                </View>
                <TouchableOpacity onPress={() => onAddNewBusiness()} style={styles.button}>
                    <Text style={styles.buttonText}>Add New Business</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: SCREEN_WIDTH * 0.05,
        backgroundColor: Colors.WHITE,
    },
    subtitle: {
        fontFamily: 'outfit-regular',
        color: Colors.GREY,
        marginTop: SCREEN_HEIGHT * 0.01,
        fontSize: SCREEN_WIDTH * 0.04,
        marginBottom: SCREEN_HEIGHT * 0.02,
    },
    imageContainer: {
        alignSelf: 'center',
        marginBottom: SCREEN_HEIGHT * 0.03,
    },
    cameraIcon: {
        width: SCREEN_WIDTH * 0.25,
        height: SCREEN_WIDTH * 0.25,
        resizeMode: 'contain',
    },
    businessImage: {
        width: SCREEN_WIDTH * 0.25,
        height: SCREEN_WIDTH * 0.25,
        borderRadius: SCREEN_WIDTH * 0.125,
    },
    formContainer: {
        width: '100%',
        marginBottom: SCREEN_HEIGHT * 0.05
    },
    input: {
        fontFamily: 'outfit-regular',
        fontSize: SCREEN_WIDTH * 0.04,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: Colors.PRIMARY,
        padding: SCREEN_WIDTH * 0.03,
        marginBottom: SCREEN_HEIGHT * 0.02,
        width: '100%',
    },
    textArea: {
        height: SCREEN_HEIGHT * 0.15,
        textAlignVertical: 'top',
    },
    pickerContainer: {
        borderWidth: 1,
        borderRadius: 10,
        borderColor: Colors.PRIMARY,
        marginBottom: SCREEN_HEIGHT * 0.02,
    },
    button: {
        padding: SCREEN_WIDTH * 0.04,
        backgroundColor: Colors.PRIMARY,
        borderRadius: 10,
    },
    buttonText: {
        color: Colors.WHITE,
        textAlign: 'center',
        fontFamily: 'outfit-medium',
        fontSize: SCREEN_WIDTH * 0.04,
    },
})

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: SCREEN_WIDTH * 0.04,
        paddingVertical: 12,
        paddingHorizontal: 10,
        color: 'black',
        paddingRight: 30,
    },
    inputAndroid: {
        fontSize: SCREEN_WIDTH * 0.04,
        paddingHorizontal: 10,
        paddingVertical: 8,
        color: 'black',
        paddingRight: 30,
    },
})
