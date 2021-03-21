// This is the screen that is responsible for showing the guess of the computer and
// allowing the user to tell the computer whether that's right or wrong, if the value
// should be lower or greater.

import React, { useEffect, useRef, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Card } from '../components/Card';
import { NumberContainer } from '../components/NumberContainer';

import { generateRandomBetween } from '../helper/generateRandom';
import { styles as DefaultStyles } from '../constants/default-styles';
import { MainButton } from '../components/MainButton';

export const GameScreen = ({ userChoice, onGameOver }) => {
  const initialGuess = generateRandomBetween(1, 100, userChoice);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [pastGuesses, setPastGuesses] = useState([initialGuess]);
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
    setPastGuesses(curPastGuesses => [nextNumber, ...curPastGuesses]);
  };

  return (
    <View style={styles.screen}>
      <Text style={DefaultStyles.title}>Opponent's Guess</Text>
      <NumberContainer value={currentGuess} />
      <Card style={styles.buttonContainer}>
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
      <ScrollView>
        {pastGuesses.map(guess => (
          <View key={guess}>
            <Text>{guess}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    width: 400,
    maxWidth: '90%',
  },
});
