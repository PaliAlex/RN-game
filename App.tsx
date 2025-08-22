import {StyleSheet, ImageBackground, SafeAreaView, Platform, StatusBar} from 'react-native';
import {StartGameScreen} from "./screens/StartGameScreen";
import { LinearGradient } from 'expo-linear-gradient';
import {useState} from "react";
import {GameScreen} from "./screens/GameScreen";
import {Colors} from "./constants/palette";
import {GameOverScreen} from "./screens/GameOverScreen";
import {useFonts} from "expo-font";
import AppLoading from "expo-app-loading";

export default function App() {
    const [userNumber, setUserNumber] = useState<number | null>(null)
    const [isGameOver, setIsGameOver] = useState<boolean>(true)

    const [ fontsLoaded ] = useFonts({
        'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
        'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
    })

    if(!fontsLoaded) {
        return <AppLoading />
    }

    const pickedNumberHandler = (number: number) => {
        setUserNumber(number)
        setIsGameOver(false)
    }

    const gameOverHandler = () => {
        setIsGameOver(true)
    }

    let screen =  <StartGameScreen onPickNumber={pickedNumberHandler} />

    if(userNumber) {
        screen = <GameScreen userNumber={userNumber} gameOverHandler={gameOverHandler}/>
    }

    if(isGameOver && userNumber) {
        screen = <GameOverScreen />
    }

    return (
          <LinearGradient
              colors={['#620333', Colors.accent500]}
              style={styles.rootScreen}
          >
              <ImageBackground
                  source={require('./assets/background.png')}
                  style={styles.rootScreen}
                  imageStyle={styles.backgroundImage}
                  resizeMode='cover'
              >
                  <SafeAreaView style={styles.safeArea}>
                      {screen}
                  </SafeAreaView>
              </ImageBackground>
          </LinearGradient>
    );
}

const styles = StyleSheet.create({
    rootScreen: {
        flex: 1,
    },
    safeArea: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    backgroundImage: {
        opacity: 0.15
    }
});
