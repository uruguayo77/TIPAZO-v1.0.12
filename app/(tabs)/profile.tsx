import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Platform, SafeAreaView, TextInput } from 'react-native';
import { useAuthStore } from '@/store/auth-store';
import { colors } from '@/constants/colors';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Avatar } from '@/components/Avatar';
import { router, useRootNavigationState } from 'expo-router';
import { User, LogOut, Camera, Target, CheckCircle2, XCircle, Info, Crown, DollarSign, CreditCard, ChevronRight, Lock } from 'lucide-react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Haptics from 'expo-haptics';
import { useLanguageStore } from '@/store/language-store';
import { useSubscriptionStore, TRIAL_DAYS, SUBSCRIPTION_PRICE } from '@/store/subscription-store';
import { useTipsStore } from '@/store/tips-store';

export default function ProfileScreen() {
  const { user, logout, updateProfile, isLoading } = useAuthStore();
  const { status, trialEndDate, checkSubscriptionStatus, processAutoRenewal, applyPromoCode } = useSubscriptionStore();
  const { t } = useLanguageStore();
  const { getUserBalance, fetchTips } = useTipsStore();
  const rootNavigationState = useRootNavigationState();
  
  const [isEditing, setIsEditing] = useState(false);
  const [goalDescription, setGoalDescription] = useState((user as any)?.goalDescription || '');
  const [goalAmount, setGoalAmount] = useState((user as any)?.goalAmount || 0);
  const [goalAccumulated, setGoalAccumulated] = useState(0);
  const [walletBalance, setWalletBalance] = useState(0);
  const [profilePicture, setProfilePicture] = useState(user?.profilePicture || '');
  const [hasEnoughBalance, setHasEnoughBalance] = useState(false);
  
  // Promo code state
  const [promoCode, setPromoCode] = useState('');
  const [promoCodeStatus, setPromoCodeStatus] = useState<{
    message: string;
    type: 'success' | 'error' | 'none';
  }>({ message: '', type: 'none' });
  const [isApplyingPromo, setIsApplyingPromo] = useState(false);

  // Fetch tips, withdrawals, and check subscription status when component mounts
  useEffect(() => {
    if (user) {
      // Check subscription status
      checkSubscriptionStatus();
      
      // Try to process auto-renewal if subscription is expired
      if (status === 'expired') {
        processAutoRenewal(user.id);
      }
      
      // Set goal information
      setGoalDescription((user as any)?.goalDescription || '');
      setGoalAmount((user as any)?.goalAmount || 0);
      
      // Fetch tips to calculate accumulated amount
      fetchTips(user.id);
    }
  }, [user, status]);

  // Update balance whenever user changes
  useEffect(() => {
    if (user) {
      const balance = getUserBalance(user.id);
      setWalletBalance(balance);
      setHasEnoughBalance(balance >= SUBSCRIPTION_PRICE);
      
      // Calculate accumulated amount from received tips
      const totalReceived = calculateTotalReceivedTips(user.id);
      setGoalAccumulated(totalReceived);
    }
  }, [user, getUserBalance]);
  
  // Function to calculate total received tips for goal progress
  const calculateTotalReceivedTips = (userId: string) => {
    if (!user) return 0;
    
    // This should be implemented in the tips store, but for now we'll use the mock data
    // In a real app, this would be calculated from the tips data
    return (user as any)?.goalAccumulated || 0;
  };

  // Calculate days remaining in trial
  const getDaysRemaining = (): number => {
    if (!trialEndDate) return 0;
    
    const now = new Date();
    const endDate = new Date(trialEndDate);
    const diffTime = endDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return Math.max(0, diffDays);
  };

  // Calculate goal progress percentage
  const calculateProgress = () => {
    if (!goalAmount || goalAmount === 0) return 0;
    const progress = (goalAccumulated || 0) / goalAmount;
    return Math.min(progress, 1); // Cap at 100%
  };
  
  const progressPercentage = calculateProgress() * 100;
  const isGoalReached = progressPercentage >= 100;

  // Get progress bar color based on percentage
  const getProgressBarColor = () => {
    if (progressPercentage >= 75) return colors.success;
    if (progressPercentage >= 40) return colors.warning;
    return colors.error;
  };

  const handleLogout = () => {
    Alert.alert(
      t('logout'),
      t('logoutConfirmation'),
      [
        {
          text: t('cancel'),
          style: 'cancel',
        },
        {
          text: t('logout'),
          onPress: () => {
            logout();
            if (rootNavigationState?.key) {
              router.replace('/(auth)/welcome');
            }
          },
          style: 'destructive',
        },
      ]
    );
  };

  const handleEditToggle = () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    
    if (isEditing) {
      // Save changes
      updateProfile({
        goalDescription,
        goalAmount: parseFloat(goalAmount.toString()) || 0,
        profilePicture,
      });
    }
    
    setIsEditing(!isEditing);
  };

  const handlePickImage = async () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert("Permiso requerido", "Necesitamos permiso para acceder a tu galería de fotos.");
      return;
    }
    
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });
    
    if (!result.canceled && result.assets && result.assets.length > 0) {
      setProfilePicture(result.assets[0].uri);
      updateProfile({
        profilePicture: result.assets[0].uri,
      });
    }
  };
  
  const handleManageSubscription = () => {
    router.push('/subscription');
  };
  
  const handlePromoCodeChange = (text: string) => {
    setPromoCode(text);
    
    // Clear any previous status message when user types
    if (promoCodeStatus.type !== 'none') {
      setPromoCodeStatus({ message: '', type: 'none' });
    }
  };
  
  const handleApplyPromoCode = async () => {
    if (!promoCode.trim()) {
      setPromoCodeStatus({
        message: "Por favor, ingresa un código promocional.",
        type: 'error'
      });
      return;
    }
    
    if (!user) {
      setPromoCodeStatus({
        message: "Debes iniciar sesión para aplicar un código promocional.",
        type: 'error'
      });
      return;
    }
    
    setIsApplyingPromo(true);
    
    try {
      // Apply the promo code
      const result = await applyPromoCode(user.id, promoCode.trim());
      
      if (result.success) {
        // Provide haptic feedback on success
        if (Platform.OS !== 'web') {
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        }
        
        setPromoCodeStatus({
          message: result.message,
          type: 'success'
        });
        
        // Clear the input field on success
        setPromoCode('');
      } else {
        // Provide haptic feedback on error
        if (Platform.OS !== 'web') {
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        }
        
        setPromoCodeStatus({
          message: result.message,
          type: 'error'
        });
      }
    } catch (error) {
      setPromoCodeStatus({
        message: "Error al aplicar el código. Inténtalo de nuevo.",
        type: 'error'
      });
    } finally {
      setIsApplyingPromo(false);
    }
  };

  // Navigation handlers
  const handleNavigateToPersonalInfo = () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    router.push('/profile/info');
  };

  const handleNavigateToPaymentMethods = () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    router.push('/profile/payment-methods');
  };

  const handleNavigateToChangePassword = () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    router.push('/profile/change-password');
  };

  // Check if subscription is active
  const isSubscriptionActive = status === 'active' || status === 'trial';

  if (!user) return null;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView 
        style={styles.container} 
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.spacer} />
        
        <View style={styles.profileHeader}>
          <TouchableOpacity onPress={handlePickImage} disabled={isLoading}>
            <View style={styles.avatarContainer}>
              <Avatar source={user.profilePicture} name={user.name} size={100} />
              <View style={styles.cameraIconContainer}>
                <Camera size={20} color={colors.card} />
              </View>
            </View>
          </TouchableOpacity>
          
          {!isEditing ? (
            <View style={styles.profileInfo}>
              <Text style={styles.name}>{user.name}</Text>
              <Text style={styles.occupation}>{(user as any).occupation || t('serviceWorker')}</Text>
              
              {/* Premium badge */}
              {isSubscriptionActive && (
                <View style={styles.premiumBadge}>
                  <Crown size={16} color={colors.primary} />
                  <Text style={styles.premiumText}>TIPAZO Premium</Text>
                </View>
              )}
            </View>
          ) : null}
          
          <Button
            title={isEditing ? t('saveProfile') : t('editProfile')}
            variant={isEditing ? "primary" : "outline"}
            onPress={handleEditToggle}
            isLoading={isLoading}
            style={styles.editButton}
          />
        </View>
        
        {/* Subscription Card */}
        <Card style={styles.subscriptionCard}>
          <View style={styles.subscriptionHeader}>
            <Crown size={24} color={colors.primary} />
            <Text style={styles.subscriptionTitle}>TIPAZO Premium</Text>
          </View>
          
          {status === 'trial' && (
            <View style={styles.daysRemainingContainer}>
              <Text style={styles.daysRemainingText}>{getDaysRemaining()} días restantes</Text>
            </View>
          )}
          
          <Text style={styles.subscriptionStatus}>
            {status === 'none' && "No tienes una suscripción activa"}
            {status === 'trial' && "Período de prueba activo"}
            {status === 'active' && "Suscripción activa"}
            {status === 'expired' && "Suscripción expirada"}
          </Text>
          
          {/* Wallet balance for subscription */}
          <View style={styles.walletBalanceContainer}>
            <DollarSign size={16} color={colors.gray[600]} />
            <Text style={styles.walletBalanceLabel}>Saldo disponible: </Text>
            <Text style={[
              styles.walletBalanceAmount,
              status === 'expired' && !hasEnoughBalance && styles.insufficientBalance
            ]}>
              ${walletBalance.toFixed(2)}
            </Text>
          </View>
          
          {status === 'expired' && !hasEnoughBalance && (
            <Text style={styles.insufficientBalanceText}>
              Necesitas al menos ${SUBSCRIPTION_PRICE.toFixed(2)} para renovar tu suscripción
            </Text>
          )}
          
          <Button
            title={
              status === 'none' ? "Comenzar prueba gratuita" :
              status === 'trial' ? "Administrar suscripción" :
              status === 'active' ? "Administrar suscripción" :
              "Renovar suscripción"
            }
            variant="primary"
            onPress={handleManageSubscription}
            style={styles.subscriptionButton}
          />
        </Card>
        
        {/* Personal Goal Card */}
        <Card style={styles.goalCard}>
          <View style={styles.goalHeader}>
            <Target size={22} color={colors.primary} />
            <Text style={styles.goalTitle}>Mi Meta Personal</Text>
            
            {isGoalReached && !isEditing && (
              <View style={styles.goalReachedBadge}>
                <CheckCircle2 size={14} color={colors.success} />
                <Text style={styles.goalReachedText}>Meta alcanzada</Text>
              </View>
            )}
          </View>
          
          {isEditing ? (
            <View style={styles.form}>
              <Input
                label="Descripción de tu meta"
                value={goalDescription}
                onChangeText={setGoalDescription}
                placeholder="Ej: Estoy ahorrando para comprar un perrito de husky"
                multiline
              />
              
              <Input
                label="Monto total de la meta ($)"
                value={goalAmount.toString()}
                onChangeText={(text) => {
                  // Only allow numbers and decimal point
                  const filtered = text.replace(/[^0-9.]/g, '');
                  setGoalAmount(parseFloat(filtered) || 0);
                }}
                keyboardType="numeric"
                placeholder="Ej: 500"
              />
            </View>
          ) : (
            <View>
              {goalDescription ? (
                <>
                  <Text style={styles.goalDescription}>{goalDescription}</Text>
                  
                  <View style={styles.goalProgressContainer}>
                    <Text style={styles.goalProgressText}>
                      Acumulado: ${goalAccumulated.toFixed(2)} de ${goalAmount.toFixed(2)}
                    </Text>
                    
                    <View style={styles.progressBarContainer}>
                      <View 
                        style={[
                          styles.progressBar, 
                          { 
                            width: `${progressPercentage}%`,
                            backgroundColor: getProgressBarColor()
                          }
                        ]} 
                      />
                    </View>
                    
                    <Text style={styles.progressPercentage}>
                      {progressPercentage.toFixed(0)}%
                    </Text>
                  </View>
                </>
              ) : (
                <Text style={styles.noGoalText}>
                  No has configurado una meta personal. Edita tu perfil para agregar una meta y mostrarla a tus clientes.
                </Text>
              )}
            </View>
          )}
        </Card>
        
        {/* Promo Code Section */}
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>Código Promocional</Text>
          
          <Text style={styles.promoCodeLabel}>
            ¿Tienes un código promocional? Ingrésalo aquí y actívalo.
          </Text>
          
          <View style={styles.promoCodeContainer}>
            <Input
              value={promoCode}
              onChangeText={handlePromoCodeChange}
              placeholder="Ingresa tu código"
              containerStyle={styles.promoCodeInput}
              autoCapitalize="characters"
            />
            <View style={styles.promoButtonContainer}>
              <Button
                title="Activar código"
                variant="primary"
                size="small"
                onPress={handleApplyPromoCode}
                isLoading={isApplyingPromo}
                style={styles.promoCodeButton}
              />
            </View>
          </View>
          
          {promoCodeStatus.type !== 'none' && (
            <View style={styles.promoStatusContainer}>
              {promoCodeStatus.type === 'success' ? (
                <CheckCircle2 size={16} color={colors.success} />
              ) : (
                <XCircle size={16} color={colors.error} />
              )}
              <Text 
                style={[
                  styles.promoStatusText,
                  promoCodeStatus.type === 'success' ? styles.promoSuccessText : styles.promoErrorText
                ]}
              >
                {promoCodeStatus.message}
              </Text>
            </View>
          )}
        </Card>
        
        {/* Navigation Cards */}
        <TouchableOpacity onPress={handleNavigateToPersonalInfo} style={styles.navigationCard}>
          <Card style={styles.navigationCardInner}>
            <View style={styles.navigationCardContent}>
              <View style={styles.navigationCardLeft}>
                <View style={styles.navigationIconContainer}>
                  <Info size={24} color={colors.primary} />
                </View>
                <View style={styles.navigationTextContainer}>
                  <Text style={styles.navigationTitle}>Información personal</Text>
                  <Text style={styles.navigationSubtitle}>Edita tu perfil y datos personales</Text>
                </View>
              </View>
              <ChevronRight size={20} color={colors.gray[400]} />
            </View>
          </Card>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleNavigateToPaymentMethods} style={styles.navigationCard}>
          <Card style={styles.navigationCardInner}>
            <View style={styles.navigationCardContent}>
              <View style={styles.navigationCardLeft}>
                <View style={styles.navigationIconContainer}>
                  <CreditCard size={24} color={colors.primary} />
                </View>
                <View style={styles.navigationTextContainer}>
                  <Text style={styles.navigationTitle}>Métodos de pago</Text>
                  <Text style={styles.navigationSubtitle}>Configura Pago Móvil y criptomonedas</Text>
                </View>
              </View>
              <ChevronRight size={20} color={colors.gray[400]} />
            </View>
          </Card>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleNavigateToChangePassword} style={styles.navigationCard}>
          <Card style={styles.navigationCardInner}>
            <View style={styles.navigationCardContent}>
              <View style={styles.navigationCardLeft}>
                <View style={styles.navigationIconContainer}>
                  <Lock size={24} color={colors.primary} />
                </View>
                <View style={styles.navigationTextContainer}>
                  <Text style={styles.navigationTitle}>{t('changePassword')}</Text>
                  <Text style={styles.navigationSubtitle}>{t('changePasswordSubtitle')}</Text>
                </View>
              </View>
              <ChevronRight size={20} color={colors.gray[400]} />
            </View>
          </Card>
        </TouchableOpacity>
        
        <Button
          title={t('logout')}
          variant="outline"
          onPress={handleLogout}
          style={styles.logoutButton}
          leftIcon={<LogOut size={20} color={colors.error} />}
          textStyle={{ color: colors.error }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  contentContainer: {
    padding: 16,
    paddingTop: Platform.OS === 'ios' ? 16 : 24,
  },
  spacer: {
    height: 24,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 24,
    position: 'relative',
    marginTop: 12,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  cameraIconContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: colors.primary,
    borderRadius: 20,
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: colors.card,
  },
  profileInfo: {
    alignItems: 'center',
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.textLight,
    marginBottom: 4,
  },
  occupation: {
    fontSize: 16,
    color: colors.textLight,
    marginBottom: 8,
  },
  premiumBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 255, 170, 0.15)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 6,
  },
  premiumText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.primary,
  },
  editButton: {
    minWidth: 150,
  },
  // GOAL CARD STYLES
  goalCard: {
    marginBottom: 16,
    padding: 20,
    backgroundColor: colors.white,
    borderRadius: 16,
    shadowColor: colors.gray[900],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  goalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  goalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginLeft: 10,
  },
  goalReachedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(46, 204, 113, 0.15)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 'auto',
  },
  goalReachedText: {
    fontSize: 12,
    color: colors.success,
    marginLeft: 4,
    fontWeight: '600',
  },
  goalDescription: {
    fontSize: 16,
    color: colors.text,
    marginBottom: 20,
    lineHeight: 24,
  },
  goalProgressContainer: {
    marginBottom: 8,
  },
  goalProgressText: {
    fontSize: 15,
    color: colors.text,
    marginBottom: 10,
    fontWeight: '500',
  },
  progressBarContainer: {
    height: 14,
    backgroundColor: 'rgba(0, 0, 0, 0.08)',
    borderRadius: 7,
    overflow: 'hidden',
    marginBottom: 6,
  },
  progressBar: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 7,
  },
  progressPercentage: {
    fontSize: 14,
    color: colors.text,
    textAlign: 'right',
    fontWeight: '600',
  },
  noGoalText: {
    fontSize: 14,
    color: colors.gray[500],
    fontStyle: 'italic',
    textAlign: 'center',
    paddingVertical: 10,
  },
  // SUBSCRIPTION CARD STYLES
  subscriptionCard: {
    marginBottom: 16,
    padding: 20,
    backgroundColor: colors.white,
    borderRadius: 16,
    shadowColor: colors.gray[900],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  subscriptionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  subscriptionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
  },
  daysRemainingContainer: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: colors.primary,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  daysRemainingText: {
    color: colors.textDark,
    fontWeight: '600',
    fontSize: 12,
  },
  subscriptionStatus: {
    fontSize: 14,
    color: colors.gray[500],
    marginBottom: 12,
  },
  walletBalanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  walletBalanceLabel: {
    fontSize: 14,
    color: colors.gray[600],
    marginLeft: 6,
  },
  walletBalanceAmount: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.text,
  },
  insufficientBalance: {
    color: colors.error,
  },
  insufficientBalanceText: {
    fontSize: 12,
    color: colors.error,
    marginBottom: 12,
  },
  subscriptionButton: {
    marginTop: 8,
  },
  section: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: colors.white,
    borderRadius: 16,
    shadowColor: colors.gray[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
  },
  form: {
    gap: 8,
  },
  logoutButton: {
    marginTop: 8,
    marginBottom: 32,
    borderColor: colors.error,
  },
  // Promo code styles
  promoCodeLabel: {
    fontSize: 14,
    color: colors.gray[600],
    marginBottom: 12,
  },
  promoCodeContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 16,
  },
  promoCodeInput: {
    width: '100%',
    marginBottom: 0,
  },
  promoButtonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  promoCodeButton: {
    minWidth: 150,
  },
  promoStatusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    gap: 6,
  },
  promoStatusText: {
    fontSize: 14,
    flex: 1,
  },
  promoSuccessText: {
    color: colors.success,
  },
  promoErrorText: {
    color: colors.error,
  },
  // Navigation card styles
  navigationCard: {
    marginBottom: 12,
  },
  navigationCardInner: {
    padding: 0,
    backgroundColor: colors.white,
    borderRadius: 16,
    shadowColor: colors.gray[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
  },
  navigationCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  navigationCardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  navigationIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(229, 244, 88, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  navigationTextContainer: {
    flex: 1,
  },
  navigationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  navigationSubtitle: {
    fontSize: 14,
    color: colors.gray[500],
  },
});