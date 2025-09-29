import { supabase } from './supabase';
import { RealtimeChannel } from '@supabase/supabase-js';

// Real-time подписки для TIPAZO
export class TipazoRealtime {
  private channels: Map<string, RealtimeChannel> = new Map();

  // Подписка на новые чаевые для пользователя
  subscribeToUserTips(userId: string, callback: (payload: any) => void) {
    const channelName = `user_tips_${userId}`;
    
    if (this.channels.has(channelName)) {
      this.channels.get(channelName)?.unsubscribe();
    }

    const channel = supabase
      .channel(channelName)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'tipazo_tips',
          filter: `receiver_id=eq.${userId}`,
        },
        callback
      )
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'tipazo_tips',
          filter: `sender_id=eq.${userId}`,
        },
        callback
      )
      .subscribe();

    this.channels.set(channelName, channel);
    return channel;
  }

  // Подписка на транзакции пользователя
  subscribeToUserTransactions(userId: string, callback: (payload: any) => void) {
    const channelName = `user_transactions_${userId}`;
    
    if (this.channels.has(channelName)) {
      this.channels.get(channelName)?.unsubscribe();
    }

    const channel = supabase
      .channel(channelName)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'tipazo_transactions',
          filter: `user_id=eq.${userId}`,
        },
        callback
      )
      .subscribe();

    this.channels.set(channelName, channel);
    return channel;
  }

  // Подписка на комментарии для работника
  subscribeToWorkerComments(workerId: string, callback: (payload: any) => void) {
    const channelName = `worker_comments_${workerId}`;
    
    if (this.channels.has(channelName)) {
      this.channels.get(channelName)?.unsubscribe();
    }

    const channel = supabase
      .channel(channelName)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'tipazo_comments',
          filter: `worker_id=eq.${workerId}`,
        },
        callback
      )
      .subscribe();

    this.channels.set(channelName, channel);
    return channel;
  }

  // Подписка на обновления профиля работника
  subscribeToWorkerProfile(workerId: string, callback: (payload: any) => void) {
    const channelName = `worker_profile_${workerId}`;
    
    if (this.channels.has(channelName)) {
      this.channels.get(channelName)?.unsubscribe();
    }

    const channel = supabase
      .channel(channelName)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'tipazo_workers',
          filter: `user_id=eq.${workerId}`,
        },
        callback
      )
      .subscribe();

    this.channels.set(channelName, channel);
    return channel;
  }

  // Отписка от всех каналов
  unsubscribeAll() {
    this.channels.forEach((channel) => {
      channel.unsubscribe();
    });
    this.channels.clear();
  }

  // Отписка от конкретного канала
  unsubscribe(channelName: string) {
    const channel = this.channels.get(channelName);
    if (channel) {
      channel.unsubscribe();
      this.channels.delete(channelName);
    }
  }
}

// Экспорт singleton instance
export const tipazoRealtime = new TipazoRealtime();

