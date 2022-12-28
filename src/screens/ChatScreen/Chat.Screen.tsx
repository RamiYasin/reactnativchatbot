import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native';
import {
  Appbar,
  Button,
  IconButton,
  TextInput,
  Provider,
  Menu,
} from 'react-native-paper';
import ChatController from '~/screens/ChatScreen/Chat.controller';

const LiveChat = () => {
  const { BackToHome, addChat, isTyping } = ChatController();
  const [visible, setVisible] = useState(false);
  const [userMessages, setUserMessages] = useState<string[]>([]);
  const [textArea, setTextArea] = useState('');
  const scrollViewRef = useRef<ScrollView>();
  const [text, setText] = React.useState('.');
  const [interval, setIntervalFunction] = React.useState(
    setInterval(() => {
      /**/
    }),
  );
  const [isRunning, setIsRunning] = React.useState(false);

  const [visibleMenu, setVisibleMenu] = React.useState(false);
  const openMenu = () => setVisibleMenu(true);
  const closeMenu = () => setVisibleMenu(false);

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [textArea]);

  const ReactionRating = () => {
    setTextArea('Rating ⭐');
  };

  const ReactionNewAgent = () => {
    setTextArea('New Agent 🆕');
  };

  const ReactionBusy = () => {
    setTextArea('Busy ⏰');
  };

  const ReactionProblemnichtgeloest = () => {
    setTextArea('Problem nicht gelöst ❌');
  };

  const ReactionProblemgeloest = () => {
    setTextArea('Problem gelöst? ✅');
  };

  const ReactionSales = () => {
    setTextArea('Sales 💸');
  };

  const ReactionHallo = () => {
    setTextArea('Hallo 👋');
  };

  const ReactionBye = () => {
    setTextArea('Bye 🙋‍♀');
  };

  const ReactionEMail = () => {
    setTextArea('E-Mail 📧');
  };

  const onSendHandler = () => {
    if (textArea !== '') {
      setUserMessages([...userMessages, textArea]);
      for (let data of userMessages) {
        addChat(data);
      }
      setTextArea('');
    } else {
      alert('write something');
    }
  };
  React.useEffect(() => {
    let currentText = '';

    if (isRunning) {
      const newInterval = setInterval(() => {
        if (currentText === '.') {
          currentText = '..';
        } else if (currentText === '..') {
          currentText = '...';
        } else {
          currentText = '.';
        }

        setText(currentText);
      }, 500);

      clearInterval(interval);
      setIntervalFunction(newInterval);
    } else {
      clearInterval(interval);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRunning]);

  const toggleInterval = () => {
    setIsRunning(!isRunning);
  };
  return (
    <SafeAreaView style={style.body}>
      <Provider>
        <Appbar.Header style={style.header}>
          <Appbar.BackAction onPress={BackToHome} color="white" />
          <Appbar.Content
            titleStyle={{ textAlign: 'center' }}
            title="Live-Chat"
            color="white"
          />
          <Menu
            visible={visibleMenu}
            onDismiss={closeMenu}
            anchor={
              <Appbar.Action
                icon="dots-vertical"
                color="white"
                onPress={openMenu}
              />
            }
          >
            <Menu.Item onPress={closeMenu} title="Chat weitergeben" />
            <Menu.Item onPress={closeMenu} title="Chat beenden" />
          </Menu>
        </Appbar.Header>

        <ScrollView
          style={style.scrollView}
          nestedScrollEnabled={true}
          ref={scrollViewRef}
        >
          <View style={style.dividerBox}>
            <Text>🤖 Unterhaltung mit Chatbot</Text>
            <View style={style.divider} />
            <Text>Mittwoch, 07.12.2022 13:59 Uhr</Text>
          </View>

          <View style={[style.mainBubble, style.rightBubble]}>
            <Text style={style.text}>
              Text Text Text Text Text Text Text TextText Text Text TextText
              Text Text{' '}
            </Text>
          </View>

          <View style={[style.mainBubble, style.leftBubble]}>
            <Text style={style.text}>
              Text Text TextText Text TextText Text TextText Text{' '}
            </Text>
          </View>

          <View style={style.dividerBox}>
            <Text>💬 Live-Chat mit User:in #12345</Text>
            <View style={style.divider} />
            <Text>Donnerstag, 14.12.2022 16:32 Uhr</Text>
          </View>

          <View style={[style.mainBubble, style.leftBubble]}>
            <Text style={style.text}>
              Text Text TextText Text TextText Text TextText Text{' '}
            </Text>
          </View>

          <View
            style={
              isRunning
                ? [style.mainBubble, style.leftBubble]
                : [style.displayNone]
            }
          >
            <View>
              <Text style={[style.text, style.dot]}>{text}</Text>
            </View>
          </View>

          <Button onPress={toggleInterval}>
            {isRunning ? 'Stop' : 'Start'}
          </Button>

          {userMessages.map((item, index) => (
            <View key={index} style={[style.mainBubble, style.rightBubble]}>
              <Text style={style.text}>{item}</Text>
            </View>
          ))}
        </ScrollView>

        <View style={style.mainfooter}>
          <View
            style={
              visible
                ? [style.footerFastAnswers, style.displayNone]
                : [style.footerFastAnswers]
            }
          >
            <Button
              textColor="white"
              style={style.buttonFastAnswers}
              onPress={ReactionRating}
            >
              Rating ⭐
            </Button>
            <Button
              textColor="white"
              style={style.buttonFastAnswers}
              onPress={ReactionNewAgent}
            >
              New Agent 🆕
            </Button>
            <Button
              textColor="white"
              style={style.buttonFastAnswers}
              onPress={ReactionBusy}
            >
              Busy ⏰
            </Button>
            <Button
              textColor="white"
              style={style.buttonFastAnswers}
              onPress={ReactionProblemnichtgeloest}
            >
              Problem nicht gelöst ❌
            </Button>
            <Button
              textColor="white"
              style={style.buttonFastAnswers}
              onPress={ReactionProblemgeloest}
            >
              Problem gelöst? ✅
            </Button>
            <Button
              textColor="white"
              style={style.buttonFastAnswers}
              onPress={ReactionSales}
            >
              Sales 💸
            </Button>
            <Button
              textColor="white"
              style={style.buttonFastAnswers}
              onPress={ReactionHallo}
            >
              Hallo 👋
            </Button>
            <Button
              textColor="white"
              style={style.buttonFastAnswers}
              onPress={ReactionBye}
            >
              Bye 🙋‍♀
            </Button>
            <Button
              textColor="white"
              style={style.buttonFastAnswers}
              onPress={ReactionEMail}
            >
              E-Mail 📧
            </Button>
          </View>
          <View style={style.footer}>
            <IconButton
              onPress={() => setVisible(!visible)}
              icon={'lightning-bolt'}
              iconColor={'#695d9d'}
            />
            <TextInput
              value={textArea}
              mode={'outlined'}
              dense={true}
              textColor={'#3d3d3d'}
              style={style.textinput}
              onChangeText={(value) => {setTextArea(value);isTyping()}}
            />

            <IconButton
              onPress={onSendHandler}
              icon={'send'}
              iconColor={'#695d9d'}
            />
          </View>
        </View>
      </Provider>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  buttonFastAnswers: {
    backgroundColor: '#695d9d',
    borderRadius: 20,
    marginBottom: 5,
    marginRight: 5,
  },

  header: {
    backgroundColor: '#695d9d',
  },

  body: {
    flex: 1,
  },

  mainfooter: {
    justifyContent: 'flex-end',
    backgroundColor: '#BDC3C7',
  },

  footer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  footerFastAnswers: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    padding: 8,
    paddingBottom: 0,
  },

  displayNone: {
    display: 'none',
  },

  dot: {
    fontWeight: 'bold',
  },

  textinput: {
    flex: 1,
    backgroundColor: '#ecf0f1',
    marginBottom: 6,
  },

  scrollView: {
    flex: 1,
    padding: 10,
  },

  text: {
    color: 'white',
  },

  divider: {
    flex: 1,
    backgroundColor: 'black',
    height: 1,
    width: '100%',
  },

  dividerBox: {
    alignItems: 'center',

    padding: 10,
    marginBottom: 10,
  },

  mainBubble: {
    padding: 10,
    borderRadius: 16,
    marginBottom: 10,
  },

  rightBubble: {
    backgroundColor: '#695d9d',
    borderBottomRightRadius: 0,
    marginLeft: '10%',
  },

  leftBubble: {
    backgroundColor: '#299D99',
    borderBottomLeftRadius: 0,
    marginRight: '10%',
  },
});

export default LiveChat;
