import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Share, ScrollView, Platform, useWindowDimensions, StatusBar, SafeAreaView } from 'react-native';
import { useAuthStore } from '@/store/auth-store';
import { useSubscriptionStore, SUBSCRIPTION_PRICE } from '@/store/subscription-store';
import { useTipsStore } from '@/store/tips-store';
import { colors } from '@/constants/colors';
import { Card } from '@/components/Card';
import { QRCode } from '@/components/QRCode';
import { Button } from '@/components/Button';
import { Share2, Download, Lock, AlertCircle, CreditCard } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import { router } from 'expo-router';

export default function QRCodeScreen() {
  const { user } = useAuthStore();
  const { status, checkSubscriptionStatus, processAutoRenewal } = useSubscriptionStore();
  const { getUserBalance } = useTipsStore();
  const { width, height } = useWindowDimensions();
  const isSmallDevice = width < 375;
  
  // Calculate top spacing (15% of screen height)
  const topSpacing = height * 0.15;
  
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
  
  const handleDownload = () => {
    if (!isSubscriptionActive) {
      // Just navigate to subscription page without showing alert
      router.push('/subscription');
      return;
    }
    
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    
    // In a real app, this would save the QR code as an image
    alert('Esta función estará disponible próximamente');
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
          <View style={styles.header}>
            <Text style={styles.title}>Tu código QR</Text>
            <Text style={styles.subtitle}>Muestra este código QR para recibir propinas de los clientes</Text>
          </View>
          
          <Card style={styles.qrContainer}>
            <Text style={styles.name}>{user.name}</Text>
            <Text style={styles.occupation}>{(user as any).occupation || "Trabajador de servicio"}</Text>
            
            <View style={styles.qrWrapper}>
              {isSubscriptionActive ? (
                <QRCode
                  value={qrValue}
                  size={isSmallDevice ? 220 : 250}
                  logo={require('@/assets/images/icon.png')}
                  logoSize="medium" // Increased logo size by 15%
                />
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
            </View>
          </Card>
          
          <View style={styles.actionsContainer}>
            <Button
              title="Compartir"
              onPress={handleShare}
              leftIcon={<Share2 size={20} color={isSubscriptionActive ? colors.textDark : colors.gray[400]} />}
              style={[styles.actionButton, !isSubscriptionActive && styles.disabledButton]}
              disabled={!isSubscriptionActive}
            />
            
            <Button
              title="Descargar"
              onPress={handleDownload}
              leftIcon={<Download size={20} color={isSubscriptionActive ? colors.textDark : colors.gray[400]} />}
              style={[styles.actionButton, !isSubscriptionActive && styles.disabledButton]}
              disabled={!isSubscriptionActive}
            />
          </View>
          
          <Card style={styles.tipsSection}>
            <Text style={styles.tipsSectionTitle}>Consejos para recibir más propinas</Text>
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
          </Card>
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
    paddingBottom: 32,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.textLight,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textLight,
    opacity: 0.8,
    lineHeight: 22,
  },
  qrContainer: {
    alignItems: 'center',
    padding: 24,
    marginBottom: 24,
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
  },
  qrOverlay: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
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
    marginBottom: 24,
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
    padding: 16,
  },
  tipsSectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 16,
  },
  tipsList: {
    gap: 12,
  },
  tipsListItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
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
    color: colors.text,
    lineHeight: 22,
  },
});