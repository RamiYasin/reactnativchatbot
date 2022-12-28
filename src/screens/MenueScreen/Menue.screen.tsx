import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
} from 'react-native';
import React from 'react';
import { Appbar, Card, Paragraph, Dialog, Button } from 'react-native-paper';
import MenueController from '~/screens/MenueScreen/Menu.screen.controller';

const HomeScreen = () => {
  const { onPressLogout, user, BackToMeneue } = MenueController();
  const [visible, setVisible] = React.useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  return (
    <SafeAreaView style={styles.containerStrech}>
      <ImageBackground
        source={require('~/assets/melibo_logo_small.png')}
        imageStyle={{ opacity: 0.16 }}
        resizeMode="center"
        style={styles.backgroundImage}
      >
        <Appbar.Header style={{ backgroundColor: '#695d9d' }}>
          <Appbar.BackAction
            onPress={BackToMeneue}
            style={{ position: 'absolute' }}
          />
          <Appbar.Content titleStyle={{ textAlign: 'center' }} title="Menü" />
        </Appbar.Header>

        <Card onPress={BackToMeneue} style={styles.card}>
          <View style={styles.inCard}>
            <Image
              style={styles.imageSize}
              source={require('~/assets/life-chat_image_transparent.png')}
            />
            <View style={styles.containerCenter}>
              <Text style={styles.textItem}>Live-Chat</Text>
            </View>
          </View>
        </Card>

        <Card style={styles.card}>
          <View style={styles.inCard}>
            <Image
              style={styles.imageSize}
              source={require('~/assets/settings_image_transparent.png')}
            />
            <View style={styles.containerCenter}>
              <Text style={styles.textItem}>Einstellungen</Text>
            </View>
          </View>
        </Card>

        <View style={styles.conteinerbottom}>
          <Card style={styles.card} onPress={showDialog}>
            <View style={styles.inCard}>
              <Image
                style={styles.imageSize}
                source={require('~/assets/logout_image_transparent.png')}
              />
              <View style={styles.containerCenter}>
                <Text style={styles.textItem}>Logout</Text>
                <Text style={styles.subTextItem}>
                  {user?.firstName} {user?.lastName}
                </Text>
              </View>
            </View>
          </Card>
        </View>

        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>Log-Out</Dialog.Title>
          <Dialog.Content>
            <Paragraph>Möchten Sie sich wirklich ausloggen?</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={onPressLogout}>Ja</Button>
            <Button onPress={hideDialog}>Nein</Button>
          </Dialog.Actions>
        </Dialog>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  containerStrech: {
    backgroundColor: '#ecf0f1',
    flex: 1,
  },
  conteinerbottom: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 10,
  },
  card: {
    marginHorizontal: 10,
    marginTop: 10,
    backgroundColor: '#ecf0f1',
  },
  textItem: {
    fontSize: 20,
  },
  subTextItem: {
    fontSize: 10,
  },
  imageSize: {
    width: 50,
    height: 50,
  },

  inCard: {
    flexDirection: 'row',
    padding: 10,
  },
  containerCenter: {
    paddingLeft: 10,
    justifyContent: 'center',
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
  },
});

export default HomeScreen;
