import React, { useEffect } from "react";
import { Slot, useRouter } from "expo-router";
import { useAuth } from "@/hooks/userAuth";
import { useFonts } from 'expo-font';

// import * as SplashScreen from 'expo-splash-screen';
import { SafeAreaView, StatusBar, Text } from "react-native";
import ReactQueryProvider from "@/provider/ReactQueryProvider";

// SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { isLoggedIn } = useAuth();
  const router = useRouter();
  // const [fontsLoaded] = useFonts({
  //   'Poppins-Regular': require('../assets/fonts/poppins/Poppins-Regular.ttf'),
  //   'Poppins-Bold': require('../assets/fonts/poppins/Poppins-Bold.ttf'),
  //   'Poppins-SemiBold': require('../assets/fonts/poppins/Poppins-SemiBold.ttf'),
  //   'Poppins-Medium': require('../assets/fonts/poppins/Poppins-Medium.ttf'),
  //   'Poppins-Light': require('../assets/fonts/poppins/Poppins-Light.ttf'),
  // });


  // if (!fontsLoaded) {
  //   return <Text>Loading Fonts</Text>;
  // }

  useEffect(() => {
    if (isLoggedIn) {
      router.push("chats/");
    }
  },[]);
  return <ReactQueryProvider>
    <Slot />
    </ReactQueryProvider>
}
