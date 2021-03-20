import React from 'react';
import { StyleSheet, Text } from 'react-native';

export const BodyText = props => {
  return (
    <Text style={{ ...props.style, ...styles.body }}>{props.children}</Text>
  );
};

const styles = StyleSheet.create({
  body: {
    fontFamily: 'open-sans',
  },
});
