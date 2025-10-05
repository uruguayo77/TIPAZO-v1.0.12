import { create } from 'zustand';
import { apiService } from '@/lib/api';

interface Goal {
  id: string;
  purpose: string;
  goal: number;
  progress: number;
  createdAt: string;
  updatedAt: string;
}

interface GoalState {
  isLoading: boolean;
  error: string | null;
  
  // Actions
  getMyGoal: () => Promise<{ goal: Goal | null }>;
  updateMyGoal: (purpose: string, goal: number) => Promise<void>;
  deleteMyGoal: () => Promise<void>;
  getUserGoal: (userId: string) => Promise<{ goal: Goal | null }>;
  updateUserGoal: (userId: string, purpose: string, goal: number) => Promise<void>;
  deleteUserGoal: (userId: string) => Promise<void>;
}

export const useGoalStore = create<GoalState>((set, get) => ({
  isLoading: false,
  error: null,
  
  getMyGoal: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await apiService.getMyGoal();
      set({ isLoading: false });
      return response;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to fetch goal";
      set({ 
        error: errorMessage, 
        isLoading: false 
      });
      throw error;
    }
  },
  
  updateMyGoal: async (purpose: string, goal: number) => {
    set({ isLoading: true, error: null });
    try {
      await apiService.updateMyGoal({ purpose, goal });
      set({ isLoading: false });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to update goal";
      set({ 
        error: errorMessage, 
        isLoading: false 
      });
      throw error;
    }
  },
  
  deleteMyGoal: async () => {
    set({ isLoading: true, error: null });
    try {
      await apiService.deleteMyGoal();
      set({ isLoading: false });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to delete goal";
      set({ 
        error: errorMessage, 
        isLoading: false 
      });
      throw error;
    }
  },
  
  getUserGoal: async (userId: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await apiService.getUserGoal(userId);
      set({ isLoading: false });
      return response;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to fetch user goal";
      set({ 
        error: errorMessage, 
        isLoading: false 
      });
      throw error;
    }
  },
  
  updateUserGoal: async (userId: string, purpose: string, goal: number) => {
    set({ isLoading: true, error: null });
    try {
      await apiService.updateUserGoal(userId, { purpose, goal });
      set({ isLoading: false });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to update user goal";
      set({ 
        error: errorMessage, 
        isLoading: false 
      });
      throw error;
    }
  },
  
  deleteUserGoal: async (userId: string) => {
    set({ isLoading: true, error: null });
    try {
      await apiService.deleteUserGoal(userId);
      set({ isLoading: false });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to delete user goal";
      set({ 
        error: errorMessage, 
        isLoading: false 
      });
      throw error;
    }
  }
}));