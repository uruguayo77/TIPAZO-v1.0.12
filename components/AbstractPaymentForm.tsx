import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '@/constants/colors';
import { CheckCircle } from 'lucide-react-native';
import { Avatar } from '@/components/Avatar';
import { TransferIcon } from '@/components/TransferIcon';

interface AbstractPaymentFormProps {
  workerName: string;
  amount: number;
  userBalance: number;
  rating: number;
  comment: string;
  senderName?: string;
  senderProfilePicture?: string;
  recipientProfilePicture?: string;
  onBack: () => void;
  onConfirmPayment: () => void;
  onCancelPayment: () => void;
  isPaymentProcessing: boolean;
  isPaymentComplete: boolean;
  isDisabled: boolean;
}

export const AbstractPaymentForm: React.FC<AbstractPaymentFormProps> = ({
  workerName,
  amount,
  userBalance,
  rating,
  comment,
  senderName,
  senderProfilePicture,
  recipientProfilePicture,
  onBack,
  onConfirmPayment,
  onCancelPayment,
  isPaymentProcessing,
  isPaymentComplete,
  isDisabled
}) => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Transfer Section */}
      <View style={styles.transferCard}>
        <LinearGradient
          colors={['#FFFFFF', '#F8F9FA', '#E8F4FD']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.transferGradient}
        >
          <View style={styles.transferContent}>
            <Text style={styles.transferLabel}>Transferencia</Text>
            
            {/* Compact Transfer Layout */}
            <View style={styles.transferContainer}>
              {/* Sender */}
              <View style={styles.userInfo}>
                <Avatar
                  source={senderProfilePicture}
                  name={senderName || 'Tú'}
                  size={45}
                  variant="rounded"
                />
                <View style={styles.compactNameBox}>
                  <Text style={styles.compactName}>{senderName || 'Tú'}</Text>
                </View>
              </View>
              
              {/* Transfer Icon */}
              <View style={styles.transferIconContainer}>
                <TransferIcon size={32} color="#69C5F8" />
              </View>
              
              {/* Recipient */}
              <View style={styles.userInfo}>
                <Avatar
                  source={recipientProfilePicture}
                  name={workerName}
                  size={45}
                  variant="rounded"
                />
                <View style={styles.compactNameBox}>
                  <Text style={styles.compactName}>{workerName}</Text>
                </View>
              </View>
            </View>
          </View>
        </LinearGradient>
      </View>

      {/* Payment Summary Card */}
      <View style={styles.summaryCard}>
        <LinearGradient
          colors={['#FFFFFF', '#F8F9FA', '#E8F4FD']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.summaryGradient}
        >
          <View style={styles.summaryContent}>
            <Text style={styles.summaryTitle}>Confirmación</Text>
            
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Destinatario:</Text>
              <Text style={styles.summaryValue}>{workerName}</Text>
            </View>
            
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Monto:</Text>
              <Text style={styles.summaryValue}>${amount}</Text>
            </View>
            
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Tu saldo:</Text>
              <Text style={styles.summaryValue}>${userBalance.toFixed(2)}</Text>
            </View>
            
            {rating > 0 && (
              <View style={styles.summaryItem}>
                <Text style={styles.summaryLabel}>Valoración:</Text>
                <Text style={styles.summaryValue}>{rating} estrellas</Text>
              </View>
            )}
            
            {comment ? (
              <View style={styles.commentContainer}>
                <Text style={styles.commentLabel}>Comentario incluido:</Text>
                <Text style={styles.commentText}>"{comment}"</Text>
              </View>
            ) : (
              <View style={styles.commentContainer}>
                <Text style={styles.commentLabel}>No has incluido ningún comentario.</Text>
              </View>
            )}
            
            <Text style={styles.confirmationQuestion}>
              ¿Deseas confirmar esta propina?
            </Text>
          </View>
        </LinearGradient>
      </View>

      {/* Payment Button */}
      <View style={styles.buttonCard}>
        <LinearGradient
          colors={['#FFFFFF', '#F8F9FA', '#E8F4FD']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.buttonGradient}
        >
          <View style={styles.buttonContent}>
            <TouchableOpacity
              style={[styles.paymentButton, isDisabled && styles.disabledButton]}
              onPress={onConfirmPayment}
              disabled={isDisabled}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={isDisabled ? ['#E5E5E5', '#D0D0D0'] : [colors.primary, colors.primary]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.paymentButtonGradient}
              >
                {isPaymentComplete && <CheckCircle size={20} color={colors.textDark} />}
                <Text style={[
                  styles.paymentButtonText,
                  isDisabled && styles.disabledButtonText
                ]}>
                  {isPaymentProcessing 
                    ? isPaymentComplete 
                      ? "¡Pago completado!" 
                      : "Procesando pago..."
                    : "Confirmar el pago"
                  }
                </Text>
              </LinearGradient>
            </TouchableOpacity>

            {/* Cancel Button */}
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={onCancelPayment}
              disabled={isPaymentProcessing}
              activeOpacity={0.8}
            >
              <Text style={[
                styles.cancelButtonText,
                isPaymentProcessing && styles.disabledButtonText
              ]}>
                Cancela
              </Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  
  // Header Card
  headerCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  headerGradient: {
    borderRadius: 20,
    padding: 16,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textDark,
  },
  placeholder: {
    width: 40,
  },

  // Transfer Card
  transferCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  transferGradient: {
    borderRadius: 20,
    padding: 16,
  },
  transferContent: {
    alignItems: 'center',
  },
  transferLabel: {
    fontSize: 14,
    color: colors.gray[600],
    marginBottom: 8,
    fontWeight: '500',
  },
  transferContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 12,
  },
  userInfo: {
    flex: 1,
    alignItems: 'center',
    maxWidth: '40%',
  },
  transferIconContainer: {
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  compactNameBox: {
    backgroundColor: '#69C5F8',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginTop: 4,
    alignSelf: 'center',
  },
  compactName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },

  // Summary Card
  summaryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  summaryGradient: {
    borderRadius: 16,
    padding: 12,
  },
  summaryContent: {
    alignItems: 'center',
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.textDark,
    marginBottom: 12,
    textAlign: 'center',
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 8,
    paddingVertical: 4,
    paddingHorizontal: 10,
    backgroundColor: 'rgba(105, 197, 248, 0.1)',
    borderRadius: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: colors.textDark,
    fontWeight: '500',
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#69C5F8',
  },
  commentContainer: {
    width: '100%',
    marginTop: 8,
    padding: 16,
    backgroundColor: 'rgba(105, 197, 248, 0.1)',
    borderRadius: 12,
  },
  commentLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.textDark,
    marginBottom: 4,
  },
  commentText: {
    fontSize: 16,
    color: colors.textDark,
    fontStyle: 'italic',
  },
  confirmationQuestion: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textDark,
    marginTop: 20,
    textAlign: 'center',
  },

  // Button Card
  buttonCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  buttonGradient: {
    borderRadius: 20,
    padding: 20,
  },
  buttonContent: {
    alignItems: 'center',
  },
  paymentButton: {
    width: '100%',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  disabledButton: {
    shadowOpacity: 0.1,
    elevation: 3,
  },
  paymentButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    paddingHorizontal: 24,
    gap: 8,
  },
  paymentButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textDark,
    textShadowColor: 'rgba(255, 255, 255, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  disabledButtonText: {
    color: colors.gray[500],
  },

  // Cancel Button
  cancelButton: {
    width: '100%',
    marginTop: 12,
    backgroundColor: colors.gray[200],
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButtonText: {
    color: colors.gray[600],
    fontSize: 16,
    fontWeight: '600',
  },
});
