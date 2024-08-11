import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack>
      <Stack.Screen name="login" options={{ title: "Iniciar Sesion" }} />
      <Stack.Screen name="registrarse" options={{ title: "Registro" }} />
    </Stack>
  );
}