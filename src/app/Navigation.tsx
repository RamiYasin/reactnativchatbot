import React from 'react';
import useConnectionViewModel from '~/common/viewModel/Connection/Connection.viewmodel';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MenueScreen from '~/screens/MenueScreen/Menue.screen';
import LoginScreen from '~/screens/LoginScreen/Login.screen';
import LiveChatScreen from '~/screens/ChatScreen/Chat.Screen';
const MainStack = createNativeStackNavigator();

const Navigation = () => {
  const { isAuthenticated } = useConnectionViewModel();
  return (
    <NavigationContainer>
      <MainStack.Navigator screenOptions={{ headerShown: false }}>
        {isAuthenticated() ? (
          <MainStack.Screen name="HomeScreen" component={HomeScreen} />
        ) : (
          <MainStack.Screen name="LoginScreen" component={LoginScreen} />
        )}
        <MainStack.Screen name="MenuScreen" component={MenueScreen} />

        <MainStack.Screen name="LiveChatScreen" component={LiveChatScreen} />
      </MainStack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
