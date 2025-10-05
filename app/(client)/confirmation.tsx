import React from 'react';
import { View, StyleSheet, SafeAreaView, useWindowDimensions, StatusBar } from 'react-native';
import { router, useLocalSearchParams, useRootNavigationState } from 'expo-router';
import { colors } from '@/constants/colors';
import { AbstractConfirmationForm } from '@/components/AbstractConfirmationForm';
import { useLanguageStore } from '@/store/language-store';

export default function ConfirmationScreen() {
  const params = useLocalSearchParams<{ 
    workerId: string; 
    name: string; 
    amount: string;
  }>();
  
  const { name, amount } = params;
  const rootNavigationState = useRootNavigationState();
  const { t } = useLanguageStore();
  const { width } = useWindowDimensions();
  const isSmallDevice = width < 375;

  const handleScanAgain = () => {
    if (rootNavigationState?.key) {
      router.push('/(client)/scan');
    }
  };

  const handleHome = () => {
    if (rootNavigationState?.key) {
      router.push('/(auth)/welcome');
    }
  };

  return (
    <>
      <StatusBar backgroundColor={colors.background} barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <AbstractConfirmationForm
          recipientName={name || ''}
          amount={amount || ''}
          onScanAgain={handleScanAgain}
          onGoHome={handleHome}
          isSmallDevice={isSmallDevice}
        />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});