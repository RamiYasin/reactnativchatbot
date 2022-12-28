import React, { FC } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import useParagraphController from './Paragraph.controller';

export interface ParagraphProps {
  title: string;
  body: string;
}

/**
 * Place here all tsx view elements. Pull actions from the controller
 */
const ParagraphComponent: FC<ParagraphProps> = (props) => {
  const { clicked, buttonPressedHandler } = useParagraphController();

  return (
    <View>
      <Text style={styles.textItem}>{props.title}</Text>
      <Text style={styles.textItem}>{props.body}</Text>

      {clicked && <Text>Button clicked</Text>}

      <Button title={'Click me'} onPress={buttonPressedHandler} />
    </View>
  );
};

const styles = StyleSheet.create({
  textItem: {
    padding: 10,
    backgroundColor: '#F00',
  },
});

export default ParagraphComponent;
