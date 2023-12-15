
import React from "react";
import { Tabs } from "expo-router";

import { MaterialIcons, MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";

import { Headphones } from "lucide-react-native";
import { useTab } from "@/hooks/tabStore";

const TabLayout = () => {

  const {shown} = useTab()

  return (
    <Tabs initialRouteName="chats" screenOptions={{
      headerShown: false,
      tabBarHideOnKeyboard: true,
      tabBarStyle:{
        position:"fixed",
        elevation:20,
        paddingVertical:10,
        height:60,
        display:shown?"flex":"none",
        
      }
    }}
    >
      <Tabs.Screen
        name="chats"
        options={{
          headerShown: false,
          tabBarIcon: (props) => <MaterialIcons name="chat" {...props} />,
          tabBarLabel:"Chat",
          tabBarLabelStyle:{
            fontFamily:"poppins-medium"
          }
        }}
      />
      <Tabs.Screen
        name="music"
        options={{
          headerShown: false,
          tabBarLabel: "Music",
          tabBarIcon: (props) => <Headphones {...props} />,
          tabBarLabelStyle:{
            fontFamily:"poppins-medium"
          }
        }}
        />
        <Tabs.Screen
        name="channel/index"
        options={{
          headerShown: false,
          tabBarLabel: "explore",
          tabBarIcon: (props) => <MaterialIcons name="explore"  {...props}/>,
          tabBarLabelStyle:{
            fontFamily:"poppins-medium"
          }
        }}
      />
      
      <Tabs.Screen
        name="posts/index"
        options={{
          headerShown: false,
          tabBarLabel: "Posts",
          tabBarIcon: (props) => <MaterialCommunityIcons name="post" {...props} />,
          tabBarLabelStyle:{
            fontFamily:"poppins-medium"
          }
        }}
      />
      <Tabs.Screen
        name="friends/index"
        options={{
          headerShown: false,
          tabBarLabel: "Friends",
          tabBarIcon: (props) => <MaterialIcons name="people" {...props} />,
          tabBarLabelStyle:{
            fontFamily:"poppins-medium"
          }
        }}
      />
      <Tabs.Screen
        name="story/index"
        options={{
          headerShown: false,
          tabBarLabel: "Story",
          tabBarIcon: (props) => <MaterialIcons name="people" {...props} />,
          tabBarLabelStyle:{
            fontFamily:"poppins-medium"
          }
        }}
      />
      
    </Tabs>
  );
};

export default TabLayout;
