import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, RefreshControl, TouchableOpacity, Alert, Platform, useWindowDimensions, StatusBar, SafeAreaView, ScrollView } from 'react-native';
import { useTipsStore } from '@/store/tips-store';
import { useAuthStore } from '@/store/auth-store';
import { colors } from '@/constants/colors';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { EmptyState } from '@/components/EmptyState';
import { WithdrawalRequest } from '@/types';
import { Wallet, Building, Clock, CheckCircle, XCircle } from 'lucide-react-native';
import { WithdrawalIcon } from '@/components/WithdrawalIcon';
import { AbstractWithdrawCard } from '@/components/AbstractWithdrawCard';
import { useLanguageStore } from '@/store/language-store';
import { router } from 'expo-router';
import { useSubscriptionStore } from '@/store/subscription-store';
import { useExchangeRate } from '@/hooks/useExchangeRate';
import { LinearGradient } from 'expo-linear-gradient';

export default function WithdrawalsScreen() {
  const { user } = useAuthStore();
  const { tips, deposits, withdrawals, fetchTips, fetchWithdrawals, isLoading, getUserBalance } = useTipsStore();
  const { status, checkSubscriptionStatus, processAutoRenewal } = useSubscriptionStore();
  const { exchangeRate } = useExchangeRate();
  const [refreshing, setRefreshing] = useState(false);
  const { t } = useLanguageStore();
  const { width, height } = useWindowDimensions();
  const isSmallDevice = width < 375;
  const [userBalance, setUserBalance] = useState(0);
  
  // Calculate top spacing (10% of screen height)
  const topSpacing = height * 0.1;

  useEffect(() => {
    if (user) {
      fetchTips(user.id);
      fetchWithdrawals(user.id);
      
      checkSubscriptionStatus(user.id);
      
      if (status === 'expired') {
        processAutoRenewal(user.id);
      }
    }
  }, [user, status]);

  useEffect(() => {
    if (user) {
      const balance = getUserBalance(user.id);
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
      
      await checkSubscriptionStatus(user.id);
      
      if (status === 'expired') {
        await processAutoRenewal(user.id);
      }
      
      if (user) {
        const balance = getUserBalance(user.id);
        setUserBalance(balance);
      }
      
      setRefreshing(false);
    }
  };

  const handleWithdraw = () => {
    router.push('/withdrawal-options');
  };

  const renderWithdrawalItem = ({ item }: { item: WithdrawalRequest }) => {
    const formatDate = (dateString: string) => {
      const date = new Date(dateString);
      return date.toLocaleDateString('es-ES', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    };

    const getStatusIcon = () => {
      const iconSize = isSmallDevice ? 14 : 16;
      switch (item.status) {
        case 'completed':
          return <CheckCircle size={iconSize} color={colors.success} />;
        case 'pending':
          return <Clock size={iconSize} color={colors.warning} />;
        case 'failed':
          return <XCircle size={iconSize} color={colors.error} />;
        default:
          return null;
      }
    };

    const getStatusText = (status: string) => {
      switch (status) {
        case 'completed':
          return 'Completado';
        case 'pending':
          return 'Pendiente';
        case 'failed':
          return 'Fallido';
        default:
          return status;
      }
    };

    const getDestinationText = (destination: string) => {
      switch (destination) {
        case 'wallet':
          return 'A Billetera';
        case 'bank':
          return 'A Cuenta Bancaria';
        case 'mobile':
          return 'A Pago Móvil';
        case 'crypto':
          return 'A Criptomoneda';
        case 'subscription':
          return 'Pago de suscripción';
        case 'tip':
          return 'Envío de propina';
        default:
          return `A ${destination}`;
      }
    };

    const getDestinationIcon = () => {
      const iconSize = isSmallDevice ? 18 : 20;
      switch (item.destination) {
        case 'wallet':
        case 'subscription':
        case 'tip':
          return <Wallet size={iconSize} color="#69C5F8" />;
        case 'bank':
        case 'mobile':
          return <Building size={iconSize} color="#69C5F8" />;
        default:
          return <Wallet size={iconSize} color="#69C5F8" />;
      }
    };

    return (
      <View style={styles.withdrawalItem}>
        <LinearGradient
          colors={['#FFFFFF', '#F8F9FA', '#E8F4FD']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.withdrawalGradient}
        >
          <View style={styles.withdrawalHeader}>
            <View style={styles.withdrawalInfo}>
              <View style={styles.withdrawalIconContainer}>
                {getDestinationIcon()}
              </View>
              <View style={styles.withdrawalTextInfo}>
                <View style={styles.withdrawalDestinationBox}>
                  <Text style={[styles.withdrawalDestination, isSmallDevice && styles.withdrawalDestinationSmall]}>
                    {getDestinationText(item.destination)}
                  </Text>
                </View>
                <Text style={styles.withdrawalDate}>
                  {formatDate(item.createdAt)}
                </Text>
                {item.description && (
                  <Text style={styles.withdrawalDescription}>
                    {item.description}
                  </Text>
                )}
              </View>
            </View>
            <View style={styles.withdrawalAmount}>
              <View style={styles.withdrawalAmountBox}>
                <Text style={[styles.withdrawalAmountText, isSmallDevice && styles.withdrawalAmountTextSmall]}>
                  ${item.amount.toFixed(2)}
                </Text>
              </View>
              <View style={styles.withdrawalStatus}>
                {getStatusIcon()}
                <Text style={[
                  styles.withdrawalStatusText,
                  item.status === 'completed' && styles.completedStatus,
                  item.status === 'pending' && styles.pendingStatus,
                  item.status === 'failed' && styles.failedStatus,
                ]}>
                  {getStatusText(item.status)}
                </Text>
              </View>
            </View>
          </View>
        </LinearGradient>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor={colors.background} barStyle="dark-content" />
      
      {/* Fixed Header Section */}
      <View style={styles.fixedHeader}>
        <View style={{ height: topSpacing }} />
        
        <AbstractWithdrawCard
          balance={userBalance}
          exchangeRate={exchangeRate}
          onWithdrawPress={handleWithdraw}
          withdrawIcon={<WithdrawalIcon size={isSmallDevice ? 18 : 20} color={colors.textDark} />}
          isSmallDevice={isSmallDevice}
        />
      </View>

      {/* Scrollable History Section */}
      <ScrollView 
        style={styles.scrollableContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[colors.primary]}
            tintColor={colors.primary}
          />
        }
        contentContainerStyle={styles.scrollContentContainer}
      >
        <View style={styles.historyContainer}>
          <Text style={[styles.sectionTitle, isSmallDevice && styles.sectionTitleSmall]}>{t('withdrawalHistory')}</Text>
          
          {withdrawals.length > 0 ? (
            withdrawals.map((item) => (
              <View key={item.id}>
                {renderWithdrawalItem({ item })}
              </View>
            ))
          ) : (
            <EmptyState
              title={t('noWithdrawalsYet')}
              description={t('noWithdrawalsDescription')}
              icon={<Wallet size={48} color={colors.textLight} />}
            />
          )}
        </View>
        
        {/* Bottom spacer for floating navigation */}
        <View style={styles.bottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  fixedHeader: {
    paddingHorizontal: '4%',
    // Fixed header section - doesn't scroll
  },
  scrollableContent: {
    flex: 1,
  },
  scrollContentContainer: {
    paddingHorizontal: '4%',
    paddingBottom: 20,
  },
  bottomSpacer: {
    height: 110, // Space for tab navigation (70px) + extra padding (40px)
  },
  balanceCard: {
    padding: 24,
    marginBottom: 24,
  },
  balanceLabel: {
    fontSize: 16,
    color: colors.gray[600],
    marginBottom: 8,
    textAlign: 'center', // Центрируем текст
  },
  balanceAmount: {
    fontSize: 36,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 24,
    textAlign: 'center', // Центрируем сумму
  },
  balanceAmountSmall: {
    fontSize: 28,
  },
  withdrawButton: {
    width: '100%',
  },
  exchangeRateContainer: {
    backgroundColor: '#69C5F8',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#69C5F8',
  },
  exchangeRateText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.white,
    textAlign: 'center',
    marginBottom: 4,
  },
  exchangeRateSubtext: {
    fontSize: 12,
    color: colors.white,
    textAlign: 'center',
  },
  historyContainer: {
    paddingTop: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    color: colors.textLight,
  },
  sectionTitleSmall: {
    fontSize: 16,
  },
  listContent: {
    paddingBottom: 16,
  },
  withdrawalItem: {
    marginBottom: 12,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  withdrawalGradient: {
    borderRadius: 16,
    padding: 16,
  },
  withdrawalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  withdrawalInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  withdrawalTextInfo: {
    flex: 1,
  },
  withdrawalDestinationBox: {
    backgroundColor: '#69C5F8',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginBottom: 4,
    alignSelf: 'flex-start',
  },
  withdrawalAmountBox: {
    backgroundColor: '#69C5F8',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    marginBottom: 4,
  },
  withdrawalIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(105, 197, 248, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  withdrawalDestination: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  withdrawalDestinationSmall: {
    fontSize: 14,
  },
  withdrawalDate: {
    fontSize: 14,
    color: colors.gray[500],
    marginTop: 4,
  },
  withdrawalDescription: {
    fontSize: 12,
    color: colors.gray[600],
    marginTop: 2,
    fontStyle: 'italic',
  },
  withdrawalAmount: {
    alignItems: 'flex-end',
  },
  withdrawalAmountText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  withdrawalAmountTextSmall: {
    fontSize: 16,
  },
  withdrawalStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  withdrawalStatusText: {
    fontSize: 12,
    fontWeight: '500',
    textTransform: 'capitalize',
  },
  completedStatus: {
    color: colors.success,
  },
  pendingStatus: {
    color: colors.warning,
  },
  failedStatus: {
    color: colors.error,
  },
});