import { Platform } from 'react-native';
import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';
import { useAuthStore } from '@/store/auth-store';
import { useTipsStore } from '@/store/tips-store';
import { useSubscriptionStore } from '@/store/subscription-store';
import { apiClient } from '@/lib/api-client';

// Define a unique task name for background fetch
const BACKGROUND_FETCH_TASK = 'background-fetch-task';

// Define the task for TaskManager
TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
  try {
    // Get auth state - note that in background tasks, we can't use hooks directly
    // We need to access the store state statically if possible or handle it differently
    // For simplicity, we'll assume stores can be accessed statically in this context
    const authState = useAuthStore.getState();
    if (!authState.isAuthenticated || !authState.user) {
      console.log('Background fetch: User not authenticated, skipping.');
      return BackgroundFetch.BackgroundFetchResult.NoData;
    }

    const userId = authState.user.id;
    console.log('Background fetch: Fetching data for user', userId);

    // Fetch tips
    const tipsResponse = await apiClient.tips.getMyTips();
    if (tipsResponse.tips || tipsResponse.deposits) {
      useTipsStore.setState({
        tips: tipsResponse.tips || [],
        deposits: tipsResponse.deposits || [],
      });
      console.log('Background fetch: Updated tips and deposits');
    }

    // Fetch withdrawals/transactions
    const transactionsResponse = await apiClient.balances.getMyTransactions();
    if (transactionsResponse.transactions) {
      useTipsStore.setState({
        withdrawals: transactionsResponse.transactions || [],
      });
      console.log('Background fetch: Updated withdrawals');
    }

    // Check subscription status
    const subscriptionStore = useSubscriptionStore.getState();
    await subscriptionStore.checkSubscriptionStatus();
    console.log('Background fetch: Checked subscription status');

    return BackgroundFetch.BackgroundFetchResult.NewData;
  } catch (error) {
    console.error('Background fetch failed:', error);
    return BackgroundFetch.BackgroundFetchResult.Failed;
  }
});

// Function to register the background fetch task
export const registerBackgroundFetch = async () => {
  if (Platform.OS === 'web') {
    console.log('Background fetch is not supported on web.');
    return false;
  }

  try {
    // Check if the task is already registered
    const isRegistered = await TaskManager.isTaskRegisteredAsync(BACKGROUND_FETCH_TASK);
    if (isRegistered) {
      console.log('Background fetch task is already registered.');
      return true;
    }

    // Register the background fetch task
    const status = await BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
      minimumInterval: 60 * 15, // Fetch every 15 minutes
      stopOnTerminate: false, // Continue even if app is terminated (iOS)
      startOnBoot: true, // Start on device boot (Android)
    });

    console.log('Background fetch task registered:', status);
    return status;
  } catch (error) {
    console.error('Failed to register background fetch task:', error);
    return false;
  }
};

// Function to unregister the background fetch task
export const unregisterBackgroundFetch = async () => {
  if (Platform.OS === 'web') {
    return;
  }

  try {
    await BackgroundFetch.unregisterTaskAsync(BACKGROUND_FETCH_TASK);
    console.log('Background fetch task unregistered.');
  } catch (error) {
    console.error('Failed to unregister background fetch task:', error);
  }
};