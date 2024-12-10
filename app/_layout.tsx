import * as SecureStore from 'expo-secure-store'
import { ClerkProvider, SignedIn, useUser, SignedOut } from '@clerk/clerk-expo'
import { Stack } from 'expo-router';
import LoginScreen from '../components/login';
import { useFonts } from 'expo-font';

const tokenCache = {
  async getToken(key: string) {
    try {
      const item = await SecureStore.getItemAsync(key)
      if (item) {
        console.log(`${key} was used 🔐 \n`)
      } else {
        console.log('No values stored under key: ' + key)
      }
      return item
    } catch (error) {
      console.error('SecureStore get item error: ', error)
      await SecureStore.deleteItemAsync(key)
      return null
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value)
    } catch (err) {
      return
    }
  },
}

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!

if (!publishableKey) {
  throw new Error(
    'Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env',
  )
}

export default function RootLayout() {
  useFonts({
    'outfit-bold': require('../assets/fonts/Outfit-Bold.ttf'),
    'outfit-medium': require('../assets/fonts/Outfit-Medium.ttf'),
    'outfit-regular': require('../assets/fonts/Outfit-Regular.ttf')
  });
  return (
    <ClerkProvider publishableKey={publishableKey}>
        <SignedIn>
          <Stack screenOptions={{headerShown: false}}>
            <Stack.Screen name="(tabs)"/>
          </Stack>
        </SignedIn>
        <SignedOut>
          <LoginScreen/>
        </SignedOut>
    </ClerkProvider>
  )
}
