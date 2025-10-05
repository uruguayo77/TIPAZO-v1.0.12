import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface TipFlowState {
  tipAmount: number | undefined;
  comment: string;
  commenterName: string;
  rating: number;
  isRedirectingFromLogin: boolean;
  // Worker details
  workerId: string | null;
  workerName: string;
  workerOccupation: string;
  
  setTipDetails: (
    amount: number | undefined, 
    comment: string, 
    commenterName: string, 
    rating: number
  ) => void;
  setWorkerDetails: (
    workerId: string,
    name: string,
    occupation: string
  ) => void;
  clearTipFlow: () => void;
  setRedirectingFromLogin: (isRedirecting: boolean) => void;
}

export const useTipFlowStore = create<TipFlowState>()(
  persist(
    (set, get) => ({
      tipAmount: undefined,
      comment: '',
      commenterName: '',
      rating: 5,
      isRedirectingFromLogin: false,
      // Initialize worker details
      workerId: null,
      workerName: '',
      workerOccupation: '',
      
      setTipDetails: (amount, comment, commenterName, rating) => {
        set({
          tipAmount: amount,
          comment,
          commenterName,
          rating
        });
      },
      
      setWorkerDetails: (workerId, name, occupation) => {
        set({
          workerId,
          workerName: name,
          workerOccupation: occupation
        });
      },
      
      clearTipFlow: () => {
        // Don't clear the redirecting flag here, as it might be needed
        // for the login flow
        const { isRedirectingFromLogin } = get();
        
        set({
          tipAmount: undefined,
          comment: '',
          commenterName: '',
          rating: 5,
          workerId: null,
          workerName: '',
          workerOccupation: '',
          // Keep the redirecting flag as is
          isRedirectingFromLogin
        });
      },
      
      setRedirectingFromLogin: (isRedirecting) => {
        set({ isRedirectingFromLogin: isRedirecting });
      }
    }),
    {
      name: 'tip-flow-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);