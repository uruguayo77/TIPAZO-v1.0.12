import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert, Platform, useWindowDimensions, StatusBar, SafeAreaView } from 'react-native';
import { router, Stack } from 'expo-router';
import { colors } from '@/constants/colors';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { useTipsStore } from '@/store/tips-store';
import { useAuthStore } from '@/store/auth-store';
import { CreditCard, User, ArrowRight } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import { useLanguageStore } from '@/store/language-store';

export default function DepositCardScreen() {
  const { user } = useAuthStore();
  const { addToBalance, isLoading } = useTipsStore();
  const { t } = useLanguageStore();
  const { width } = useWindowDimensions();
  const isSmallDevice = width < 375;
  
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardholderName, setCardholderName] = useState('');
  const [amount, setAmount] = useState('');
  
  const handleCardNumberChange = (text: string) => {
    // Remove non-numeric characters
    const cleaned = text.replace(/\D/g, '');
    
    // Format with spaces every 4 digits
    let formatted = '';
    for (let i = 0; i < cleaned.length; i++) {
      if (i > 0 && i % 4 === 0) {
        formatted += ' ';
      }
      formatted += cleaned[i];
    }
    
    // Limit to 19 characters (16 digits + 3 spaces)
    if (formatted.length <= 19) {
      setCardNumber(formatted);
    }
  };

  const handleExpiryDateChange = (text: string) => {
    // Remove non-numeric characters
    const cleaned = text.replace(/\D/g, '');
    
    // Format as MM/YY
    if (cleaned.length <= 2) {
      setExpiryDate(cleaned);
    } else {
      setExpiryDate(`${cleaned.substring(0, 2)}/${cleaned.substring(2, 4)}`);
    }
  };

  const handleCvvChange = (text: string) => {
    // Remove non-numeric characters and limit to 3-4 digits
    const cleaned = text.replace(/\D/g, '');
    if (cleaned.length <= 4) {
      setCvv(cleaned);
    }
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

  const validateCardNumber = () => {
    const cleaned = cardNumber.replace(/\s/g, '');
    return cleaned.length === 16;
  };

  const validateExpiryDate = () => {
    if (expiryDate.length !== 5) return false;
    
    const [month, year] = expiryDate.split('/');
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear() % 100; // Get last 2 digits
    const currentMonth = currentDate.getMonth() + 1; // January is 0
    
    const expMonth = parseInt(month, 10);
    const expYear = parseInt(year, 10);
    
    // Check if month is valid
    if (expMonth < 1 || expMonth > 12) return false;
    
    // Check if card is expired
    if (expYear < currentYear || (expYear === currentYear && expMonth < currentMonth)) {
      return false;
    }
    
    return true;
  };

  const validateCvv = () => {
    return cvv.length >= 3 && cvv.length <= 4;
  };

  const validateCardholderName = () => {
    return cardholderName.trim().length > 0;
  };

  const validateAmount = () => {
    return amount && parseFloat(amount) > 0;
  };

  const handleDeposit = async () => {
    // Validate all fields
    if (!validateCardNumber()) {
      Alert.alert('Error', t('invalidCardNumber'));
      return;
    }
    
    if (!validateExpiryDate()) {
      Alert.alert('Error', t('invalidExpiryDate'));
      return;
    }
    
    if (!validateCvv()) {
      Alert.alert('Error', t('invalidCVV'));
      return;
    }
    
    if (!validateCardholderName()) {
      Alert.alert('Error', t('nameRequired'));
      return;
    }
    
    if (!validateAmount()) {
      Alert.alert('Error', t('invalidAmount'));
      return;
    }
    
    if (Platform.OS !== 'web') {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
    
    try {
      const depositAmount = parseFloat(amount);
      
      // Add to balance
      await addToBalance(user?.id || '', depositAmount, 'card', 'Depósito vía Tarjeta');
      
      Alert.alert(
        t('depositSuccess'),
        t('amountDeposited').replace('{{amount}}', depositAmount.toFixed(2)),
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
          title: t('creditDebitCard'),
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
          <Card style={styles.cardForm}>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>{t('cardNumber')}</Text>
              <View style={styles.inputWrapper}>
                <CreditCard size={20} color={colors.gray[500]} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  value={cardNumber}
                  onChangeText={handleCardNumberChange}
                  placeholder="1234 5678 9012 3456"
                  placeholderTextColor={colors.gray[400]}
                  keyboardType="numeric"
                  maxLength={19}
                />
              </View>
            </View>
            
            <View style={styles.rowContainer}>
              <View style={[styles.inputContainer, { flex: 1, marginRight: 8 }]}>
                <Text style={styles.inputLabel}>{t('expiryDate')}</Text>
                <View style={styles.inputWrapper}>
                  <TextInput
                    style={styles.input}
                    value={expiryDate}
                    onChangeText={handleExpiryDateChange}
                    placeholder="MM/YY"
                    placeholderTextColor={colors.gray[400]}
                    keyboardType="numeric"
                    maxLength={5}
                  />
                </View>
              </View>
              
              <View style={[styles.inputContainer, { flex: 1, marginLeft: 8 }]}>
                <Text style={styles.inputLabel}>{t('cvv')}</Text>
                <View style={styles.inputWrapper}>
                  <TextInput
                    style={styles.input}
                    value={cvv}
                    onChangeText={handleCvvChange}
                    placeholder="123"
                    placeholderTextColor={colors.gray[400]}
                    keyboardType="numeric"
                    maxLength={4}
                    secureTextEntry={true}
                  />
                </View>
              </View>
            </View>
            
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>{t('cardholderName')}</Text>
              <View style={styles.inputWrapper}>
                <User size={20} color={colors.gray[500]} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  value={cardholderName}
                  onChangeText={setCardholderName}
                  placeholder="NOMBRE APELLIDO"
                  placeholderTextColor={colors.gray[400]}
                  autoCapitalize="characters"
                />
              </View>
            </View>
            
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>{t('depositAmount')}</Text>
              <View style={styles.inputWrapper}>
                <Text style={styles.currencySymbol}>$</Text>
                <TextInput
                  style={styles.input}
                  value={amount}
                  onChangeText={handleAmountChange}
                  placeholder="0.00"
                  placeholderTextColor={colors.gray[400]}
                  keyboardType="numeric"
                />
              </View>
            </View>
            
            <Text style={styles.securityNote}>
              {t('securityNote')}
            </Text>
          </Card>
          
          <View style={styles.footer}>
            <Button
              title={t('deposit')}
              onPress={handleDeposit}
              disabled={
                !validateCardNumber() ||
                !validateExpiryDate() ||
                !validateCvv() ||
                !validateCardholderName() ||
                !validateAmount() ||
                isLoading
              }
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
  cardForm: {
    marginBottom: 24,
    padding: 20,
  },
  inputContainer: {
    marginBottom: 16,
  },
  rowContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    color: colors.gray[600],
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.gray[300],
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: colors.white,
  },
  inputIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
    paddingVertical: 12,
  },
  currencySymbol: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.gray[600],
    marginRight: 8,
  },
  securityNote: {
    fontSize: 12,
    color: colors.gray[500],
    marginTop: 8,
    textAlign: 'center',
  },
  footer: {
    marginBottom: 32,
  },
});