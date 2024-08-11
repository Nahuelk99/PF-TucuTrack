import { Stack } from 'expo-router';
import Tarifas from '../../components/Tarifas';

export default function TarifasPage() {
  return (
    <>
      <Stack.Screen options={{ title: "Tarifas" }} />
      <Tarifas />
    </>
  );
}