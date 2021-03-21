import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import { RenderListItem } from './RenderListItem';

const RenderList = ({ pastGuesses }) => {
  return (
    <View style={styles.listContainer}>
      <FlatList
        data={pastGuesses}
        keyExtractor={item => item}
        renderItem={item => (
          <RenderListItem
            numOfRounds={pastGuesses.length - item.index}
            value={item.item}
          />
        )}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

export default RenderList;

const styles = StyleSheet.create({
  listContainer: {
    // flex: 1 important in Android in order to do the scroll
    // In iOS this is not neccessary
    flex: 1,
    width: '60%',
  },
  list: {
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
});
