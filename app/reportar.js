import { Stack } from 'expo-router';
import Reportar from '../components/Reportar';

export default function ReportarPage() {
  return (
    <>
      <Stack.Screen options={{ title: "Reportar" }} />
      <Reportar />
    </>
  );
}