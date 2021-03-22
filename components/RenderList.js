import React, { useEffect, useState } from 'react';
import { Dimensions, FlatList, StyleSheet, View } from 'react-native';

import { RenderListItem } from './RenderListItem';

const RenderList = ({ pastGuesses }) => {
  let listContainerStyle = styles.listContainer;

  if (Dimensions.get('window').width < 350) {
    listContainerStyle = styles.listContainerBig;
  }

  return (
    <View style={listContainerStyle}>
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
  listContainerBig: {
    flex: 1,
    width: '80%',
  },
  list: {
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
});
