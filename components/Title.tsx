import {StyleSheet, Text} from "react-native";

interface TitleProps {
    text: string
}

export const Title = ({ text }: TitleProps) => {
    return(
        <Text style={styles.title}>
            {text}
        </Text>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 18,
        fontWeight: "bold",
        color: 'white',
        textAlign: "center",
        borderWidth: 2,
        borderColor: 'white',
        padding: 12,
    }
});