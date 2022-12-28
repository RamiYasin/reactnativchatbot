import React, { useEffect } from 'react';
import { StyleSheet, ScrollView, Text, View } from 'react-native';

import useLiveController from './Live.controller';

const Live = () => {
  const { fetchData, mapData, checkNotEmpty } = useLiveController();

  useEffect(() => {
    fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.mainView}>
      <ScrollView>
        <View>{checkNotEmpty() ? mapData() : <Text>Keine Eintrage</Text>}</View>
      </ScrollView>
    </View>
  );
};

export default Live;

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: 'transparent',
  },
});
