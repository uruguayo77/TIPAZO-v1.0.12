import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, SafeAreaView, StatusBar } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { colors } from '@/constants/colors';
import { AbstractPaymentForm } from '@/components/AbstractPaymentForm';
import { useTipFlowStore } from '@/store/tip-flow-store';
import { useTipsStore } from '@/store/tips-store';
import { useAuthStore } from '@/store/auth-store';
import { Worker } from '@/types';
import { useLanguageStore } from '@/store/language-store';
import { useCustomAlert } from '@/components/CustomAlert';
import { supabase } from '@/lib/supabase';

export default function PaymentScreen() {
  const { workerId, amount: urlAmount, comment: urlComment, rating: urlRating } = useLocalSearchParams<{ 
    workerId: string;
    amount?: string;
    comment?: string;
    rating?: string;
  }>();
  const { t } = useLanguageStore();
  const { amount: storeAmount, comment: storeComment, rating: storeRating } = useTipFlowStore();
  const { sendTip, isLoading, getUserBalance } = useTipsStore();
  const { user } = useAuthStore();
  const { showAlert, AlertComponent } = useCustomAlert();
  
  // Use store data if available, otherwise fallback to URL params
  const amount = storeAmount || (urlAmount ? parseFloat(urlAmount) : undefined);
  const comment = storeComment || urlComment || '';
  const rating = storeRating !== undefined ? storeRating : (urlRating ? parseInt(urlRating) : 5);
  
  // Debug logging
  console.log('Payment screen data:', { 
    storeAmount, storeComment, storeRating,
    urlAmount, urlComment, urlRating,
    finalAmount: amount, finalComment: comment, finalRating: rating,
    workerId 
  });
  
  const [worker, setWorker] = useState<Worker | null>(null);
  const [workerProfilePicture, setWorkerProfilePicture] = useState<string | undefined>(undefined);
  const [senderProfilePicture, setSenderProfilePicture] = useState<string | undefined>(undefined);
  const [senderName, setSenderName] = useState<string | undefined>(undefined);
  const [isPaymentProcessing, setIsPaymentProcessing] = useState(false);
  const [isPaymentComplete, setIsPaymentComplete] = useState(false);
  const [userBalance, setUserBalance] = useState(0);
  
  useEffect(() => {
    const fetchWorkerDetails = async () => {
      if (workerId) {
        try {
          // Fetch real worker details from Supabase
          const { data: workerData, error } = await supabase
            .from('tipazo_users')
            .select('id, name, email, profile_picture')
            .eq('id', workerId)
            .single();
            
          if (error) {
            console.error('Error fetching worker details:', error);
            // Fallback to basic worker info
            const fallbackWorker: Worker = {
              id: workerId,
              name: 'Destinatario',
              email: '',
              userType: 'worker',
              createdAt: new Date().toISOString(),
              totalEarnings: 0,
              qrCode: '',
            };
            setWorker(fallbackWorker);
          } else if (workerData) {
            const worker: Worker = {
              id: workerData.id,
              name: workerData.name || 'Destinatario',
              email: workerData.email || '',
              userType: 'worker',
              createdAt: workerData.created_at,
              totalEarnings: 0,
              qrCode: '',
            };
            setWorker(worker);
            setWorkerProfilePicture(workerData.profile_picture);
          }
        } catch (error) {
          console.error('Error in fetchWorkerDetails:', error);
        }
      }
    };
    
    fetchWorkerDetails();
    
    // Fetch sender details
    const fetchSenderDetails = async () => {
      if (user) {
        try {
          const { data: senderData, error } = await supabase
            .from('tipazo_users')
            .select('name, profile_picture')
            .eq('id', user.id)
            .single();
            
          if (error) {
            console.error('Error fetching sender details:', error);
            // Fallback to store data
            setSenderName(user.name);
            setSenderProfilePicture(user.profilePicture);
          } else if (senderData) {
            setSenderName(senderData.name);
            setSenderProfilePicture(senderData.profile_picture);
          }
          
          const balance = getUserBalance(user.id);
          setUserBalance(balance);
        } catch (error) {
          console.error('Error in fetchSenderDetails:', error);
          // Fallback to store data
          setSenderName(user.name);
          setSenderProfilePicture(user.profilePicture);
        }
      }
    };
    
    fetchSenderDetails();
  }, [workerId, user, getUserBalance]);
  
  const handleBack = () => {
    router.back();
  };

  const handleCancelPayment = () => {
    router.back();
  };
  
  const handleConfirmPayment = async () => {
    if (!worker || !user) return;
    
    const tipAmount = parseFloat(amount);
    if (userBalance < tipAmount) {
      showAlert(
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
      showAlert(
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
        <AbstractPaymentForm
          workerName={worker.name}
          amount={parseFloat(amount)}
          userBalance={userBalance}
          rating={rating}
          comment={comment}
          senderName={senderName}
          senderProfilePicture={senderProfilePicture}
          recipientProfilePicture={workerProfilePicture}
          onBack={handleBack}
          onConfirmPayment={handleConfirmPayment}
          onCancelPayment={handleCancelPayment}
          isPaymentProcessing={isPaymentProcessing}
          isPaymentComplete={isPaymentComplete}
          isDisabled={isPaymentProcessing || parseFloat(amount) > userBalance}
        />
      </SafeAreaView>
      <AlertComponent />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
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
});