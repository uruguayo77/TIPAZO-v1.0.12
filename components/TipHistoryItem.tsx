import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
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
        <View style={styles.header}>
          <View style={styles.senderInfo}>
            <Text style={styles.senderName}>{tip.senderName}</Text>
            <Text style={styles.date}>{formatDate(tip.createdAt)}</Text>
          </View>
          <View style={styles.amountContainer}>
            <Text style={styles.amount}>${tip.amount.toFixed(2)}</Text>
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
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
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
  senderName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  date: {
    fontSize: 12,
    color: colors.gray[500],
  },
  amountContainer: {
    alignItems: 'flex-end',
  },
  amount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 4,
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
    backgroundColor: colors.gray[100],
    borderRadius: 8,
    padding: 10,
    marginTop: 4,
  },
  comment: {
    fontSize: 14,
    color: colors.text,
    fontStyle: 'italic',
  },
});