import React, { useEffect, useState, useCallback } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as SplashScreen from 'expo-splash-screen';
import HomeScreen from './src/features/feed/screens/HomeScreen';
import FeedScreen from './src/features/feed/screens/FeedScreen';
import QuizScreen from './src/features/feed/screens/QuizScreen';
import OptionScreen from './src/features/feed/screens/OptionScreen';
import LogInScreen from './src/features/auth/screens/LogInScreen';
import SignUpScreen from './src/features/auth/screens/SignUpScreen';
import './src/config/amplifyConfig';
import { fetchAuthSession } from 'aws-amplify/auth';

const Stack = createNativeStackNavigator();
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [ready, setReady] = useState(false);

useEffect(() => {
  (async () => {
    try {
      const session = await fetchAuthSession();
      console.log('Amplify init OK, session:', session);
    } catch (e) {
      console.log('Amplify error at startup:', e);
    }
  })();
}, []);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 3000); 
    console.log("Inne i useEffect i app")
    return () => clearTimeout(t);
  }, []);

  const onNavReady = useCallback(async () => {
    if (ready) await SplashScreen.hideAsync();
  }, [ready]);

  if (!ready) return null; 

  return (
    <NavigationContainer onReady={onNavReady}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Feed" component={FeedScreen} />
        <Stack.Screen name="Option" component={OptionScreen} />
        <Stack.Screen name="Quiz" component={QuizScreen} />
        <Stack.Screen name="LogIn" component={LogInScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
