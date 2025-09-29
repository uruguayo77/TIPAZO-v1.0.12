import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar, SafeAreaView, useWindowDimensions } from 'react-native';
import { router, Stack } from 'expo-router';
import { colors } from '@/constants/colors';
import { Card } from '@/components/Card';
import { Smartphone, CreditCard, Bitcoin } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import { Platform } from 'react-native';
import { useLanguageStore } from '@/store/language-store';

export default function DepositMethodsScreen() {
  const { t } = useLanguageStore();
  const { width } = useWindowDimensions();
  const isSmallDevice = width < 375;

  const handleMethodSelect = (method: string) => {
    if (Platform.OS !== 'web') {
      Haptics.selectionAsync();
    }
    
    switch (method) {
      case 'pago-movil':
        router.push('/deposit-pago-movil');
        break;
      case 'card':
        router.push('/deposit-card');
        break;
      case 'crypto':
        router.push('/deposit-crypto');
        break;
      default:
        break;
    }
  };

  return (
    <>
      <Stack.Screen 
        options={{
          title: t('depositFundsTitle'),
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
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => handleMethodSelect('pago-movil')}
          >
            <Card style={styles.methodCard}>
              <View style={styles.methodContent}>
                <View style={[
                  styles.methodIconContainer,
                  { backgroundColor: colors.primary }
                ]}>
                  <Smartphone size={24} color={colors.card} />
                </View>
                <View style={styles.methodInfo}>
                  <Text style={styles.methodTitle}>{t('pagoMovil')}</Text>
                  <Text style={styles.methodDescription}>
                    {t('depositViaApp')}
                  </Text>
                </View>
              </View>
            </Card>
          </TouchableOpacity>
          
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => handleMethodSelect('card')}
          >
            <Card style={styles.methodCard}>
              <View style={styles.methodContent}>
                <View style={[
                  styles.methodIconContainer,
                  { backgroundColor: colors.primary }
                ]}>
                  <CreditCard size={24} color={colors.card} />
                </View>
                <View style={styles.methodInfo}>
                  <Text style={styles.methodTitle}>{t('creditDebitCard')}</Text>
                  <Text style={styles.methodDescription}>
                    {t('depositViaCard')}
                  </Text>
                </View>
              </View>
            </Card>
          </TouchableOpacity>
          
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => handleMethodSelect('crypto')}
          >
            <Card style={styles.methodCard}>
              <View style={styles.methodContent}>
                <View style={[
                  styles.methodIconContainer,
                  { backgroundColor: colors.primary }
                ]}>
                  <Bitcoin size={24} color={colors.card} />
                </View>
                <View style={styles.methodInfo}>
                  <Text style={styles.methodTitle}>{t('cryptocurrency')}</Text>
                  <Text style={styles.methodDescription}>
                    {t('depositViaCrypto')}
                  </Text>
                </View>
              </View>
            </Card>
          </TouchableOpacity>
          
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Todos los depósitos son procesados de forma segura y se reflejarán en tu saldo una vez confirmados.
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
  methodCard: {
    marginBottom: 16,
    padding: 16,
  },
  methodContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  methodIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  methodInfo: {
    flex: 1,
  },
  methodTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  methodDescription: {
    fontSize: 14,
    color: colors.gray[500],
  },
  footer: {
    marginTop: 24,
    marginBottom: 32,
    padding: 16,
  },
  footerText: {
    fontSize: 14,
    color: colors.textLight,
    textAlign: 'center',
    lineHeight: 20,
  },
});