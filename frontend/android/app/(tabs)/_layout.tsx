import React from "react";
import { Tabs } from "expo-router";

import { MaterialIcons,MaterialCommunityIcons,Ionicons } from "@expo/vector-icons";

const TabLayout = () => {
  return (
    <Tabs initialRouteName="chats" screenOptions={{headerShown:false}}>
      <Tabs.Screen
        name="chats"        
        options={{
          headerShown: false,
          tabBarIcon: (props) => <MaterialIcons name="chat" {...props} />,
        }}
      />
      <Tabs.Screen
        name="friends/index"
        options={{
          headerShown: false,
          tabBarLabel:"Friends",
          tabBarIcon: (props) => <MaterialIcons name="people" {...props} />,
        }}
      />
      <Tabs.Screen
        name="posts/index"
        options={{
          headerShown: false,
          tabBarLabel:"Posts",
          tabBarIcon: (props) => <MaterialCommunityIcons name="post" {...props} />,
        }}
      />
      <Tabs.Screen
        name="story/index"
        options={{
          headerShown: false,
          tabBarLabel:"Story",
          tabBarIcon: (props) => <MaterialIcons name="people" {...props} />,
        }}
      />
      <Tabs.Screen
        name="channel/index"
        options={{
          headerShown: false,
          tabBarLabel:"Channel",
          tabBarIcon: (props) => <Ionicons name="tv" {...props} />,
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
