import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '@/constants/colors';
import { CheckIcon } from '@/components/CheckIcon';
import { QRScanIcon } from '@/components/QRScanIcon';
import { Home } from 'lucide-react-native';

interface AbstractConfirmationFormProps {
  recipientName: string;
  amount: string;
  onScanAgain: () => void;
  onGoHome: () => void;
  isSmallDevice?: boolean;
}

export const AbstractConfirmationForm: React.FC<AbstractConfirmationFormProps> = ({
  recipientName,
  amount,
  onScanAgain,
  onGoHome,
  isSmallDevice = false
}) => {
  const tips = [
    "Las propinas del 15-20% son consideradas estándar en la mayoría de servicios. ¡Tu generosidad hace la diferencia!",
    "¿Sabías que las propinas pueden representar hasta el 60% del salario de un trabajador de servicio? Cada propina cuenta.",
    "Una propina generosa no solo ayuda económicamente, sino que también mejora el ánimo y la motivación del trabajador.",
    "Las propinas son una forma directa de reconocer el buen servicio. ¡Gracias por valorar el trabajo de los demás!",
    "En muchos países, las propinas son parte esencial del salario. Tu contribución ayuda a mantener la calidad del servicio."
  ];

  const getRandomTip = () => {
    const randomIndex = Math.floor(Math.random() * tips.length);
    return tips[randomIndex];
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Success Card */}
      <View style={styles.successCard}>
        <LinearGradient
          colors={['#FFFFFF', '#F8F9FA', '#E8F4FD']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.successGradient}
        >
          <View style={styles.successContent}>
            <View style={[
              styles.iconContainer, 
              isSmallDevice && styles.iconContainerSmall
            ]}>
              <CheckIcon size={isSmallDevice ? 60 : 80} color={colors.primary} />
            </View>
            
            <Text style={[styles.title, isSmallDevice && styles.titleSmall]}>¡Gracias!</Text>
            <Text style={styles.message}>
              Tu propina de <Text style={styles.highlight}>${amount}</Text> para <Text style={styles.highlight}>{recipientName}</Text> ha sido enviada con éxito.
            </Text>
          </View>
        </LinearGradient>
      </View>

      {/* Tip Card */}
      <View style={styles.tipCard}>
        <LinearGradient
          colors={['#FFFFFF', '#F8F9FA', '#E8F4FD']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.tipGradient}
        >
          <View style={styles.tipContent}>
            <View style={styles.sectionTitleContainer}>
              <Text style={[styles.tipTitle, isSmallDevice && styles.tipTitleSmall]}>💡 Consejo del día</Text>
            </View>
            <Text style={styles.tipText}>
              {getRandomTip()}
            </Text>
          </View>
        </LinearGradient>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionsCard}>
        <LinearGradient
          colors={['#FFFFFF', '#F8F9FA', '#E8F4FD']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.actionsGradient}
        >
          <View style={styles.actionsContent}>
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={onScanAgain}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={[colors.primary, colors.primary]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.primaryButtonGradient}
              >
                <QRScanIcon size={isSmallDevice ? 18 : 20} color={colors.textDark} />
                <Text style={styles.primaryButtonText}>Escanear otro código</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={onGoHome}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={['#FFFFFF', '#F8F9FA', '#FFFFFF']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.secondaryButtonGradient}
              >
                <Home size={isSmallDevice ? 18 : 20} color={colors.textLight} />
                <Text style={styles.secondaryButtonText}>Volver al inicio</Text>
              </LinearGradient>
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
    paddingTop: 80,
  },
  
  // Success Card
  successCard: {
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
  successGradient: {
    borderRadius: 20,
    padding: 24,
  },
  successContent: {
    alignItems: 'center',
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.primary + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  iconContainerSmall: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.textDark,
    marginBottom: 16,
    textAlign: 'center',
  },
  titleSmall: {
    fontSize: 24,
  },
  message: {
    fontSize: 16,
    color: colors.textDark,
    textAlign: 'center',
    lineHeight: 24,
  },
  highlight: {
    fontWeight: 'bold',
    color: colors.primary,
  },

  // Tip Card
  tipCard: {
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
  tipGradient: {
    borderRadius: 20,
    padding: 20,
  },
  tipContent: {
    alignItems: 'center',
  },
  sectionTitleContainer: {
    marginBottom: 12,
  },
  tipTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textDark,
    textAlign: 'center',
  },
  tipTitleSmall: {
    fontSize: 16,
  },
  tipText: {
    fontSize: 14,
    color: colors.textDark,
    lineHeight: 22,
    textAlign: 'center',
  },

  // Actions Card
  actionsCard: {
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
  actionsGradient: {
    borderRadius: 20,
    padding: 20,
  },
  actionsContent: {
    gap: 12,
  },
  primaryButton: {
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  primaryButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    gap: 8,
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textDark,
  },
  secondaryButton: {
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  secondaryButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    gap: 8,
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textLight,
  },
});
