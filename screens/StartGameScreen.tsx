import {Alert, StyleSheet, Text, TextInput, View} from "react-native";
import {PrimaryButton} from "../components/PrimaryButton";
import {useState} from "react";
import {Colors} from "../constants/palette";
import {Title} from "../components/Title";
import {Card} from "../components/Card";
import {InstructionText} from "../components/InstructionText";

interface StartGameScreenProps {
    onPickNumber(number: number): void;
}

export const StartGameScreen = ({ onPickNumber }: StartGameScreenProps) => {
    const [enteredNumber, setEnteredNumber] = useState('')

    const numberInputHandler = (value: string) => {
        setEnteredNumber(value)
    }
    const resetNumber = () => {
        setEnteredNumber('')
    }

    const confirmInputHandler = () => {
        const chosenNumber = parseInt(enteredNumber);

        if(isNaN(chosenNumber) || chosenNumber < 0 || chosenNumber >= 99) {
            Alert.alert(
                'Invalid number',
                'Number has to be between 1 and 99.',
                [{
                    text: 'Okey',
                    style: 'cancel',
                    onPress: resetNumber,
                }]
            );

            return;
        }

        console.log('VALID!!!');
        onPickNumber(chosenNumber)
    }

    return(
        <View style={styles.rootContainer}>
            <Title text='Guess my number' />
            <Card>
                <InstructionText text='Input a Number' />
                <TextInput
                    style={styles.input}
                    maxLength={2}
                    keyboardType='number-pad'
                    autoCapitalize='none'
                    autoCorrect={false}
                    onChangeText={numberInputHandler}
                    value={enteredNumber}
                />
                <View style={styles.buttonContainer}>
                    <View style={styles.buttonWrapper}>
                        <PrimaryButton
                            label={'Reset'}
                            onPress={resetNumber}
                        />
                    </View>
                    <View style={styles.buttonWrapper}>
                        <PrimaryButton
                            label={'Confirm'}
                            onPress={confirmInputHandler}
                        />
                    </View>
                </View>
            </Card>
        </View>
    )
}


const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        marginTop: 100,
        alignItems: "center"
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 100,
        marginHorizontal: 24,
        padding: 16,
        backgroundColor: Colors.primary700,
        borderRadius: 8,

        //for Android
        elevation: 4,

        //for IOS
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 6,
        shadowOpacity: 0.25,
    },
    input: {
        height: 60,
        width: 60,
        fontSize: 32,
        fontWeight: "bold",
        borderBottomColor: Colors.accent500,
        borderBottomWidth: 2,
        color: Colors.accent500,
        marginVertical: 8,
        lineHeight: 32
    },
    buttonContainer: {
        flexDirection: 'row'
    },
    buttonWrapper: {
        flex: 1
    }
});