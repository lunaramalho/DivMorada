import { Stack, useRouter, useSegments } from 'expo-router';
import { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { AuthProvider, useAuth } from '@/context/AuthContext';

// Componente interno que redireciona baseado no token
function AuthGuard() {
  const { token, isLoading } = useAuth();
  const router   = useRouter();
  const segments = useSegments();

  useEffect(() => {
    if (isLoading) return; // ainda verificando storage, espera

    const inAuth = segments[0] === '(auth)';

    if (!token && !inAuth) {
      // Sem token e não está na área de auth → vai para login
      router.replace('/(auth)/login');
    } else if (token && inAuth) {
      // Tem token e está na área de auth → vai para home
      router.replace('/(tabs)');
    }
  }, [token, isLoading, segments]);

  // Mostra spinner enquanto verifica o storage
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
        <ActivityIndicator size="large" color="#1abc9c" />
      </View>
    );
  }

  return null;
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <AuthGuard />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="add-expense" options={{ presentation: 'modal' }} />
        <Stack.Screen name="debtors"     options={{ presentation: 'card' }} />
        <Stack.Screen name="receivables" options={{ presentation: 'card' }} />
      </Stack>
    </AuthProvider>
  );
}
