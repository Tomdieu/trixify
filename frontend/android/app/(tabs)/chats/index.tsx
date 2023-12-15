import {  ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useAuth } from "@/hooks/userAuth";
import { HStack } from "react-native-flex-layout";
import { Skeleton } from 'moti/skeleton'
import ChatNavbar from "@/components/chats/ChatNavbar";
import ChatItem from "@/components/chats/ChatItem";
import BtnNewChat from "@/components/chats/BtnNewChat";
import { SafeAreaView } from "react-native-safe-area-context";
import { useChatStore } from "@/hooks/useChatStore";
import { useRouter } from "expo-router";
import { GroupType, ConversationType } from "@/types";

type Props = {};

const DiscussionScreen = (props: Props) => {
  const { user } = useAuth();
  const {chats,setSelectedChat} = useChatStore()
  const router = useRouter()
  return (
    <SafeAreaView style={{  flex: 1, position: "relative" }} className="bg-white">
      <StatusBar barStyle="dark-content" />
      <ChatNavbar/>

      <ScrollView>
        {chats.map((chat: GroupType | ConversationType) => (
          <ChatItem key={chat.id} chat={chat} onPress={()=>{setSelectedChat(chat);router.push(`/(tabs)/chats/${chat.id}`)}} />
        ))}
      </ScrollView>

      <BtnNewChat  onPress={()=>{router.push("/(tabs)/chats/start_chat")}} />
      

    </SafeAreaView>
  );
};

export default DiscussionScreen;

const styles = StyleSheet.create({});
