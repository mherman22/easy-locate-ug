import { ScrollView, StyleSheet, View } from 'react-native'
import React from 'react'
import Header from '../../components/Home/Header'
import Slider from '../../components/Home/Slider'
import Category from '../../components/Home/Category'
import BusinessList from '../../components/Home/BusinessList'

export default function home() {
  return (
    <View style={styles.container}>
      <Header />
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>
        <Slider />
        <Category />
        <BusinessList />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingBottom: 20,
  },
});

