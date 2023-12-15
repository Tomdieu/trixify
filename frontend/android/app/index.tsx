import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, StatusBar } from 'react-native'
import React from 'react'
import { useRouter } from "expo-router";

import { Button, HStack } from "@react-native-material/core"

import { FontAwesome } from "@expo/vector-icons"

import { SplashScreen } from 'expo-router';

type Props = {}


SplashScreen.preventAutoHideAsync()

const Root = (props: Props) => {

  const router = useRouter()

  const [isReady, setReady] = React.useState(false);
  React.useEffect(() => {
    // Perform some sort of async data or asset fetching.
    setTimeout(() => {
      // When all loading is setup, unmount the splash screen component.
      SplashScreen.hideAsync();
      setReady(true);
    }, 1000);
  }, []);

  return (
    <SafeAreaView style={styles.container}>

      <View style={{ flex: 1, paddingHorizontal: 8, justifyContent: "center", }}>
        <View style={{flex:1,justifyContent:"center"}}>
          <Text className='font-bold text-4xl'>Welcome To Trixify</Text>
          <Text style={{ fontWeight: "800", fontSize: 30, textAlign: "left" }}>Get Started</Text>
          <Text className='text-xl font-bold'>By @ivantom</Text>
        </View>

        <HStack spacing={8} style={{ marginVertical: 8 }}>
          <Button style={{ flex: 1}} title={'Register'} color='#5a8' titleStyle={{ color: "#fff"}} elevation={8} onPress={() => { router.push('/register') }} />
          <Button style={{ flex: 1}} onPress={() => { router.push('/login') }} title={'Login'} color='#1c71d8' trailing={<FontAwesome name='share' color={"#ffff"} />} />
        </HStack>

      </View>
    </SafeAreaView>

  )
}

export default Root

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight
  }
})