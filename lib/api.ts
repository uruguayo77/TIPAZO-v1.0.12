import { Platform } from 'react-native';

const getBaseUrl = () => {
  if (process.env.EXPO_PUBLIC_RORK_API_BASE_URL) {
    return process.env.EXPO_PUBLIC_RORK_API_BASE_URL;
  }
  throw new Error("No base url found, please set EXPO_PUBLIC_RORK_API_BASE_URL");
};

class ApiService {
  private baseUrl: string;
  private authToken: string | null = null;

  constructor() {
    this.baseUrl = `${getBaseUrl()}/api`;
  }

  setAuthToken(token: string) {
    this.authToken = token;
  }

  clearAuthToken() {
    this.authToken = null;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (this.authToken) {
      headers.Authorization = `Bearer ${this.authToken}`;
    }

    const config: RequestInit = {
      ...options,
      headers,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`API Error [${endpoint}]:`, error);
      throw error;
    }
  }

  // Auth endpoints
  async login(email: string, password: string) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async register(userData: any) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async getMe() {
    return this.request('/auth/me');
  }

  async updateProfile(userData: any) {
    return this.request('/auth/profile', {
      method: 'PATCH',
      body: JSON.stringify(userData),
    });
  }

  async logout() {
    return this.request('/auth/logout', {
      method: 'POST',
    });
  }

  // Tips endpoints
  async getTips() {
    return this.request('/tips');
  }

  async sendTip(tipData: any) {
    return this.request('/tips', {
      method: 'POST',
      body: JSON.stringify(tipData),
    });
  }

  async getTipHistory() {
    return this.request('/tips/history');
  }

  // Withdrawals endpoints
  async getWithdrawals() {
    return this.request('/withdrawals');
  }

  async requestWithdrawal(withdrawalData: any) {
    return this.request('/withdrawals', {
      method: 'POST',
      body: JSON.stringify(withdrawalData),
    });
  }

  // Balance endpoints
  async getBalance() {
    return this.request('/balance');
  }

  async addFunds(fundsData: any) {
    return this.request('/balance/add', {
      method: 'POST',
      body: JSON.stringify(fundsData),
    });
  }

  // Subscription endpoints
  async getSubscription() {
    return this.request('/subscription');
  }

  async startTrial() {
    return this.request('/subscription/trial', {
      method: 'POST',
    });
  }

  async subscribe() {
    return this.request('/subscription/subscribe', {
      method: 'POST',
    });
  }

  async cancelSubscription() {
    return this.request('/subscription/cancel', {
      method: 'POST',
    });
  }

  async applyPromoCode(code: string) {
    return this.request('/subscription/promo', {
      method: 'POST',
      body: JSON.stringify({ code }),
    });
  }

  // Goals endpoints
  async getMyGoal() {
    return this.request('/users/me/goal');
  }

  async updateMyGoal(goalData: any) {
    return this.request('/users/me/goal', {
      method: 'PATCH',
      body: JSON.stringify(goalData),
    });
  }

  async deleteMyGoal() {
    return this.request('/users/me/goal', {
      method: 'DELETE',
    });
  }

  async getUserGoal(userId: string) {
    return this.request(`/users/${userId}/goal`);
  }

  async updateUserGoal(userId: string, goalData: any) {
    return this.request(`/users/${userId}/goal`, {
      method: 'PATCH',
      body: JSON.stringify(goalData),
    });
  }

  async deleteUserGoal(userId: string) {
    return this.request(`/users/${userId}/goal`, {
      method: 'DELETE',
    });
  }

  // Admin endpoints
  async getUsers() {
    return this.request('/admin/users');
  }

  async getUser(userId: string) {
    return this.request(`/admin/users/${userId}`);
  }

  async updateUser(userId: string, userData: any) {
    return this.request(`/admin/users/${userId}`, {
      method: 'PATCH',
      body: JSON.stringify(userData),
    });
  }

  // Worker endpoints
  async getWorkerProfile(workerId: string) {
    return this.request(`/workers/${workerId}`);
  }

  async getWorkerComments(workerId: string) {
    return this.request(`/workers/${workerId}/comments`);
  }

  // QR Code endpoints
  async generateQRCode() {
    return this.request('/qr/generate', {
      method: 'POST',
    });
  }

  async scanQRCode(qrData: string) {
    return this.request('/qr/scan', {
      method: 'POST',
      body: JSON.stringify({ qrData }),
    });
  }
}

export const apiService = new ApiService();