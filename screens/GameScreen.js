// This is the screen that is responsible for showing the guess of the computer and
// allowing the user to tell the computer whether that's right or wrong, if the value
// should be lower or greater.

import React, { useEffect, useRef, useState } from 'react';
import {
  Alert,
  Dimensions,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Card } from '../components/Card';
import { NumberContainer } from '../components/NumberContainer';
import { MainButton } from '../components/MainButton';

import { generateRandomBetween } from '../helper/generateRandom';
import { styles as DefaultStyles } from '../constants/default-styles';
import RenderList from '../components/RenderList';

export const GameScreen = ({ userChoice, onGameOver }) => {
  const initialGuess = generateRandomBetween(1, 100, userChoice);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [pastGuesses, setPastGuesses] = useState([initialGuess.toString()]);
  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  // After it has been rendered, this function is executed.
  // And it will re-run only if one of our dependencies changed.
  useEffect(() => {
    if (currentGuess === userChoice) {
      onGameOver(pastGuesses.length);
    }
  }, [currentGuess, userChoice, onGameOver]);

  const nextGuessHandler = direction => {
    if (
      (direction === 'lower' && currentGuess < userChoice) ||
      (direction === 'greater' && currentGuess > userChoice)
    ) {
      Alert.alert("Don't lie!", 'You know that this is wrong...', [
        { text: 'Sorry!', style: 'cancel' },
      ]);
      return;
    }

    if (direction === 'lower') {
      currentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess + 1;
    }

    const nextNumber = generateRandomBetween(
      currentLow.current,
      currentHigh.current,
      currentGuess
    );
    setCurrentGuess(nextNumber);
    // We use nextNumber
    // Using currentGuess instead wouldn't work because React won't have updated the
    // state and re-built the component yet.
    setPastGuesses(curPastGuesses => [
      nextNumber.toString(),
      ...curPastGuesses,
    ]);
  };

  // Using Dimensions here
  // if (Dimensions.get('window').height > 600) {
  //   return <View>...</View>
  // }

  if (useWindowDimensions().height < 500) {
    return (
      <View style={styles.screen}>
        <Text style={DefaultStyles.title}>Opponent's Guess</Text>
        <View style={styles.controls}>
          <MainButton onPress={nextGuessHandler.bind(this, 'lower')}>
            <Ionicons name="md-remove" size={24} color="white" />
          </MainButton>

          <NumberContainer value={currentGuess} />

          <MainButton onPress={nextGuessHandler.bind(this, 'greater')}>
            <Ionicons name="md-add" size={24} color="white" />
          </MainButton>
        </View>
        <RenderList pastGuesses={pastGuesses} />
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <Text style={DefaultStyles.title}>Opponent's Guess</Text>
      <NumberContainer value={currentGuess} />
      <Card
        // Using Dimensions here
        // style={
        //   Dimensions.get('window').height > 600
        //     ? styles.buttonContainer
        //     : styles.buttonContainerSmall
        // }
        style={styles.buttonContainer}
      >
        <MainButton
          // title="LOWER"
          onPress={nextGuessHandler.bind(this, 'lower')}
        >
          <Ionicons name="md-remove" size={24} color="white" />
        </MainButton>
        <MainButton
          //title="GREATER"
          onPress={nextGuessHandler.bind(this, 'greater')}
        >
          <Ionicons name="md-add" size={24} color="white" />
        </MainButton>
      </Card>
      <RenderList pastGuesses={pastGuesses} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    // Using dimensions in an if condition here
    marginTop: Dimensions.get('window').height > 600 ? 20 : 5,
    width: 400,
    maxWidth: '90%',
  },
});
