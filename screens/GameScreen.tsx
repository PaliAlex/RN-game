import {Alert, StyleSheet, Text, View} from "react-native";
import {Title} from "../components/Title";
import {useEffect, useMemo, useState} from "react";
import {generateRandomBetween} from "../helpers/generateRandomBetween";
import {NumberContainer} from "../components/NumberContainer";
import {PrimaryButton} from "../components/PrimaryButton";
import { GuessDirection } from "../constants/constants";
import {InstructionText} from "../components/InstructionText";
import {Card} from "../components/Card";
import { Ionicons } from "@expo/vector-icons";

interface GameScreenProps {
    userNumber: number,
    gameOverHandler(): void;
}

let MIN_BOUNDARY = 1;
let MAX_BOUNDARY = 100;

export const GameScreen = ({ userNumber, gameOverHandler }: GameScreenProps) => {
    const initialGuess = generateRandomBetween(1, 100, userNumber);

    const [currentGuess, setCurrentGuess] = useState(initialGuess);

    useEffect(() => {
        if(currentGuess === userNumber) {
            gameOverHandler()
        }
    }, [currentGuess, userNumber, gameOverHandler])

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
            <Card>
                <InstructionText text='Higher or lower?' style={styles.instructionText}/>
                <View style={styles.buttonsContainer}>
                    <View style={styles.buttonContainer}>
                        <PrimaryButton
                            label={<Ionicons name='add' size={22}/>}
                            onPress={() => {nextGuessHandler(GuessDirection.Higher)}}
                        />
                    </View>
                    <View style={styles.buttonContainer}>
                        <PrimaryButton
                            label={<Ionicons name='remove' size={22}/>}
                            onPress={() => {nextGuessHandler(GuessDirection.Lower)}}
                        />
                    </View>
                </View>

            </Card>
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
    },
    buttonsContainer: {
        flexDirection: "row"
    },
    instructionText: {
      marginBottom: 12,
    },
    buttonContainer: {
        flex: 1
    }
});
