import React, { useState } from 'react';
import {
  Image,
  ImageBackground,
  View,
  useWindowDimensions,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { Appbar, Provider, Menu } from 'react-native-paper';
import HomeController from '~/screens/HomeScreen/Home.controller';

import Live from '~/screens/HomeScreen/SubScreen/Live/Live';
import Requested from '~/screens/HomeScreen/SubScreen/Requested/Requested';
import Unassigned from '~/screens/HomeScreen/SubScreen/Unassigned/Unassigned';

const renderScene = SceneMap({
  requested: Requested,
  live: Live,
  unassigned: Unassigned,
});

const renderTabBar = (props: any) => {
  return (
    <TabBar
      renderLabel={({ route }) => (
        <Text style={{ color: 'black' }}>{route.title}</Text>
      )}
      {...props}
      indicatorStyle={{ backgroundColor: '#695d9d' }}
      style={{ backgroundColor: 'white' }}
    />
  );
};

const HomeScreen = () => {
  const layout = useWindowDimensions();
  const { onPressLogo } = HomeController();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'requested', title: 'Angefragt' },
    { key: 'live', title: 'Live' },
    { key: 'unassigned', title: 'Nicht zugewiesen' },
  ]);

  const [visibleMenu, setVisibleMenu] = React.useState(false);
  const openMenu = () => setVisibleMenu(true);
  const closeMenu = () => setVisibleMenu(false);

  return (
    <View style={styles.view}>
      <Provider>
        <Appbar.Header style={{ backgroundColor: '#695d9d' }}>
          <TouchableOpacity onPress={onPressLogo}>
            <Image
              source={require('~/assets/melibo_logo_small.png')}
              style={styles.imageButton}
            />
          </TouchableOpacity>
          <Appbar.Content titleStyle={styles.header} title="Live Chats" />

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
            <Menu.Item onPress={closeMenu} title="Abgeschlossen (0)" />
          </Menu>
        </Appbar.Header>

        <ImageBackground
          source={require('~/assets/melibo_logo_small.png')}
          imageStyle={{ opacity: 0.16 }}
          resizeMode="center"
          style={styles.image}
        >
          <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
            renderTabBar={renderTabBar}
          />
        </ImageBackground>
      </Provider>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  view: {
    flex: 1,

    backgroundColor: 'white',
  },
  header: {
    textAlign: 'center',
    fontSize: 30,

    color: 'white',
  },
  image: {
    flex: 1,
  },
  imageButton: {
    height: 40,
    width: 40,

    marginLeft: 10,
  },
});
