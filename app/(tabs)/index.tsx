import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, RefreshControl, useWindowDimensions, StatusBar, SafeAreaView, Platform, ScrollView, TouchableOpacity } from 'react-native';
import { useTipsStore } from '@/store/tips-store';
import { useAuthStore } from '@/store/auth-store';
import { colors } from '@/constants/colors';
import { Card } from '@/components/Card';
import { EmptyState } from '@/components/EmptyState';
import { InlineSubscriptionBadge } from '@/components/InlineSubscriptionBadge';
import { Tip } from '@/types';
import { Inbox, Crown, ArrowLeft } from 'lucide-react-native';
import { WidgetIcon } from '@/components/WidgetIcon';
import { QRScanIcon } from '@/components/QRScanIcon';
import { DepositIcon } from '@/components/DepositIcon';
import { useLanguageStore } from '@/store/language-store';
import { useSubscriptionStore } from '@/store/subscription-store';
import { Button } from '@/components/Button';
import { useExchangeRate } from '@/hooks/useExchangeRate';
import { router } from 'expo-router';
import { Avatar } from '@/components/Avatar';
import { NotificationIcon } from '@/components/NotificationIcon';
import { NotificationsModal } from '@/components/NotificationsModal';
import { useNotificationsStore } from '@/store/notifications-store';
import { tipazoRealtime } from '@/lib/realtime';
import { MergedDrops } from '@/components/MergedDrops';
import { AbstractBalanceCard } from '@/components/AbstractBalanceCard';
import { AbstractTipsHistory } from '@/components/AbstractTipsHistory';

