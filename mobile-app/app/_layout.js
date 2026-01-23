import { Stack } from "expo-router";

export default function Layout() {
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
