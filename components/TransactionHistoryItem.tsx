import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '@/constants/colors';
import { Tip } from '@/types';
import { ArrowUpRight, Check, Clock } from 'lucide-react-native';

interface TransactionHistoryItemProps {
  transaction: Tip;
}

export const TransactionHistoryItem: React.FC<TransactionHistoryItemProps> = ({ transaction }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const months = [
      'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
      'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
    ];
    
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    
    return `${day} ${month} ${year}`;
  };

  const getStatusIcon = () => {
    if (transaction.status === 'completed') {
      return <Check size={16} color={colors.success} />;
    } else if (transaction.status === 'pending') {
      return <Clock size={16} color={colors.warning} />;
    } else {
      return null;
    }
  };

  const getStatusText = () => {
    if (transaction.status === 'completed') {
      return 'completado';
    } else if (transaction.status === 'pending') {
      return 'pendiente';
    } else {
      return 'fallido';
    }
  };

  // Get recipient name - use recipientName if available, otherwise use clientName
  const recipientName = transaction.recipientName || transaction.clientName || 'Usuario';

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <ArrowUpRight size={20} color={colors.primary} />
      </View>
      
      <View style={styles.contentContainer}>
        <View style={styles.topRow}>
          <Text style={styles.amount}>${transaction.amount.toFixed(2)}</Text>
          <View style={styles.statusContainer}>
            {getStatusIcon()}
            <Text style={[
              styles.statusText,
              transaction.status === 'completed' ? styles.completedText : 
              transaction.status === 'pending' ? styles.pendingText : styles.failedText
            ]}>
              {getStatusText()}
            </Text>
          </View>
        </View>
        
        <Text style={styles.recipient}>
          a {recipientName}
        </Text>
        
        <Text style={styles.date}>
          {formatDate(transaction.createdAt)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(94, 92, 230, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  contentContainer: {
    flex: 1,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  amount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#000000',
  },
  completedText: {
    color: colors.success,
  },
  pendingText: {
    color: colors.warning,
  },
  failedText: {
    color: colors.error,
  },
  recipient: {
    fontSize: 14,
    color: '#000000',
    marginBottom: 2,
  },
  date: {
    fontSize: 12,
    color: '#000000',
  },
});