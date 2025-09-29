import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert, Platform, useWindowDimensions, StatusBar, SafeAreaView } from 'react-native';
import { router, Stack } from 'expo-router';
import { colors } from '@/constants/colors';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { QRCode } from '@/components/QRCode';
import { useTipsStore } from '@/store/tips-store';
import { useAuthStore } from '@/store/auth-store';
import { Copy, Check, ArrowRight } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import { useLanguageStore } from '@/store/language-store';
import * as Clipboard from 'expo-clipboard';

export default function DepositCryptoScreen() {
  const { user } = useAuthStore();
  const { addToBalance, isLoading } = useTipsStore();
  const { t } = useLanguageStore();
  const { width } = useWindowDimensions();
  const isSmallDevice = width < 375;
  
  const [amount, setAmount] = useState('');
  const [cryptoAmount, setCryptoAmount] = useState('0.0000');
  const [copied, setCopied] = useState<{[key: string]: boolean}>({
    amount: false,
    address: false
  });
  
  // TODO: Replace with real wallet address from API or admin settings
  const walletAddress = 'N/A';
  
  useEffect(() => {
    if (amount && !isNaN(parseFloat(amount))) {
      // TODO: Replace with real conversion rate API
      const convertedAmount = parseFloat(amount);
      setCryptoAmount(convertedAmount.toFixed(4));
    } else {
      setCryptoAmount('0.0000');
    }
  }, [amount]);

  const handleAmountChange = (text: string) => {
    const filtered = text.replace(/[^0-9.]/g, '');
    const parts = filtered.split('.');
    if (parts.length > 2) {
      return;
    }
    if (parts.length > 1 && parts[1].length > 2) {
      return;
    }
    setAmount(filtered);
  };

  const copyToClipboard = async (text: string, field: string) => {
    try {
      await Clipboard.setStringAsync(text);
      if (Platform.OS !== 'web') {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      }
      setCopied(prev => ({
        ...prev,
        [field]: true
      }));
      setTimeout(() => {
        setCopied(prev => ({
          ...prev,
          [field]: false
        }));
      }, 2000);
    } catch (error) {
      console.error('Error copying to clipboard:', error);
      Alert.alert('Error', 'No se pudo copiar al portapapeles');
    }
  };

  const handleDeposit = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      Alert.alert('Error', 'Por favor ingresa una cantidad válida');
      return;
    }
    
    if (Platform.OS !== 'web') {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
    
    try {
      const depositAmount = parseFloat(amount);
      await addToBalance(user?.id || '', depositAmount, 'crypto', 'Depósito vía USDT (TRC20)');
      
      Alert.alert(
        t('cryptoDepositRegistered'),
        t('cryptoDepositConfirmation'),
        [
          {
            text: 'OK',
            onPress: () => router.replace('/(tabs)'),
          },
        ]
      );
    } catch (error) {
      console.error('Deposit error:', error);
      Alert.alert('Error', 'No se pudo procesar tu depósito. Por favor intenta de nuevo.');
    }
  };

  const getQRData = () => {
    return walletAddress;
  };

  return (
    <>
      <Stack.Screen 
        options={{
          title: 'USDT (TRC20)',
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
          <Card style={styles.stepCard}>
            <Text style={styles.stepTitle}>{t('step2EnterAmount')}</Text>
            <View style={styles.amountContainer}>
              <Text style={styles.amountLabel}>{t('depositAmount')}</Text>
              <View style={styles.amountInputContainer}>
                <Text style={styles.currencySymbol}>$</Text>
                <TextInput
                  style={styles.amountInput}
                  value={amount}
                  onChangeText={handleAmountChange}
                  placeholder="0.00"
                  placeholderTextColor="rgba(0, 0, 0, 0.5)"
                  keyboardType="numeric"
                  maxLength={10}
                />
              </View>
            </View>
          </Card>
          
          {amount && parseFloat(amount) > 0 && (
            <>
              <Card style={styles.stepCard}>
                <Text style={styles.stepTitle}>{t('step3SendPayment')}</Text>
                
                <View style={styles.infoItemContainer}>
                  <View style={styles.infoItem}>
                    <Text style={styles.infoLabel}>{t('exactAmountToSend')}</Text>
                    <Text style={styles.infoValue}>{cryptoAmount} USDT</Text>
                  </View>
                  <TouchableOpacity 
                    style={styles.copyButton}
                    onPress={() => copyToClipboard(cryptoAmount, 'amount')}
                  >
                    {copied.amount ? (
                      <Check size={20} color={colors.success} />
                    ) : (
                      <Copy size={20} color={colors.primary} />
                    )}
                  </TouchableOpacity>
                </View>
                
                <Text style={styles.qrLabel}>{t('scanQRToPay')}</Text>
                
                <View style={styles.qrContainer}>
                  <QRCode
                    value={getQRData()}
                    size={200}
                    color="#000000"
                    backgroundColor="#FFFFFF"
                  />
                </View>
                
                <View style={styles.infoItemContainer}>
                  <View style={styles.infoItem}>
                    <Text style={styles.infoLabel}>{t('fullAddress')}</Text>
                    <Text style={styles.infoValue}>{walletAddress}</Text>
                  </View>
                  <TouchableOpacity 
                    style={styles.copyButton}
                    onPress={() => copyToClipboard(walletAddress, 'address')}
                  >
                    {copied.address ? (
                      <Check size={20} color={colors.success} />
                    ) : (
                      <Copy size={20} color={colors.primary} />
                    )}
                  </TouchableOpacity>
                </View>
                
                <Text style={styles.noteText}>
                  {t('cryptoDepositNote')}
                </Text>
              </Card>
              
              <View style={styles.footer}>
                <Button
                  title={t('deposit')}
                  onPress={handleDeposit}
                  disabled={!amount || parseFloat(amount) <= 0 || isLoading}
                  isLoading={isLoading}
                  rightIcon={<ArrowRight size={isSmallDevice ? 18 : 20} color={colors.textDark} />}
                />
              </View>
            </>
          )}
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
    paddingBottom: 40,
  },
  stepCard: {
    marginBottom: 24,
    padding: 20,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 16,
  },
  amountContainer: {
    marginBottom: 8,
  },
  amountLabel: {
    fontSize: 14,
    color: colors.gray[600],
    marginBottom: 8,
  },
  amountInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.gray[100],
    borderRadius: 8,
    paddingHorizontal: 16,
  },
  currencySymbol: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    marginRight: 8,
  },
  amountInput: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    paddingVertical: 12,
  },
  infoItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[200],
  },
  infoItem: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 14,
    color: colors.gray[600],
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  copyButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.gray[100],
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
  qrLabel: {
    fontSize: 14,
    color: colors.text,
    marginBottom: 16,
    textAlign: 'center',
  },
  qrContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    padding: 16,
    backgroundColor: colors.white,
    borderRadius: 12,
  },
  noteText: {
    fontSize: 14,
    color: colors.text,
    marginTop: 16,
    lineHeight: 20,
  },
  footer: {
    marginBottom: 32,
  },
});