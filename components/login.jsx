import React, { useCallback, useState, useEffect } from 'react';
import * as WebBrowser from 'expo-web-browser';
import { View, Text, TouchableOpacity, StyleSheet, Image, Animated, Dimensions } from 'react-native';
import { useWarmUpBrowser } from '@/hooks/useWarmUpBrowser';
import { useOAuth } from '@clerk/clerk-expo';
import Colors from '@/constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';
import { ActivityIndicator } from 'react-native';

WebBrowser.maybeCompleteAuthSession();

const { width, height } = Dimensions.get('window');

export default function LoginScreen() {
  useWarmUpBrowser();
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
  const [isLoading, setIsLoading] = useState(false);

  const fadeAnim = new Animated.Value(0);
  const slideAnim = new Animated.Value(height);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 20,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleOnPress = useCallback(async () => {
    try {
      setIsLoading(true);
      const { createdSessionId, signIn, signUp, setActive } = await startOAuthFlow();
      if (createdSessionId) {
        setActive({ session: createdSessionId })
      } else {
        // implement signIn, signUp
      }
    } catch (error) {
      console.error("OAUTH error! ", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <LinearGradient
      colors={[Colors.PRIMARY, Colors.ICON_BG_COLOR, Colors.PRIMARY]}
      style={styles.container}
    >
      <Animated.View style={[styles.content, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
        <View style={styles.logoContainer}>
          <Image
            source={{uri: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo_transparent-jB4rAg8Fti26Kux2IpjuSElc8336XY.png"}}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.title}>
          Your Ultimate
          <Text style={styles.highlight}> Business Community Directory</Text> App
        </Text>
        <Text style={styles.subtitle}>
          Find businesses near you or post your business for a bigger audience.
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={handleOnPress}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Let's Get Started</Text>
          )}
        </TouchableOpacity>
        <Text style={styles.info}>
          Click the <Text style={styles.infoHighlight}>Let's Get Started</Text> button to <Text style={styles.infoHighlight}>create an account</Text> & get started instantly.
        </Text>
      </Animated.View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    width: width * 0.9,
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  logoContainer: {
    marginBottom: 20,
  },
  logo: {
    width: width * 0.6,
    height: width * 0.6,
  },
  title: {
    fontSize: 24,
    fontFamily: 'outfit-bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  highlight: {
    color: Colors.PRIMARY,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'outfit-regular',
    color: 'gray',
    textAlign: 'center',
    marginBottom: 30,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: Colors.PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    marginBottom: 20,
  },
  buttonText: {
    fontFamily: 'outfit-regular',
    fontSize: 18,
    color: '#fff',
  },
  info: {
    fontSize: 14,
    fontFamily: 'outfit-regular',
    color: 'gray',
    textAlign: 'center',
  },
  infoHighlight: {
    fontFamily: 'outfit-bold',
    color: Colors.PRIMARY,
  },
});
