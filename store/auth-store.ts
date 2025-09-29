import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User, Worker, CryptoCurrency } from '@/types';
import { useSubscriptionStore } from './subscription-store';
import { supabase } from '@/lib/supabase';
import type { Database } from '@/lib/supabase';

interface CedulaEditHistory {
  editCount: number;
  lastEditDate: string | null;
}

interface AuthState {
  user: User | Worker | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  rememberSession: boolean;
  cedulaEditHistory: CedulaEditHistory | null;
  login: (email: string, password: string, rememberMe?: boolean) => Promise<void>;
  register: (userData: Partial<Worker>, password: string) => Promise<void>;
  logout: () => void;
  updateProfile: (userData: Partial<Worker> & { 
    cryptoType?: CryptoCurrency;
    bankName?: string;
    cedula?: string;
    phoneNumber?: string;
    paymentQrUrl?: string;
    cryptoWallet?: string;
    accountNumber?: string;
    username?: string;
    biography?: string;
    goalDescription?: string;
    goalAmount?: number;
  }) => Promise<void>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<void>;
  updateCedulaEditHistory: () => void;
  updateGoalProgress: (amount: number) => void;
  initializeAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      rememberSession: false,
      cedulaEditHistory: {
        editCount: 0,
        lastEditDate: null
      },
      
      initializeAuth: async () => {
        try {
          // Check if user is already logged in
          const { data: { session } } = await supabase.auth.getSession();
          
          if (session?.user) {
            // User is already logged in, fetch their data
            const { data: userData, error: userError } = await supabase
              .from('tipazo_users')
              .select(`
                *,
                tipazo_workers(*)
              `)
              .eq('id', session.user.id)
              .single();

            if (!userError && userData) {
              // Get worker data if user is a worker
              let workerData = null;
              if (userData.user_type === 'worker') {
                const { data: worker, error: workerError } = await supabase
                  .from('tipazo_workers')
                  .select('*')
                  .eq('user_id', userData.id)
                  .single();

                if (!workerError && worker) {
                  workerData = worker;
                }
              }

              // Get goal data
              const { data: goalData } = await supabase
                .from('tipazo_goals')
                .select('*')
                .eq('user_id', userData.id)
                .single();

              // Transform to our User/Worker interface
              const user: User | Worker = {
                id: userData.id,
                name: userData.name,
                email: userData.email,
                userType: userData.user_type as 'admin' | 'worker' | 'client',
                createdAt: userData.created_at,
                updatedAt: userData.updated_at,
                profilePicture: userData.profile_picture,
                username: userData.username,
                ...(userData.user_type === 'worker' && workerData ? {
                  userType: 'worker' as const,
                  totalEarnings: workerData.total_earnings,
                  qrCode: workerData.qr_code || '',
                  cryptoWallet: workerData.crypto_wallet || '',
                  cryptoType: workerData.crypto_type,
                  phoneNumber: userData.phone_number || '',
                  bankAccount: workerData.bank_account || {
                    bankName: '',
                    routingNumber: '',
                    accountNumber: '',
                  },
                  paymentQrUrl: workerData.payment_qr_url,
                  biography: userData.biography || '',
                  occupation: userData.occupation || '',
                  walletAddress: workerData.wallet_address,
                  goalDescription: goalData?.goal_description || '',
                  goalAmount: goalData?.goal_amount || 0,
                  goalAccumulated: goalData?.goal_accumulated || 0,
                } : {})
              };

              set({ 
                user, 
                isAuthenticated: true,
                rememberSession: true
              });
            }
          }
        } catch (error) {
          console.error('Auth initialization error:', error);
        }
      },
      
      login: async (email: string, password: string, rememberMe = false) => {
        set({ isLoading: true, error: null });
        try {
          // Supabase Auth login
          const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
            email,
            password,
          });

          if (authError) {
            throw new Error(authError.message);
          }

          if (!authData.user) {
            throw new Error('No user data returned');
          }

          // Get user profile from our custom table
          const { data: userData, error: userError } = await supabase
            .from('tipazo_users')
            .select(`
              *,
              tipazo_workers(*)
            `)
            .eq('id', authData.user.id)
            .single();

          if (userError) {
            throw new Error('Failed to fetch user profile');
          }

          // Get worker data if user is a worker
          let workerData = null;
          if (userData.user_type === 'worker') {
            const { data: worker, error: workerError } = await supabase
              .from('tipazo_workers')
              .select('*')
              .eq('user_id', userData.id)
              .single();

            if (!workerError && worker) {
              workerData = worker;
            }
          }

          // Get goal data
          const { data: goalData } = await supabase
            .from('tipazo_goals')
            .select('*')
            .eq('user_id', userData.id)
            .single();

