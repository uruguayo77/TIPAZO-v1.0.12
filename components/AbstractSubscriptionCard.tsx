import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '@/constants/colors';
import { Button } from '@/components/Button';
import { Crown, DollarSign } from 'lucide-react-native';

interface AbstractSubscriptionCardProps {
  status: 'none' | 'trial' | 'active' | 'expired';
  daysRemaining?: number;
  walletBalance: number;
  hasEnoughBalance: boolean;
  subscriptionPrice: number;
  onManageSubscription: () => void;
}

export const AbstractSubscriptionCard: React.FC<AbstractSubscriptionCardProps> = ({
  status,
  daysRemaining,
  walletBalance,
  hasEnoughBalance,
  subscriptionPrice,
  onManageSubscription
}) => {
  const getButtonTitle = () => {
    switch (status) {
      case 'none': return "Comenzar prueba gratuita";
      case 'trial': return "Administrar suscripción";
      case 'active': return "Administrar suscripción";
      default: return "Renovar suscripción";
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'none': return "No tienes una suscripción activa";
      case 'trial': return "Período de prueba ACTIVO";
      case 'active': return "Suscripción activa";
      case 'expired': return "Suscripción expirada";
      default: return "";
    }
  };

  const renderStatusText = () => {
    if (status === 'trial') {
      return (
        <Text style={styles.statusText}>
          Período de prueba <Text style={styles.activeText}>ACTIVO</Text>
        </Text>
      );
    }
    return <Text style={styles.statusText}>{getStatusText()}</Text>;
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <LinearGradient
          colors={['#FFFFFF', '#F8F9FA', '#E8F4FD']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradientContainer}
        >
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.iconContainer}>
              <Crown size={24} color={colors.primary} />
            </View>
            <Text style={styles.title}>TIPAZO Premium</Text>
          </View>

          {/* Days remaining for trial */}
          {status === 'trial' && daysRemaining !== undefined && (
            <View style={styles.daysContainer}>
              <Text style={styles.daysText}>{daysRemaining} días restantes</Text>
            </View>
          )}

          {/* Status */}
          {renderStatusText()}

          {/* Wallet balance */}
          <View style={styles.balanceContainer}>
            <Text style={styles.balanceLabel}>Saldo disponible</Text>
            <Text style={styles.balanceAmount}>
              ${walletBalance.toFixed(2)}
            </Text>
          </View>

          {/* Insufficient balance warning */}
          {status === 'expired' && !hasEnoughBalance && (
            <Text style={styles.insufficientText}>
              Necesitas al menos ${subscriptionPrice.toFixed(2)} para renovar tu suscripción
            </Text>
          )}

          {/* Action button */}
          <TouchableOpacity 
            style={styles.button}
            onPress={onManageSubscription}
          >
            <LinearGradient
              colors={[colors.primary, colors.primary]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.buttonGradient}
            >
              <Text style={styles.buttonText}>{getButtonTitle()}</Text>
            </LinearGradient>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    width: '100%',
  },
  card: {
    borderRadius: 25,
    overflow: 'hidden',
    // Abstract shadow
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
    // Additional abstract styling
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#69C5F8',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    // Abstract shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    backgroundColor: '#69C5F8',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  daysContainer: {
    backgroundColor: '#69C5F8',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    // Abstract shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
    // Center the container
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
  statusText: {
    fontSize: 16,
    color: colors.gray[600],
    marginBottom: 16,
    textAlign: 'center',
    fontWeight: '500',
  },
  activeText: {
    color: '#69C5F8',
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
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
  balanceAmount: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    backgroundColor: '#69C5F8',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    // Text shadow for depth
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  insufficientText: {
    fontSize: 14,
    color: colors.error,
    textAlign: 'center',
    marginBottom: 16,
    fontStyle: 'italic',
    backgroundColor: 'rgba(231, 76, 60, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(231, 76, 60, 0.2)',
  },
  button: {
    borderRadius: 20,
    overflow: 'hidden',
    // Abstract shadow for button
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  buttonGradient: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: colors.textDark,
    fontSize: 16,
    fontWeight: '600',
  },
});
