import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import Colors from '../constants/color';
import { BodyText } from './BodyText';

export const MainButton = ({ title, onPress }) => {
  return (
    <TouchableOpacity activeOpacity={0.6} onPress={onPress}>
      <View style={styles.button}>
        <BodyText style={styles.buttonText}>{title}</BodyText>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});
