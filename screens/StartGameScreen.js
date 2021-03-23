import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
  useWindowDimensions,
} from 'react-native';
import { BodyText } from '../components/BodyText';

import { Card } from '../components/Card';
import { Input } from '../components/Input';
import { MainButton } from '../components/MainButton';
import { NumberContainer } from '../components/NumberContainer';
import { TitleText } from '../components/TitleText';
import Colors from '../constants/color';

export const StartGameScreen = ({ onStartGame }) => {
  const [enteredValue, setEnteredValue] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState();
  // Changing useState and useEffect for useWindowDimensions()
  // const [buttonWidth, setButtonWidth] = useState(
  //   Dimensions.get('window').width / 4
  // );
  const styles = styleFunction(useWindowDimensions().width);

  const numberInputHandler = inputText => {
    setEnteredValue(inputText.replace(/[^0-9]/g, ''));
  };

  const resetInputHandler = () => {
    setEnteredValue('');
    setConfirmed(false);
  };

  // useEffect(() => {
  //   const updateLayout = () => {
  //     setButtonWidth(Dimensions.get('window').width / 4);
  //   };
  //   Dimensions.addEventListener('change', updateLayout);

  //   return () => {
  //     Dimensions.removeEventListener('change', updateLayout);
  //   };
  // }, [Dimensions]);

  const confirmInputHandler = () => {
    const chosenNumber = parseInt(enteredValue);

    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert(
        'Invalid number!',
        'Number has to be a number between 1 and 99',
        [{ text: 'Okay', style: 'destructive', onPress: resetInputHandler }]
      );
    }

    setConfirmed(true);
    setEnteredValue('');
    // There is no problem with this instruction here, because
    // setEnteredValue('') will be queued by React and will only be processed the
    // next time the component is rendered.
    // So, these 3 state changes are all batched together to result in one render cycle.
    setSelectedNumber(chosenNumber);

    Keyboard.dismiss();
  };

  let confirmedOutput;

  if (confirmed) {
    confirmedOutput = (
      <Card style={styles.summaryContainer}>
        <BodyText>You selected</BodyText>
        <NumberContainer value={selectedNumber} />
        <MainButton
          title="START GAME"
          onPress={() => onStartGame(selectedNumber)}
        />
      </Card>
    );
  }

  return (
    <ScrollView>
      {/* Important: KeyboardAvoidingView is inside of ScrollView */}
      {/* In iOS it works best if you use position and in Android 
          it works best if you use padding */}
      <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={30}>
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
          }}
        >
          <View style={styles.screen}>
            <TitleText style={styles.title}>Start a new Game!</TitleText>
            <Card style={styles.inputContainer}>
              <Text>Select a Number</Text>
              <Input
                style={styles.input}
                blurOnSubmit
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="number-pad"
                maxLength={2}
                onChangeText={numberInputHandler}
                value={enteredValue}
              />
              <View style={styles.buttonContainer}>
                {/* <View style={{ width: buttonWidth }}> */}
                <View style={styles.button}>
                  <Button
                    title="Reset"
                    color={Colors.accent}
                    onPress={resetInputHandler}
                  />
                </View>
                {/* <View style={{ width: buttonWidth }}> */}
                <View style={styles.button}>
                  <Button
                    title="Confirm"
                    color={Colors.primary}
                    onPress={confirmInputHandler}
                  />
                </View>
              </View>
            </Card>
            {confirmedOutput}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styleFunction = screenWidth => {
  let inputContainerWidth = screenWidth / 1.5;

  return StyleSheet.create({
    screen: {
      flex: 1,
      padding: 10,
      alignItems: 'center',
    },
    title: {
      fontSize: 20,
      marginVertical: 10,
    },
    inputContainer: {
      width: inputContainerWidth,
      maxWidth: '95%',
      minWidth: 300,
      alignItems: 'center',
    },
    buttonContainer: {
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'space-between',
      paddingHorizontal: 15,
    },
    button: {
      // Dimensions is only calculated when the app starts
      // When you rotate the device, it doesn't recalculate.
      // To recalculate when the orientation changes you don't have to use
      // Dimensions in the StyleSheet, but with useState
      width: Dimensions.get('window').width / 4,
    },
    input: {
      width: 50,
      textAlign: 'center',
    },
    summaryContainer: {
      marginTop: 20,
      alignItems: 'center',
    },
  });
};
