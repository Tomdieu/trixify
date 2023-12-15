import ChatHeader from "@/components/chats/ChatHeader";
import { useChatStore } from "@/hooks/useChatStore";
import { useAuth } from "@/hooks/userAuth";
import { getChats } from "@/utils/lib/chats";
import { useQuery } from "@tanstack/react-query";
import { Stack ,Tabs} from "expo-router";

export default function ChatLayout() {

  const {token} = useAuth()
  const {setChats} = useChatStore()

  useQuery({
    queryKey:["chats"],
    queryFn:()=>{
      return getChats(token)
    },
    onSuccess:(data)=>{
      setChats(data)
    }
  })

  return (
    <Stack screenOptions={{header:(props)=><ChatHeader {...props}/>,animation:"slide_from_right"}}>
      <Stack.Screen
        name="index"
        options={{
          headerTitle: "Discussion",
          title: "Discussion",
          headerShown: false,
        }}
      />
      <Stack.Screen name="start_chat" options={{
          headerShown:false
        }} />
      <Stack.Screen
        name="[chatId]"
        
      />
      
    </Stack>
  );
}
