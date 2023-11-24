import { SafeAreaView, StatusBar, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useAuth } from "@/hooks/userAuth";
import { HStack } from "react-native-flex-layout";
import { Skeleton } from 'moti/skeleton'

type Props = {};

const DiscussionScreen = (props: Props) => {
  const { user } = useAuth();
  return (
    <SafeAreaView style={{ marginTop: StatusBar.currentHeight, flex: 1 }}>
      <View className="flex-1 p-1">
        <Text className="text-3xl">Discussion</Text>
        <HStack className="items-centerq">
          <Text className="text-2xl">Welcome </Text>
          <Text className="text-xl">{user.username}</Text>
        </HStack>
        <Skeleton>Hello</Skeleton>
      </View>
    </SafeAreaView>
  );
};

export default DiscussionScreen;

const styles = StyleSheet.create({});
