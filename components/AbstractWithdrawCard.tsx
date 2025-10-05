import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '@/constants/colors';
import Svg, { Path, Defs, Filter, FeDropShadow } from 'react-native-svg';

interface AbstractWithdrawCardProps {
  balance: number;
  exchangeRate?: number;
  onWithdrawPress?: () => void;
  withdrawIcon?: React.ReactNode;
  isSmallDevice?: boolean;
}

export const AbstractWithdrawCard: React.FC<AbstractWithdrawCardProps> = ({
  balance,
  exchangeRate,
  onWithdrawPress,
  withdrawIcon,
  isSmallDevice = false
}) => {
  return (
    <View style={styles.container}>
      {/* Abstract background with gradient and shadow */}
      <LinearGradient
        colors={['#FFFFFF', '#F8F9FA', '#E8F4FD']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradientContainer}
      >
        {/* Balance content */}
        <View style={styles.contentContainer}>
          <Text style={styles.balanceLabel}>Saldo disponible</Text>
          
          {/* Abstract balance amount with glow effect */}
          <View style={styles.balanceAmountContainer}>
            <Text style={styles.balanceAmount}>
              ${balance.toFixed(2)}
            </Text>
            {/* Glow effect behind amount */}
            <View style={styles.balanceGlow} />
          </View>
          
          {/* Exchange rate with abstract styling */}
          {exchangeRate && (
            <View style={styles.exchangeRateContainer}>
              <Text style={styles.exchangeRateText}>
                Tasa BCV: Bs. {exchangeRate.toFixed(2)}
              </Text>
              <Text style={styles.exchangeRateSubtext}>
                ≈ Bs. {(balance * exchangeRate).toFixed(2)} en bolívares
              </Text>
            </View>
          )}
          
          {/* Abstract withdraw button */}
          <TouchableOpacity 
            style={styles.withdrawButton}
            onPress={onWithdrawPress}
          >
            <View style={styles.buttonContent}>
              {withdrawIcon}
              <Text style={styles.buttonText}>Retirar fondos</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Abstract wave decoration at bottom */}
        <View style={styles.bottomWaveDecoration}>
          <Svg width="100%" height={15} viewBox="0 0 400 15">
            <Path
              d="M0,5 Q50,15 100,5 T200,5 T300,5 T400,5 L400,15 L0,15 Z"
              fill="rgba(255, 255, 255, 0.3)"
            />
          </Svg>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
    // Abstract shadow for the entire card
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 12,
  },
  gradientContainer: {
    borderRadius: 25,
    overflow: 'hidden',
    // Additional abstract styling
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
  contentContainer: {
    padding: 24,
    alignItems: 'center',
    zIndex: 2,
  },
  balanceLabel: {
    fontSize: 16,
    color: colors.gray[600],
    marginBottom: 12,
    textAlign: 'center',
    fontWeight: '500',
  },
  balanceAmountContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  balanceAmount: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    // Text shadow for depth
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
  exchangeRateContainer: {
    marginBottom: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'rgba(0, 255, 170, 0.2)',
  },
  exchangeRateText: {
    fontSize: 12,
    color: colors.gray[500],
    textAlign: 'center',
    fontWeight: '500',
  },
  exchangeRateSubtext: {
    fontSize: 10,
    color: colors.gray[400],
    textAlign: 'center',
    marginTop: 2,
  },
  withdrawButton: {
    backgroundColor: colors.primary,
    borderRadius: 20,
    paddingVertical: 16,
    paddingHorizontal: 24,
    width: '100%',
    // Abstract shadow for button
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  buttonText: {
    color: colors.textDark,
    fontSize: 16,
    fontWeight: '600',
  },
  bottomWaveDecoration: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
});


