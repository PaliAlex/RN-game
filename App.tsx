import {StyleSheet, ImageBackground, SafeAreaView, Platform, StatusBar} from 'react-native';
import {StartGameScreen} from "./screens/StartGameScreen";
import { LinearGradient } from 'expo-linear-gradient';
import {useState} from "react";
import {GameScreen} from "./screens/GameScreen";
import {Colors} from "./constants/palette";

export default function App() {
    const [userNumber, setUserNumber] = useState<number | null>(null)

    const pickedNumberHandler = (number: number) => {
        setUserNumber(number)
    }

    let screen =  <StartGameScreen onPickNumber={pickedNumberHandler}/>

    if(userNumber) {
        screen = <GameScreen userNumber={userNumber}/>
    }

    return (
          <LinearGradient
              // Background Linear Gradient
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
