import { Stack } from "expo-router";
import React, { useEffect } from "react";
import { useAuthStore } from "../src/store/auth.store";

export default function Layout() {
  const loadAuth = useAuthStore((state) => state.loadAuth);
  useEffect(() => {
    loadAuth(); 
  }, []);
  
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />

      {/* Tabs */}
      <Stack.Screen name="(tabs)" />

      {/* Details screens */}
      <Stack.Screen name="tour/[id]" />
      <Stack.Screen name="booking/[id]" />

      {/* Auth screens */}
      <Stack.Screen name="auth/login" />
      <Stack.Screen name="auth/signup" />
    </Stack>
  );
}
