import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert, Platform } from 'react-native';
import { useTipsStore } from './tips-store';
import { router } from 'expo-router';
import { apiClient } from '@/lib/api-client';
import { supabase } from '@/lib/supabase';

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
  syncExistingData: (userId: string) => Promise<void>;
  forceSyncToSupabase: (userId: string) => Promise<void>;
  checkWalletBalance: (userId: string) => boolean;
  payFromWallet: (userId: string, amount: number) => Promise<boolean>;
  processAutoRenewal: (userId: string) => Promise<boolean>;
  checkAndProcessAutoRenewal: (userId: string) => Promise<void>;
  handleInsufficientFunds: (userId: string) => Promise<void>;
  checkGracePeriodExpiration: (userId: string) => Promise<void>;
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
          const { user } = require('./auth-store').useAuthStore.getState();
          
          if (!user) {
            throw new Error("User not authenticated");
          }
          
          const now = new Date();
          const trialEndDate = addDays(now, TRIAL_DAYS);
          
          // Save trial to Supabase
          const { error: insertError } = await supabase
            .from('tipazo_subscriptions')
            .upsert({
              user_id: user.id,
              status: 'trial',
              start_date: now.toISOString(),
              trial_end_date: trialEndDate.toISOString(),
              updated_at: now.toISOString()
            });
          
          if (insertError) {
            throw new Error(`Failed to save trial: ${insertError.message}`);
          }
          
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
            throw new Error("Insufficient balance");
          }
          
          const paymentSuccess = await get().payFromWallet(user.id, SUBSCRIPTION_PRICE);
          
          if (!paymentSuccess) {
            throw new Error("Payment failed");
          }
          
          const now = new Date();
          const endDate = addDays(now, 30);
          
          // Save subscription to Supabase
          const { error: insertError } = await supabase
            .from('tipazo_subscriptions')
            .upsert({
              user_id: user.id,
              status: 'active',
              start_date: now.toISOString(),
              end_date: endDate.toISOString(),
              updated_at: now.toISOString()
            });
          
          if (insertError) {
            throw new Error(`Failed to save subscription: ${insertError.message}`);
          }
          
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
          const { user } = require('./auth-store').useAuthStore.getState();
          
          if (!user) {
            throw new Error("User not authenticated");
          }
          
          // Update subscription status in Supabase
          const { error: updateError } = await supabase
            .from('tipazo_subscriptions')
            .update({
              status: 'expired',
              updated_at: new Date().toISOString()
            })
            .eq('user_id', user.id);
          
          if (updateError) {
            throw new Error(`Failed to cancel subscription: ${updateError.message}`);
          }
          
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
            throw new Error("Insufficient balance");
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
        try {
          const { user } = require('./auth-store').useAuthStore.getState();
          const currentUserId = userId || user?.id;
          
          if (!currentUserId) {
            return;
          }
          
          // Load subscription status from Supabase
          const { data: subscriptions, error } = await supabase
            .from('tipazo_subscriptions')
            .select('*')
            .eq('user_id', currentUserId)
            .order('created_at', { ascending: false });
          
          console.log('Loaded subscriptions from Supabase:', subscriptions);
          
          if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
            console.error('Error loading subscription:', error);
            return;
          }
          
          const subscription = subscriptions?.[0]; // Get the most recent one
          
          if (subscription) {
            const now = new Date();
            
            // Check if trial has expired
            if (subscription.status === 'trial' && subscription.trial_end_date) {
              const trialEnd = new Date(subscription.trial_end_date);
              if (now > trialEnd) {
                // Update status to expired in Supabase
                await supabase
                  .from('tipazo_subscriptions')
                  .update({
                    status: 'expired',
                    updated_at: now.toISOString()
                  })
                  .eq('user_id', currentUserId);
                
                set({ status: 'expired' });
                return;
              }
            }
            
            // Check if active subscription has expired
            if (subscription.status === 'active' && subscription.end_date) {
              const subscriptionEnd = new Date(subscription.end_date);
              if (now > subscriptionEnd) {
                // Update status to expired in Supabase
                await supabase
                  .from('tipazo_subscriptions')
                  .update({
                    status: 'expired',
                    updated_at: now.toISOString()
                  })
                  .eq('user_id', currentUserId);
                
                set({ status: 'expired' });
                return;
              }
            }
            
            // Update local state with data from Supabase
            set({
              status: subscription.status as SubscriptionStatus,
              startDate: subscription.start_date,
              endDate: subscription.end_date,
              trialEndDate: subscription.trial_end_date,
            });
          }
        } catch (error) {
          console.error('Error checking subscription status:', error);
        }
      },
      
      syncExistingData: async (userId: string) => {
        try {
          const state = get();
          
          console.log('Syncing existing data for user:', userId);
          console.log('Current subscription status:', state.status);
          console.log('Current trial end date:', state.trialEndDate);
          console.log('Current start date:', state.startDate);
          console.log('Current end date:', state.endDate);
          
          // Check if user is authenticated in Supabase
          const { data: { user: supabaseUser } } = await supabase.auth.getUser();
          console.log('Supabase user:', supabaseUser?.id);
          
          if (!supabaseUser) {
            console.log('User not authenticated in Supabase');
            return;
          }
          
          // Only sync if we have subscription data locally but not in Supabase
          if (state.status === 'none') {
            console.log('No subscription data to sync');
            return;
          }
          
          // Check if subscription already exists in Supabase
          const { data: existingSubscription, error: selectError } = await supabase
            .from('tipazo_subscriptions')
            .select('id')
            .eq('user_id', userId)
            .single();
          
          console.log('Existing subscription check:', existingSubscription, selectError);
          
          if (existingSubscription) {
            // Data already exists in Supabase, load it instead
            console.log('Subscription already exists in Supabase, loading...');
            await get().checkSubscriptionStatus(userId);
            return;
          }
          
          // Sync local data to Supabase
          const subscriptionData: any = {
            user_id: userId,
            status: state.status,
            updated_at: new Date().toISOString()
          };
          
          if (state.startDate) {
            subscriptionData.start_date = state.startDate;
          }
          
          if (state.endDate) {
            subscriptionData.end_date = state.endDate;
          }
          
          if (state.trialEndDate) {
            subscriptionData.trial_end_date = state.trialEndDate;
          }
          
          const { error } = await supabase
            .from('tipazo_subscriptions')
            .insert(subscriptionData);
          
          if (error) {
            console.error('Error syncing subscription data:', error);
          } else {
            console.log('Subscription data synced to Supabase successfully');
          }
        } catch (error) {
          console.error('Error in syncExistingData:', error);
        }
      },
      
      forceSyncToSupabase: async (userId: string) => {
        try {
          const state = get();
          
          console.log('Force syncing to Supabase for user:', userId);
          console.log('Current status:', state.status);
          
          if (state.status === 'none') {
            console.log('No data to sync');
            return;
          }
          
          // Force insert/update subscription data
          const subscriptionData: any = {
            user_id: userId,
            status: state.status,
            updated_at: new Date().toISOString()
          };
          
          if (state.startDate) {
            subscriptionData.start_date = state.startDate;
          }
          
          if (state.endDate) {
            subscriptionData.end_date = state.endDate;
          }
          
          if (state.trialEndDate) {
            subscriptionData.trial_end_date = state.trialEndDate;
          }
          
          console.log('Syncing data:', subscriptionData);
          
          // Use upsert to handle both insert and update
          const { error } = await supabase
            .from('tipazo_subscriptions')
            .upsert(subscriptionData, { 
              onConflict: 'user_id',
              ignoreDuplicates: false 
            });
          
          if (error) {
            console.error('Error force syncing:', error);
          } else {
            console.log('Force sync successful!');
          }
        } catch (error) {
          console.error('Error in forceSyncToSupabase:', error);
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
        
        // Only process auto-renewal for active subscriptions that are about to expire
        if (state.status !== 'active') {
          return false;
        }
        
        const hasEnoughBalance = state.checkWalletBalance(userId);
        
        if (!hasEnoughBalance) {
          // Start 48-hour grace period
          await get().handleInsufficientFunds(userId);
          return false;
        }
        
        // Process payment and extend subscription
        const paymentSuccess = await state.payFromWallet(userId, SUBSCRIPTION_PRICE);
        
        if (paymentSuccess) {
          const now = new Date();
          const newEndDate = addDays(now, 30);
          
          // Update subscription in Supabase
          const { error } = await supabase
            .from('tipazo_subscriptions')
            .update({
              end_date: newEndDate.toISOString(),
              updated_at: now.toISOString()
            })
            .eq('user_id', userId);
          
          if (!error) {
            set({
              endDate: newEndDate.toISOString(),
            });
          }
          
          return true;
        }
        
        return false;
      },
      
      checkAndProcessAutoRenewal: async (userId: string) => {
        try {
          const state = get();
          
          if (state.status !== 'active' || !state.endDate) {
            return;
          }
          
          const now = new Date();
          const subscriptionEnd = new Date(state.endDate);
          
          // Check if subscription expires within 24 hours
          const hoursUntilExpiry = (subscriptionEnd.getTime() - now.getTime()) / (1000 * 60 * 60);
          
          if (hoursUntilExpiry <= 24 && hoursUntilExpiry > 0) {
            console.log('Subscription expires soon, processing auto-renewal...');
            await get().processAutoRenewal(userId);
          }
        } catch (error) {
          console.error('Error in checkAndProcessAutoRenewal:', error);
        }
      },
      
      handleInsufficientFunds: async (userId: string) => {
        try {
          const now = new Date();
          const gracePeriodEnd = new Date();
          gracePeriodEnd.setHours(gracePeriodEnd.getHours() + 48);
          
          const { error } = await supabase
            .from('tipazo_subscriptions')
            .update({
              status: 'expired',
              grace_period_started: now.toISOString(),
              grace_period_end: gracePeriodEnd.toISOString(),
              updated_at: now.toISOString(),
            })
            .eq('user_id', userId);
          
          if (!error) {
            set({ status: 'expired' });
            
            // Schedule check for grace period expiration
            setTimeout(async () => {
              await get().checkGracePeriodExpiration(userId);
            }, 48 * 60 * 60 * 1000); // 48 hours
            
            console.log('Grace period started for user:', userId);
          }
        } catch (error) {
          console.error('Error handling insufficient funds:', error);
        }
      },
      
      checkGracePeriodExpiration: async (userId: string) => {
        try {
          // Check if user has added funds during grace period
          const hasEnoughBalance = get().checkWalletBalance(userId);
          
          if (hasEnoughBalance) {
            // User added funds, reactivate subscription
            const now = new Date();
            const newEndDate = addDays(now, 30);
            
            const { error } = await supabase
              .from('tipazo_subscriptions')
              .update({
                status: 'active',
                end_date: newEndDate.toISOString(),
                grace_period_started: null,
                grace_period_end: null,
                updated_at: now.toISOString()
              })
              .eq('user_id', userId);
            
            if (!error) {
              set({
                status: 'active',
                endDate: newEndDate.toISOString(),
              });
            }
          } else {
            // Grace period expired, subscription remains cancelled
            console.log('Grace period expired, subscription cancelled');
          }
        } catch (error) {
          console.error('Error checking grace period expiration:', error);
        }
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