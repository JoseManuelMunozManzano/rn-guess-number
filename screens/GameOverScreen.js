import React from 'react';
import { Button, Image, StyleSheet, Text, View } from 'react-native';

import { BodyText } from '../components/BodyText';
import { TitleText } from '../components/TitleText';

import Colors from '../constants/color';
import { styles as DefaultStyles } from '../constants/default-styles';

export const GameOverScreen = ({ roundsNumber, userNumber, onRestart }) => {
  return (
    <View style={styles.screen}>
      <TitleText>The Game is Over</TitleText>
      <View style={styles.imageContainer}>
        <Image
          source={require('../assets/success.png')}
          // source={{
          //   uri:
          //     'https://cdn.pixabay.com/photo/2016/05/05/23/52/mountain-summit-1375015_960_720.jpg',
          // }}
          fadeDuration={600}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      <View style={styles.resultContainer}>
        <BodyText style={styles.resultText}>
          {/* Text inside of text receives the style defined on the outer text */}
          {/* Text uses its own positioning system (not Flexbox) where it automatically */}
          {/* wraps itself into a new line if it doesn't fit into one line */}
          Your phone needed{' '}
          <Text style={{ ...styles.highlight, ...DefaultStyles.result }}>
            {roundsNumber}
          </Text>{' '}
          rounds to guess the number{' '}
          <Text style={{ ...styles.highlight, ...DefaultStyles.result }}>
            {userNumber}
          </Text>
        </BodyText>
      </View>
      <Button title="NEW GAME" onPress={onRestart} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    width: 300,
    height: 300,
    borderRadius: 150,
    borderWidth: 3,
    borderColor: 'black',
    overflow: 'hidden',
    marginVertical: 30,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  resultContainer: {
    marginHorizontal: 30,
    marginVertical: 15,
  },
  resultText: {
    textAlign: 'center',
    fontSize: 20,
  },
  highlight: {
    color: Colors.primary,
  },
});
