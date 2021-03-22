import { Dimensions, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  bodyText: {
    fontFamily: 'open-sans',
    color: 'red',
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 18,
  },
  result: {
    fontFamily: 'open-sans-bold',
    fontSize: Dimensions.get('window').width < 350 ? 20 : 28,
  },
});
