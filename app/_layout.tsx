import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { useAuthStore } from '@/store/auth-store';
import { useTipsStore } from '@/store/tips-store';
import { useSubscriptionStore } from '@/store/subscription-store';
import { colors } from '@/constants/colors';
import { registerBackgroundFetch } from '@/utils/background-tasks';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const { user, initializeAuth } = useAuthStore();
  const { fetchTips, fetchWithdrawals } = useTipsStore();
  const { checkSubscriptionStatus } = useSubscriptionStore();

  useEffect(() => {
    // Initialize auth state
    initializeAuth();
  }, [initializeAuth]);

  useEffect(() => {
    // Fetch user data if logged in
    if (user) {
      fetchTips(user.id);
      fetchWithdrawals(user.id);
      checkSubscriptionStatus(user.id);
    }
  }, [user, fetchTips, fetchWithdrawals, checkSubscriptionStatus]);

  useEffect(() => {
    // Register background fetch task if user is authenticated
    if (user) {
      registerBackgroundFetch();
    }
  }, [user]);

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.background,
        },
        headerTintColor: colors.textLight,
        headerTitleStyle: {
          fontWeight: '600',
        },
        contentStyle: {
          backgroundColor: colors.background,
        },
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(client)" options={{ headerShown: false }} />
      <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
      <Stack.Screen name="profile" options={{ title: 'Perfil' }} />
      <Stack.Screen name="subscription" options={{ title: 'Suscripción' }} />
      <Stack.Screen name="admin-panel" options={{ title: 'Panel de Administración' }} />
      <Stack.Screen name="withdrawal-options" options={{ title: 'Opciones de Retiro' }} />
      <Stack.Screen name="send-tip" options={{ title: 'Enviar Propina' }} />
      <Stack.Screen name="scan-for-tip" options={{ title: 'Escanear para Propina' }} />
      <Stack.Screen name="deposit-methods" options={{ title: 'Depositar Fondos' }} />
      <Stack.Screen name="deposit-pago-movil" options={{ title: 'Pago Móvil' }} />
      <Stack.Screen name="deposit-card" options={{ title: 'Tarjeta de Crédito/Débito' }} />
      <Stack.Screen name="deposit-crypto" options={{ title: 'Criptomonedas' }} />
    </Stack>
  );
}