import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, RefreshControl, useWindowDimensions, StatusBar, SafeAreaView, Platform, ScrollView, TouchableOpacity } from 'react-native';
import { useTipsStore } from '@/store/tips-store';
import { useAuthStore } from '@/store/auth-store';
import { colors } from '@/constants/colors';
import { TipHistoryItem } from '@/components/TipHistoryItem';
import { EmptyState } from '@/components/EmptyState';
import { Card } from '@/components/Card';
import { SubscriptionBanner } from '@/components/SubscriptionBanner';
import { Tip } from '@/types';
import { Inbox, Calendar, ArrowRight, QrCode, Crown, ArrowLeft } from 'lucide-react-native';
import { useLanguageStore } from '@/store/language-store';
import { useSubscriptionStore } from '@/store/subscription-store';
import { Button } from '@/components/Button';
import { router } from 'expo-router';
import { Avatar } from '@/components/Avatar';

export default function DashboardScreen() {
  const { user } = useAuthStore();
  const { tips, deposits, fetchTips, withdrawals, fetchWithdrawals, isLoading, getUserBalance } = useTipsStore();
  const { status, checkSubscriptionStatus, processAutoRenewal } = useSubscriptionStore();
  const [refreshing, setRefreshing] = useState(false);
  const { t } = useLanguageStore();
  const { width, height } = useWindowDimensions();
  const isSmallDevice = width < 375;
  const [userBalance, setUserBalance] = useState(0);
  
  // Calculate top spacing (10% of screen height)
  const topSpacing = height * 0.08;

  useEffect(() => {
    if (user) {
      fetchTips(user.id);
      fetchWithdrawals(user.id);
      
      // Check subscription status on component mount
      checkSubscriptionStatus(user.id);
      
      // Try to process auto-renewal if subscription is expired
      if (status === 'expired') {
        processAutoRenewal(user.id);
      }
    }
  }, [user, status]);

  // Update balance whenever tips, deposits, or withdrawals change
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
      
      // Check subscription status
      await checkSubscriptionStatus(user.id);
      
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

  const getRecentTips = (): Tip[] => {
    return [...tips]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 10);
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

  // Get username for greeting
  const username = user?.username || user?.name?.split(' ')[0] || '';

  // Check if subscription is active
  const isSubscriptionActive = status === 'active' || status === 'trial';

  if (tips.length === 0 && !isLoading) {
    return (
      <>
        <StatusBar backgroundColor={colors.background} barStyle="dark-content" />
        <SafeAreaView style={styles.container}>
          {/* Top spacer to shift content down */}
          <View style={{ height: topSpacing }} />
          
          {(status === 'trial' || status === 'expired') && (
            <SubscriptionBanner />
          )}
          
          {/* Greeting with Avatar and Back Button */}
          <View style={styles.greetingContainer}>
            <TouchableOpacity onPress={handleBackToWelcome} style={styles.backButton}>
              <ArrowLeft size={24} color={colors.primary} />
              <Text style={styles.backButtonText}>Widget</Text>
            </TouchableOpacity>
            <View style={styles.greetingContent}>
              <Text style={styles.greeting}>Hola, {username}!</Text>
              
              {/* Premium badge */}
              {isSubscriptionActive && (
                <View style={styles.premiumBadge}>
                  <Crown size={16} color={colors.primary} />
                  <Text style={styles.premiumText}>TIPAZO Premium</Text>
                </View>
              )}
            </View>
            <Avatar 
              source={user?.profilePicture}
              name={user?.name || ''}
              size={40}
              style={styles.avatar}
            />
          </View>
          
          <Card style={styles.balanceCard}>
            <Text style={styles.balanceLabel}>Saldo disponible</Text>
            <Text style={styles.balanceAmount}>
              ${userBalance.toFixed(2)}
            </Text>
            
            {/* Exchange rate note */}
            <Text style={styles.exchangeRateNote}>
              Tasa BCV: Bs. 92.25 por $1
            </Text>
            
            <View style={styles.buttonsContainer}>
              <Button
                title="Depositar fondos"
                onPress={handleDepositFunds}
                style={styles.actionButton}
                rightIcon={<ArrowRight size={isSmallDevice ? 18 : 20} color={colors.textDark} />}
              />
              
              <Button
                title="Enviar Propina"
                onPress={handleSendTip}
                style={styles.actionButton}
                rightIcon={<QrCode size={isSmallDevice ? 18 : 20} color={colors.textDark} />}
              />
            </View>
          </Card>
          
          <EmptyState
            title={t('noTipsYet')}
            description={t('noTipsDescription')}
            icon={<Inbox size={64} color={colors.textLight} />}
            style={styles.emptyState}
          />
        </SafeAreaView>
      </>
    );
  }

  return (
    <>
      <StatusBar backgroundColor={colors.background} barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <ScrollView
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
          {/* Top spacer to shift content down */}
          <View style={{ height: topSpacing }} />
          
          {(status === 'trial' || status === 'expired') && (
            <SubscriptionBanner />
          )}
          
          {/* Greeting with Avatar and Back Button */}
          <View style={styles.greetingContainer}>
            <TouchableOpacity onPress={handleBackToWelcome} style={styles.backButton}>
              <ArrowLeft size={24} color={colors.primary} />
              <Text style={styles.backButtonText}>Widget</Text>
            </TouchableOpacity>
            <View style={styles.greetingContent}>
              <Text style={styles.greeting}>Hola, {username}!</Text>
              
              {/* Premium badge */}
              {isSubscriptionActive && (
                <View style={styles.premiumBadge}>
                  <Crown size={16} color={colors.primary} />
                  <Text style={styles.premiumText}>TIPAZO Premium</Text>
                </View>
              )}
            </View>
            <Avatar 
              source={user?.profilePicture}
              name={user?.name || ''}
              size={40}
              style={styles.avatar}
            />
          </View>
          
          <Card style={styles.balanceCard}>
            <Text style={styles.balanceLabel}>Saldo disponible</Text>
            <Text style={styles.balanceAmount}>
              ${userBalance.toFixed(2)}
            </Text>
            
            {/* Exchange rate note */}
            <Text style={styles.exchangeRateNote}>
              Tasa BCV: Bs. 92.25 por $1
            </Text>
            
            <View style={styles.buttonsContainer}>
              <Button
                title="Depositar fondos"
                onPress={handleDepositFunds}
                style={styles.actionButton}
                rightIcon={<ArrowRight size={isSmallDevice ? 18 : 20} color={colors.textDark} />}
              />
              
              <Button
                title="Enviar Propina"
                onPress={handleSendTip}
                style={styles.actionButton}
                rightIcon={<QrCode size={isSmallDevice ? 18 : 20} color={colors.textDark} />}
              />
            </View>
          </Card>
          
          <View style={styles.recentContainer}>
            <Text style={styles.sectionTitle}>Propinas recientes</Text>
            
            {/* Using View instead of FlatList to avoid nesting VirtualizedLists */}
            <View style={styles.listContent}>
              {getRecentTips().length > 0 ? (
                getRecentTips().map((item) => (
                  <TipHistoryItem key={item.id} tip={item} />
                ))
              ) : (
                <EmptyState
                  title={t('noTipsYet')}
                  description={t('noTipsDescription')}
                  icon={<Calendar size={48} color="#666666" />}
                  textColor="#000000"
                />
              )}
            </View>
          </View>
          
          {/* Bottom spacer */}
          <View style={styles.bottomSpacer} />
        </ScrollView>
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
  greetingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    marginTop: 8,
  },
  greetingContent: {
    flex: 1,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.textLight,
    marginBottom: 4,
  },
  premiumBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 255, 170, 0.15)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
    gap: 6,
  },
  premiumText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.primary,
  },
  avatar: {
    marginLeft: 12,
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
  recentContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
    color: colors.textLight,
    paddingHorizontal: 4,
  },
  listContent: {
    paddingBottom: 16,
  },
  emptyState: {
    justifyContent: 'center',
    minHeight: 200,
  },
  bottomSpacer: {
    height: 40,
  },
});