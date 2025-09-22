import { useNavigation } from "@react-navigation/native";
import { View, StyleSheet } from "react-native";
import LottieView from 'lottie-react-native';
import LargeButton from "../components/LargeButton";

export default function OptionScreen() {

    const castleAnimation = require('../../../../assets/CASTLE.json'); 
    const navigator = useNavigation<any>();

    return (
        <View style={styles.container}>
            <View>
                <LargeButton
                    title="Stream nå"
                    onPress={() => navigator.navigate('Feed')}
                    backgroundColor="rgba(8, 87, 49, 0.49)"
                />
                <LargeButton
                    title="Start quiz"
                    onPress={() => navigator.navigate('Quiz')}
                    backgroundColor="rgba(255, 165, 0, 0.49)" 
                />
            </View>
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
    animation: {
      width: 200,
      height: 200,
      marginBottom: 20,
      backgroundColor: 'transparent'
    }
});