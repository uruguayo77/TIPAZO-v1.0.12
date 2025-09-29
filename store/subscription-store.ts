import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert, Platform } from 'react-native';
import { useTipsStore } from './tips-store';
import { router } from 'expo-router';
import { apiClient } from '@/lib/api-client';

export type SubscriptionStatus = 'none' | 'trial' | 'active' | 'expired';

interface SubscriptionState {
  status: SubscriptionStatus;
  startDate: string | null;
  endDate: string | null;
  trialEndDate: string | null;
  isLoading: boolean;
  error: string | null;
  usedPromoCodes: Record<string, string[]>;
  isLegacyUser: boolean;
  
  // Actions
  startTrial: () => Promise<void>;
  subscribe: () => Promise<void>;
  cancelSubscription: () => Promise<void>;
  restoreSubscription: () => Promise<void>;
  checkSubscriptionStatus: (userId?: string) => Promise<void>;
  checkWalletBalance: (userId: string) => boolean;
  payFromWallet: (userId: string, amount: number) => Promise<boolean>;
  processAutoRenewal: (userId: string) => Promise<boolean>;
  showInsufficientFundsAlert: () => void;
  validatePromoCode: (userId: string, code: string) => { valid: boolean; message: string };
  applyPromoCode: (userId: string, code: string) => Promise<{ success: boolean; message: string }>;
}

// Helper function to add days to a date
const addDays = (date: Date, days: number): Date => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

// Subscription price - $4.99
export const SUBSCRIPTION_PRICE = 4.99;

// Trial period - 15 days for all users
export const TRIAL_DAYS = 15;

// Valid promo codes and their effects
const PROMO_CODES = {
  'TIPAZO15': { days: 15, description: '15 días gratis de TIPAZO Premium' }
};

