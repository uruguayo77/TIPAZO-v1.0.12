import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Tip, WithdrawalRequest, Comment } from '@/types';
import { supabase } from '@/lib/supabase';
import { generateId } from '@/utils/id';

interface TipsState {
  tips: Tip[];
  withdrawals: WithdrawalRequest[];
  deposits: Tip[];
  isLoading: boolean;
  error: string | null;
  
  // Actions
  fetchTips: (userId: string) => Promise<void>;
  fetchWithdrawals: (userId: string) => Promise<void>;
  sendTip: (senderId: string, receiverId: string, amount: number, comment?: string, rating?: number) => Promise<void>;
  requestWithdrawal: (userId: string, amount: number, destination: string, description?: string) => Promise<void>;
  getUserBalance: (userId: string) => number;
  getTotalReceivedTips: (userId: string) => number;
  getWorkerComments: (workerId: string) => Promise<Comment[]>;
  deductFromBalance: (userId: string, amount: number, reason: 'withdrawal' | 'subscription' | 'tip') => Promise<boolean>;
  addToBalance: (userId: string, amount: number, source: string, description?: string) => Promise<boolean>;
  syncTipsToTransactions: (userId: string) => Promise<void>;
}

export const useTipsStore = create<TipsState>()(
  // Temporarily disable persist to debug
  // persist(
    (set, get) => ({
      tips: [],
      withdrawals: [],
      deposits: [],
      isLoading: false,
      error: null,
      
      fetchTips: async (userId: string) => {
        set({ isLoading: true, error: null });
        try {
          // Fetch tips where user is sender or receiver
          const { data: tipsData, error: tipsError } = await supabase
            .from('tipazo_tips')
            .select('*')
            .or(`sender_id.eq.${userId},receiver_id.eq.${userId}`)
            .order('created_at', { ascending: false });
            
          console.log('Tips query result:', { tipsData, tipsError });

          if (tipsError) {
            throw new Error(tipsError.message);
          }

          // Fetch transactions for deposits
          const { data: transactionsData, error: transactionsError } = await supabase
            .from('tipazo_transactions')
            .select('*')
            .eq('user_id', userId)
            .in('type', ['deposit', 'tip_received'])
            .order('created_at', { ascending: false });

          if (transactionsError) {
            throw new Error(transactionsError.message);
          }

          // Transform tips data
          const tips: Tip[] = tipsData?.map(tip => ({
            id: tip.id,
            amount: tip.amount,
            senderId: tip.sender_id || '',
            receiverId: tip.receiver_id,
            senderName: tip.sender_name || 'Anonymous',
            receiverName: tip.receiver_name || 'Unknown',
            status: tip.status,
            createdAt: tip.created_at,
            completedAt: tip.completed_at,
            comment: tip.comment,
            rating: tip.rating,
          })) || [];
          
          console.log('Fetched tips from Supabase:', tips);
          console.log('Tips count:', tips.length);

          // Transform deposits data
          const deposits: Tip[] = transactionsData?.map(transaction => ({
            id: transaction.id,
            amount: transaction.amount,
            senderId: 'system',
            receiverId: transaction.user_id,
            senderName: 'System',
            receiverName: 'You',
            status: transaction.status,
            createdAt: transaction.created_at,
            completedAt: transaction.completed_at,
            comment: transaction.description || 'Deposit',
          })) || [];

          console.log('Setting tips in store:', tips);
          console.log('Setting deposits in store:', deposits);
          set({ tips, deposits, isLoading: false });
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : "Failed to fetch tips", 
            isLoading: false 
          });
        }
      },
      
      fetchWithdrawals: async (userId: string) => {
        set({ isLoading: true, error: null });
        try {
          // Fetch withdrawal transactions
          const { data: transactionsData, error: transactionsError } = await supabase
            .from('tipazo_transactions')
            .select('*')
            .eq('user_id', userId)
            .in('type', ['withdrawal', 'tip_sent'])
            .order('created_at', { ascending: false });

          if (transactionsError) {
            throw new Error(transactionsError.message);
          }

          // Transform to WithdrawalRequest format
          const withdrawals: WithdrawalRequest[] = transactionsData?.map(transaction => ({
            id: transaction.id,
            userId: transaction.user_id,
            amount: transaction.amount,
            status: transaction.status,
            createdAt: transaction.created_at,
            destination: transaction.destination || '',
            description: transaction.description || '',
          })) || [];

          set({ withdrawals, isLoading: false });
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : "Failed to fetch withdrawals", 
            isLoading: false 
          });
        }
      },
      
      getWorkerComments: async (workerId: string) => {
        try {
          const { data: commentsData, error: commentsError } = await supabase
            .from('tipazo_comments')
            .select('*')
            .eq('worker_id', workerId)
            .order('created_at', { ascending: false });

          if (commentsError) {
            throw new Error(commentsError.message);
          }

          // Transform to Comment format
          const comments: Comment[] = commentsData?.map(comment => ({
            id: comment.id,
            workerId: comment.worker_id,
            clientId: comment.client_id || '',
            clientName: comment.client_name || 'Anonymous',
            content: comment.content,
            rating: comment.rating,
            tipId: comment.tip_id || '',
            createdAt: comment.created_at,
            updatedAt: comment.updated_at,
          })) || [];

          return comments;
        } catch (error) {
          console.error('Error fetching worker comments:', error);
          return [];
        }
      },
      
      sendTip: async (senderId: string, receiverId: string, amount: number, comment?: string, rating?: number) => {
        console.log('sendTip called with:', { senderId, receiverId, amount, comment, rating });
        set({ isLoading: true, error: null });
        try {
          // Check if sender has enough balance
          const senderBalance = get().getUserBalance(senderId);
          
          if (senderBalance < amount) {
            throw new Error("Insufficient balance");
          }

          // Get sender and receiver names
          const { data: senderData } = await supabase
            .from('tipazo_users')
            .select('name')
            .eq('id', senderId)
            .single();

          const { data: receiverData } = await supabase
            .from('tipazo_users')
            .select('name')
            .eq('id', receiverId)
            .single();

          // Create tip in database
          const { data: tipData, error: tipError } = await supabase
            .from('tipazo_tips')
            .insert({
              amount,
              sender_id: senderId,
              receiver_id: receiverId,
              sender_name: senderData?.name || 'Anonymous',
              receiver_name: receiverData?.name || 'Unknown',
              status: 'completed',
              comment,
              rating,
              completed_at: new Date().toISOString(),
            })
            .select()
            .single();

          if (tipError) {
            throw new Error(tipError.message);
          }

          // Create transaction records
          console.log('Creating sender transaction for user:', senderId, 'amount:', amount);
          const { error: senderTransactionError } = await supabase
            .from('tipazo_transactions')
            .insert({
              user_id: senderId,
              amount,
              type: 'tip_sent',
              status: 'completed',
              description: `Tip sent to ${receiverData?.name || 'recipient'}`,
              destination: receiverId,
              completed_at: new Date().toISOString(),
            });

          if (senderTransactionError) {
            console.error('Error creating sender transaction:', senderTransactionError);
          } else {
            console.log('Sender transaction created successfully');
          }

          console.log('Creating receiver transaction for user:', receiverId, 'amount:', amount);
          const { error: receiverTransactionError } = await supabase
            .from('tipazo_transactions')
            .insert({
              user_id: receiverId,
              amount,
              type: 'tip_received',
              status: 'completed',
              description: `Tip received from ${senderData?.name || 'sender'}`,
              destination: senderId,
              completed_at: new Date().toISOString(),
            });

          if (receiverTransactionError) {
            console.error('Error creating receiver transaction:', receiverTransactionError);
          } else {
            console.log('Receiver transaction created successfully');
          }

          // Update worker's total earnings if receiver is a worker
          // First get current earnings, then update
          const { data: currentWorker, error: fetchError } = await supabase
            .from('tipazo_workers')
            .select('total_earnings')
            .eq('user_id', receiverId)
            .single();
            
          if (!fetchError && currentWorker) {
            const newTotalEarnings = (currentWorker.total_earnings || 0) + amount;
            const { error: earningsError } = await supabase
              .from('tipazo_workers')
              .update({ 
                total_earnings: newTotalEarnings,
                updated_at: new Date().toISOString()
              })
              .eq('user_id', receiverId);
              
            if (earningsError) {
              console.error('Error updating worker earnings:', earningsError);
            }
          }

          // Create comment if provided
          if (comment && rating) {
            await supabase
              .from('tipazo_comments')
              .insert({
                worker_id: receiverId,
                client_id: senderId,
                client_name: senderData?.name || 'Anonymous',
                content: comment,
                rating,
                tip_id: tipData.id,
              });
          }

          // Transform to our Tip format
          const newTip: Tip = {
            id: tipData.id,
            amount: tipData.amount,
            senderId: tipData.sender_id || '',
            receiverId: tipData.receiver_id,
            senderName: tipData.sender_name || 'Anonymous',
            receiverName: tipData.receiver_name || 'Unknown',
            status: tipData.status,
            createdAt: tipData.created_at,
            completedAt: tipData.completed_at,
            comment: tipData.comment,
            rating: tipData.rating,
          };
          
          set(state => ({
            tips: [...state.tips, newTip],
            isLoading: false,
          }));
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : "Failed to send tip", 
            isLoading: false 
          });
          throw error;
        }
      },
      
      requestWithdrawal: async (userId: string, amount: number, destination: string, description?: string) => {
        set({ isLoading: true, error: null });
        try {
          // Check if user has enough balance
          const userBalance = get().getUserBalance(userId);
          
          if (userBalance < amount) {
            throw new Error("Insufficient balance");
          }
          
          await apiClient.balances.createTransaction(userId, { amount, type: 'withdrawal' });
          
          // Create a new withdrawal request
          const newWithdrawal: WithdrawalRequest = {
            id: generateId(),
            userId,
            amount,
            status: 'pending',
            createdAt: new Date().toISOString(),
            destination,
            description,
          };
          
          // Deduct from user's balance
          await get().deductFromBalance(userId, amount, 'withdrawal');
          
          set(state => ({
            withdrawals: [...state.withdrawals, newWithdrawal],
            isLoading: false,
          }));
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : "Failed to request withdrawal", 
            isLoading: false 
          });
          throw error;
        }
      },
      
      getUserBalance: (userId: string) => {
        const { tips, withdrawals, deposits } = get();
        
        console.log('Calculating balance for user:', userId);
        console.log('Tips data:', tips);
        console.log('Deposits data:', deposits);
        console.log('Withdrawals data:', withdrawals);
        
        const totalTipsReceived = tips
          .filter(tip => tip.receiverId === userId && tip.status === 'completed')
          .reduce((sum, tip) => sum + tip.amount, 0);
        
        const totalTipsSent = tips
          .filter(tip => tip.senderId === userId && tip.status === 'completed')
          .reduce((sum, tip) => sum + tip.amount, 0);
        
        const totalDeposits = deposits
          .filter(deposit => deposit.receiverId === userId && deposit.status === 'completed')
          .reduce((sum, deposit) => sum + deposit.amount, 0);
        
        const totalWithdrawals = withdrawals
          .filter(withdrawal => 
            withdrawal.userId === userId && 
            (withdrawal.status === 'completed' || withdrawal.status === 'pending')
          )
          .reduce((sum, withdrawal) => sum + withdrawal.amount, 0);
        
        console.log('Balance calculation:', {
          totalTipsReceived,
          totalTipsSent,
          totalDeposits,
          totalWithdrawals,
          finalBalance: totalDeposits + totalTipsReceived - totalTipsSent - totalWithdrawals
        });
        
        // Include deposits in balance calculation
        const balance = totalDeposits + totalTipsReceived - totalTipsSent - totalWithdrawals;
        console.log('Final balance calculation:', balance);
        return balance;
      },
      
      getTotalReceivedTips: (userId: string) => {
        const { tips } = get();
        return tips
          .filter(tip => tip.receiverId === userId && tip.status === 'completed')
          .reduce((sum, tip) => sum + tip.amount, 0);
      },
      
      deductFromBalance: async (userId: string, amount: number, reason: 'withdrawal' | 'subscription' | 'tip') => {
        try {
          const userBalance = get().getUserBalance(userId);
          
          if (userBalance < amount) {
            return false;
          }
          
          let destination = 'wallet';
          let description = '';
          
          switch (reason) {
            case 'subscription':
              destination = 'subscription';
              description = 'Pago de suscripción TIPAZO Premium';
              break;
            case 'withdrawal':
              destination = 'wallet';
              description = 'Retiro a billetera';
              break;
            case 'tip':
              destination = 'tip';
              description = 'Envío de propina';
              break;
          }
          
          const newWithdrawal: WithdrawalRequest = {
            id: generateId(),
            userId,
            amount,
            status: 'completed',
            createdAt: new Date().toISOString(),
            destination,
            description
          };
          
          await apiClient.balances.createTransaction(userId, { amount, type: reason });
          
          set(state => ({
            withdrawals: [...state.withdrawals, newWithdrawal],
          }));
          
          return true;
        } catch (error) {
          console.error('Error deducting from balance:', error);
          return false;
        }
      },
      
      syncTipsToTransactions: async (userId: string) => {
        // DISABLED: This function was creating automatic transactions
        // console.log('Syncing tips to transactions for user:', userId);
        // Function disabled to prevent automatic transaction creation
        return;
      },
      
      addToBalance: async (userId: string, amount: number, source: string, description?: string) => {
        try {
          const newDeposit: Tip = {
            id: generateId(),
            amount,
            senderId: source,
            receiverId: userId,
            senderName: source === 'system' ? 'Sistema' : source,
            receiverName: 'You',
            status: 'completed',
            createdAt: new Date().toISOString(),
            comment: description || 'Depósito de fondos',
          };
          
          await apiClient.balances.createTransaction(userId, { amount, type: 'deposit' });
          
          set(state => ({
            deposits: [...state.deposits, newDeposit],
          }));
          
          // Check if user has expired subscription and enough balance to reactivate
          try {
            const { useSubscriptionStore } = await import('./subscription-store');
            const subscriptionStore = useSubscriptionStore.getState();
            
            if (subscriptionStore.status === 'expired') {
              const hasEnoughBalance = subscriptionStore.checkWalletBalance(userId);
              if (hasEnoughBalance) {
                // User added funds during grace period, reactivate subscription
                await subscriptionStore.checkGracePeriodExpiration(userId);
              }
            }
          } catch (error) {
            console.error('Error checking subscription after balance update:', error);
          }
          
          return true;
        } catch (error) {
          console.error('Error adding to balance:', error);
          return false;
        }
      }
    })
    // Temporarily disable persist to debug
    // }),
    // {
    //   name: 'tips-storage',
    //   storage: createJSONStorage(() => AsyncStorage),
    // }
  // )
);