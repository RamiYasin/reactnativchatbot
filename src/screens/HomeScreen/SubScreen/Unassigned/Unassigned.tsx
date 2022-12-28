import React, { useEffect } from 'react';
import { StyleSheet, ScrollView, Text, View } from 'react-native';

import useUnassignedController from './Unassigned.controller';

const Unassigned = () => {
  const { fetchData, mapData, checkNotEmpty } = useUnassignedController();

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

export default Unassigned;

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: 'transparent',
  },
});
