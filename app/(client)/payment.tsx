import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, ActivityIndicator, SafeAreaView, StatusBar } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { colors } from '@/constants/colors';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { ArrowLeft, CheckCircle } from 'lucide-react-native';
import { useTipFlowStore } from '@/store/tip-flow-store';
import { useTipsStore } from '@/store/tips-store';
import { useAuthStore } from '@/store/auth-store';
import { Worker } from '@/types';
import { useLanguageStore } from '@/store/language-store';

export default function PaymentScreen() {
  const { workerId } = useLocalSearchParams<{ workerId: string }>();
  const { t } = useLanguageStore();
  const { amount, comment, rating } = useTipFlowStore();
  const { sendTip, isLoading, getUserBalance } = useTipsStore();
  const { user } = useAuthStore();
  
  const [worker, setWorker] = useState<Worker | null>(null);
  const [isPaymentProcessing, setIsPaymentProcessing] = useState(false);
  const [isPaymentComplete, setIsPaymentComplete] = useState(false);
  const [userBalance, setUserBalance] = useState(0);
  
  useEffect(() => {
    if (workerId) {
      // TODO: Replace with real API call to fetch worker details
      // const workerData = await api.getWorkerDetails(workerId);
      // For now, use a placeholder worker
      const placeholderWorker: Worker = {
        id: workerId,
        name: 'Destinatario',
        email: '',
        userType: 'worker',
        createdAt: new Date().toISOString(),
        totalEarnings: 0,
        qrCode: '',
      };
      setWorker(placeholderWorker);
    }
    
    if (user) {
      const balance = getUserBalance(user.id);
      setUserBalance(balance);
    }
  }, [workerId, user, getUserBalance]);
  
  const handleBack = () => {
    router.back();
  };
  
  const handleConfirmPayment = async () => {
    if (!worker || !user) return;
    
    const tipAmount = parseFloat(amount);
    if (userBalance < tipAmount) {
      Alert.alert(
        'Saldo insuficiente',
        'No tienes suficiente saldo para enviar esta propina. Por favor, recarga tu billetera.'
      );
      return;
    }
    
    setIsPaymentProcessing(true);
    
    try {
      await sendTip(user.id, worker.id, parseFloat(amount), comment, rating);
      
      const newBalance = getUserBalance(user.id);
      setUserBalance(newBalance);
      
      setIsPaymentComplete(true);
      
      setTimeout(() => {
        router.replace({
          pathname: '/(client)/confirmation',
          params: { 
            amount, 
            workerName: worker.name,
            workerId: worker.id
          }
        });
      }, 1500);
    } catch (error) {
      console.error('Payment error:', error);
      Alert.alert(
        'Error',
        'No se pudo procesar el pago. Por favor, inténtalo de nuevo.'
      );
      setIsPaymentProcessing(false);
    }
  };
  
  if (!worker) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.loadingText}>{t('loading')}</Text>
        </View>
      </SafeAreaView>
    );
  }
  
  return (
    <>
      <StatusBar backgroundColor={colors.background} barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack} disabled={isPaymentProcessing}>
            <ArrowLeft size={24} color={colors.textLight} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{t('payment')}</Text>
          <View style={styles.placeholder} />
        </View>
        
        <ScrollView 
          style={styles.content}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          <Card style={styles.summaryCard}>
            <Text style={styles.summaryTitle}>Confirmación de propina</Text>
            
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Destinatario:</Text>
              <Text style={styles.summaryValue}>{worker.name}</Text>
            </View>
            
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Monto:</Text>
              <Text style={styles.summaryValue}>${amount}</Text>
            </View>
            
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Tu saldo:</Text>
              <Text style={styles.summaryValue}>${userBalance.toFixed(2)}</Text>
            </View>
            
            {rating > 0 && (
              <View style={styles.summaryItem}>
                <Text style={styles.summaryLabel}>Valoración:</Text>
                <Text style={styles.summaryValue}>{rating} estrellas</Text>
              </View>
            )}
            
            {comment ? (
              <View style={styles.commentContainer}>
                <Text style={styles.commentLabel}>Comentario incluido:</Text>
                <Text style={styles.commentText}>"{comment}"</Text>
              </View>
            ) : (
              <View style={styles.commentContainer}>
                <Text style={styles.commentLabel}>No has incluido ningún comentario.</Text>
              </View>
            )}
            
            <Text style={styles.confirmationQuestion}>
              ¿Deseas confirmar esta propina?
            </Text>
          </Card>
        </ScrollView>
        
        <View style={styles.footer}>
          <Button
            title={
              isPaymentProcessing 
                ? isPaymentComplete 
                  ? "¡Pago completado!" 
                  : t('processingPayment')
                : t('confirmPayment')
            }
            onPress={handleConfirmPayment}
            isLoading={isPaymentProcessing && !isPaymentComplete}
            disabled={isPaymentProcessing || parseFloat(amount) > userBalance}
            leftIcon={
              isPaymentComplete 
                ? <CheckCircle size={20} color={colors.textDark} /> 
                : undefined
            }
          />
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingTop: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textLight,
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 100,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: colors.textLight,
  },
  summaryCard: {
    padding: 20,
    marginBottom: 20,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 16,
    textAlign: 'center',
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 16,
    color: colors.gray[600],
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  commentContainer: {
    marginTop: 8,
    padding: 12,
    backgroundColor: colors.gray[100],
    borderRadius: 8,
  },
  commentLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.gray[700],
    marginBottom: 4,
  },
  commentText: {
    fontSize: 16,
    color: colors.text,
    fontStyle: 'italic',
  },
  confirmationQuestion: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginTop: 20,
    textAlign: 'center',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.1)',
  },
});