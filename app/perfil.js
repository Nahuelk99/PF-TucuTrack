import { Stack } from 'expo-router';
import Perfil from '../components/Perfil';

export default function PerfilPage() {
  return (
    <>
      <Stack.Screen options={{ title: "Perfil" }} />
      <Perfil />
    </>
  );
}