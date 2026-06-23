import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="add-expense" options={{ presentation: 'modal' }} />
      <Stack.Screen name="debtors" options={{ presentation: 'card' }} />
      <Stack.Screen name="receivables" options={{ presentation: 'card' }} />
    </Stack>
  );
}
