import React, { useState } from 'react';
import { View } from 'react-native';

import testData from '../../MockData.json';
import ChatCard from '~/components/ChatCard/ChatCard.component';

const useRequestController = () => {
  const [allData, setAllData] = useState(Array<any>);

  const fetchData = () => {
    const tempData: any[] = [];
    for (const element of testData) {
      if (element.states === 2) {
        tempData.push(element);
      }
    }
    setAllData(tempData);
  };

  const mapData = () => {
    return allData.map((data, index) => (
      <View key={index}>
        <ChatCard data={data} index={index} />
      </View>
    ));
  };

  const checkNotEmpty = () => {
    return allData && allData.length > 0;
  };

  return {
    fetchData,
    mapData,
    checkNotEmpty,
  };
};

export default useRequestController;
