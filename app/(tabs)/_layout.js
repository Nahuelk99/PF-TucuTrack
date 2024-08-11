import { Stack } from "expo-router";

export default function TabsLayout() {
  return (
    <Stack>
      <Stack.Screen name="seguimiento" options={{ title: "Seguimiento" }} />
      <Stack.Screen name="horarios" options={{ title: "Horarios" }} />
      <Stack.Screen name="tarifas" options={{ title: "Tarifas" }} />
      <Stack.Screen name="chat" options={{ title: "Chat" }} />
    </Stack>
  );
}