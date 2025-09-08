
import { View, Text, Pressable, StyleSheet } from "react-native";
import { useNavigation } from '@react-navigation/native';

export default function FeedScreen() {


    const navigator = useNavigation<any>();

    return (
        <View>
            <Text>Her kommer feeden</Text>
            <Pressable style={styles.button} onPress={() => navigator.navigate('Home')}>
                <Text style={styles.buttonText}>Tilbake til home</Text>
            </Pressable>

        </View>
    );
}

const styles = StyleSheet.create({
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
});