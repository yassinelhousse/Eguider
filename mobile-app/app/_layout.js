import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="home" />
      <Stack.Screen name="tour/[id]" />
      <Stack.Screen name="booking/[id]" />
      <Stack.Screen name="bookings" />
    </Stack>
  );
}
