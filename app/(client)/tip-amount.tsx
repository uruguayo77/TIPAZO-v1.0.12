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
import { ArrowLeft, ArrowRight, Star, Wallet } from 'lucide-react-native';
import { useLanguageStore } from '@/store/language-store';
import { useAuthStore } from '@/store/auth-store';
import { useTipFlowStore } from '@/store/tip-flow-store';
import { useTipsStore } from '@/store/tips-store';
import { useSubscriptionStore } from '@/store/subscription-store';

export default function TipAmountScreen() {
  const params = useLocalSearchParams<{ workerId: string; name: string; occupation: string }>();
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
  
  // Extract worker details from params
  const { workerId, name, occupation } = params;
  
  // Initialize state with saved values or defaults
  const [tipAmount, setTipAmount] = useState<number | undefined>(savedTipAmount || undefined);
  const [comment, setComment] = useState(savedComment || '');
  const [commenterName, setCommenterName] = useState(savedCommenterName || '');
  const [rating, setRating] = useState<number>(savedRating || 5);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  
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

  const handleContinue = () => {
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
    
    // User is authenticated, proceed to payment
    navigateToPayment();
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
    setRating(value);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={colors.background} barStyle="dark-content" />
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <ArrowLeft size={24} color={colors.textLight} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, isSmallDevice && styles.headerTitleSmall]}>{t('tipAmount')}</Text>
        <View style={styles.placeholder} />
      </View>
      
      <KeyboardAvoidingView 
        style={styles.keyboardAvoidingContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
      >
        <ScrollView 
          ref={scrollViewRef}
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.recipientInfo}>
            <Text style={styles.recipientLabel}>Propina para</Text>
            <Text style={[styles.recipientName, isSmallDevice && styles.recipientNameSmall]}>{name}</Text>
            <Text style={styles.recipientOccupation}>{occupation}</Text>
          </View>
          
          {/* User's available balance - only shown when authenticated */}
          {isAuthenticated && userBalance !== undefined && (
            <View style={styles.balanceContainer}>
              <Wallet size={16} color={colors.textLight} />
              <Text style={styles.balanceLabel}>Saldo disponible: </Text>
              <Text style={styles.balanceAmount}>${userBalance.toFixed(2)}</Text>
            </View>
          )}
          
          <TipAmountSelector onSelectAmount={handleSelectAmount} initialAmount={tipAmount} />
          
          <View style={styles.ratingContainer}>
            <Text style={[styles.ratingTitle, isSmallDevice && styles.ratingTitleSmall]}>{t('rateYourExperience')}</Text>
            <View style={styles.starsContainer}>
              {[1, 2, 3, 4, 5].map((star) => (
                <TouchableOpacity
                  key={star}
                  onPress={() => handleRating(star)}
                  style={styles.starButton}
                >
                  <Star 
                    size={isSmallDevice ? 28 : 32} 
                    color={star <= rating ? colors.primary : colors.gray[400]} 
                    fill={star <= rating ? colors.primary : 'transparent'} 
                  />
                </TouchableOpacity>
              ))}
            </View>
          </View>
          
          <View style={styles.commentContainer}>
            <Text style={[styles.commentTitle, isSmallDevice && styles.commentTitleSmall]}>{t('leaveComment')}</Text>
            <TextInput
              style={styles.commentInput}
              value={comment}
              onChangeText={setComment}
              placeholder={t('writeComment')}
              placeholderTextColor="rgba(255, 255, 255, 0.6)"
              multiline
              maxLength={200}
              onFocus={() => {
                setTimeout(() => {
                  scrollViewRef.current?.scrollToEnd({ animated: true });
                }, 100);
              }}
            />
            
            {/* Name input field - only shown when authenticated */}
            {isAuthenticated && (
              <View>
                <Text style={[styles.nameTitle, isSmallDevice && styles.nameTitleSmall]}>Tu nombre</Text>
                <TextInput
                  style={styles.nameInput}
                  value={commenterName}
                  onChangeText={setCommenterName}
                  placeholder="Ingresa tu nombre (opcional)"
                  placeholderTextColor="rgba(255, 255, 255, 0.6)"
                  maxLength={50}
                  onFocus={() => {
                    setTimeout(() => {
                      scrollViewRef.current?.scrollToEnd({ animated: true });
                    }, 100);
                  }}
                />
              </View>
            )}
            
            {/* Add extra padding at the bottom when keyboard is visible */}
            {keyboardVisible && <View style={styles.keyboardSpacer} />}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      
      <View style={styles.footer}>
        <Button
          title={t('continueToPayment')}
          onPress={handleContinue}
          disabled={!tipAmount}
          rightIcon={<ArrowRight size={isSmallDevice ? 18 : 20} color={colors.textDark} />}
        />
      </View>
      
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
    paddingHorizontal: '4%',
    paddingTop: Platform.OS === 'ios' ? 12 : 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
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
  headerTitleSmall: {
    fontSize: 16,
  },
  placeholder: {
    width: 40,
  },
  keyboardAvoidingContainer: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    padding: '4%',
    paddingTop: 16,
  },
  recipientInfo: {
    marginBottom: '4%',
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