export default function DashboardScreen() {
  const { user } = useAuthStore();
  const { tips, deposits, fetchTips, withdrawals, fetchWithdrawals, isLoading, getUserBalance, syncTipsToTransactions } = useTipsStore();
  const { status, checkSubscriptionStatus, processAutoRenewal, syncExistingData, checkAndProcessAutoRenewal } = useSubscriptionStore();
  const { unreadCount, addNotification } = useNotificationsStore();
  const [refreshing, setRefreshing] = useState(false);
  const { t } = useLanguageStore();
  const { exchangeRate, loading: exchangeLoading } = useExchangeRate();
  const { width, height } = useWindowDimensions();
  const isSmallDevice = width < 375;
  const [userBalance, setUserBalance] = useState(0);
  const [notificationsModalVisible, setNotificationsModalVisible] = useState(false);
  
  // Calculate top spacing (10% of screen height)
  const topSpacing = height * 0.08;

  useEffect(() => {
    const initializeData = async () => {
      if (user) {
        console.log('Initializing data for user:', user.id);
        
        // Force refresh data from Supabase
        console.log('Force fetching tips for user:', user.id);
        await fetchTips(user.id);
        await fetchWithdrawals(user.id);
        
        // Sync tips to transactions - DISABLED to prevent automatic transaction creation
        // console.log('Syncing tips to transactions for user:', user.id);
        // await syncTipsToTransactions(user.id);
      
      // Sync existing data to Supabase first, then check status
      syncExistingData(user.id);
      checkSubscriptionStatus(user.id);
      
      // Check for auto-renewal
      checkAndProcessAutoRenewal(user.id);
      
      // Try to process auto-renewal if subscription is expired
      if (status === 'expired') {
        processAutoRenewal(user.id);
      }
      
      // Subscribe to real-time updates for tips and transactions
      const handleTipUpdate = (payload: any) => {
        console.log('Real-time tip update:', payload);
        // Refresh tips data when new tips are received
        fetchTips(user.id);
      };
      
      const handleTransactionUpdate = (payload: any) => {
        console.log('Real-time transaction update:', payload);
        // Refresh tips data when new transactions are made
        fetchTips(user.id);
      };
      
      // Subscribe to real-time updates
      tipazoRealtime.subscribeToUserTips(user.id, handleTipUpdate);
      tipazoRealtime.subscribeToUserTransactions(user.id, handleTransactionUpdate);

      // Demo notifications removed - using real data only
      }
    };
    
    initializeData();
    
    // Cleanup function for realtime subscriptions
    return () => {
      if (user) {
        tipazoRealtime.unsubscribe(`user_tips_${user.id}`);
        tipazoRealtime.unsubscribe(`user_transactions_${user.id}`);
      }
    };
  }, [user, status]);

  // Update balance whenever tips, deposits, or withdrawals change
  useEffect(() => {
    if (user) {
      console.log('Updating balance for user:', user.id);
      console.log('Current tips:', tips);
      console.log('Current deposits:', deposits);
      console.log('Current withdrawals:', withdrawals);
      
      const balance = getUserBalance(user.id);
      console.log('Calculated balance:', balance);
      setUserBalance(balance);
    }
  }, [user, tips, deposits, withdrawals, getUserBalance]);

  const onRefresh = async () => {
    if (user) {
      setRefreshing(true);
      await Promise.all([
        fetchTips(user.id),
        fetchWithdrawals(user.id)
      ]);
      
      // Sync existing data to Supabase first, then check status
      await syncExistingData(user.id);
      await checkSubscriptionStatus(user.id);
      
      // Check for auto-renewal
      await checkAndProcessAutoRenewal(user.id);
      
      // Try to process auto-renewal if subscription is expired
      if (status === 'expired') {
        await processAutoRenewal(user.id);
      }
      
      // Update balance after refresh
      if (user) {
        const balance = getUserBalance(user.id);
        setUserBalance(balance);
      }
      
      setRefreshing(false);
    }
  };


  const handleDepositFunds = () => {
    router.push('/deposit-methods');
  };

  const handleSendTip = () => {
    router.push('/send-tip');
  };

  const handleBackToWelcome = () => {
    router.replace('/(auth)/welcome');
  };

  const handleNotificationsPress = () => {
    setNotificationsModalVisible(true);
  };

  const handleCloseNotifications = () => {
    setNotificationsModalVisible(false);
  };

  const handleSubscriptionPress = () => {
    router.push('/subscription');
  };

  // Removed username variable - no longer needed

  // Check if subscription is active
  const isSubscriptionActive = status === 'active' || status === 'trial';

  if (tips.length === 0 && !isLoading) {
      return (
        <>
          <StatusBar backgroundColor={colors.background} barStyle="dark-content" />
          <SafeAreaView style={styles.container}>
            {/* Top spacer to shift content down */}
            <View style={{ height: topSpacing }} />
            
            
            {/* Greeting with Avatar and Back Button */}
            <View style={styles.greetingContainer}>
              <TouchableOpacity onPress={handleBackToWelcome} style={styles.backButton}>
                <WidgetIcon size={24} color={colors.primary} />
                <Text style={styles.backButtonText}>Widget</Text>
              </TouchableOpacity>
              
              {/* Merged drops for notifications */}
              <MergedDrops
                onTipazoPress={handleSubscriptionPress}
                onNotificationPress={handleNotificationsPress}
                unreadCount={unreadCount}
                isSubscriptionActive={isSubscriptionActive}
              />
              
              {/* User info section */}
              <View style={styles.userInfoSection}>
                <View style={styles.userNameContainer}>
                  <Text style={styles.userName}>{user?.name || 'Usuario'}</Text>
                  <View style={styles.userNameBackground} />
                </View>
                {isSubscriptionActive && (
                  <TouchableOpacity 
                    style={styles.premiumBadge}
                    onPress={handleSubscriptionPress}
                  >
                    <Crown size={9} color={colors.primary} />
                    <Text style={styles.premiumText}>TIPAZO Premium</Text>
                  </TouchableOpacity>
                )}
              </View>
              
              <Avatar 
                source={user?.profilePicture}
                name={user?.name || ''}
                size={60}
                style={styles.avatar}
                variant="rounded"
              />
            </View>
            
            <AbstractBalanceCard
              balance={userBalance}
              exchangeRate={exchangeRate}
              exchangeLoading={exchangeLoading}
              onDepositPress={handleDepositFunds}
              onSendTipPress={handleSendTip}
              depositIcon={<DepositIcon size={isSmallDevice ? 18 : 20} color={colors.textDark} />}
              sendTipIcon={<QRScanIcon size={isSmallDevice ? 18 : 20} color={colors.textDark} />}
              isSmallDevice={isSmallDevice}
            />
            
            <EmptyState
              title={t('noTipsYet')}
              description={t('noTipsDescription')}
              icon={<Inbox size={64} color={colors.textLight} />}
              style={styles.emptyState}
            />
            
            {/* Bottom spacer for floating navigation */}
            <View style={styles.bottomSpacer} />
            
            {/* Notifications Modal */}
            <NotificationsModal
              visible={notificationsModalVisible}
              onClose={handleCloseNotifications}
            />
          </SafeAreaView>
        </>
      );
  }

      return (
        <>
          <StatusBar backgroundColor={colors.background} barStyle="dark-content" />
          <SafeAreaView style={styles.container}>
            {/* Fixed Header Section */}
            <View style={styles.fixedHeader}>
              {/* Top spacer to shift content down */}
              <View style={{ height: topSpacing }} />
              
              {/* Greeting with Avatar and Back Button */}
              <View style={styles.greetingContainer}>
                <TouchableOpacity onPress={handleBackToWelcome} style={styles.backButton}>
                  <WidgetIcon size={24} color={colors.primary} />
                  <Text style={styles.backButtonText}>Widget</Text>
                </TouchableOpacity>
                
                {/* Merged drops for notifications */}
                <MergedDrops
                  onTipazoPress={handleSubscriptionPress}
                  onNotificationPress={handleNotificationsPress}
                  unreadCount={unreadCount}
                  isSubscriptionActive={isSubscriptionActive}
                />
                
                {/* User info section */}
                <View style={styles.userInfoSection}>
                  <View style={styles.userNameContainer}>
                    <Text style={styles.userName}>{user?.name || 'Usuario'}</Text>
                    <View style={styles.userNameBackground} />
                  </View>
                  {isSubscriptionActive && (
                    <TouchableOpacity 
                      style={styles.premiumBadge}
                      onPress={handleSubscriptionPress}
                    >
                      <Crown size={9} color={colors.primary} />
                      <Text style={styles.premiumText}>TIPAZO Premium</Text>
                    </TouchableOpacity>
                  )}
                </View>
                
                <Avatar 
                  source={user?.profilePicture}
                  name={user?.name || ''}
                  size={60}
                  style={styles.avatar}
                  variant="rounded"
                />
              </View>
              
              <AbstractBalanceCard
                balance={userBalance}
                exchangeRate={exchangeRate}
                exchangeLoading={exchangeLoading}
                onDepositPress={handleDepositFunds}
                onSendTipPress={handleSendTip}
                depositIcon={<DepositIcon size={isSmallDevice ? 18 : 20} color={colors.textDark} />}
                sendTipIcon={<QRScanIcon size={isSmallDevice ? 18 : 20} color={colors.textDark} />}
                isSmallDevice={isSmallDevice}
              />
            </View>

            {/* Tips History Section */}
            <AbstractTipsHistory
              tips={tips}
              onRefresh={onRefresh}
              refreshing={refreshing}
              isSmallDevice={isSmallDevice}
            />
            
            {/* Notifications Modal */}
            <NotificationsModal
              visible={notificationsModalVisible}
              onClose={handleCloseNotifications}
            />
          </SafeAreaView>
        </>
      );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: '4%',
  },
  fixedHeader: {
    // Fixed header section - doesn't scroll
  },
  greetingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    marginTop: 8,
    paddingHorizontal: 0,
  },
  userInfoSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 2,
    height: 60, // Same height as avatar
  },
  userNameContainer: {
    position: 'relative',
    marginBottom: 2,
  },
  userName: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  userNameBackground: {
    // Убираем отдельный фон, так как теперь фон встроен в текст
  },
  greetingContent: {
    flex: 1,
  },
  notificationButton: {
    position: 'relative',
    padding: 8,
    marginRight: 8,
  },
  notificationBadge: {
    position: 'absolute',
    top: 2,
    right: 2,
    backgroundColor: '#FF4444',
    borderRadius: 12,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  notificationCount: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: 12,
  },
  premiumBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 255, 170, 0.15)',
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 8,
    alignSelf: 'center',
    gap: 2,
  },
  premiumBadgeInCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 255, 170, 0.15)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    alignSelf: 'center',
    gap: 6,
    marginBottom: 12,
  },
  premiumText: {
    fontSize: 10,
    fontWeight: '600',
    color: colors.primary,
  },
  premiumBadgeInHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 255, 170, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
    marginRight: 4,
  },
  premiumTextInHeader: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.primary,
  },
  avatar: {
    marginLeft: 0,
    marginRight: 0,
  },
  backButton: {
    marginRight: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 255, 170, 0.1)',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  backButtonText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '600',
  },
  balanceCard: {
    padding: 24,
    marginBottom: 24,
    alignItems: 'center',
    borderRadius: 20,
  },
  balanceLabel: {
    fontSize: 16,
    color: colors.gray[600],
    marginBottom: 8,
    textAlign: 'center',
  },
  balanceAmount: {
    fontSize: 38,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8, // Reduced from 24 to make room for exchange rate
    textAlign: 'center',
  },
  exchangeRateNote: {
    fontSize: 12,
    color: colors.gray[500],
    textAlign: 'center',
    marginBottom: 16, // Space between exchange rate and buttons
  },
  buttonsContainer: {
    width: '100%',
    gap: 12,
  },
  actionButton: {
    width: '100%',
  },
  subscriptionBadgeContainer: {
    marginTop: 4,
  },
  bottomSpacer: {
    height: 110, // Space for tab navigation (70px) + extra padding (40px)
  },
  emptyState: {
    justifyContent: 'center',
    minHeight: 200,
  },
});