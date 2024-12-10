import React, { useCallback } from 'react';
import * as WebBrowser from 'expo-web-browser';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useWarmUpBrowser } from '@/hooks/useWarmUpBrowser';
import { useOAuth } from '@clerk/clerk-expo';

WebBrowser.maybeCompleteAuthSession();
export default function LoginScreen() {
  useWarmUpBrowser();
  const {startOAuthFlow} = useOAuth({strategy: "oauth_google"});

  const handleOnPress = useCallback(async () => {
    try {
      const {createdSessionId, signIn, signUp, setActive} = await startOAuthFlow();
      if (createdSessionId) {
        setActive({session: createdSessionId})
      } else {
        //implement signIn, signUp
      }
    } catch (error) {
      console.error("OAUTH error! ",error);
    }
  }, []);

  return (
    <View>
        <View style={styles.viewText}>
          <Text style={styles.outterText}>Your Ultimate 
            <Text style={styles.innerText}> Business Community Directory</Text> App
          </Text>
          <View style={styles.container}>
          <Image
            source={{ uri: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo_transparent-jB4rAg8Fti26Kux2IpjuSElc8336XY.png" }}
            style={styles.logo}
            resizeMode="contain" />
        </View>
            <Text style={styles.comment}>Find the business near you or post your business for a bigger audience.</Text>
            <TouchableOpacity style={styles.button} onPress={handleOnPress}>
              <Text style={{fontFamily: 'outfit-regular', textAlign: 'center', color: '#fff'}}>Let's Get Started</Text>
            </TouchableOpacity>
            <Text style={styles.comment}>Click the <Text style={{fontFamily: 'outfit-bold', color: 'red'}}>Let's Get Started</Text> button to <Text style={{fontFamily: 'outfit-bold', color: 'red'}}>sign up / login</Text> into the application. </Text>
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 200,
    backgroundColor: '#f5f5f5',
  },
  logo: {
    width: 300,
    height: 300,
    marginBottom: 170,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#E84545',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 10,
    marginTop:80,
    borderRadius: 99
  },
  viewText: {
    marginTop: 40,
    backgroundColor: '#fff', 
    padding: 30,
  },
  innerText: {
    color: 'red',
  },
  outterText: {
    fontSize: 20,
    fontFamily: 'outfit-bold',
    textAlign: 'center', 
  },
  comment: {
    fontSize: 15,
    fontFamily: 'outfit-regular',
    color: 'gray',
    textAlign: 'center',
    marginVertical: 15
  }
});
