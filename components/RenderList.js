import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { RenderListItem } from './RenderListItem';

const RenderList = ({ pastGuesses }) => {
  return (
    <View style={styles.list}>
      <ScrollView>
        {pastGuesses.map((guess, index) => (
          <RenderListItem
            key={guess}
            value={guess}
            numOfRounds={pastGuesses.length - index}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default RenderList;

const styles = StyleSheet.create({
  list: {
    // flex: 1 important in Android in order to do the scroll
    // In iOS this is not neccessary
    flex: 1,
    width: '80%',
  },
});