          // Transform to our User/Worker interface
          const user: User | Worker = {
            id: userData.id,
            name: userData.name,
            email: userData.email,
            userType: userData.user_type as 'admin' | 'worker' | 'client',
            createdAt: userData.created_at,
            updatedAt: userData.updated_at,
            profilePicture: userData.profile_picture,
            username: userData.username,
            ...(userData.user_type === 'worker' && workerData ? {
              userType: 'worker' as const,
              totalEarnings: workerData.total_earnings,
              qrCode: workerData.qr_code || '',
              cryptoWallet: workerData.crypto_wallet || '',
              cryptoType: workerData.crypto_type,
              phoneNumber: userData.phone_number || '',
              bankAccount: workerData.bank_account || {
                bankName: '',
                routingNumber: '',
                accountNumber: '',
              },
              paymentQrUrl: workerData.payment_qr_url,
              biography: userData.biography || '',
              occupation: userData.occupation || '',
              walletAddress: workerData.wallet_address,
              goalDescription: goalData?.goal_description || '',
              goalAmount: goalData?.goal_amount || 0,
              goalAccumulated: goalData?.goal_accumulated || 0,
            } : {})
          };
          
          set({ 
            user, 
            isAuthenticated: true, 
            isLoading: false,
            rememberSession: rememberMe,
            cedulaEditHistory: {
              editCount: 0,
              lastEditDate: null
            }
          });
          
