// This is the screen that is responsible for showing the guess of the computer and
// allowing the user to tell the computer whether that's right or wrong, if the value
// should be lower or greater.

import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { generateRandomBetween } from '../helper/generateRandom';

export const GameScreen = ({ userChoice }) => {
  const [currentGuess, setCurrentGuess] = useState(
    generateRandomBetween(1, 100, userChoice)
  );

  return (
    <View>
      <Text></Text>
    </View>
  );
};

const styles = StyleSheet.create({});
