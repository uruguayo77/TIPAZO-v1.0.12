import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert, Platform, useWindowDimensions, StatusBar, SafeAreaView } from 'react-native';
import { router, Stack } from 'expo-router';
import { colors } from '@/constants/colors';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { useTipsStore } from '@/store/tips-store';
import { useAuthStore } from '@/store/auth-store';
import { Copy, Check, ArrowRight } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import { useLanguageStore } from '@/store/language-store';
import * as Clipboard from 'expo-clipboard';

export default function DepositPagoMovilScreen() {
  const { user } = useAuthStore();
  const { addToBalance, isLoading } = useTipsStore();
  const { t } = useLanguageStore();
  const { width } = useWindowDimensions();
  const isSmallDevice = width < 375;
  
  const [amount, setAmount] = useState('');
  const [copied, setCopied] = useState<{[key: string]: boolean}>({
    cedula: false,
    telefono: false,
    banco: false
  });
  
  // TODO: Replace with real payment information from API or admin settings
  const pagoMovilInfo = {
    cedula: 'N/A',
    telefono: 'N/A',
    banco: 'N/A'
  };

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

  const handleConfirmPayment = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      Alert.alert('Error', 'Por favor ingresa una cantidad válida');
      return;
    }
    
    if (Platform.OS !== 'web') {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
    
    try {
      const depositAmount = parseFloat(amount);
      await addToBalance(user?.id || '', depositAmount, 'pago_movil', 'Depósito vía Pago Móvil');
      
      Alert.alert(
        t('depositConfirmed'),
        t('depositRegistered'),
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

  return (
    <>
      <Stack.Screen 
        options={{
          title: 'Pago Móvil',
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
          <Card style={styles.infoCard}>
            <Text style={styles.infoText}>
              {t('pagoMovilInstructions')}
            </Text>
            
            <View style={styles.infoItemContainer}>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>{t('cedula')}:</Text>
                <Text style={styles.infoValue}>{pagoMovilInfo.cedula}</Text>
              </View>
              <TouchableOpacity 
                style={styles.copyButton}
                onPress={() => copyToClipboard(pagoMovilInfo.cedula, 'cedula')}
              >
                {copied.cedula ? (
                  <Check size={20} color={colors.success} />
                ) : (
                  <Copy size={20} color={colors.primary} />
                )}
              </TouchableOpacity>
            </View>
            
            <View style={styles.infoItemContainer}>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>{t('telefono')}:</Text>
                <Text style={styles.infoValue}>{pagoMovilInfo.telefono}</Text>
              </View>
              <TouchableOpacity 
                style={styles.copyButton}
                onPress={() => copyToClipboard(pagoMovilInfo.telefono, 'telefono')}
              >
                {copied.telefono ? (
                  <Check size={20} color={colors.success} />
                ) : (
                  <Copy size={20} color={colors.primary} />
                )}
              </TouchableOpacity>
            </View>
            
            <View style={styles.infoItemContainer}>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>{t('banco')}:</Text>
                <Text style={styles.infoValue}>{pagoMovilInfo.banco}</Text>
              </View>
              <TouchableOpacity 
                style={styles.copyButton}
                onPress={() => copyToClipboard(pagoMovilInfo.banco, 'banco')}
              >
                {copied.banco ? (
                  <Check size={20} color={colors.success} />
                ) : (
                  <Copy size={20} color={colors.primary} />
                )}
              </TouchableOpacity>
            </View>
          </Card>
          
          <View style={styles.amountContainer}>
            <Text style={styles.amountLabel}>{t('depositAmount')}</Text>
            <View style={styles.amountInputContainer}>
              <Text style={styles.currencySymbol}>Bs.</Text>
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
          </View>
          
          <Text style={styles.noteText}>
            {t('afterPaymentNote')}
          </Text>
          
          <View style={styles.footer}>
            <Button
              title={t('confirmPayment')}
              onPress={handleConfirmPayment}
              disabled={!amount || parseFloat(amount) <= 0 || isLoading}
              isLoading={isLoading}
              rightIcon={<ArrowRight size={isSmallDevice ? 18 : 20} color={colors.textDark} />}
            />
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
  infoCard: {
    marginBottom: 24,
    padding: 20,
  },
  infoText: {
    fontSize: 14,
    color: colors.text,
    marginBottom: 20,
    lineHeight: 20,
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
  amountContainer: {
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
  noteText: {
    fontSize: 14,
    color: colors.textLight,
    marginBottom: 24,
    lineHeight: 20,
    textAlign: 'center',
  },
  footer: {
    marginBottom: 32,
  },
});