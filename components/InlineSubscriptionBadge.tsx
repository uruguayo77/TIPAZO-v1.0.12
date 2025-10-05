import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '@/constants/colors';
import { useSubscriptionStore } from '@/store/subscription-store';
import { router } from 'expo-router';
import { Crown, AlertTriangle } from 'lucide-react-native';

export const InlineSubscriptionBadge: React.FC = () => {
  const { status, trialEndDate } = useSubscriptionStore();
  
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
  
  if (status === 'active') {
    return null;
  }
  
  return (
    <TouchableOpacity 
      style={[
        styles.container,
        status === 'expired' ? styles.expiredContainer : styles.trialContainer
      ]}
      onPress={handlePress}
      activeOpacity={0.8}
    >
      <View style={styles.iconContainer}>
        {status === 'trial' ? (
          <Crown size={14} color={colors.primary} />
        ) : (
          <AlertTriangle size={14} color="#f97316" />
        )}
      </View>
      
      <Text style={[
        styles.text,
        status === 'expired' ? styles.expiredText : styles.trialText
      ]}>
        {status === 'trial' 
          ? `${getDaysRemaining()}d restantes`
          : 'Suscripción'
        }
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 4,
    alignSelf: 'flex-start',
  },
  trialContainer: {
    backgroundColor: colors.primary + '15',
    borderWidth: 1,
    borderColor: colors.primary + '30',
  },
  expiredContainer: {
    backgroundColor: '#fff7ed',
    borderWidth: 1,
    borderColor: '#fed7aa',
  },
  iconContainer: {
    marginRight: 4,
  },
  text: {
    fontSize: 12,
    fontWeight: '600',
  },
  trialText: {
    color: colors.primary,
  },
  expiredText: {
    color: '#ea580c',
  },
});
