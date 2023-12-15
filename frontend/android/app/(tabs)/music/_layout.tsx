import { StatusBar, StyleSheet, Text, useWindowDimensions } from 'react-native'
import React from 'react'

import { TabView, SceneMap } from 'react-native-tab-view';

import MusicScreen from './index';
import PlaylistScreen from './playlist';
import TabBar from '@/components/chats/emoji/TabBar';

import Icon from "@expo/vector-icons/Ionicons"

type Props = {}

const renderScene = SceneMap({
  musics: MusicScreen,
  playlist: PlaylistScreen
})


const _layout = (props: Props) => {
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'musics', title: 'Music' },
    { key: 'playlist', title: 'Playlist' },
  ]);

  const renderTabBar = props => (
    <TabBar
      {...props}
      setIndex={setIndex}
      indicatorStyle={"blue"}
      style={{ backgroundColor: 'pink' }}
      renderIcon={({ route, focused, color }) => (
        <Icon
          name={focused ? 'albums' : 'albums-outline'}
          color={color}
        />
      )}
    />
  );
  

  return (
    <TabView
      style={{ flex: 1, marginTop: StatusBar.currentHeight }}
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
    />
  )
}

export default _layout

const styles = StyleSheet.create({})