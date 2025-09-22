import React, { useEffect, useState, useCallback } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as SplashScreen from 'expo-splash-screen';
import HomeScreen from './src/features/feed/screens/HomeScreen';
import FeedScreen from './src/features/feed/screens/FeedScreen';
import QuizScreen from './src/features/feed/screens/QuizScreen';
import OptionScreen from './src/features/feed/screens/OptionScreen';

const Stack = createNativeStackNavigator();
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [ready, setReady] = useState(false);

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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
