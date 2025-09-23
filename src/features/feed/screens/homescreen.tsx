import { View, Text, StyleSheet, Image } from 'react-native';
import { useFonts, OpenSans_400Regular_Italic } from '@expo-google-fonts/open-sans';
import { useNavigation } from '@react-navigation/native';
import LargeButton from '../components/LargeButton';

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
      <LargeButton
          title="Lær meg historien"
          onPress={() => navigator.navigate('Option')}
          backgroundColor="#0857317d" 
       />
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
  bottomIllustration: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 200,
  },
});
