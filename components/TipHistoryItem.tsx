import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '@/constants/colors';
import { Tip } from '@/types';
import { CheckCircle, Star } from 'lucide-react-native';

interface TipHistoryItemProps {
  tip: Tip;
  onPress?: (tip: Tip) => void;
}

export const TipHistoryItem: React.FC<TipHistoryItemProps> = ({ tip, onPress }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const handlePress = () => {
    if (onPress) {
      onPress(tip);
    }
  };

  // Render stars based on rating
  const renderStars = () => {
    if (!tip.rating) return null;
    
    return (
      <View style={styles.starsContainer}>
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={14}
            color={i < tip.rating! ? colors.primary : colors.gray[300]}
            fill={i < tip.rating! ? colors.primary : 'transparent'}
          />
        ))}
      </View>
    );
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={handlePress}
      activeOpacity={onPress ? 0.7 : 1}
    >
      <View style={styles.card}>
        <LinearGradient
          colors={['#FFFFFF', '#F8F9FA', '#E8F4FD']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.cardGradient}
        >
          <View style={styles.header}>
            <View style={styles.senderInfo}>
              <View style={styles.senderNameBox}>
                <Text style={styles.senderName}>{tip.senderName}</Text>
              </View>
              <Text style={styles.date}>{formatDate(tip.createdAt)}</Text>
            </View>
            <View style={styles.amountContainer}>
              <View style={styles.amountBox}>
                <Text style={styles.amount}>${tip.amount.toFixed(2)}</Text>
              </View>
              {tip.status === 'completed' && (
                <View style={styles.statusContainer}>
                  <CheckCircle size={12} color={colors.success} />
                  <Text style={styles.statusText}>completado</Text>
                </View>
              )}
            </View>
          </View>
          
          {/* Rating stars */}
          {tip.rating && renderStars()}
          
          {/* Comment */}
          {tip.comment && (
            <View style={styles.commentContainer}>
              <Text style={styles.comment}>"{tip.comment}"</Text>
            </View>
          )}
        </LinearGradient>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  cardGradient: {
    borderRadius: 16,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  senderInfo: {
    flex: 1,
  },
  senderNameBox: {
    backgroundColor: '#69C5F8',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginBottom: 4,
    alignSelf: 'flex-start',
  },
  senderName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  date: {
    fontSize: 12,
    color: colors.gray[500],
  },
  amountContainer: {
    alignItems: 'flex-end',
  },
  amountBox: {
    backgroundColor: '#69C5F8',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    marginBottom: 4,
  },
  amount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statusText: {
    fontSize: 12,
    color: colors.success,
  },
  starsContainer: {
    flexDirection: 'row',
    marginBottom: 8,
    gap: 2,
  },
  commentContainer: {
    backgroundColor: 'rgba(105, 197, 248, 0.1)',
    borderRadius: 12,
    padding: 12,
    marginTop: 4,
    borderWidth: 1,
    borderColor: 'rgba(105, 197, 248, 0.2)',
  },
  comment: {
    fontSize: 14,
    color: colors.textDark,
    fontStyle: 'italic',
  },
});