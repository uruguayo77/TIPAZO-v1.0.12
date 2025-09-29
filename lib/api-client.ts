import { Platform } from 'react-native';

const getBaseUrl = () => {
  if (process.env.EXPO_PUBLIC_RORK_API_BASE_URL) {
    return process.env.EXPO_PUBLIC_RORK_API_BASE_URL;
  }
  console.warn("No base URL found, using fallback. Please set EXPO_PUBLIC_RORK_API_BASE_URL");
  return "http://localhost:3000"; // Fallback for development
};

const BASE_URL = `${getBaseUrl()}/api`;

// Helper to handle fetch requests with authorization
async function fetchWithAuth(url: string, options: RequestInit = {}) {
  // TODO: Add auth token from store when implemented
  const headers = {
    'Content-Type': 'application/json',
    // Add Authorization header when auth is implemented
    // 'Authorization': `Bearer ${token}`,
    ...(options.headers || {}),
  };

  const fullUrl = `${BASE_URL}${url}`;
  console.log(`Making request to: ${fullUrl}`); // Log the full URL for debugging

  try {
    const response = await fetch(fullUrl, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error(`API request failed: ${response.status} ${response.statusText} for URL: ${fullUrl}`, errorData);
      throw new Error(errorData.message || `API request failed with status ${response.status} at ${url}`);
    }

    return response.json();
  } catch (error) {
    console.error(`Network or fetch error for ${url}:`, error);
    throw error;
  }
}

// API client for RESTful endpoints
export const apiClient = {
  auth: {
    signUpClient: (data: { email: string; password: string }) =>
      fetchWithAuth('/v1/auth/sign-up/client', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    signUp: (data: { email: string; password: string; name: string; username: string; occupation: string }) =>
      fetchWithAuth('/v1/auth/sign-up', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    signIn: (data: { email: string; password: string }) =>
      fetchWithAuth('/v1/auth/sign-in', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    refreshToken: (refreshToken: string) =>
      fetchWithAuth(`/v1/auth/tokens/${refreshToken}/refresh`, {
        method: 'POST',
      }),
  },
  tips: {
    sendAnonymousTip: (userId: string, data: { amount: number }) =>
      fetchWithAuth(`/v1/users/${userId}/tips/anonymous`, {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    sendTip: (userId: string, data: { amount: number; comment?: string; rating?: number }) =>
      fetchWithAuth(`/v1/users/${userId}/tips`, {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    getAllTips: () => fetchWithAuth('/v1/tips/all', { method: 'GET' }),
    getMyTips: () => fetchWithAuth('/v1/tips', { method: 'GET' }),
    getTip: (tipId: string) => fetchWithAuth(`/v1/tips/${tipId}`, { method: 'GET' }),
  },
  reviews: {
    deleteReview: (reviewId: string) =>
      fetchWithAuth(`/v1/reviews/${reviewId}`, { method: 'DELETE' }),
    getMyReviews: () => fetchWithAuth('/v1/users/me/reviews', { method: 'GET' }),
    getUserReviews: (userId: string) =>
      fetchWithAuth(`/v1/users/${userId}/reviews`, { method: 'GET' }),
  },
  balances: {
    getAllTransactions: () => fetchWithAuth('/v1/transactions', { method: 'GET' }),
    getMyBalance: () => fetchWithAuth('/v1/users/me/balance', { method: 'GET' }),
    getMyTransactions: () => fetchWithAuth('/v1/users/me/transactions', { method: 'GET' }),
    getUserTransactions: (userId: string) =>
      fetchWithAuth(`/v1/users/${userId}/transactions`, { method: 'GET' }),
    createTransaction: (userId: string, data: { amount: number; type: string }) =>
      fetchWithAuth(`/v1/users/${userId}/transactions`, {
        method: 'POST',
        body: JSON.stringify(data),
      }),
  },
  metrics: {
    getMyTipMetrics: () => fetchWithAuth('/v1/users/me/metrics/tips', { method: 'GET' }),
    getUserTipMetrics: (userId: string) =>
      fetchWithAuth(`/v1/users/${userId}/metrics/tips`, { method: 'GET' }),
  },
  tickets: {
    createTicket: (data: { title: string; description: string }) =>
      fetchWithAuth('/v1/tickets', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    getTickets: () => fetchWithAuth('/v1/tickets', { method: 'GET' }),
    markTicketInProgress: (ticketId: string) =>
      fetchWithAuth(`/v1/tickets/${ticketId}/in-progress`, { method: 'PATCH' }),
    markTicketCompleted: (ticketId: string) =>
      fetchWithAuth(`/v1/tickets/${ticketId}/completed`, { method: 'PATCH' }),
    deleteTicket: (ticketId: string) =>
      fetchWithAuth(`/v1/tickets/${ticketId}`, { method: 'DELETE' }),
  },
  users: {
    getMyProfile: () => fetchWithAuth('/v1/users/me', { method: 'GET' }),
    updateMyProfile: (data: any) =>
      fetchWithAuth('/v1/users/me', {
        method: 'PATCH',
        body: JSON.stringify(data),
      }),
    updateMyAvatar: (data: any) =>
      fetchWithAuth('/v1/users/me/avatar', {
        method: 'PATCH',
        body: JSON.stringify(data),
      }),
    deleteMyAvatar: () => fetchWithAuth('/v1/users/me/avatar', { method: 'DELETE' }),
    getUserProfile: (userId: string) =>
      fetchWithAuth(`/v1/users/${userId}`, { method: 'GET' }),
    updateUserProfile: (userId: string, data: any) =>
      fetchWithAuth(`/v1/users/${userId}`, {
        method: 'PATCH',
        body: JSON.stringify(data),
      }),
    deleteUser: (userId: string) =>
      fetchWithAuth(`/v1/users/${userId}`, { method: 'DELETE' }),
  },
  goals: {
    updateMyGoal: (data: { goalDescription: string; goalAmount: number }) =>
      fetchWithAuth('/v1/users/me/goal', {
        method: 'PATCH',
        body: JSON.stringify(data),
      }),
    deleteMyGoal: () => fetchWithAuth('/v1/users/me/goal', { method: 'DELETE' }),
    updateUserGoal: (userId: string, data: { goalDescription: string; goalAmount: number }) =>
      fetchWithAuth(`/v1/users/${userId}/goal`, {
        method: 'PATCH',
        body: JSON.stringify(data),
      }),
    deleteUserGoal: (userId: string) =>
      fetchWithAuth(`/v1/users/${userId}/goal`, { method: 'DELETE' }),
  },
};