import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Platform, SafeAreaView, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuthStore } from '@/store/auth-store';
import { colors } from '@/constants/colors';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Avatar } from '@/components/Avatar';
import { CollapsibleSocialNetworks } from '@/components/CollapsibleSocialNetworks';
import { InstagramIcon } from '@/components/InstagramIcon';
import { TelegramIcon } from '@/components/TelegramIcon';
import { TikTokIcon } from '@/components/TikTokIcon';
import { FacebookIcon } from '@/components/FacebookIcon';
import { LinkedInIcon } from '@/components/LinkedInIcon';
import { router, useRootNavigationState } from 'expo-router';
import { User, LogOut, CheckCircle2, XCircle, Crown, DollarSign, Lock, CreditCard, Mail, Edit3 } from 'lucide-react-native';
import { GoalIcon } from '@/components/GoalIcon';
import * as Haptics from 'expo-haptics';
import { useLanguageStore } from '@/store/language-store';
import { useCustomAlert } from '@/components/CustomAlert';
import { useSubscriptionStore, TRIAL_DAYS, SUBSCRIPTION_PRICE } from '@/store/subscription-store';
import { useTipsStore } from '@/store/tips-store';
import { tipazoRealtime } from '@/lib/realtime';
import { DividerWave } from '@/components/DividerWave';
import { AbstractProfileCard } from '@/components/AbstractProfileCard';
import { AbstractEditProfileForm } from '@/components/AbstractEditProfileForm';
import { AbstractGoalCard } from '@/components/AbstractGoalCard';
import { AbstractSubscriptionCard } from '@/components/AbstractSubscriptionCard';
import { AbstractPromoCodeCard } from '@/components/AbstractPromoCodeCard';

