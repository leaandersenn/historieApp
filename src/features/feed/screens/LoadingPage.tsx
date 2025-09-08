import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image} from 'react-native';
import { useNavigation } from '@react-navigation/native';



const MIN_DURATION_MS = 3000;

export default function LoadingPage() {
  const navigation = useNavigation<any>();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Home'}],
      });
    }, MIN_DURATION_MS);

    return () => clearTimeout(timer);
  }, [navigation])
  
  return (
    <Image 
      source={require('../../../../assets/HistoReels.png')} 
      style={{ position: 'absolute', bottom: 0, width: '100%', height: 200 }} 
      resizeMode="contain" 
    />
  ); 


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(8, 87, 49, 0.16)',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