          // Set legacy user flag based on account creation date
          useSubscriptionStore.setState({ isLegacyUser: false });
        } catch (error) {
          console.error('Login error details:', error);
          set({ 
            error: error instanceof Error ? error.message : "Login failed", 
            isLoading: false 
          });
        }
      },
      
      register: async (userData: Partial<Worker>, password: string) => {
        set({ isLoading: true, error: null });
        try {
          // Supabase Auth registration
          const { data: authData, error: authError } = await supabase.auth.signUp({
            email: userData.email!,
            password,
          });

          if (authError) {
            throw new Error(authError.message);
          }

          if (!authData.user) {
            throw new Error('No user data returned');
          }

          // Create user profile in our custom table
          const { data: userProfile, error: profileError } = await supabase
            .from('tipazo_users')
            .insert({
              id: authData.user.id,
              email: userData.email!,
              name: userData.name || '',
              username: userData.username,
              user_type: 'worker',
              phone_number: userData.phoneNumber,
              biography: userData.biography,
              occupation: userData.occupation,
            })
            .select()
            .single();

          if (profileError) {
            throw new Error('Failed to create user profile');
          }

          // Create worker profile
          const { data: workerProfile, error: workerError } = await supabase
            .from('tipazo_workers')
            .insert({
              user_id: authData.user.id,
              total_earnings: 0,
              qr_code: '',
              crypto_wallet: userData.cryptoWallet || '',
              crypto_type: userData.cryptoType,
              bank_account: userData.bankAccount || {
                bankName: '',
                routingNumber: '',
                accountNumber: '',
              },
              payment_qr_url: userData.paymentQrUrl,
              wallet_address: userData.walletAddress,
            })
            .select()
            .single();

          if (workerError) {
            console.warn('Failed to create worker profile:', workerError);
          }

          // Create goal if provided
          if (userData.goalDescription && userData.goalAmount) {
            await supabase
              .from('tipazo_goals')
              .insert({
                user_id: authData.user.id,
                goal_description: userData.goalDescription,
                goal_amount: userData.goalAmount,
                goal_accumulated: 0,
              });
          }

          // Transform to our Worker interface
          const user: Worker = {
            id: userProfile.id,
            name: userProfile.name,
            email: userProfile.email,
            username: userProfile.username,
            userType: 'worker',
            createdAt: userProfile.created_at,
            updatedAt: userProfile.updated_at,
            profilePicture: userProfile.profile_picture,
            phoneNumber: userProfile.phone_number || '',
            biography: userProfile.biography || '',
            occupation: userProfile.occupation || '',
            totalEarnings: workerProfile?.total_earnings || 0,
            qrCode: workerProfile?.qr_code || '',
            cryptoWallet: workerProfile?.crypto_wallet || '',
            cryptoType: workerProfile?.crypto_type,
            bankAccount: workerProfile?.bank_account || {
              bankName: '',
              routingNumber: '',
              accountNumber: '',
            },
            paymentQrUrl: workerProfile?.payment_qr_url,
            walletAddress: workerProfile?.wallet_address,
            goalDescription: userData.goalDescription || '',
            goalAmount: userData.goalAmount || 0,
            goalAccumulated: 0,
          };
          
          set({ 
            user, 
            isAuthenticated: true, 
            isLoading: false,
            cedulaEditHistory: {
              editCount: 0,
              lastEditDate: null
            }
          });
          
          useSubscriptionStore.setState({ isLegacyUser: false });
        } catch (error) {
          console.error('Registration error details:', error);
          set({ 
            error: error instanceof Error ? error.message : "Registration failed", 
            isLoading: false 
          });
        }
      },
      
      logout: async () => {
        try {
          // Sign out from Supabase
          await supabase.auth.signOut();
        } catch (error) {
          console.error('Logout error:', error);
        }
        
        set({ 
          user: null, 
          isAuthenticated: false,
          rememberSession: false 
        });
      },
      
      updateProfile: async (userData: Partial<Worker> & { 
        cryptoType?: CryptoCurrency;
        bankName?: string;
        cedula?: string;
        phoneNumber?: string;
        paymentQrUrl?: string;
        cryptoWallet?: string;
        accountNumber?: string;
        username?: string;
        biography?: string;
        goalDescription?: string;
        goalAmount?: number;
      }) => {
        set({ isLoading: true, error: null });
        try {
          // Mock profile update without backend call
          set((state) => {
            if (!state.user) return { isLoading: false };
            
            const updatedUser = { ...state.user, ...userData };
            
            if (userData.bankName || userData.cedula || userData.accountNumber) {
              updatedUser.bankAccount = {
                ...(updatedUser.bankAccount || {}),
                bankName: userData.bankName || updatedUser.bankAccount?.bankName || '',
                routingNumber: userData.cedula || updatedUser.bankAccount?.routingNumber || '',
                accountNumber: userData.accountNumber || updatedUser.bankAccount?.accountNumber || '',
              };
            }
            
            if (userData.phoneNumber) {
              updatedUser.phoneNumber = userData.phoneNumber;
            }
            
            if (userData.cryptoWallet) {
              updatedUser.cryptoWallet = userData.cryptoWallet;
            }
            
            if (userData.cryptoType) {
              updatedUser.cryptoType = userData.cryptoType;
            }
            
            if (userData.paymentQrUrl) {
              updatedUser.paymentQrUrl = userData.paymentQrUrl;
            }
            
            if (userData.username) {
              updatedUser.username = userData.username;
            }
            
            if (userData.biography !== undefined) {
              updatedUser.biography = userData.biography;
            }
            
            if (userData.goalDescription !== undefined) {
              updatedUser.goalDescription = userData.goalDescription;
            }
            
            if (userData.goalAmount !== undefined) {
              updatedUser.goalAmount = userData.goalAmount;
            }
            
            return {
              user: updatedUser,
              isLoading: false
            };
          });
        } catch (error) {
          console.error('Profile update error details:', error);
          set({ 
            error: error instanceof Error ? error.message : "Profile update failed", 
            isLoading: false 
          });
        }
      },
      
      changePassword: async (currentPassword: string, newPassword: string) => {
        set({ isLoading: true, error: null });
        try {
          // Mock password change without backend call
          // In a real app, this would validate the current password and update it
          
          // Simulate API delay
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // Mock validation - in real app, this would be done on the server
          if (currentPassword.length < 6) {
            throw new Error("Contraseña actual incorrecta");
          }
          
          if (newPassword.length < 8) {
            throw new Error("La nueva contraseña debe tener al menos 8 caracteres");
          }
          
          // In a real app, you would send the password change request to the server
          // For now, we just simulate success
          set({ isLoading: false });
          
        } catch (error) {
          console.error('Password change error details:', error);
          set({ 
            error: error instanceof Error ? error.message : "Password change failed", 
            isLoading: false 
          });
          throw error;
        }
      },
      
      updateCedulaEditHistory: () => {
        set((state) => {
          if (!state.cedulaEditHistory) {
            return {
              cedulaEditHistory: {
                editCount: 1,
                lastEditDate: new Date().toISOString()
              }
            };
          }
          
          return {
            cedulaEditHistory: {
              editCount: state.cedulaEditHistory.editCount + 1,
              lastEditDate: new Date().toISOString()
            }
          };
        });
      },
      
      updateGoalProgress: (amount: number) => {
        set((state) => {
          if (!state.user || state.user.userType !== 'worker') return state;
          
          const worker = state.user as Worker;
          const currentAccumulated = worker.goalAccumulated || 0;
          const newAccumulated = currentAccumulated + amount;
          
          const updatedUser = {
            ...worker,
            goalAccumulated: newAccumulated
          };
          
          return {
            user: updatedUser
          };
        });
      }
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);