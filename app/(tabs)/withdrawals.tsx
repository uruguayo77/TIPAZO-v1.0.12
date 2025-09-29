import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, RefreshControl, TouchableOpacity, Alert, Platform, useWindowDimensions, StatusBar, SafeAreaView, ScrollView } from 'react-native';
import { useTipsStore } from '@/store/tips-store';
import { useAuthStore } from '@/store/auth-store';
import { colors } from '@/constants/colors';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { EmptyState } from '@/components/EmptyState';
import { WithdrawalRequest } from '@/types';
import { Wallet, Building, ArrowRight, Clock, CheckCircle, XCircle } from 'lucide-react-native';
import { useLanguageStore } from '@/store/language-store';
import { router } from 'expo-router';
import { useSubscriptionStore } from '@/store/subscription-store';

export default function WithdrawalsScreen() {
  const { user } = useAuthStore();
  const { tips, deposits, withdrawals, fetchTips, fetchWithdrawals, isLoading, getUserBalance } = useTipsStore();
  const { status, checkSubscriptionStatus, processAutoRenewal } = useSubscriptionStore();
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
        month: 'short',
        day: 'numeric',
        year: 'numeric',
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
          return 'completado';
        case 'pending':
          return 'pendiente';
        case 'failed':
          return 'fallido';
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
          return <Wallet size={iconSize} color={colors.primary} />;
        case 'bank':
        case 'mobile':
          return <Building size={iconSize} color={colors.primary} />;
        default:
          return <Wallet size={iconSize} color={colors.primary} />;
      }
    };

    return (
      <Card style={styles.withdrawalItem}>
        <View style={styles.withdrawalHeader}>
          <View style={styles.withdrawalInfo}>
            <View style={styles.withdrawalIconContainer}>
              {getDestinationIcon()}
            </View>
            <View>
              <Text style={[styles.withdrawalDestination, isSmallDevice && styles.withdrawalDestinationSmall]}>
                {getDestinationText(item.destination)}
              </Text>
              <Text style={styles.withdrawalDate}>
                {item.description ? item.description : formatDate(item.createdAt)}
              </Text>
            </View>
          </View>
          <View style={styles.withdrawalAmount}>
            <Text style={[styles.withdrawalAmountText, isSmallDevice && styles.withdrawalAmountTextSmall]}>
              ${item.amount.toFixed(2)}
            </Text>
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
      </Card>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor={colors.background} barStyle="dark-content" />
      <ScrollView 
        style={styles.container}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[colors.primary]}
            tintColor={colors.primary}
          />
        }
      >
        <View style={{ height: topSpacing }} />
        
        <Card style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>{t('availableBalance')}</Text>
          <Text style={[styles.balanceAmount, isSmallDevice && styles.balanceAmountSmall]}>
            ${userBalance.toFixed(2)}
          </Text>
          <Button
            title={t('withdrawFunds')}
            onPress={handleWithdraw}
            style={styles.withdrawButton}
            rightIcon={<ArrowRight size={isSmallDevice ? 18 : 20} color={colors.textDark} />}
          />
        </Card>
        
        <View style={styles.historyContainer}>
          <Text style={[styles.sectionTitle, isSmallDevice && styles.sectionTitleSmall]}>{t('withdrawalHistory')}</Text>
          
          <FlatList
            data={withdrawals}
            keyExtractor={(item) => item.id}
            renderItem={renderWithdrawalItem}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
            ListEmptyComponent={
              <EmptyState
                title={t('noWithdrawalsYet')}
                description={t('noWithdrawalsDescription')}
                icon={<Wallet size={48} color={colors.textLight} />}
              />
            }
          />
        </View>
        
        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>Tipazo® 2025</Text>
          <Text style={styles.versionText}>v0.0.1</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: '4%',
  },
  balanceCard: {
    padding: 24,
    marginBottom: 24,
  },
  balanceLabel: {
    fontSize: 16,
    color: colors.gray[600],
    marginBottom: 8,
  },
  balanceAmount: {
    fontSize: 36,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 24,
  },
  balanceAmountSmall: {
    fontSize: 28,
  },
  withdrawButton: {
    width: '100%',
  },
  historyContainer: {
    flex: 1,
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
    padding: 16,
    marginBottom: 12,
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
  withdrawalIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.gray[100],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  withdrawalDestination: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text,
  },
  withdrawalDestinationSmall: {
    fontSize: 14,
  },
  withdrawalDate: {
    fontSize: 14,
    color: colors.gray[500],
    marginTop: 4,
  },
  withdrawalAmount: {
    alignItems: 'flex-end',
  },
  withdrawalAmountText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
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
  versionContainer: {
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 8,
  },
  versionText: {
    fontSize: 12,
    color: colors.gray[400],
    textAlign: 'center',
  },
});