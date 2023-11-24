import { Stack ,Tabs} from "expo-router";

export default function AuthLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="discussions"
        options={{
          headerTitle: "Discussion",
          title: "Discussion",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="groups"
        options={{
          title: "Groups",
          headerShown: false,
        }}
      />
    </Stack>
  );
}
