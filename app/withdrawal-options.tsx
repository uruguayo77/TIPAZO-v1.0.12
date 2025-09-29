import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert, Platform, useWindowDimensions, StatusBar, SafeAreaView } from 'react-native';
import { router, Stack } from 'expo-router';
import { colors } from '@/constants/colors';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { useTipsStore } from '@/store/tips-store';
import { useAuthStore } from '@/store/auth-store';
import { Wallet, Building, ArrowRight } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import { useLanguageStore } from '@/store/language-store';

export default function WithdrawalOptionsScreen() {
  const { user } = useAuthStore();
  const { tips, deposits, withdrawals, requestWithdrawal, isLoading, getUserBalance } = useTipsStore();
  const { t } = useLanguageStore();
  const { width } = useWindowDimensions();
  const isSmallDevice = width < 375;
  
  const [selectedOption, setSelectedOption] = useState<'wallet' | 'bank' | null>(null);
  const [amount, setAmount] = useState('');
  const [userBalance, setUserBalance] = useState(497.00); // Set fixed balance for demo purposes
  
  // Update balance whenever tips, deposits, or withdrawals change
  useEffect(() => {
    if (user) {
      // Set fixed balance for demo purposes
      setUserBalance(497.00);
    }
  }, [user, tips, deposits, withdrawals, getUserBalance]);

  const handleOptionSelect = (option: 'wallet' | 'bank') => {
    if (Platform.OS !== 'web') {
      Haptics.selectionAsync();
    }
    setSelectedOption(option);
  };

  const handleAmountChange = (text: string) => {
    // Only allow numbers and a single decimal point
    const filtered = text.replace(/[^0-9.]/g, '');
    
    // Ensure only one decimal point
    const parts = filtered.split('.');
    if (parts.length > 2) {
      return;
    }
    
    // Limit to 2 decimal places
    if (parts.length > 1 && parts[1].length > 2) {
      return;
    }
    
    setAmount(filtered);
  };

  const handleWithdraw = async () => {
    if (!selectedOption) {
      Alert.alert('Error', 'Por favor selecciona un método de retiro');
      return;
    }
    
    if (!amount || parseFloat(amount) <= 0) {
      Alert.alert('Error', 'Por favor ingresa una cantidad válida');
      return;
    }
    
    const withdrawalAmount = parseFloat(amount);
    
    if (withdrawalAmount > userBalance) {
      Alert.alert('Error', 'La cantidad excede tu saldo disponible');
      return;
    }
    
    if (Platform.OS !== 'web') {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
    
    try {
      await requestWithdrawal(user?.id || '', withdrawalAmount, selectedOption);
      
      // Update balance after withdrawal
      // Keep fixed balance for demo
      setUserBalance(497.00 - withdrawalAmount);
      
      Alert.alert(
        'Solicitud enviada',
        'Tu solicitud de retiro ha sido enviada y será procesada en breve.',
        [
          {
            text: 'OK',
            onPress: () => router.back(),
          },
        ]
      );
    } catch (error) {
      console.error('Withdrawal error:', error);
      Alert.alert('Error', 'No se pudo procesar tu solicitud. Por favor intenta de nuevo.');
    }
  };

  const hasWalletAddress = !!(user && (user as any).walletAddress);
  const hasBankAccount = !!(user && (user as any).bankAccount?.accountNumber);

  return (
    <>
      <Stack.Screen 
        options={{
          title: 'Retiro de fondos',
          headerTintColor: colors.textLight,
          headerStyle: { backgroundColor: colors.background },
        }} 
      />
      <StatusBar backgroundColor={colors.background} barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {hasWalletAddress ? (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => handleOptionSelect('wallet')}
            >
              <Card 
                style={[
                  styles.optionCard,
                  selectedOption === 'wallet' && styles.selectedCard
                ]}
              >
                <View style={styles.optionContent}>
                  <View style={[
                    styles.optionIconContainer,
                    { backgroundColor: colors.primary }
                  ]}>
                    <Wallet size={24} color={colors.card} />
                  </View>
                  <View style={styles.optionInfo}>
                    <Text style={styles.optionTitle}>Billetera Crypto</Text>
                    <Text style={styles.optionDescription}>
                      Retira fondos a tu billetera de criptomonedas
                    </Text>
                  </View>
                </View>
              </Card>
            </TouchableOpacity>
          ) : (
            <Card style={[styles.optionCard, styles.disabledCard]}>
              <View style={styles.optionContent}>
                <View style={[
                  styles.optionIconContainer,
                  { backgroundColor: colors.gray[400] }
                ]}>
                  <Wallet size={24} color={colors.card} />
                </View>
                <View style={styles.optionInfo}>
                  <Text style={[styles.optionTitle, styles.disabledText]}>Billetera Crypto</Text>
                  <Text style={[styles.optionDescription, styles.disabledText]}>
                    Configura tu billetera en tu perfil para usar esta opción
                  </Text>
                </View>
              </View>
            </Card>
          )}
          
          {hasBankAccount ? (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => handleOptionSelect('bank')}
            >
              <Card 
                style={[
                  styles.optionCard,
                  selectedOption === 'bank' && styles.selectedCard
                ]}
              >
                <View style={styles.optionContent}>
                  <View style={[
                    styles.optionIconContainer,
                    { backgroundColor: colors.primary }
                  ]}>
                    <Building size={24} color={colors.card} />
                  </View>
                  <View style={styles.optionInfo}>
                    <Text style={styles.optionTitle}>Cuenta Bancaria</Text>
                    <Text style={styles.optionDescription}>
                      Retira fondos a tu cuenta bancaria registrada
                    </Text>
                  </View>
                </View>
              </Card>
            </TouchableOpacity>
          ) : (
            <Card style={[styles.optionCard, styles.disabledCard]}>
              <View style={styles.optionContent}>
                <View style={[
                  styles.optionIconContainer,
                  { backgroundColor: colors.gray[400] }
                ]}>
                  <Building size={24} color={colors.card} />
                </View>
                <View style={styles.optionInfo}>
                  <Text style={[styles.optionTitle, styles.disabledText]}>Cuenta Bancaria</Text>
                  <Text style={[styles.optionDescription, styles.disabledText]}>
                    Configura tu cuenta bancaria en tu perfil para usar esta opción
                  </Text>
                </View>
              </View>
            </Card>
          )}
          
          {!hasWalletAddress && !hasBankAccount && (
            <View style={styles.noMethodsContainer}>
              <Text style={styles.noMethodsText}>
                No tienes métodos de retiro configurados. Por favor, configura al menos uno en tu perfil.
              </Text>
              <Button
                title="Ir a mi perfil"
                onPress={() => router.push('/(tabs)/profile')}
                style={styles.profileButton}
              />
            </View>
          )}
          
          <View style={styles.amountContainer}>
            <Text style={styles.amountLabel}>Cantidad a retirar</Text>
            <View style={styles.amountInputContainer}>
              <Text style={styles.currencySymbol}>$</Text>
              <TextInput
                style={styles.amountInput}
                value={amount}
                onChangeText={handleAmountChange}
                placeholder="0.00"
                placeholderTextColor="rgba(255, 255, 255, 0.5)"
                keyboardType="numeric"
                maxLength={10}
              />
            </View>
            <Text style={styles.balanceText}>
              Saldo disponible: ${userBalance.toFixed(2)}
            </Text>
          </View>
          
          <View style={styles.footer}>
            <Button
              title="Solicitar retiro"
              onPress={handleWithdraw}
              disabled={!selectedOption || !amount || parseFloat(amount) <= 0 || parseFloat(amount) > userBalance || isLoading}
              isLoading={isLoading}
              rightIcon={<ArrowRight size={isSmallDevice ? 18 : 20} color={colors.textDark} />}
            />
            <Text style={styles.feeText}>
              Nota: Puede aplicarse una pequeña comisión por procesamiento.
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: '4%',
    paddingTop: 16,
  },
  optionCard: {
    marginBottom: 16,
    padding: 16,
  },
  selectedCard: {
    borderWidth: 2,
    borderColor: colors.primary,
  },
  disabledCard: {
    opacity: 0.6,
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  optionInfo: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  optionDescription: {
    fontSize: 14,
    color: colors.gray[500],
  },
  disabledText: {
    color: colors.gray[400],
  },
  noMethodsContainer: {
    marginVertical: 24,
    alignItems: 'center',
  },
  noMethodsText: {
    fontSize: 14,
    color: colors.warning,
    textAlign: 'center',
    marginBottom: 16,
  },
  profileButton: {
    minWidth: 150,
  },
  amountContainer: {
    marginTop: 16,
    marginBottom: 24,
  },
  amountLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textLight,
    marginBottom: 12,
  },
  amountInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  currencySymbol: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.textLight,
    marginRight: 8,
  },
  amountInput: {
    flex: 1,
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.textLight,
    paddingVertical: 12,
  },
  balanceText: {
    fontSize: 14,
    color: colors.gray[500],
    textAlign: 'right',
  },
  footer: {
    marginTop: 16,
    marginBottom: 32,
  },
  feeText: {
    fontSize: 12,
    color: colors.gray[500],
    textAlign: 'center',
    marginTop: 16,
  },
});