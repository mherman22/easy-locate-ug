import React, { useState, useEffect } from 'react'
import { View, Text, Image, TouchableOpacity, TextInput, ScrollView, StyleSheet, Dimensions, Platform, Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import * as ImagePicker from 'expo-image-picker'
import RNPickerSelect from 'react-native-picker-select'
import { collection, getDocs, query } from 'firebase/firestore'
import { db } from '../../config/FirebaseConfig'
import Colors from '../../constants/Colors'
import { HOST_WITH_PORT } from '../../config/localhost'

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window')

export default function addBusiness() {
    const [image, setImage] = useState(null)
    const [category, setCategory] = useState([])
    const navigation = useNavigation()

    const [name, setName] = useState('')
    const [location, setLocation] = useState('')
    const [contact, setContact] = useState('')
    const [selectedCategory, setSelectedCategory] = useState(null)
    const [about, setAbout] = useState('')
    const [website, setWebsite] = useState('')

    useEffect(() => {
        getCategory()
        navigation.setOptions({
            headerTitle: 'Add New Business',
            headerShown: true
        })
    }, [])   

    const onAddNewBusiness = async () => {
      try {
        if (!image || !name || !location || !contact || !about || !website || !selectedCategory) {
          throw new Error('Please fill in all required fields')
        }
    
        const formData = new FormData()
    
        const imageUri = image
        const filename = imageUri.split('/').pop()
        const match = /\.(\w+)$/.exec(filename)
        const type = match ? `image/${match[1]}` : 'image/jpeg'
    
        formData.append('image', {
          uri: imageUri,
          name: filename || 'image.jpg',
          type,
        })
    
        const businessData = {
          name,
          websiteUrl: website,
          location,
          about,
          contact,
          category: selectedCategory,
        }
    
        formData.append('business', JSON.stringify(businessData))
        const response = await fetch(`${HOST_WITH_PORT}/api/businesses`, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data',
          },
          body: formData
        })
    
        if (!response.ok) {
          const errorData = await response.text()
          throw new Error(errorData || 'Failed to save business data')
        }
    
        const savedBusiness = await response.json()
        console.log('Business saved successfully:', savedBusiness)
        
        resetForm()
    
        Alert.alert('Success', 'Business added successfully!', [
          { text: 'OK', onPress: () => navigation.goBack() }
        ])
      } catch (error) {
        console.error('Error adding new business:', error.message)
        Alert.alert('Error', `Failed to add business: ${error.message}`)
      }
    }

    const resetForm = () => {
      setImage(null)
      setName('')
      setLocation('')
      setContact('')
      setSelectedCategory(null)
      setAbout('')
      setWebsite('')
    }

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
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        })

        if (!result.canceled) {
            setImage(result.assets[0].uri)
        }
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
            <Text style={styles.title}>Add New Business</Text>
            <Text style={styles.subtitle}>Please add all the required details to create a new business</Text>
            <TouchableOpacity style={styles.imageContainer} onPress={pictureImport}>
                {!image ? (
                    <Image source={require('../../assets/images/camera.png')} style={styles.cameraIcon} />
                ) : (
                    <Image source={{ uri: image }} style={styles.businessImage} />
                )}
            </TouchableOpacity>
            <View style={styles.formContainer}>
                <TextInput
                    value={name}
                    onChangeText={setName}
                    placeholder='Business Name'
                    style={styles.input}
                />
                <TextInput
                    value={location}
                    onChangeText={setLocation}
                    placeholder='Location'
                    style={styles.input}
                />
                <TextInput
                    value={contact}
                    onChangeText={setContact}
                    placeholder='Contact'
                    style={styles.input}
                />
                <TextInput
                    value={website}
                    onChangeText={setWebsite}
                    placeholder='Website Url'
                    style={styles.input}
                />
                <TextInput
                    value={about}
                    onChangeText={setAbout}
                    multiline
                    numberOfLines={5}
                    placeholder='About'
                    style={[styles.input, styles.textArea]}
                />
                <View style={styles.pickerContainer}>
                    <RNPickerSelect
                        placeholder={{ label: 'Select a Category...', value: null }}
                        onValueChange={(value) => setSelectedCategory(value)}
                        items={category}
                        style={pickerSelectStyles}
                        value={selectedCategory}
                    />
                </View>
                <TouchableOpacity onPress={onAddNewBusiness} style={styles.button}>
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
    title: {
        fontFamily: 'outfit-bold',
        fontSize: SCREEN_WIDTH * 0.06,
        marginBottom: SCREEN_HEIGHT * 0.01,
    },
    subtitle: {
        fontFamily: 'outfit-regular',
        color: Colors.GREY,
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
