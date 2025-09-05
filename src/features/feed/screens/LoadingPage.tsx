import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Logo from '../../../../assets/logo_historeels.svg'



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
    <View style={styles.container}>
      <Logo width={200} height={200} />
    </View>
  ); 


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(8, 87, 49, 0.16)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  logo: {
    width: 160,
    height: 160
  },
});
