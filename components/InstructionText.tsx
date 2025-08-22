import {StyleSheet, Text} from "react-native";
import {Colors} from "../constants/palette";
import {TextStyle} from "react-native/Libraries/StyleSheet/StyleSheetTypes";

interface InstructionTextProps {
    text: string,
    style?: TextStyle,
}
export const InstructionText = ({ text, style }:InstructionTextProps) => {
    return(
        <Text style={[styles.instructionText, style]}>{text}</Text>
    )
}

const styles = StyleSheet.create({
    instructionText: {
        fontFamily: 'open-sans',
        color: Colors.accent500,
        fontSize: 24,
    }
});