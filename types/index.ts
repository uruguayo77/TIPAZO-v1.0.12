export type CryptoCurrency = 'BTC' | 'ETH' | 'USDT' | 'USDC' | 'BNB' | 'XRP' | 'ADA' | 'SOL' | 'DOGE' | 'DOT';

export interface User {
  id: string;
  name: string;
  email: string;
  userType: 'admin' | 'worker' | 'client';
  createdAt: string;
  updatedAt?: string;
  profilePicture?: string;
  username?: string;
}

export interface Worker extends User {
  userType: 'worker';
  totalEarnings: number;
  qrCode: string;
  cryptoWallet?: string;
  cryptoType?: CryptoCurrency;
  phoneNumber?: string;
  bankAccount?: {
    bankName: string;
    routingNumber: string;
    accountNumber: string;
  };
  paymentQrUrl?: string;
  biography?: string;
  occupation?: string;
  walletAddress?: string;
  // Goal tracking fields
  goalDescription?: string;
  goalAmount?: number;
  goalAccumulated?: number;
}

export interface Client extends User {
  userType: 'client';
  paymentMethods?: PaymentMethod[];
}

export interface PaymentMethod {
  id: string;
  type: 'card' | 'bank' | 'crypto';
  isDefault: boolean;
  details: CardDetails | BankDetails | CryptoDetails;
}

export interface CardDetails {
  cardNumber: string;
  expiryDate: string;
  cardholderName: string;
  cvv?: string;
}

export interface BankDetails {
  bankName: string;
  accountNumber: string;
  routingNumber: string;
}

export interface CryptoDetails {
  walletAddress: string;
  currency: CryptoCurrency;
}

export interface Tip {
  id: string;
  amount: number;
  senderId: string;
  receiverId: string;
  senderName: string;
  receiverName: string;
  status: 'pending' | 'completed' | 'failed';
  createdAt: string;
  completedAt?: string;
  comment?: string;
  rating?: number;
}

export interface WithdrawalRequest {
  id: string;
  userId: string;
  amount: number;
  status: 'pending' | 'completed' | 'failed';
  createdAt: string;
  completedAt?: string;
  destination: string;
  destinationDetails?: any;
  description?: string;
}

export interface Comment {
  id: string;
  workerId: string;
  clientId: string;
  clientName: string;
  content: string;
  rating: number;
  date: string;
  tipId: string;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  duration: number; // in days
  features: string[];
}

export interface PromoCode {
  code: string;
  discountPercentage: number;
  validUntil: string;
  isActive: boolean;
}

export interface Language {
  code: string;
  name: string;
  nativeName: string;
  isRTL: boolean;
}