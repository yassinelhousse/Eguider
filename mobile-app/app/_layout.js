import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Tours" }} />
      <Stack.Screen name="tour/[id]" options={{ title: "Tour Details" }} />
    </Stack>
  );
}
