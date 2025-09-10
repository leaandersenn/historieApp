import { useNavigation } from "@react-navigation/native";
import { Pressable, StyleSheet } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';


export default function BackButton() {
    const navigation = useNavigation();

    const handleGoBack = () => {
        navigation.goBack();
    }

    return(
        <Pressable style={styles.button} onPress={handleGoBack}>
            <Ionicons name="arrow-back-circle-outline" size={40} color='white'/>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        position: 'absolute', 
        top: 50,
        left: 20,
        zIndex: 10,

    },
});