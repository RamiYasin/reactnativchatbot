import * as React from 'react';
import { StyleSheet, SafeAreaView, Image } from 'react-native';
import { Button, Card } from 'react-native-paper';
import useLoginController from '~/screens/LoginScreen/Login.controller';

const Login = () => {
  const { onPressLogin } = useLoginController();
  return (
    <SafeAreaView style={styles.viewStyle}>
      <Card style={styles.cardstyle}>
        <Image
          style={styles.imageStyle}
          source={require('~/assets/melibo-logo.png')}
        />
        <Button
          mode="contained"
          onPress={onPressLogin}
          style={{
            marginBottom: 30,
            width: 150,
            backgroundColor: '#695d9d',
            alignSelf: 'center',
          }}
        >
          Login
        </Button>
      </Card>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  viewStyle: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#695d9d',
  },

  imageStyle: {
    width: 300,
    resizeMode: 'contain',
    alignSelf: 'center',
  },

  cardstyle: {
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    margin: 25,
  },

  buttonStyle: {
    alignSelf: 'center',
  },
});

export default Login;
