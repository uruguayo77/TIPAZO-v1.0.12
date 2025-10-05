import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Share, ScrollView, Platform, useWindowDimensions, StatusBar, SafeAreaView } from 'react-native';
import { useAuthStore } from '@/store/auth-store';
import { useSubscriptionStore, SUBSCRIPTION_PRICE } from '@/store/subscription-store';
import { useTipsStore } from '@/store/tips-store';
import { colors } from '@/constants/colors';
import { QRCode } from '@/components/QRCode';
import { Button } from '@/components/Button';
import { AbstractQRCard } from '@/components/AbstractQRCard';
import { Share2, Lock, AlertCircle, CreditCard } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import { router } from 'expo-router';

export default function QRCodeScreen() {
  const { user } = useAuthStore();
  const { status, checkSubscriptionStatus, processAutoRenewal } = useSubscriptionStore();
  const { getUserBalance } = useTipsStore();
  const { width, height } = useWindowDimensions();
  const isSmallDevice = width < 375;
  
  // Calculate top spacing (8% of screen height)
  const topSpacing = height * 0.08;
  
  const qrValue = user ? `https://tipqr.app/tip/${user.id}?name=${encodeURIComponent(user.name)}&occupation=${encodeURIComponent((user as any).occupation || '')}` : '';
  
  // Check if subscription is active
  const isSubscriptionActive = status === 'active' || status === 'trial';
  
  // Check if wallet has sufficient balance for subscription
  const walletBalance = user ? getUserBalance(user.id) : 0;
  const hasInsufficientFunds = walletBalance < SUBSCRIPTION_PRICE;
  
  // Check subscription status and try auto-renewal on component mount
  React.useEffect(() => {
    if (user) {
      checkSubscriptionStatus();
      
      // Try to process auto-renewal if subscription is expired
      if (status === 'expired') {
        processAutoRenewal(user.id);
      }
    }
  }, [user, status, checkSubscriptionStatus, processAutoRenewal]);
  
  const handleShare = async () => {
    if (!isSubscriptionActive) {
      // Just navigate to subscription page without showing alert
      router.push('/subscription');
      return;
    }
    
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    
    try {
      await Share.share({
        message: `¡Hola! Puedes dejarme una propina escaneando mi código QR en Tipazo: ${qrValue}`,
        url: qrValue,
        title: 'Comparte tu código QR de Tipazo',
      });
    } catch (error) {
      console.error('Error sharing QR code:', error);
    }
  };
  
  
  const handleSubscribe = () => {
    router.push('/subscription');
  };
  
  const handleRechargeWallet = () => {
    router.push('/deposit-methods');
  };
  
  if (!user) return null;
  
  return (
    <>
      <StatusBar backgroundColor={colors.background} barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        {/* Top spacer to shift content down */}
        <View style={{ height: topSpacing * 0.3 }} />
        
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={[
            styles.scrollContent,
            { paddingTop: topSpacing * 0.7 }
          ]}
          showsVerticalScrollIndicator={false}
        >
          
          <AbstractQRCard
            name={user.name}
            occupation={(user as any).occupation || "Trabajador de servicio"}
          >
            {isSubscriptionActive ? (
              <View style={styles.qrContainer}>
                <QRCode
                  value={qrValue}
                  size={isSmallDevice ? 220 : 250}
                  logo={require('@/assets/images/icon.png')}
                  logoSize="medium" // Increased logo size by 15%
                />
              </View>
            ) : (
              <View style={styles.qrOverlay}>
                {status === 'expired' && hasInsufficientFunds ? (
                  <>
                    <AlertCircle size={40} color={colors.error} style={styles.overlayIcon} />
                    <Text style={styles.overlayTitle}>Suscripción finalizada</Text>
                    <Text style={styles.overlayText}>
                      Tu suscripción ha finalizado y no tienes fondos suficientes para renovarla. Por favor, recarga tu billetera con el método que prefieras.
                    </Text>
                    <Button
                      title="Recargar billetera"
                      onPress={handleRechargeWallet}
                      style={styles.overlayButton}
                      leftIcon={<CreditCard size={20} color={colors.textDark} />}
                    />
                  </>
                ) : (
                  <>
                    <Lock size={40} color={colors.primary} style={styles.overlayIcon} />
                    <Text style={styles.overlayTitle}>Código QR bloqueado</Text>
                    <Text style={styles.overlayText}>
                      ¿Listo para recibir tus primeras propinas? Suscríbete ahora y empieza a ganar hoy mismo.
                    </Text>
                    <Button
                      title="Suscribirse ahora"
                      onPress={handleSubscribe}
                      style={styles.overlayButton}
                    />
                  </>
                )}
              </View>
            )}
          </AbstractQRCard>
          
          <TouchableOpacity 
            style={[styles.shareButton, !isSubscriptionActive && styles.disabledButton]}
            onPress={handleShare}
            disabled={!isSubscriptionActive}
            activeOpacity={0.7}
          >
            <Share2 size={20} color={isSubscriptionActive ? colors.textDark : colors.gray[400]} />
            <Text style={[styles.shareButtonText, !isSubscriptionActive && styles.disabledButtonText]}>
              Compartir código QR
            </Text>
          </TouchableOpacity>
          
          <View style={styles.tipsSection}>
            <View style={styles.tipsTitleContainer}>
              <Text style={styles.tipsSectionTitle}>Consejos para recibir más propinas</Text>
            </View>
            <View style={styles.tipsList}>
              <View style={styles.tipsListItem}>
                <View style={styles.tipsListBullet} />
                <Text style={styles.tipsListText}>Coloca tu código QR en un lugar visible para tus clientes</Text>
              </View>
              
              <View style={styles.tipsListItem}>
                <View style={styles.tipsListBullet} />
                <Text style={styles.tipsListText}>Personaliza tu perfil con una foto profesional y descripción</Text>
              </View>
              
              <View style={styles.tipsListItem}>
                <View style={styles.tipsListBullet} />
                <Text style={styles.tipsListText}>Menciona a tus clientes que aceptas propinas digitales</Text>
              </View>
              
              <View style={styles.tipsListItem}>
                <View style={styles.tipsListBullet} />
                <Text style={styles.tipsListText}>Imprime tu código QR y colócalo en tu área de trabajo</Text>
              </View>
              
              <View style={styles.tipsListItem}>
                <View style={styles.tipsListBullet} />
                <Text style={styles.tipsListText}>Agradece siempre las propinas recibidas</Text>
              </View>
            </View>
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
    paddingBottom: 110, // Увеличили для floating навигации
  },
  qrContainer: {
    alignItems: 'center',
    padding: 24,
    marginBottom: 20,
    borderRadius: 24,
    backgroundColor: colors.white,
    shadowColor: colors.gray[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 4,
    textAlign: 'center',
  },
  occupation: {
    fontSize: 16,
    color: colors.gray[600],
    marginBottom: 20,
    textAlign: 'center',
  },
  qrWrapper: {
    marginVertical: 8,
    width: 250,
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    overflow: 'hidden',
  },
  qrOverlay: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  overlayIcon: {
    marginBottom: 16,
  },
  overlayTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
    textAlign: 'center',
  },
  overlayText: {
    fontSize: 14,
    color: colors.text,
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 20,
  },
  overlayButton: {
    minWidth: 180,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    gap: 16,
  },
  actionButton: {
    flex: 1,
  },
  disabledButton: {
    opacity: 0.6,
    backgroundColor: colors.gray[300],
  },
  tipsSection: {
    padding: 20,
    backgroundColor: colors.white,
    borderRadius: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
  tipsTitleContainer: {
    marginBottom: 16,
  },
  tipsSectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textDark,
    textAlign: 'center',
  },
  tipsList: {
    gap: 12,
  },
  tipsListItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 8,
  },
  tipsListBullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.primary,
    marginTop: 8,
    marginRight: 12,
  },
  tipsListText: {
    flex: 1,
    fontSize: 14,
    color: colors.textDark,
    lineHeight: 22,
  },
  qrContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 16,
  },
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
    gap: 8,
  },
  shareButtonText: {
    color: colors.textDark,
    fontSize: 16,
    fontWeight: '600',
  },
  disabledButton: {
    backgroundColor: colors.gray[300],
  },
  disabledButtonText: {
    color: colors.gray[500],
  },
});