export default function ProfileScreen() {
  const { user, logout, updateProfile, isLoading } = useAuthStore();
  const { status, trialEndDate, checkSubscriptionStatus, processAutoRenewal, applyPromoCode } = useSubscriptionStore();
  const { t } = useLanguageStore();
  const { getUserBalance, fetchTips } = useTipsStore();
  const rootNavigationState = useRootNavigationState();
  const { showAlert, AlertComponent } = useCustomAlert();
  
  const [isEditing, setIsEditing] = useState(false);
  const [goalDescription, setGoalDescription] = useState((user as any)?.goalDescription || '');
  const [goalAmount, setGoalAmount] = useState((user as any)?.goalAmount || 0);
  const [goalAccumulated, setGoalAccumulated] = useState(0);
  const [walletBalance, setWalletBalance] = useState(0);
  const [profilePicture, setProfilePicture] = useState(user?.profilePicture || '');
  const [hasEnoughBalance, setHasEnoughBalance] = useState(false);
  const [dividerWidth, setDividerWidth] = useState(60);
  
  // Profile editing states
  const [editingName, setEditingName] = useState(user?.name || '');
  const [editingEmail, setEditingEmail] = useState(user?.email || '');
  const [editingOccupation, setEditingOccupation] = useState((user as any)?.occupation || '');
  const [editingBiography, setEditingBiography] = useState((user as any)?.biography || '');
  
  // Social networks states
  const [editingInstagram, setEditingInstagram] = useState((user as any)?.instagram || '');
  const [editingTelegram, setEditingTelegram] = useState((user as any)?.telegram || '');
  const [editingTikTok, setEditingTikTok] = useState((user as any)?.tiktok || '');
  const [editingFacebook, setEditingFacebook] = useState((user as any)?.facebook || '');
  const [editingLinkedIn, setEditingLinkedIn] = useState((user as any)?.linkedin || '');
  
  
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
      
      // Set profile editing information
      setEditingName(user.name || '');
      setEditingEmail(user.email || '');
      setEditingOccupation((user as any)?.occupation || '');
      setEditingBiography((user as any)?.biography || '');
      
      // Set social networks information
      setEditingInstagram((user as any)?.instagram || '');
      setEditingTelegram((user as any)?.telegram || '');
      setEditingTikTok((user as any)?.tiktok || '');
      setEditingFacebook((user as any)?.facebook || '');
      setEditingLinkedIn((user as any)?.linkedin || '');
      
      // Fetch tips to calculate accumulated amount
      fetchTips(user.id);
      
      // Subscribe to real-time updates for tips and transactions
      const handleTipUpdate = (payload: any) => {
        console.log('Real-time tip update in profile:', payload);
        // Refresh tips data when new tips are received
        fetchTips(user.id);
      };
      
      const handleTransactionUpdate = (payload: any) => {
        console.log('Real-time transaction update in profile:', payload);
        // Refresh tips data when new transactions are made
        fetchTips(user.id);
      };
      
      // Subscribe to real-time updates
      tipazoRealtime.subscribeToUserTips(user.id, handleTipUpdate);
      tipazoRealtime.subscribeToUserTransactions(user.id, handleTransactionUpdate);
    }
    
    // Cleanup function for realtime subscriptions
    return () => {
      if (user) {
        tipazoRealtime.unsubscribe(`user_tips_${user.id}`);
        tipazoRealtime.unsubscribe(`user_transactions_${user.id}`);
      }
    };
  }, [user, status]);

  // Update balance whenever user changes
  useEffect(() => {
    if (user) {
      const balance = getUserBalance(user.id);
      setWalletBalance(balance);
      
      // Calculate divider width based on name length
      setDividerWidth(calculateDividerWidth(user.name || ''));
      setHasEnoughBalance(balance >= SUBSCRIPTION_PRICE);
      
      // Calculate accumulated amount from received tips
      const totalReceived = calculateTotalReceivedTips(user.id);
      setGoalAccumulated(totalReceived);
    }
  }, [user, getUserBalance]);
  
  // Function to calculate total received tips for goal progress
  const calculateTotalReceivedTips = (userId: string) => {
    if (!user) return 0;
    
    // Calculate from real tips data
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
    showAlert(
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
        name: editingName,
        email: editingEmail,
        occupation: editingOccupation,
        biography: editingBiography,
        instagram: editingInstagram,
        telegram: editingTelegram,
        tiktok: editingTikTok,
        facebook: editingFacebook,
        linkedin: editingLinkedIn,
        goalDescription,
        goalAmount: parseFloat(goalAmount.toString()) || 0,
        profilePicture,
      });
    }
    
    setIsEditing(!isEditing);
  };

  const calculateDividerWidth = (text: string) => {
    // Примерная ширина символа в пикселях для шрифта размером 24
    const charWidth = 14;
    const textWidth = text.length * charWidth;
    return Math.max(80, Math.min(150, textWidth * 1.2)); // Минимум 80, максимум 150, увеличен коэффициент
  };

  
  const handleManageSubscription = () => {
    router.push('/subscription');
  };
  
  const handleChangePassword = () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    router.push('/profile/change-password');
  };
  
  const handleWithdrawalSettings = () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    router.push('/withdrawal-options');
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
          {!isEditing ? (
            <AbstractProfileCard
              name={user.name}
              occupation={(user as any).occupation || t('serviceWorker')}
              isSubscriptionActive={isSubscriptionActive}
              onEditPress={handleEditToggle}
              onSubscriptionPress={handleManageSubscription}
              avatarComponent={
                <Avatar 
                  source={user.profilePicture} 
                  name={user.name} 
                  size={100} 
                  style={styles.avatar}
                  variant="rounded"
                  editable={true}
                />
              }
              socialNetworks={{
                instagram: (user as any)?.instagram,
                telegram: (user as any)?.telegram,
                tiktok: (user as any)?.tiktok,
                facebook: (user as any)?.facebook,
                linkedin: (user as any)?.linkedin,
              }}
            />
          ) : null}
        </View>
        
        {/* Profile Editing Form */}
        {isEditing && (
          <AbstractEditProfileForm
            editingName={editingName}
            setEditingName={setEditingName}
            editingEmail={editingEmail}
            setEditingEmail={setEditingEmail}
            editingOccupation={editingOccupation}
            setEditingOccupation={setEditingOccupation}
            editingBiography={editingBiography}
            setEditingBiography={setEditingBiography}
            editingInstagram={editingInstagram}
            setEditingInstagram={setEditingInstagram}
            editingTelegram={editingTelegram}
            setEditingTelegram={setEditingTelegram}
            editingTikTok={editingTikTok}
            setEditingTikTok={setEditingTikTok}
            editingFacebook={editingFacebook}
            setEditingFacebook={setEditingFacebook}
            editingLinkedIn={editingLinkedIn}
            setEditingLinkedIn={setEditingLinkedIn}
            goalDescription={goalDescription}
            setGoalDescription={setGoalDescription}
            goalAmount={goalAmount}
            setGoalAmount={setGoalAmount}
            goalAccumulated={goalAccumulated}
            isGoalReached={isGoalReached}
            onSavePress={handleEditToggle}
            onCancelPress={handleEditToggle}
            onChangePassword={handleChangePassword}
            onWithdrawalSettings={handleWithdrawalSettings}
            isLoading={isLoading}
          />
        )}
        
        {/* Old form - keeping for reference */}
        {false && (
          <>
            <Card style={styles.editingCard}>
              <Text style={styles.editingSectionTitle}>Información Personal</Text>
              
              <View style={styles.editingForm}>
                <Input
                  label="Nombre completo"
                  value={editingName}
                  onChangeText={setEditingName}
                  placeholder="Ingresa tu nombre completo"
                  leftIcon={<User size={20} color={colors.gray[500]} />}
                />
                
                
                <Input
                  label="Correo electrónico"
                  value={editingEmail}
                  onChangeText={setEditingEmail}
                  placeholder="Ingresa tu correo electrónico"
                  keyboardType="email-address"
                  leftIcon={<Mail size={20} color={colors.gray[500]} />}
                />
                
                <Input
                  label="Ocupación"
                  value={editingOccupation}
                  onChangeText={setEditingOccupation}
                  placeholder="Ingresa tu ocupación"
                  leftIcon={<User size={20} color={colors.gray[500]} />}
                />
                
              <Input
                label="Biografía"
                value={editingBiography}
                onChangeText={setEditingBiography}
                placeholder="Cuéntanos sobre ti..."
                multiline
                numberOfLines={3}
              />
            </View>
            
            <Text style={styles.editingSectionTitle}>Redes Sociales</Text>
            
            <View style={styles.editingForm}>
              <Input
                label="Instagram"
                value={editingInstagram}
                onChangeText={setEditingInstagram}
                placeholder="@tu_usuario_instagram"
                leftIcon={<InstagramIcon size={20} color={colors.gray[900]} />}
              />
              
              <Input
                label="Telegram"
                value={editingTelegram}
                onChangeText={setEditingTelegram}
                placeholder="@tu_usuario_telegram"
                leftIcon={<TelegramIcon size={20} color={colors.gray[900]} />}
              />
              
              <Input
                label="TikTok"
                value={editingTikTok}
                onChangeText={setEditingTikTok}
                placeholder="@tu_usuario_tiktok"
                leftIcon={<TikTokIcon size={20} color={colors.gray[900]} />}
              />
              
              <Input
                label="Facebook"
                value={editingFacebook}
                onChangeText={setEditingFacebook}
                placeholder="tu.perfil.facebook"
                leftIcon={<FacebookIcon size={20} color={colors.gray[900]} />}
              />
              
              <Input
                label="LinkedIn"
                value={editingLinkedIn}
                onChangeText={setEditingLinkedIn}
                placeholder="tu-perfil-linkedin"
                leftIcon={<LinkedInIcon size={20} color={colors.gray[900]} />}
              />
            </View>
              
              <View style={styles.editingActions}>
                <TouchableOpacity onPress={handleChangePassword} style={styles.actionButton}>
                  <View style={styles.actionButtonContent}>
                    <Lock size={20} color={colors.primary} />
                    <Text style={styles.actionButtonText}>Cambiar contraseña</Text>
                  </View>
                </TouchableOpacity>
                
                <TouchableOpacity onPress={handleWithdrawalSettings} style={styles.actionButton}>
                  <View style={styles.actionButtonContent}>
                    <CreditCard size={20} color={colors.primary} />
                    <Text style={styles.actionButtonText}>Datos para retiros</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </Card>

            {/* Personal Goal Card - только в режиме редактирования */}
            <Card style={styles.goalCard}>
              <View style={styles.goalHeader}>
                <GoalIcon size={22} color={colors.primary} />
                <Text style={styles.goalTitle}>Mi Meta Personal</Text>
                
                {isGoalReached && (
                  <View style={styles.goalReachedBadge}>
                    <CheckCircle2 size={14} color={colors.success} />
                    <Text style={styles.goalReachedText}>Meta alcanzada</Text>
                  </View>
                )}
              </View>
              
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
            </Card>
          </>
        )}
        
        {/* Subscription Card - только когда НЕ редактируем */}
        {!isEditing && (
          <AbstractSubscriptionCard
            status={status}
            daysRemaining={getDaysRemaining()}
            walletBalance={walletBalance}
            hasEnoughBalance={hasEnoughBalance}
            subscriptionPrice={SUBSCRIPTION_PRICE}
            onManageSubscription={handleManageSubscription}
          />
        )}
        
        {/* Personal Goal Card - только когда НЕ редактируем */}
        {!isEditing && (
          <AbstractGoalCard
            goalDescription={goalDescription}
            goalAmount={goalAmount}
            goalAccumulated={goalAccumulated}
            isGoalReached={isGoalReached}
            onEditPress={handleEditToggle}
          />
        )}
        
        {/* Promo Code Section - только когда НЕ редактируем */}
        {!isEditing && (
          <AbstractPromoCodeCard
            promoCode={promoCode}
            onPromoCodeChange={handlePromoCodeChange}
            onApplyPromoCode={handleApplyPromoCode}
            isApplyingPromo={isApplyingPromo}
            promoCodeStatus={promoCodeStatus.type !== 'none' ? promoCodeStatus : undefined}
          />
        )}
        
        {/* Logout Button - только когда НЕ редактируем */}
        {!isEditing && (
          <TouchableOpacity 
            style={styles.logoutButton}
            onPress={handleLogout}
            activeOpacity={0.7}
          >
            <View style={styles.logoutButtonGradient}>
              <LogOut size={20} color={colors.white} />
              <Text style={styles.logoutButtonText}>{t('logout')}</Text>
            </View>
          </TouchableOpacity>
        )}
      </ScrollView>
      <AlertComponent />
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
    paddingBottom: 110, // Увеличили для floating навигации
  },
  spacer: {
    height: 24,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 24,
    position: 'relative',
    marginTop: 12,
    gap: 20,
  },
  avatarSection: {
    alignItems: 'center',
    width: 100,
    justifyContent: 'center',
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
    marginTop: 0, // Убираем отступ сверху, чтобы выровнять с аватаркой
    marginBottom: 16,
    flex: 1,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.textLight,
    marginBottom: 8,
  },
  occupationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 8,
    gap: 8,
  },
  occupationLabel: {
    fontSize: 16,
    color: colors.gray[500],
    fontWeight: '500',
  },
  occupationDivider: {
    fontSize: 16,
    color: colors.gray[400],
    fontWeight: '300',
  },
  occupation: {
    fontSize: 16,
    color: colors.textLight,
    fontWeight: '600',
  },
  profileDivider: {
    width: '50%',
    height: 1,
    backgroundColor: colors.white,
    alignSelf: 'center',
    marginBottom: 16,
    opacity: 0.8,
  },
  premiumBadgeInCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 255, 170, 0.15)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    alignSelf: 'center',
    gap: 6,
    marginBottom: 12,
  },
  premiumText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.success,
  },
  editButtonContainer: {
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 0,
    width: 100,
  },
  editButton: {
    width: 100,
    height: 40,
  },
  editButtonText: {
    fontSize: 11,
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 14,
  },
  avatar: {
    marginLeft: 0,
  },
  socialNetworksContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0,
    marginBottom: 0,
    gap: 8,
  },
  socialIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.gray[300],
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
    fontSize: 16,
    color: colors.textDark,
    marginBottom: 10,
    fontWeight: '700',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  progressBarContainer: {
    height: 12,
    backgroundColor: 'rgba(105, 197, 248, 0.2)',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 8,
    borderWidth: 1,
    borderColor: 'rgba(105, 197, 248, 0.3)',
    shadowColor: colors.gray[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  progressBar: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 8,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  progressPercentage: {
    fontSize: 14,
    color: '#69C5F8',
    textAlign: 'right',
    fontWeight: '700',
    backgroundColor: 'rgba(105, 197, 248, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: 'flex-end',
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
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
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  logoutButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    gap: 8,
    backgroundColor: colors.error,
  },
  logoutButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
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
  // Editing form styles
  editingCard: {
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
  editingSectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 16,
  },
  editingForm: {
    gap: 16,
    marginBottom: 20,
  },
  editingActions: {
    gap: 12,
  },
  actionButton: {
    backgroundColor: colors.gray[50],
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.gray[200],
  },
  actionButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text,
  },
});