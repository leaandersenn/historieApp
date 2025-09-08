import React from 'react';
import { Pressable, View, Text, StyleSheet, Image } from 'react-native';
import { useFonts, OpenSans_400Regular_Italic } from '@expo-google-fonts/open-sans';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {

  const navigator = useNavigation<any>();

  const [fontsLoaded] = useFonts({
    OpenSans_400Regular_Italic,
  });

  if (!fontsLoaded) return null;

  return (
    <View style={styles.container}>
      <View style={styles.centerContent}>
        <Image
          source={require('../../../../assets/LogoLarge.png')}
          style={styles.logoImage}
          resizeMode="contain"
        />
        <Text style={styles.title}>Are you not entertained?</Text>
      </View>

      <Pressable style={styles.button} onPress={() => navigator.navigate('Feed')}>
        <Text style={styles.buttonText}>Stream Nå</Text>
      </Pressable>

      <Image
        source={require('../../../../assets/bottom_icons.png')}
        style={styles.bottomIllustration}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 150,
    paddingBottom: 40,
    backgroundColor: 'rgba(8, 87, 49, 0.26)',
  },
  centerContent: {
    alignItems: 'center',
    marginBottom: 30
  },
  logoImage: {
    width: 400,
    height: 110,
    resizeMode: 'contain' 
  },
  title: {
    fontSize: 18,
    fontFamily: 'OpenSans_400Regular_Italic', 
    color: '#085731',
    marginTop: -16
  },
  button: {
    width: 263,
    height: 73,
    backgroundColor: 'rgba(8, 87, 49, 0.49)',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
    fontFamily: 'OpenSans_400Regular',
  },
  bottomIllustration: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 200,
  },
});
