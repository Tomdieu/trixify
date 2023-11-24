import React, { useEffect } from "react";
import { Slot, useRouter } from "expo-router";
import { useAuth } from "@/hooks/userAuth";

export default function () {
  const { isLoggedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn) {
      router.push("chats/");
    }
  },[]);
  return <Slot />;
}
