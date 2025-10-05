import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '@/constants/colors';
import { Crown, CreditCard, Calendar, Clock, Shield, Zap, AlertCircle, DollarSign } from 'lucide-react-native';

interface AbstractSubscriptionScreenProps {
  status: 'none' | 'trial' | 'active' | 'expired';
  walletBalance: number;
  hasEnoughBalance: boolean;
  subscriptionPrice: number;
  trialDays: number;
  endDate: string | null;
  trialEndDate: string | null;
  isLoading: boolean;
  onStartTrial: () => void;
  onSubscribe: () => void;
  onCancelSubscription: () => void;
  onRestoreSubscription: () => void;
  onRechargeWallet: () => void;
  isSmallDevice?: boolean;
}

export const AbstractSubscriptionScreen: React.FC<AbstractSubscriptionScreenProps> = ({
  status,
  walletBalance,
  hasEnoughBalance,
  subscriptionPrice,
  trialDays,
  endDate,
  trialEndDate,
  isLoading,
  onStartTrial,
  onSubscribe,
  onCancelSubscription,
  onRestoreSubscription,
  onRechargeWallet,
  isSmallDevice = false
}) => {
  const getDaysRemaining = (): number => {
    if (!trialEndDate) return 0;
    const now = new Date();
    const end = new Date(trialEndDate);
    const diffTime = end.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(0, diffDays);
  };

  const formatDate = (dateString: string | null): string => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <ScrollView 
      style={styles.container} 
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.headerCard}>
        <LinearGradient
          colors={['#FFFFFF', '#F8F9FA', '#E8F4FD']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradientContainer}
        >
          <View style={styles.titleContainer}>
            <View style={styles.crownContainer}>
              <Crown size={isSmallDevice ? 28 : 32} color={colors.primary} />
            </View>
            <View style={styles.titleBox}>
              <Text style={[styles.title, isSmallDevice && styles.titleSmall]}>TIPAZO Premium</Text>
            </View>
          </View>
          
          <Text style={styles.subtitle}>
            Recibe propinas sin límites y accede a todas las funciones
          </Text>
          
          <View style={styles.priceContainer}>
            <View style={styles.priceBox}>
              <Text style={styles.price}>${subscriptionPrice.toFixed(2)}</Text>
              <Text style={styles.pricePeriod}>al mes</Text>
            </View>
          </View>
          
          <View style={styles.trialInfoContainer}>
            <Clock size={isSmallDevice ? 18 : 20} color={colors.textDark} />
            <Text style={styles.trialInfoText}>
              Prueba gratuita de {trialDays} días, cancela cuando quieras
            </Text>
          </View>
        </LinearGradient>
      </View>

      {/* Wallet balance information */}
      {(status === 'none' || status === 'expired') && (
        <View style={styles.walletCard}>
          <LinearGradient
            colors={['#FFFFFF', '#F8F9FA', '#E8F4FD']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradientContainer}
          >
            <View style={styles.walletHeader}>
              <View style={styles.walletIconContainer}>
                <DollarSign size={20} color={colors.primary} />
              </View>
              <Text style={styles.walletTitle}>Pago con saldo de billetera</Text>
            </View>
            
            <View style={styles.balanceContainer}>
              <Text style={styles.balanceLabel}>Tu saldo:</Text>
              <View style={styles.balanceAmountContainer}>
                <Text style={[
                  styles.balanceAmount,
                  !hasEnoughBalance && styles.insufficientBalance
                ]}>
                  ${walletBalance.toFixed(2)}
                </Text>
                <View style={styles.balanceGlow} />
              </View>
              
              {!hasEnoughBalance && (
                <Text style={styles.insufficientBalanceText}>
                  Saldo insuficiente
                </Text>
              )}
            </View>
            
            <Text style={styles.walletPaymentInfo}>
              {hasEnoughBalance 
                ? `El cargo de $${subscriptionPrice.toFixed(2)} será debitado automáticamente cada mes.`
                : `Se debitarán $${subscriptionPrice.toFixed(2)} de tu saldo automáticamente cada mes.`
              }
            </Text>
            
            {!hasEnoughBalance && (
              <TouchableOpacity 
                style={styles.rechargeButton}
                onPress={onRechargeWallet}
              >
                <LinearGradient
                  colors={['#E5E5E5', '#D0D0D0']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.buttonGradient}
                >
                  <Text style={styles.rechargeButtonText}>Recargar billetera</Text>
                </LinearGradient>
              </TouchableOpacity>
            )}
          </LinearGradient>
        </View>
      )}

      {/* Features */}
      <View style={styles.featuresCard}>
        <LinearGradient
          colors={['#FFFFFF', '#F8F9FA', '#E8F4FD']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradientContainer}
        >
          <Text style={styles.featuresTitle}>Características Premium</Text>
          
          <View style={styles.featuresList}>
            <View style={styles.featureItem}>
              <Shield size={20} color={colors.textDark} />
              <Text style={styles.featureText}>Recibe propinas sin límites</Text>
            </View>
            <View style={styles.featureItem}>
              <Zap size={20} color={colors.textDark} />
              <Text style={styles.featureText}>Acceso a todas las funciones</Text>
            </View>
            <View style={styles.featureItem}>
              <Calendar size={20} color={colors.textDark} />
              <Text style={styles.featureText}>Estadísticas avanzadas</Text>
            </View>
          </View>
        </LinearGradient>
      </View>

      {/* Status information */}
      {status === 'trial' && (
        <View style={styles.statusCard}>
          <LinearGradient
            colors={['#FFFFFF', '#F8F9FA', '#E8F4FD']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradientContainer}
          >
            <View style={styles.statusHeader}>
              <View style={styles.statusIconContainer}>
                <Clock size={20} color={colors.primary} />
              </View>
              <Text style={styles.statusTitle}>Período de prueba ACTIVO</Text>
            </View>
            
            <View style={styles.daysContainer}>
              <Text style={styles.daysText}>{getDaysRemaining()} días restantes</Text>
            </View>
            
            <Text style={styles.statusText}>
              Tu prueba gratuita termina el {formatDate(trialEndDate)}
            </Text>
            
            <Text style={styles.statusDate}>
              Al finalizar, se debitarán ${subscriptionPrice.toFixed(2)} de tu billetera automáticamente.
            </Text>
          </LinearGradient>
        </View>
      )}

      {status === 'active' && (
        <View style={styles.statusCard}>
          <LinearGradient
            colors={['#FFFFFF', '#F8F9FA', '#E8F4FD']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradientContainer}
          >
            <View style={styles.statusHeader}>
              <View style={styles.statusIconContainer}>
                <Crown size={20} color={colors.primary} />
              </View>
              <Text style={styles.statusTitle}>Suscripción activa</Text>
            </View>
            
            <Text style={styles.statusText}>
              Tu suscripción se renovará automáticamente
            </Text>
            
            <Text style={styles.statusDate}>
              Próxima renovación: {formatDate(endDate)}
            </Text>
          </LinearGradient>
        </View>
      )}

      {/* Action buttons */}
      <View style={styles.buttonsContainer}>
        {status === 'none' && (
          <TouchableOpacity 
            style={styles.primaryButton}
            onPress={onStartTrial}
            disabled={isLoading}
          >
            <LinearGradient
              colors={[colors.primary, colors.primary]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.buttonGradient}
            >
              <Zap size={isSmallDevice ? 18 : 20} color={colors.textDark} />
              <Text style={styles.primaryButtonText}>Comenzar prueba gratuita</Text>
            </LinearGradient>
          </TouchableOpacity>
        )}

        {status === 'trial' && (
          <>
            <TouchableOpacity 
              style={styles.primaryButton}
              onPress={onSubscribe}
              disabled={isLoading}
            >
              <LinearGradient
                colors={[colors.primary, colors.primary]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.buttonGradient}
              >
                <CreditCard size={isSmallDevice ? 18 : 20} color={colors.textDark} />
                <Text style={styles.primaryButtonText}>Suscribirse ahora</Text>
              </LinearGradient>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.secondaryButton}
              onPress={onCancelSubscription}
            >
              <Text style={styles.secondaryButtonText}>Cancelar prueba</Text>
            </TouchableOpacity>
          </>
        )}

        {status === 'active' && (
          <TouchableOpacity 
            style={styles.secondaryButton}
            onPress={onCancelSubscription}
          >
            <Text style={styles.secondaryButtonText}>Cancelar suscripción</Text>
          </TouchableOpacity>
        )}

        {status === 'expired' && (
          <>
            <TouchableOpacity 
              style={styles.primaryButton}
              onPress={onSubscribe}
              disabled={!hasEnoughBalance || isLoading}
            >
              <LinearGradient
                colors={hasEnoughBalance ? [colors.primary, colors.primary] : ['#E5E5E5', '#D0D0D0']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.buttonGradient}
              >
                <CreditCard size={isSmallDevice ? 18 : 20} color={hasEnoughBalance ? colors.textDark : colors.gray[500]} />
                <Text style={[styles.primaryButtonText, !hasEnoughBalance && styles.disabledButtonText]}>
                  Suscribirse
                </Text>
              </LinearGradient>
            </TouchableOpacity>
            
            {!hasEnoughBalance && (
              <TouchableOpacity 
                style={styles.secondaryButton}
                onPress={onRechargeWallet}
              >
                <Text style={styles.secondaryButtonText}>Recargar billetera</Text>
              </TouchableOpacity>
            )}
            
            <TouchableOpacity 
              style={styles.ghostButton}
              onPress={onRestoreSubscription}
            >
              <Text style={styles.ghostButtonText}>Restaurar compras</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  headerCard: {
    marginBottom: 16,
    borderRadius: 25,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 12,
  },
  walletCard: {
    marginBottom: 16,
    borderRadius: 25,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 12,
  },
  featuresCard: {
    marginBottom: 16,
    borderRadius: 25,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 12,
  },
  statusCard: {
    marginBottom: 16,
    borderRadius: 25,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 12,
  },
  gradientContainer: {
    borderRadius: 25,
    padding: 24,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  crownContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#69C5F8',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  titleBox: {
    backgroundColor: '#69C5F8',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    flex: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  titleSmall: {
    fontSize: 24,
  },
  subtitle: {
    fontSize: 16,
    color: colors.gray[600],
    marginBottom: 20,
    textAlign: 'center',
    lineHeight: 22,
  },
  priceContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  priceBox: {
    backgroundColor: '#69C5F8',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'baseline',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  price: {
    fontSize: 36,
    fontWeight: 'bold',
    color: colors.primary,
    textShadowColor: 'rgba(255, 255, 255, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  pricePeriod: {
    fontSize: 18,
    color: colors.primary,
    marginLeft: 8,
    textShadowColor: 'rgba(255, 255, 255, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  trialInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(105, 197, 248, 0.1)',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(105, 197, 248, 0.2)',
  },
  trialInfoText: {
    fontSize: 14,
    color: colors.gray[600],
    marginLeft: 8,
    fontWeight: '500',
  },
  walletHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  walletIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#69C5F8',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  walletTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    backgroundColor: '#69C5F8',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    flex: 1,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  balanceContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  balanceLabel: {
    fontSize: 16,
    color: colors.gray[600],
    marginBottom: 8,
    fontWeight: '500',
  },
  balanceAmountContainer: {
    position: 'relative',
    marginBottom: 8,
  },
  balanceAmount: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    backgroundColor: '#69C5F8',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  balanceGlow: {
    position: 'absolute',
    top: -5,
    left: -10,
    right: -10,
    bottom: -5,
    backgroundColor: '#69C5F8',
    borderRadius: 20,
    zIndex: -1,
  },
  insufficientBalance: {
    color: colors.error,
  },
  insufficientBalanceText: {
    fontSize: 14,
    color: colors.error,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  walletPaymentInfo: {
    fontSize: 14,
    color: colors.gray[600],
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 16,
  },
  rechargeButton: {
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  featuresTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    backgroundColor: '#69C5F8',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginBottom: 16,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  featuresList: {
    gap: 12,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(105, 197, 248, 0.1)',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(105, 197, 248, 0.2)',
  },
  featureText: {
    fontSize: 16,
    color: colors.textDark,
    marginLeft: 12,
    fontWeight: '500',
  },
  statusHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  statusIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#69C5F8',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  statusTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    backgroundColor: '#69C5F8',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    flex: 1,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  statusText: {
    fontSize: 16,
    color: colors.textDark,
    textAlign: 'center',
    marginBottom: 8,
    fontWeight: '500',
  },
  statusDate: {
    fontSize: 14,
    color: colors.gray[600],
    textAlign: 'center',
    fontStyle: 'italic',
  },
  daysContainer: {
    backgroundColor: '#69C5F8',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
    alignSelf: 'center',
    marginBottom: 12,
  },
  daysText: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: '600',
    textAlign: 'center',
    textShadowColor: 'rgba(255, 255, 255, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
  },
  buttonsContainer: {
    gap: 12,
  },
  primaryButton: {
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  buttonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    gap: 8,
  },
  primaryButtonText: {
    color: colors.textDark,
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(105, 197, 248, 0.4)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  secondaryButtonText: {
    color: colors.textDark,
    fontSize: 16,
    fontWeight: '600',
  },
  ghostButton: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ghostButtonText: {
    color: colors.gray[600],
    fontSize: 16,
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
  disabledButtonText: {
    color: colors.gray[500],
  },
  rechargeButtonText: {
    color: colors.textDark,
    fontSize: 16,
    fontWeight: '600',
  },
});
