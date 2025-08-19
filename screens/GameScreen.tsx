import {Alert, StyleSheet, Text, View} from "react-native";
import {Title} from "../components/Title";
import {useState} from "react";
import {generateRandomBetween} from "../helpers/generateRandomBetween";
import {NumberContainer} from "../components/NumberContainer";
import {PrimaryButton} from "../components/PrimaryButton";
import { GuessDirection } from "../constants/constants";

interface GameScreenProps {
    userNumber: number
}

let MIN_BOUNDARY = 1;
let MAX_BOUNDARY = 100;

export const GameScreen = ({ userNumber }: GameScreenProps) => {
    const initialGuess = generateRandomBetween(MIN_BOUNDARY, MAX_BOUNDARY, userNumber);
    const [currentGuess, setCurrentGuess] = useState(initialGuess);

    const nextGuessHandler = (direction: GuessDirection) => {
        if (
            (direction === GuessDirection.Lower && currentGuess < userNumber) ||
            (direction === GuessDirection.Higher && currentGuess > userNumber)
        ) {
            Alert.alert(
                'Incorrect!!!',
                'This is wrong, and you know it!!',
                [
                    {text: 'Sorry', style: 'cancel'}
            ]);
            return;
        }

        if(direction === GuessDirection.Lower) {
            MAX_BOUNDARY = currentGuess
        } else {
            MIN_BOUNDARY = currentGuess + 1
        }

        const newGuess = generateRandomBetween(MIN_BOUNDARY, MAX_BOUNDARY, userNumber);
        setCurrentGuess(newGuess)
    };


    return (
        <View style={styles.screen}>
            <Title text="Opponent's guess" />
            <NumberContainer userNumber={currentGuess}/>
            <View>
                <Text>
                    Higher or lower?
                </Text>
                <PrimaryButton label='+' onPress={() => {nextGuessHandler(GuessDirection.Higher)}}/>
                <PrimaryButton label='-' onPress={() => {nextGuessHandler(GuessDirection.Lower)}}/>
            </View>
            <View>
                <Text>
                    Logs of rounds
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 24,
    }
});
