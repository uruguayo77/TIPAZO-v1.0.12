import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '@/constants/colors';
import { Star, Wallet, ArrowRight } from 'lucide-react-native';
import Svg, { Path, Defs, Filter, FeDropShadow } from 'react-native-svg';
import { Avatar } from '@/components/Avatar';
import { TransferIcon } from '@/components/TransferIcon';

interface AbstractTipAmountFormProps {
  recipientName: string;
  recipientOccupation: string;
  recipientProfilePicture?: string;
  senderName?: string;
  senderProfilePicture?: string;
  userBalance?: number;
  exchangeRate?: number | null;
  exchangeLoading?: boolean;
  tipAmount: number | undefined;
  rating: number;
  comment: string;
  commenterName: string;
  onAmountChange: (amount: number) => void;
  onRatingChange: (rating: number) => void;
  onCommentChange: (comment: string) => void;
  onNameChange: (name: string) => void;
  onContinue: () => void;
  isLoading?: boolean;
}

export const AbstractTipAmountForm: React.FC<AbstractTipAmountFormProps> = ({
  recipientName,
  recipientOccupation,
  recipientProfilePicture,
  senderName,
  senderProfilePicture,
  userBalance,
  exchangeRate,
  exchangeLoading = false,
  tipAmount,
  rating,
  comment,
  commenterName,
  onAmountChange,
  onRatingChange,
  onCommentChange,
  onNameChange,
  onContinue,
  isLoading = false,
}) => {
  const [selectedAmount, setSelectedAmount] = useState<number | undefined>(tipAmount);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [isCustom, setIsCustom] = useState<boolean>(false);
  
  const tipAmounts = [5, 10, 20, 50];
  
  useEffect(() => {
    if (tipAmount && !tipAmounts.includes(tipAmount)) {
      setIsCustom(true);
      setCustomAmount(tipAmount.toString());
    }
  }, [tipAmount]);

  const handleSelectAmount = (amount: number) => {
    setSelectedAmount(amount);
    setIsCustom(false);
    onAmountChange(amount);
  };

  const handleCustomSelect = () => {
    setIsCustom(true);
    setSelectedAmount(undefined);
  };

  const handleCustomAmountChange = (value: string) => {
    const filteredValue = value.replace(/[^0-9.]/g, '');
    setCustomAmount(filteredValue);
    
    const numValue = parseFloat(filteredValue);
    if (!isNaN(numValue) && numValue > 0) {
      setSelectedAmount(numValue);
      onAmountChange(numValue);
    } else if (filteredValue === '') {
      setSelectedAmount(undefined);
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header Section with Transfer Info */}
      <View style={styles.headerCard}>
        <View style={styles.headerSection}>
            <Text style={styles.headerLabel}>Transferencia</Text>
          
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
                name={recipientName}
                size={45}
                variant="rounded"
              />
              <View style={styles.compactNameBox}>
                <Text style={styles.compactName}>{recipientName}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* Balance Section - Same design as main page */}
      {userBalance !== undefined && (
        <View style={styles.balanceCard}>
          <LinearGradient
            colors={['#FFFFFF', '#F8F9FA', '#E8F4FD']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.balanceGradient}
          >
            <View style={styles.balanceContent}>
              <Text style={styles.balanceLabel}>Saldo disponible</Text>
              
              {/* Abstract balance amount with glow effect */}
              <View style={styles.balanceAmountContainer}>
                <Text style={styles.balanceAmount}>
                  ${userBalance.toFixed(2)}
                </Text>
                {/* Glow effect behind amount */}
                <View style={styles.balanceGlow} />
              </View>
              
              {/* Exchange rate with abstract styling */}
              <View style={styles.exchangeRateContainer}>
                <Text style={styles.exchangeRateNote}>
                  Tasa BCV: Bs. {exchangeLoading ? '...' : (exchangeRate?.toFixed(2) || 'Cargando...')} por $1
                </Text>
              </View>
            </View>
          </LinearGradient>
        </View>
      )}

      {/* Amount Selection Section */}
      <View style={styles.amountCard}>
        <LinearGradient
          colors={['#FFFFFF', '#F8F9FA', '#E8F4FD']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.amountGradient}
        >
          <View style={styles.amountContent}>
            {/* Section title with blue background */}
            <View style={styles.sectionTitleContainer}>
              <Text style={styles.sectionTitle}>Selecciona el monto</Text>
            </View>
            
            <View style={styles.amountsContainer}>
              {tipAmounts.map((amountValue) => (
                <TouchableOpacity
                  key={amountValue}
                  style={styles.amountButton}
                  onPress={() => handleSelectAmount(amountValue)}
                >
                  <LinearGradient
                    colors={selectedAmount === amountValue ? 
                      [colors.primary, colors.primary] : 
                      ['#FFFFFF', '#F8F9FA', '#FFFFFF']
                    }
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.amountButtonGradient}
                  >
                    <Text style={[
                      styles.amountText,
                      selectedAmount === amountValue && styles.selectedAmountText
                    ]}>
                      ${amountValue}
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              ))}
              
              <TouchableOpacity
                style={styles.amountButton}
                onPress={handleCustomSelect}
              >
                <LinearGradient
                  colors={isCustom ? 
                    [colors.primary, colors.primary] : 
                    ['#FFFFFF', '#F8F9FA', '#FFFFFF']
                  }
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.amountButtonGradient}
                >
                  <Text style={[
                    styles.amountText,
                    isCustom && styles.selectedAmountText
                  ]}>
                    Otro
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
            
            {isCustom && (
              <View style={styles.customAmountContainer}>
                <Text style={styles.customAmountLabel}>Ingresa el monto:</Text>
                <View style={styles.customInputContainer}>
                  <Text style={styles.currencySymbol}>$</Text>
                  <TextInput
                    style={styles.customAmountInput}
                    value={customAmount}
                    onChangeText={handleCustomAmountChange}
                    keyboardType="decimal-pad"
                    placeholder="0.00"
                    placeholderTextColor="rgba(0, 0, 0, 0.5)"
                    autoFocus
                  />
                </View>
              </View>
            )}
          </View>
        </LinearGradient>
      </View>

      {/* Rating Section */}
      <View style={styles.ratingCard}>
        <LinearGradient
          colors={['#FFFFFF', '#F8F9FA', '#E8F4FD']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.ratingGradient}
        >
          <View style={styles.ratingContent}>
            <View style={styles.sectionTitleContainer}>
              <Text style={styles.sectionTitle}>Valora tu experiencia</Text>
            </View>
            <View style={styles.starsContainer}>
              {[1, 2, 3, 4, 5].map((star) => (
                <TouchableOpacity
                  key={star}
                  onPress={() => onRatingChange(star)}
                  style={styles.starButton}
                >
                  <Star
                    size={32}
                    color={star <= rating ? colors.primary : colors.gray[300]}
                    fill={star <= rating ? colors.primary : 'transparent'}
                  />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </LinearGradient>
      </View>

      {/* Comment Section */}
      <View style={styles.commentCard}>
        <LinearGradient
          colors={['#FFFFFF', '#F8F9FA', '#E8F4FD']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.commentGradient}
        >
          <View style={styles.commentContent}>
            <View style={styles.sectionTitleContainer}>
              <Text style={styles.sectionTitle}>Escribe un comentario (opcional)</Text>
            </View>
            <TextInput
              style={styles.commentInput}
              placeholder="Escribe un comentario..."
              placeholderTextColor="rgba(0, 0, 0, 0.5)"
              multiline
              numberOfLines={3}
              value={comment}
              onChangeText={onCommentChange}
            />
          </View>
        </LinearGradient>
      </View>

      {/* Name Section */}
      <View style={styles.nameCard}>
        <LinearGradient
          colors={['#FFFFFF', '#F8F9FA', '#E8F4FD']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.nameGradient}
        >
          <View style={styles.nameContent}>
            <View style={styles.sectionTitleContainer}>
              <Text style={styles.sectionTitle}>Tu nombre</Text>
            </View>
            <TextInput
              style={styles.nameInput}
              placeholder="Ingresa tu nombre"
              placeholderTextColor="rgba(0, 0, 0, 0.5)"
              value={commenterName}
              onChangeText={onNameChange}
            />
          </View>
        </LinearGradient>
      </View>

      {/* Continue Button */}
      <TouchableOpacity
        style={styles.continueButton}
        onPress={onContinue}
        disabled={!selectedAmount || isLoading}
        activeOpacity={0.8}
      >
        <LinearGradient
          colors={(!selectedAmount || isLoading) ? ['#E5E5E5', '#D0D0D0'] : [colors.primary, colors.primary]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.continueButtonGradient}
        >
          <Text style={[
            styles.continueButtonText,
            (!selectedAmount || isLoading) && styles.disabledButtonText
          ]}>
            {isLoading ? 'Procesando...' : 'Continuar al pago'}
          </Text>
          <ArrowRight size={20} color={(!selectedAmount || isLoading) ? colors.gray[500] : colors.textDark} />
        </LinearGradient>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  
  // Header Card with White Background
  headerCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  headerSection: {
    padding: 16,
    alignItems: 'center',
  },
  
  // Compact Transfer Layout Styles
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
  headerLabel: {
    fontSize: 14,
    color: colors.gray[600],
    marginBottom: 8,
    fontWeight: '500',
  },
  avatarContainer: {
    marginBottom: 16,
  },
  nameBox: {
    backgroundColor: '#69C5F8',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 12,
    marginBottom: 12,
  },
  nameText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  occupationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  occupationLabel: {
    fontSize: 16,
    color: colors.gray[500],
    fontWeight: '500',
  },
  occupationDivider: {
    fontSize: 16,
    color: colors.gray[400],
    fontWeight: '300',
  },
  occupationBox: {
    backgroundColor: '#69C5F8',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  occupationText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },

  // Balance Card Styles - Same as main page
  balanceCard: {
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 12,
  },
  balanceGradient: {
    borderRadius: 25,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
  balanceContent: {
    padding: 16,
    alignItems: 'center',
    zIndex: 2,
  },
  balanceLabel: {
    fontSize: 14,
    color: colors.gray[600],
    marginBottom: 8,
    textAlign: 'center',
    fontWeight: '500',
  },
  balanceAmountContainer: {
    position: 'relative',
    marginBottom: 12,
  },
  balanceAmount: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  balanceGlow: {
    position: 'absolute',
    top: -3,
    left: -8,
    right: -8,
    bottom: -3,
    backgroundColor: '#69C5F8',
    borderRadius: 12,
    zIndex: -1,
  },
  exchangeRateContainer: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(0, 255, 170, 0.2)',
  },
  exchangeRateNote: {
    fontSize: 11,
    color: colors.gray[500],
    textAlign: 'center',
    fontWeight: '500',
  },

  // Card Styles (Amount, Rating, Comment, Name)
  amountCard: {
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 12,
  },
  amountGradient: {
    borderRadius: 25,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
  amountContent: {
    padding: 24,
  },
  ratingCard: {
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 12,
  },
  ratingGradient: {
    borderRadius: 25,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
  ratingContent: {
    padding: 24,
    alignItems: 'center',
  },
  commentCard: {
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 12,
  },
  commentGradient: {
    borderRadius: 25,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
  commentContent: {
    padding: 24,
  },
  nameCard: {
    marginBottom: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 12,
  },
  nameGradient: {
    borderRadius: 25,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
  nameContent: {
    padding: 24,
  },

  // Section Title with Blue Background
  sectionTitleContainer: {
    backgroundColor: '#69C5F8',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    marginBottom: 16,
    alignSelf: 'center',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },

  // Amount Selection Styles
  amountsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  amountButton: {
    width: '22%',
    marginBottom: 12,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  amountButtonGradient: {
    paddingVertical: 16,
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  amountText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textDark,
    textShadowColor: 'rgba(255, 255, 255, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  selectedAmountText: {
    color: colors.white,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  customAmountContainer: {
    marginTop: 16,
  },
  customAmountLabel: {
    fontSize: 16,
    color: colors.textDark,
    marginBottom: 8,
  },
  customInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(105, 197, 248, 0.1)',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: 'rgba(105, 197, 248, 0.2)',
  },
  currencySymbol: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textDark,
    marginRight: 8,
  },
  customAmountInput: {
    flex: 1,
    fontSize: 16,
    color: colors.textDark,
    fontWeight: '500',
  },

  // Rating Styles
  starsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  starButton: {
    padding: 4,
  },

  // Input Styles
  commentInput: {
    backgroundColor: 'rgba(105, 197, 248, 0.1)',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: 'rgba(105, 197, 248, 0.2)',
    fontSize: 16,
    color: colors.textDark,
    textAlignVertical: 'top',
    minHeight: 80,
  },
  nameInput: {
    backgroundColor: 'rgba(105, 197, 248, 0.1)',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: 'rgba(105, 197, 248, 0.2)',
    fontSize: 16,
    color: colors.textDark,
  },

  // Continue Button Styles
  continueButton: {
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
    marginBottom: 32,
  },
  continueButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 20,
    gap: 8,
  },
  continueButtonText: {
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
});
