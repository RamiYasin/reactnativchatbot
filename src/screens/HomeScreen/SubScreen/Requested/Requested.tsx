import React, { useEffect } from 'react';
import { StyleSheet, ScrollView, Text, View } from 'react-native';

import useRequestController from './Requested.controller';

const Requested = () => {
  const { fetchData, mapData, checkNotEmpty } = useRequestController();

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

export default Requested;

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: 'transparent',
  },
});
