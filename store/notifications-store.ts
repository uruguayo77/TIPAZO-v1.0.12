import { create } from 'zustand';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'system' | 'tip' | 'payment' | 'general' | 'welcome' | 'withdrawal' | 'rating' | 'review';
  subtype?: 'pago-movil' | 'card' | 'crypto' | 'received' | 'sent' | 'failed';
  isRead: boolean;
  createdAt: Date;
}

interface NotificationsStore {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notification: Omit<Notification, 'id' | 'isRead' | 'createdAt'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  getUnreadCount: () => number;
  clearAllNotifications: () => void;
}

export const useNotificationsStore = create<NotificationsStore>((set, get) => ({
  notifications: [],
  unreadCount: 0,

  addNotification: (notification) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      isRead: false,
      createdAt: new Date(),
    };

    set((state) => ({
      notifications: [newNotification, ...state.notifications],
      unreadCount: state.unreadCount + 1,
    }));
  },

  markAsRead: (id) => {
    set((state) => ({
      notifications: state.notifications.map((notification) =>
        notification.id === id ? { ...notification, isRead: true } : notification
      ),
      unreadCount: Math.max(0, state.unreadCount - 1),
    }));
  },

  markAllAsRead: () => {
    set((state) => ({
      notifications: state.notifications.map((notification) => ({
        ...notification,
        isRead: true,
      })),
      unreadCount: 0,
    }));
  },

  getUnreadCount: () => {
    const { notifications } = get();
    return notifications.filter((notification) => !notification.isRead).length;
  },

  clearAllNotifications: () => {
    set({
      notifications: [],
      unreadCount: 0,
    });
  },
}));
