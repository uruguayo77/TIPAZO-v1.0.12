import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Platform } from 'react-native';
import { colors } from '@/constants/colors';

interface TipAmountSelectorProps {
  onSelectAmount: (amount: number) => void;
  initialAmount?: number;
}

export const TipAmountSelector: React.FC<TipAmountSelectorProps> = ({ 
  onSelectAmount,
  initialAmount
}) => {
  const [selectedAmount, setSelectedAmount] = useState<number | undefined>(initialAmount);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [isCustom, setIsCustom] = useState<boolean>(false);
  
  // Predefined tip amounts
  const tipAmounts = [5, 10, 20, 50];
  
  // Initialize with initial amount if provided
  useEffect(() => {
    if (initialAmount) {
      setSelectedAmount(initialAmount);
      
      // Check if it's a custom amount
      if (!tipAmounts.includes(initialAmount)) {
        setIsCustom(true);
        setCustomAmount(initialAmount.toString());
      }
    }
  }, [initialAmount]);
  
  const handleSelectAmount = (amount: number) => {
    setSelectedAmount(amount);
    setIsCustom(false);
    onSelectAmount(amount);
  };
  
  const handleCustomSelect = () => {
    setIsCustom(true);
    setSelectedAmount(undefined);
  };
  
  const handleCustomAmountChange = (value: string) => {
    // Only allow numbers and decimal point
    const filteredValue = value.replace(/[^0-9.]/g, '');
    setCustomAmount(filteredValue);
    
    // Convert to number and call the callback
    const numValue = parseFloat(filteredValue);
    if (!isNaN(numValue) && numValue > 0) {
      setSelectedAmount(numValue);
      onSelectAmount(numValue);
    } else if (filteredValue === '') {
      setSelectedAmount(undefined);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Selecciona el monto</Text>
      
      <View style={styles.amountsContainer}>
        {tipAmounts.map((amount) => (
          <TouchableOpacity
            key={amount}
            style={[
              styles.amountButton,
              selectedAmount === amount && styles.selectedAmountButton
            ]}
            onPress={() => handleSelectAmount(amount)}
          >
            <Text 
              style={[
                styles.amountText,
                selectedAmount === amount && styles.selectedAmountText
              ]}
            >
              ${amount}
            </Text>
          </TouchableOpacity>
        ))}
        
        <TouchableOpacity
          style={[
            styles.amountButton,
            isCustom && styles.selectedAmountButton
          ]}
          onPress={handleCustomSelect}
        >
          <Text 
            style={[
              styles.amountText,
              isCustom && styles.selectedAmountText
            ]}
          >
            Otro
          </Text>
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
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              autoFocus
            />
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    color: colors.textLight,
  },
  amountsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  amountButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    minWidth: '22%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  selectedAmountButton: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  amountText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textLight,
  },
  selectedAmountText: {
    color: colors.textDark,
  },
  customAmountContainer: {
    marginTop: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  customAmountLabel: {
    fontSize: 14,
    color: colors.textLight,
    marginBottom: 8,
  },
  customInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  currencySymbol: {
    fontSize: 18,
    color: colors.textLight,
    marginRight: 4,
  },
  customAmountInput: {
    flex: 1,
    fontSize: 18,
    color: colors.textLight,
    paddingVertical: Platform.OS === 'ios' ? 12 : 8,
  },
});