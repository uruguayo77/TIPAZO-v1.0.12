import { create } from 'zustand';
import { ActiveUser, UserActivity } from '@/types';
import apiClient from '@/lib/api';

interface ActiveUsersState {
  activeUsers: ActiveUser[];
  userActivities: UserActivity[];
  isLoading: boolean;
  error: string | null;
  lastUpdated: string | null;
  
  // Actions
  fetchActiveUsers: () => Promise<void>;
  fetchUserActivities: (userId?: string) => Promise<void>;
  updateUserActivity: (userId: string, action: string, details?: any) => Promise<void>;
  setUserOnlineStatus: (userId: string, isOnline: boolean) => void;
  refreshActiveUsers: () => Promise<void>;
  clearError: () => void;
}

export const useActiveUsersStore = create<ActiveUsersState>((set, get) => ({
  activeUsers: [],
  userActivities: [],
  isLoading: false,
  error: null,
  lastUpdated: null,
  
  fetchActiveUsers: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await apiClient.get('/admin/active-users');
      const { activeUsers } = response.data;
      
      set({ 
        activeUsers,
        isLoading: false,
        lastUpdated: new Date().toISOString()
      });
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || error.message || 'Failed to fetch active users';
      set({ 
        error: errorMessage,
        isLoading: false 
      });
      console.error('Error fetching active users:', errorMessage);
    }
  },
  
  fetchUserActivities: async (userId?: string) => {
    set({ isLoading: true, error: null });
    try {
      const url = userId ? `/admin/user-activities/${userId}` : '/admin/user-activities';
      const response = await apiClient.get(url);
      const { activities } = response.data;
      
      set({ 
        userActivities: activities,
        isLoading: false 
      });
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || error.message || 'Failed to fetch user activities';
      set({ 
        error: errorMessage,
        isLoading: false 
      });
      console.error('Error fetching user activities:', errorMessage);
    }
  },
  
  updateUserActivity: async (userId: string, action: string, details?: any) => {
    try {
      await apiClient.post('/admin/user-activity', {
        userId,
        action,
        details,
        timestamp: new Date().toISOString()
      });
      
      // Update local state
      const newActivity: UserActivity = {
        userId,
        action,
        timestamp: new Date().toISOString(),
        details
      };
      
      set((state) => ({
        userActivities: [newActivity, ...state.userActivities].slice(0, 100) // Keep last 100 activities
      }));
    } catch (error: any) {
      console.error('Error updating user activity:', error);
    }
  },
  
  setUserOnlineStatus: (userId: string, isOnline: boolean) => {
    set((state) => ({
      activeUsers: state.activeUsers.map(user => 
        user.id === userId 
          ? { ...user, isOnline, lastActivityAt: new Date().toISOString() }
          : user
      )
    }));
  },
  
  refreshActiveUsers: async () => {
    await get().fetchActiveUsers();
  },
  
  clearError: () => {
    set({ error: null });
  }
}));