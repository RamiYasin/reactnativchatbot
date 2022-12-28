import React from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import { Card } from 'react-native-shadow-cards';
import useCardController from './ChatCard.controller';

const ChatCard = (props: any) => {
  const { calculateDays, onPressCard } = useCardController();
  const { data, index } = props;

  return (
    <View>
      <TouchableOpacity onPress={() => onPressCard(data, index)}>
        <Card style={styles.card}>
          <View style={styles.box}>
            <Text style={styles.title}>
              Zuletzt Aktiv vor {calculateDays(data.lastActive)}
            </Text>
            <Text style={styles.info}>
              {data.identity}: {data.messages[data.messages.length - 1].content}
            </Text>
          </View>
        </Card>
      </TouchableOpacity>
    </View>
  );
};

export default ChatCard;

const styles = StyleSheet.create({
  card: {
    margin: 10,
  },
  box: {
    width: '90%',
    height: 90,

    padding: 10,
    margin: 10,
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  info: {
    fontSize: 12,
    color: '#808080',
  },
});
