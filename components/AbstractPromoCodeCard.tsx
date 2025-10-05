import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '@/constants/colors';
import { Input } from '@/components/Input';
import { Tag } from 'lucide-react-native';

interface AbstractPromoCodeCardProps {
  promoCode: string;
  onPromoCodeChange: (text: string) => void;
  onApplyPromoCode: () => void;
  isApplyingPromo: boolean;
  promoCodeStatus?: {
    message: string;
    type: 'success' | 'error';
  };
}

export const AbstractPromoCodeCard: React.FC<AbstractPromoCodeCardProps> = ({
  promoCode,
  onPromoCodeChange,
  onApplyPromoCode,
  isApplyingPromo,
  promoCodeStatus
}) => {
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
              <Tag size={20} color={colors.primary} />
            </View>
            <Text style={styles.title}>Código Promocional</Text>
          </View>

          {/* Description */}
          <Text style={styles.description}>
            ¿Tienes un código promocional? Ingrésalo aquí y actívalo.
          </Text>

          {/* Input and Button */}
          <View style={styles.inputContainer}>
            <Input
              value={promoCode}
              onChangeText={onPromoCodeChange}
              placeholder="Ingresa tu código"
              autoCapitalize="characters"
              containerStyle={styles.input}
            />
            
            <TouchableOpacity 
              style={styles.button}
              onPress={onApplyPromoCode}
              disabled={isApplyingPromo}
            >
              <LinearGradient
                colors={[colors.primary, colors.primary]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.buttonGradient}
              >
                <Text style={styles.buttonText}>
                  {isApplyingPromo ? 'Activando...' : 'Activar código'}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          {/* Status message */}
          {promoCodeStatus && (
            <View style={[
              styles.statusContainer,
              { backgroundColor: promoCodeStatus.type === 'success' ? 'rgba(46, 204, 113, 0.1)' : 'rgba(231, 76, 60, 0.1)' }
            ]}>
              <Text style={[
                styles.statusText,
                { color: promoCodeStatus.type === 'success' ? colors.success : colors.error }
              ]}>
                {promoCodeStatus.message}
              </Text>
            </View>
          )}
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
    width: 32,
    height: 32,
    borderRadius: 16,
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
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    backgroundColor: '#69C5F8',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    flex: 1,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  description: {
    fontSize: 16,
    color: colors.gray[600],
    marginBottom: 20,
    textAlign: 'center',
    lineHeight: 22,
  },
  inputContainer: {
    gap: 16,
    marginBottom: 16,
  },
  input: {
    // Input styling will be handled by Input component
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
  statusContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  statusText: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
});


