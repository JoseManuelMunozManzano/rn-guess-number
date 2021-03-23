import React from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';

import { BodyText } from '../components/BodyText';
import { MainButton } from '../components/MainButton';
import { TitleText } from '../components/TitleText';

import Colors from '../constants/color';
import { styles as DefaultStyles } from '../constants/default-styles';

export const GameOverScreen = ({ roundsNumber, userNumber, onRestart }) => {
  const styles = styleFunction(
    useWindowDimensions().width,
    useWindowDimensions().height
  );

  return (
    <ScrollView>
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

        <MainButton title="NEW GAME" onPress={onRestart} />
      </View>
    </ScrollView>
  );
};

const styleFunction = (screenWidth, screenHeight) => {
  return StyleSheet.create({
    screen: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 10,
    },
    imageContainer: {
      width: screenWidth * 0.7,
      height: screenWidth * 0.7,
      borderRadius: (screenWidth * 0.7) / 2,
      borderWidth: 3,
      borderColor: 'black',
      overflow: 'hidden',
      marginVertical: screenHeight / 50,
    },
    image: {
      width: '100%',
      height: '100%',
    },
    resultContainer: {
      marginHorizontal: 30,
      marginVertical: screenHeight / 100,
    },
    resultText: {
      textAlign: 'center',
      fontSize: screenWidth < 400 ? 16 : 20,
    },
    highlight: {
      color: Colors.primary,
    },
  });
};
