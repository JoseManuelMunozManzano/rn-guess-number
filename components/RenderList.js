import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { RenderListItem } from './RenderListItem';

const RenderList = ({ pastGuesses }) => {
  return (
    <View style={styles.listContainer}>
      {/* contentContainerStyle: To control de layout inside de ScrollView */}
      <ScrollView contentContainerStyle={styles.list}>
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
  listContainer: {
    // flex: 1 important in Android in order to do the scroll
    // In iOS this is not neccessary
    flex: 1,
    width: '80%',
  },
  list: {
    // flex: 1 doesn't work inside a ScrollView
    // We need flexGrow
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});
