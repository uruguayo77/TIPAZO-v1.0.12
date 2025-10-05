import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { colors } from '@/constants/colors';
import { useSubscriptionStore, TRIAL_DAYS, SUBSCRIPTION_PRICE } from '@/store/subscription-store';
import { router } from 'expo-router';
import { Crown, AlertCircle, X } from 'lucide-react-native';

interface FloatingSubscriptionBadgeProps {
  onDismiss?: () => void;
}

export const FloatingSubscriptionBadge: React.FC<FloatingSubscriptionBadgeProps> = ({ 
  onDismiss 
}) => {
  const { status, trialEndDate } = useSubscriptionStore();
  const [visible, setVisible] = React.useState(true);
  const fadeAnim = React.useRef(new Animated.Value(1)).current;
  
  // Calculate days remaining in trial
  const getDaysRemaining = (): number => {
    if (!trialEndDate) return 0;
    
    const now = new Date();
    const endDate = new Date(trialEndDate);
    const diffTime = endDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return Math.max(0, diffDays);
  };
  
  const handlePress = () => {
    router.push('/subscription');
  };
  
  const handleDismiss = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setVisible(false);
      onDismiss?.();
    });
  };
  
  if (status === 'active' || !visible) {
    return null;
  }
  
  return (
    <Animated.View 
      style={[
        styles.container,
        { opacity: fadeAnim },
        status === 'expired' && styles.expiredContainer
      ]}
    >
      <TouchableOpacity 
        style={styles.content}
        onPress={handlePress}
        activeOpacity={0.8}
      >
        <View style={styles.iconContainer}>
          {status === 'trial' ? (
            <Crown size={18} color={status === 'trial' ? colors.primary : colors.error} />
          ) : (
            <AlertCircle size={18} color={colors.error} />
          )}
        </View>
        
        <View style={styles.textContainer}>
          {status === 'trial' ? (
            <>
              <Text style={styles.title}>
                Prueba: {getDaysRemaining()} días
              </Text>
              <Text style={styles.subtitle}>
                Toca para ver planes
              </Text>
            </>
          ) : (
            <>
              <Text style={styles.title}>
                Suscripción requerida
              </Text>
              <Text style={styles.subtitle}>
                Toca para suscribirte
              </Text>
            </>
          )}
        </View>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.dismissButton}
        onPress={handleDismiss}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <X size={16} color={colors.gray[400]} />
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 100,
    right: 16,
    left: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
    zIndex: 1000,
  },
  expiredContainer: {
    borderLeftColor: colors.error,
    backgroundColor: 'rgba(254, 242, 242, 0.95)',
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textDark,
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 12,
    color: colors.gray[600],
  },
  dismissButton: {
    padding: 4,
    marginLeft: 8,
  },
});








