import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  TouchableOpacity, 
  TextInput, 
  useWindowDimensions, 
  StatusBar, 
  Platform, 
  Modal,
  ScrollView,
  Keyboard,
  KeyboardAvoidingView
} from 'react-native';
import { router, useLocalSearchParams, useRootNavigationState } from 'expo-router';
import { colors } from '@/constants/colors';
import { Button } from '@/components/Button';
import { TipAmountSelector } from '@/components/TipAmountSelector';
import { AbstractTipAmountForm } from '@/components/AbstractTipAmountForm';
import { ArrowLeft, ArrowRight, Star, Wallet } from 'lucide-react-native';
import { useLanguageStore } from '@/store/language-store';
import { useAuthStore } from '@/store/auth-store';
import { useTipFlowStore } from '@/store/tip-flow-store';
import { useTipsStore } from '@/store/tips-store';
import { useSubscriptionStore } from '@/store/subscription-store';
import { CustomBackIcon } from '@/components/CustomBackIcon';
import { useExchangeRate } from '@/hooks/useExchangeRate';

export default function TipAmountScreen() {
  const params = useLocalSearchParams<{ workerId: string; name: string; occupation: string; profilePicture?: string }>();
  const rootNavigationState = useRootNavigationState();
  const { t } = useLanguageStore();
  const { width } = useWindowDimensions();
  const isSmallDevice = width < 375;
  const scrollViewRef = useRef<ScrollView>(null);
  
  // Get authentication state
  const { user, isAuthenticated } = useAuthStore();
  
  // Get tip flow state
  const { 
    tipAmount: savedTipAmount, 
    comment: savedComment, 
    commenterName: savedCommenterName, 
    rating: savedRating,
    isRedirectingFromLogin,
    setTipDetails,
    setWorkerDetails,
    clearTipFlow,
    setRedirectingFromLogin
  } = useTipFlowStore();
  
  // Get user's available balance
  const { getUserBalance, tips, deposits, withdrawals } = useTipsStore();
  const [userBalance, setUserBalance] = useState<number | undefined>(undefined);
  
  // Get subscription status
  const { status, checkSubscriptionStatus } = useSubscriptionStore();
  
  // Get exchange rate
  const { exchangeRate, loading: exchangeLoading } = useExchangeRate();
  
  // Extract worker details from params
  const { workerId, name, occupation, profilePicture } = params;
  
  // Initialize state with saved values or defaults
  const [tipAmount, setTipAmount] = useState<number | undefined>(savedTipAmount || undefined);
  const [comment, setComment] = useState(savedComment || '');
  const [commenterName, setCommenterName] = useState(savedCommenterName || '');
  const [rating, setRating] = useState<number>(savedRating !== undefined ? savedRating : 5);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Log component mounting for debugging
  useEffect(() => {
    console.log('TipAmountScreen mounted');
    console.log('Params:', { workerId, name, occupation });
    console.log('Saved tip details:', { 
      savedTipAmount, 
      savedComment, 
      savedCommenterName, 
      savedRating,
      isRedirectingFromLogin 
    });
    
    // Always save worker details from params when component mounts
    if (workerId && name) {
      console.log('Setting worker details from params');
      setWorkerDetails(workerId, name, occupation || '');
    }
    
    // Check subscription status
    checkSubscriptionStatus();
    
    // Return cleanup function
    return () => {
      console.log('TipAmountScreen unmounting');
      console.log('isRedirectingFromLogin:', isRedirectingFromLogin);
      
      // Only clear tip flow if not redirecting from login
      if (!isRedirectingFromLogin) {
        console.log('Clearing tip flow on unmount');
        clearTipFlow();
      }
    };
  }, [
    workerId, 
    name, 
    occupation, 
    savedTipAmount, 
    savedComment, 
    savedCommenterName, 
    savedRating, 
    isRedirectingFromLogin,
    setWorkerDetails,
    clearTipFlow,
    checkSubscriptionStatus
  ]);
  
  // Update balance whenever tips, deposits, or withdrawals change
  useEffect(() => {
    if (isAuthenticated && user) {
      const balance = getUserBalance(user.id);
      setUserBalance(balance);
    }
  }, [isAuthenticated, user, tips, deposits, withdrawals, getUserBalance]);
  
  // Pre-fill commenter name with user's name if available and not already set
  useEffect(() => {
    if (user && user.name && !commenterName && !savedCommenterName) {
      setCommenterName(user.name);
    }
  }, [user, commenterName, savedCommenterName]);
  
  // Save tip details when they change
  useEffect(() => {
    if (workerId) {
      console.log('Saving tip details:', { tipAmount, comment, commenterName, rating });
      setTipDetails(tipAmount, comment, commenterName, rating);
      console.log('Tip details saved to store with rating:', rating);
    }
  }, [tipAmount, comment, commenterName, rating, workerId, setTipDetails]);
  
  // Set up keyboard listeners
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
        // Scroll to comment input when keyboard appears
        setTimeout(() => {
          scrollViewRef.current?.scrollToEnd({ animated: true });
        }, 100);
      }
    );
    
    const keyboardDidHideListener = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);
  
  const handleBack = () => {
    if (rootNavigationState?.key) {
      router.back();
    }
  };

  const handleContinue = async () => {
    if (!tipAmount) {
      alert(t('selectTipAmount'));
      return;
    }
    
    // Check if user is authenticated
    if (!isAuthenticated) {
      // Show login modal
      setShowLoginModal(true);
      return;
    }
    
    // Check if user has enough balance
    if (userBalance !== undefined && tipAmount > userBalance) {
      alert("No tienes suficiente saldo para enviar esta propina. Por favor, recarga tu billetera.");
      return;
    }
    
    // Set loading state
    setIsLoading(true);
    
    try {
      // User is authenticated, proceed to payment
      await navigateToPayment();
    } catch (error) {
      console.error('Error navigating to payment:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const navigateToPayment = () => {
    if (rootNavigationState?.key) {
      router.push({
        pathname: '/(client)/payment',
        params: { 
          workerId, 
          name, 
          occupation,
          amount: tipAmount?.toString() || '',
          comment,
          commenterName,
          rating: rating.toString()
        }
      });
    }
  };
  
  const handleLogin = () => {
    // Save current tip details and set redirecting flag
    if (workerId) {
      console.log('Setting redirecting flag before login');
      setTipDetails(tipAmount, comment, commenterName, rating);
      setRedirectingFromLogin(true);
      
      // Close modal and navigate to login
      setShowLoginModal(false);
      
      setTimeout(() => {
        if (rootNavigationState?.key) {
          router.push('/(auth)/login');
        }
      }, 100);
    }
  };

  const handleSelectAmount = (amount: number) => {
    setTipAmount(amount);
  };

  const handleRating = (value: number) => {
    console.log('Rating changed to:', value);
    setRating(value);
  };

  return (
    <>
      <StatusBar backgroundColor={colors.background} barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {/* Back Button */}
          <View style={styles.backButtonContainer}>
            <TouchableOpacity style={styles.backButton} onPress={handleBack}>
              <CustomBackIcon size={32} color={colors.primary} />
            </TouchableOpacity>
          </View>
          
          {/* Abstract Tip Amount Form */}
          <AbstractTipAmountForm
          recipientName={name}
          recipientOccupation={occupation}
          recipientProfilePicture={profilePicture}
          senderName={user?.name}
          senderProfilePicture={user?.profilePicture}
          userBalance={isAuthenticated && userBalance !== undefined ? userBalance : undefined}
          exchangeRate={exchangeRate ?? undefined}
          exchangeLoading={exchangeLoading}
          tipAmount={tipAmount}
          rating={rating}
          comment={comment}
          commenterName={commenterName}
          onAmountChange={handleSelectAmount}
          onRatingChange={handleRating}
          onCommentChange={setComment}
          onNameChange={setCommenterName}
          onContinue={handleContinue}
          isLoading={isLoading}
        />
        </ScrollView>
        
        {/* Login Modal */}
        <Modal
          visible={showLoginModal}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setShowLoginModal(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>{t('authenticationRequired')}</Text>
              <Text style={styles.modalText}>{t('loginToSendTips')}</Text>
              
              <View style={styles.modalButtons}>
                <TouchableOpacity 
                  style={styles.modalCancelButton}
                  onPress={() => setShowLoginModal(false)}
                >
                  <Text style={styles.modalCancelButtonText}>{t('cancel')}</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.modalLoginButton}
                  onPress={handleLogin}
                >
                  <Text style={styles.modalLoginButtonText}>{t('login')}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
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
  backButtonContainer: {
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 8,
  },
  backButton: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  recipientInfo: {
    marginBottom: '4%',
    marginTop: 20, // Отступ от кнопки назад
  },
  recipientLabel: {
    fontSize: 14,
    color: colors.textLight,
    marginBottom: 4,
  },
  recipientName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.textLight,
    marginBottom: 4,
  },
  recipientNameSmall: {
    fontSize: 20,
  },
  recipientOccupation: {
    fontSize: 16,
    color: colors.textLight,
  },
  balanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: '4%',
  },
  balanceLabel: {
    fontSize: 14,
    color: colors.textLight,
    marginLeft: 6,
  },
  balanceAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primary,
  },
  ratingContainer: {
    marginVertical: '4%',
  },
  ratingTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    color: colors.textLight,
  },
  ratingTitleSmall: {
    fontSize: 16,
  },
  starsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
  },
  starButton: {
    padding: 4,
  },
  commentContainer: {
    marginVertical: '4%',
  },
  commentTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    color: colors.textLight,
  },
  commentTitleSmall: {
    fontSize: 16,
  },
  commentInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 8,
    padding: 12,
    height: 100,
    textAlignVertical: 'top',
    fontSize: 16,
    color: colors.textLight,
    marginBottom: 16,
  },
  nameTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    color: colors.textLight,
  },
  nameTitleSmall: {
    fontSize: 14,
  },
  nameInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 8,
    padding: 12,
    height: 50,
    fontSize: 16,
    color: colors.textLight,
  },
  footer: {
    padding: '4%',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.2)',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 24,
    width: '90%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.textDark,
    marginBottom: 12,
    textAlign: 'center',
  },
  modalText: {
    fontSize: 16,
    color: colors.textDark,
    marginBottom: 24,
    textAlign: 'center',
    lineHeight: 22,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    gap: 12,
  },
  modalCancelButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.gray[300],
    alignItems: 'center',
    backgroundColor: colors.gray[100],
  },
  modalCancelButtonText: {
    color: colors.textDark,
    fontSize: 16,
    fontWeight: '500',
  },
  modalLoginButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    backgroundColor: colors.primary,
    alignItems: 'center',
  },
  modalLoginButtonText: {
    color: colors.textDark,
    fontSize: 16,
    fontWeight: '600',
  },
  keyboardSpacer: {
    height: 120, // Extra space when keyboard is visible
  },
});