export const useSubscriptionStore = create<SubscriptionState>()(
  persist(
    (set, get) => ({
      status: 'none',
      startDate: null,
      endDate: null,
      trialEndDate: null,
      isLoading: false,
      error: null,
      usedPromoCodes: {},
      isLegacyUser: false,
      
      startTrial: async () => {
        set({ isLoading: true, error: null });
        try {
          // TODO: Replace with real API call to start trial
          // await apiClient.someEndpoint.startTrial();
          
          const now = new Date();
          const trialEndDate = addDays(now, TRIAL_DAYS);
          
          set({
            status: 'trial',
            startDate: now.toISOString(),
            trialEndDate: trialEndDate.toISOString(),
            isLoading: false,
          });
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : "Failed to start trial", 
            isLoading: false 
          });
        }
      },
      
      subscribe: async () => {
        set({ isLoading: true, error: null });
        try {
          const { user } = require('./auth-store').useAuthStore.getState();
          
          if (!user) {
            throw new Error("User not authenticated");
          }
          
          const hasEnoughBalance = get().checkWalletBalance(user.id);
          
          if (!hasEnoughBalance) {
            get().showInsufficientFundsAlert();
            set({ isLoading: false });
            return;
          }
          
          const paymentSuccess = await get().payFromWallet(user.id, SUBSCRIPTION_PRICE);
          
          if (!paymentSuccess) {
            throw new Error("Payment failed");
          }
          
          // TODO: Replace with real API call for subscription
          // await apiClient.someEndpoint.subscribe();
          
          const now = new Date();
          const endDate = addDays(now, 30);
          
          set({
            status: 'active',
            startDate: now.toISOString(),
            endDate: endDate.toISOString(),
            isLoading: false,
          });
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : "Failed to subscribe", 
            isLoading: false 
          });
        }
      },
      
      cancelSubscription: async () => {
        set({ isLoading: true, error: null });
        try {
          // TODO: Replace with real API call to cancel subscription
          // await apiClient.someEndpoint.cancelSubscription();
          
          set({
            status: 'expired',
            isLoading: false,
          });
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : "Failed to cancel subscription", 
            isLoading: false 
          });
        }
      },
      
      restoreSubscription: async () => {
        set({ isLoading: true, error: null });
        try {
          const { user } = require('./auth-store').useAuthStore.getState();
          
          if (!user) {
            throw new Error("User not authenticated");
          }
          
          const hasEnoughBalance = get().checkWalletBalance(user.id);
          
          if (!hasEnoughBalance) {
            get().showInsufficientFundsAlert();
            set({ isLoading: false });
            return;
          }
          
          const paymentSuccess = await get().payFromWallet(user.id, SUBSCRIPTION_PRICE);
          
          if (!paymentSuccess) {
            throw new Error("Payment failed");
          }
          
          // TODO: Replace with real API call to restore subscription
          // await apiClient.someEndpoint.restoreSubscription();
          
          const now = new Date();
          const endDate = addDays(now, 30);
          
          set({
            status: 'active',
            startDate: now.toISOString(),
            endDate: endDate.toISOString(),
            isLoading: false,
          });
          
          Alert.alert(
            "Suscripción restaurada",
            "Tu suscripción ha sido restaurada exitosamente."
          );
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : "Failed to restore subscription", 
            isLoading: false 
          });
          
          Alert.alert(
            "Error",
            "No se pudo restaurar la suscripción. Por favor, inténtalo de nuevo."
          );
        }
      },
      
      checkSubscriptionStatus: async (userId?: string) => {
        const state = get();
        
        if (state.status === 'none') {
          return;
        }
        
        const now = new Date();
        
        if (state.status === 'trial' && state.trialEndDate) {
          const trialEnd = new Date(state.trialEndDate);
          if (now > trialEnd) {
            const { user } = require('./auth-store').useAuthStore.getState();
            if (user) {
              await state.processAutoRenewal(user.id);
            } else {
              set({ status: 'expired' });
            }
          }
        }
        
        if (state.status === 'active' && state.endDate) {
          const subscriptionEnd = new Date(state.endDate);
          if (now > subscriptionEnd) {
            const { user } = require('./auth-store').useAuthStore.getState();
            if (user) {
              await state.processAutoRenewal(user.id);
            } else {
              set({ status: 'expired' });
            }
          }
        }
      },
      
      checkWalletBalance: (userId: string) => {
        const balance = useTipsStore.getState().getUserBalance(userId);
        return balance >= SUBSCRIPTION_PRICE;
      },
      
      payFromWallet: async (userId: string, amount: number) => {
        try {
          const hasEnoughBalance = get().checkWalletBalance(userId);
          
          if (!hasEnoughBalance) {
            return false;
          }
          
          const success = await useTipsStore.getState().deductFromBalance(
            userId, 
            amount, 
            'subscription'
          );
          
          if (!success) {
            return false;
          }
          
          const now = new Date();
          const endDate = addDays(now, 30);
          
          set({
            status: 'active',
            startDate: now.toISOString(),
            endDate: endDate.toISOString(),
          });
          
          return true;
        } catch (error) {
          console.error('Error paying from wallet:', error);
          return false;
        }
      },

      processAutoRenewal: async (userId: string) => {
        const state = get();
        
        if (state.status !== 'expired' && state.status !== 'trial') {
          return false;
        }
        
        const hasEnoughBalance = state.checkWalletBalance(userId);
        
        if (!hasEnoughBalance) {
          set({ status: 'expired' });
          return false;
        }
        
        return await state.payFromWallet(userId, SUBSCRIPTION_PRICE);
      },
      
      showInsufficientFundsAlert: () => {
        if (Platform.OS !== 'web') {
          Alert.alert(
            "Saldo insuficiente",
            "Para activar o renovar tu suscripción necesitas al menos $4.99 en tu billetera. Por favor, deposita fondos para continuar.",
            [
              {
                text: "Cancelar",
                style: "cancel"
              },
              {
                text: "Depositar fondos",
                onPress: () => router.push('/deposit-methods')
              }
            ]
          );
        } else {
          console.log("Insufficient funds. Redirecting to deposit methods.");
          router.push('/deposit-methods');
        }
      },

      validatePromoCode: (userId: string, code: string) => {
        if (!PROMO_CODES[code as keyof typeof PROMO_CODES]) {
          return { valid: false, message: "Código inválido o ya utilizado." };
        }

        const usedCodes = get().usedPromoCodes[userId] || [];
        if (usedCodes.includes(code)) {
          return { valid: false, message: "Código inválido o ya utilizado." };
        }

        return { valid: true, message: "Código válido." };
      },

      applyPromoCode: async (userId: string, code: string) => {
        set({ isLoading: true });
        try {
          const validation = get().validatePromoCode(userId, code);
          
          if (!validation.valid) {
            set({ isLoading: false });
            return { success: false, message: validation.message };
          }

          // TODO: Replace with real API call to apply promo code
          // await apiClient.someEndpoint.applyPromoCode(userId, code);

          const promoDetails = PROMO_CODES[code as keyof typeof PROMO_CODES];
          
          const now = new Date();
          const endDate = addDays(now, promoDetails.days);

          set(state => ({
            status: 'active',
            startDate: now.toISOString(),
            endDate: endDate.toISOString(),
            usedPromoCodes: {
              ...state.usedPromoCodes,
              [userId]: [...(state.usedPromoCodes[userId] || []), code]
            },
            isLoading: false
          }));

          return { 
            success: true, 
            message: `¡Código promocional aplicado! Disfruta de ${promoDetails.description}.` 
          };
        } catch (error) {
          set({ isLoading: false });
          return { 
            success: false, 
            message: "Error al aplicar el código promocional. Inténtalo de nuevo." 
          };
        }
      }
    }),
    {
      name: 'subscription-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);