import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Supabase конфигурация
const supabaseUrl = 'https://bcqhcmoxpzznvmzjdcrm.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJjcWhjbW94cHp6bnZtempkY3JtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcwMDkxNTIsImV4cCI6MjA3MjU4NTE1Mn0.h4bRUM1MHnQHh9WqBYTKVyyHp4N9tSn5LKAO7T_ihSE';

// Создание Supabase клиента
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

// Типы для базы данных
export type Database = {
  public: {
    Tables: {
      tipazo_users: {
        Row: {
          id: string;
          email: string;
          name: string;
          username: string | null;
          user_type: 'admin' | 'worker' | 'client';
          profile_picture: string | null;
          phone_number: string | null;
          biography: string | null;
          occupation: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          name: string;
          username?: string | null;
          user_type: 'admin' | 'worker' | 'client';
          profile_picture?: string | null;
          phone_number?: string | null;
          biography?: string | null;
          occupation?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          name?: string;
          username?: string | null;
          user_type?: 'admin' | 'worker' | 'client';
          profile_picture?: string | null;
          phone_number?: string | null;
          biography?: string | null;
          occupation?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      tipazo_workers: {
        Row: {
          id: string;
          user_id: string;
          total_earnings: number;
          qr_code: string | null;
          crypto_wallet: string | null;
          crypto_type: 'BTC' | 'ETH' | 'USDT' | 'USDC' | 'BNB' | 'XRP' | 'ADA' | 'SOL' | 'DOGE' | 'DOT' | null;
          bank_account: any | null;
          payment_qr_url: string | null;
          wallet_address: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          total_earnings?: number;
          qr_code?: string | null;
          crypto_wallet?: string | null;
          crypto_type?: 'BTC' | 'ETH' | 'USDT' | 'USDC' | 'BNB' | 'XRP' | 'ADA' | 'SOL' | 'DOGE' | 'DOT' | null;
          bank_account?: any | null;
          payment_qr_url?: string | null;
          wallet_address?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          total_earnings?: number;
          qr_code?: string | null;
          crypto_wallet?: string | null;
          crypto_type?: 'BTC' | 'ETH' | 'USDT' | 'USDC' | 'BNB' | 'XRP' | 'ADA' | 'SOL' | 'DOGE' | 'DOT' | null;
          bank_account?: any | null;
          payment_qr_url?: string | null;
          wallet_address?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      tipazo_tips: {
        Row: {
          id: string;
          amount: number;
          sender_id: string | null;
          receiver_id: string;
          sender_name: string | null;
          receiver_name: string | null;
          status: 'pending' | 'completed' | 'failed';
          comment: string | null;
          rating: number | null;
          created_at: string;
          completed_at: string | null;
        };
        Insert: {
          id?: string;
          amount: number;
          sender_id?: string | null;
          receiver_id: string;
          sender_name?: string | null;
          receiver_name?: string | null;
          status?: 'pending' | 'completed' | 'failed';
          comment?: string | null;
          rating?: number | null;
          created_at?: string;
          completed_at?: string | null;
        };
        Update: {
          id?: string;
          amount?: number;
          sender_id?: string | null;
          receiver_id?: string;
          sender_name?: string | null;
          receiver_name?: string | null;
          status?: 'pending' | 'completed' | 'failed';
          comment?: string | null;
          rating?: number | null;
          created_at?: string;
          completed_at?: string | null;
        };
      };
      tipazo_transactions: {
        Row: {
          id: string;
          user_id: string;
          amount: number;
          type: 'deposit' | 'withdrawal' | 'tip_sent' | 'tip_received' | 'subscription';
          status: 'pending' | 'completed' | 'failed';
          description: string | null;
          destination: string | null;
          destination_details: any | null;
          created_at: string;
          completed_at: string | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          amount: number;
          type: 'deposit' | 'withdrawal' | 'tip_sent' | 'tip_received' | 'subscription';
          status?: 'pending' | 'completed' | 'failed';
          description?: string | null;
          destination?: string | null;
          destination_details?: any | null;
          created_at?: string;
          completed_at?: string | null;
        };
        Update: {
          id?: string;
          user_id?: string;
          amount?: number;
          type?: 'deposit' | 'withdrawal' | 'tip_sent' | 'tip_received' | 'subscription';
          status?: 'pending' | 'completed' | 'failed';
          description?: string | null;
          destination?: string | null;
          destination_details?: any | null;
          created_at?: string;
          completed_at?: string | null;
        };
      };
      tipazo_goals: {
        Row: {
          id: string;
          user_id: string;
          goal_description: string;
          goal_amount: number;
          goal_accumulated: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          goal_description: string;
          goal_amount: number;
          goal_accumulated?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          goal_description?: string;
          goal_amount?: number;
          goal_accumulated?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      tipazo_subscriptions: {
        Row: {
          id: string;
          user_id: string;
          status: 'none' | 'trial' | 'active' | 'expired';
          start_date: string | null;
          end_date: string | null;
          trial_end_date: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          status?: 'none' | 'trial' | 'active' | 'expired';
          start_date?: string | null;
          end_date?: string | null;
          trial_end_date?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          status?: 'none' | 'trial' | 'active' | 'expired';
          start_date?: string | null;
          end_date?: string | null;
          trial_end_date?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      tipazo_payment_methods: {
        Row: {
          id: string;
          user_id: string;
          type: 'card' | 'bank' | 'crypto';
          is_default: boolean;
          details: any;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          type: 'card' | 'bank' | 'crypto';
          is_default?: boolean;
          details: any;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          type?: 'card' | 'bank' | 'crypto';
          is_default?: boolean;
          details?: any;
          created_at?: string;
          updated_at?: string;
        };
      };
      tipazo_comments: {
        Row: {
          id: string;
          worker_id: string;
          client_id: string | null;
          client_name: string | null;
          content: string;
          rating: number;
          tip_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          worker_id: string;
          client_id?: string | null;
          client_name?: string | null;
          content: string;
          rating: number;
          tip_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          worker_id?: string;
          client_id?: string | null;
          client_name?: string | null;
          content?: string;
          rating?: number;
          tip_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
};

