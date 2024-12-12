import { View, Text, Image, TextInput, Dimensions, StyleSheet, SafeAreaView } from 'react-native';
import React from 'react';
import { useUser } from '@clerk/clerk-expo';
import Ionicons from '@expo/vector-icons/Ionicons';
import Colors from '../../constants/Colors';

const { width } = Dimensions.get('window');

export default function Header() {
    const user = useUser();
    
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <View style={styles.profileContainer}>
            <Image 
              source={{uri: user?.user.imageUrl}} 
              style={styles.profileImage}
            />
            <View>
              <Text style={styles.welcomeText}>Welcome,</Text>
              <Text style={styles.nameText}>{user?.user.firstName}</Text>
            </View>
          </View>
          <View style={styles.searchContainer}>
            <Ionicons name="search" size={24} color={Colors.PRIMARY} />
            <TextInput 
              placeholder='Search ...'
              style={styles.searchInput}
            />
          </View>
        </View>
      </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: Colors.PRIMARY,
    borderRadius: 20,
  },
  container: {
    width: '100%',
    padding: width * 0.025,
    paddingTop: width * 0.04,
    backgroundColor: Colors.PRIMARY,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  profileContainer: {
    flexDirection: 'row',
    gap: width * 0.025,
    alignItems: 'center',
  },
  profileImage: {
    width: width * 0.1,
    height: width * 0.1,
    borderRadius: 99,
  },
  welcomeText: {
    color: '#fff',
  },
  nameText: {
    fontFamily: 'outfit-medium',
    color: '#fff',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    gap: width * 0.025,
    padding: width * 0.001,
    marginVertical: width * 0.04,
    marginTop: width * 0.04,
    borderRadius: 8,
  },
  searchInput: {
    flex: 1,
  },
});
