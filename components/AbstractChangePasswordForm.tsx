import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '@/constants/colors';
import { Input } from '@/components/Input';
import { Lock } from 'lucide-react-native';

interface AbstractChangePasswordFormProps {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
  onCurrentPasswordChange: (text: string) => void;
  onNewPasswordChange: (text: string) => void;
  onConfirmPasswordChange: (text: string) => void;
  onSave: () => void;
  onCancel: () => void;
  isLoading: boolean;
  errors: {
    currentPassword?: string;
    newPassword?: string;
    confirmPassword?: string;
  };
  t: (key: string) => string;
}

export function AbstractChangePasswordForm({
  currentPassword,
  newPassword,
  confirmPassword,
  onCurrentPasswordChange,
  onNewPasswordChange,
  onConfirmPasswordChange,
  onSave,
  onCancel,
  isLoading,
  errors,
  t,
}: AbstractChangePasswordFormProps) {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <LinearGradient
          colors={['#FFFFFF', '#F8F9FA', '#E8F4FD']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradientContainer}
        >
          <Text style={styles.sectionTitle}>Cambiar Contraseña</Text>
          
          <View style={styles.form}>
            <Input
              label={t('currentPassword')}
              value={currentPassword}
              onChangeText={onCurrentPasswordChange}
              placeholder={t('enterCurrentPassword')}
              isPassword
              error={errors.currentPassword}
              autoCapitalize="none"
              leftIcon={<Lock size={20} color={colors.gray[500]} />}
            />
            
            <Input
              label={t('newPassword')}
              value={newPassword}
              onChangeText={onNewPasswordChange}
              placeholder={t('enterNewPassword')}
              isPassword
              error={errors.newPassword}
              autoCapitalize="none"
              leftIcon={<Lock size={20} color={colors.gray[500]} />}
            />
            
            <Input
              label={t('confirmNewPassword')}
              value={confirmPassword}
              onChangeText={onConfirmPasswordChange}
              placeholder={t('confirmNewPassword')}
              isPassword
              error={errors.confirmPassword}
              autoCapitalize="none"
              leftIcon={<Lock size={20} color={colors.gray[500]} />}
            />
          </View>
          
          <View style={styles.passwordRequirements}>
            <Text style={styles.requirementsTitle}>{t('passwordRequirements')}</Text>
            <Text style={styles.requirementItem}>• {t('passwordMinLength')}</Text>
            <Text style={styles.requirementItem}>• {t('passwordRecommendation')}</Text>
          </View>
          
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={styles.saveButton}
              onPress={onSave}
              disabled={isLoading}
            >
              <LinearGradient
                colors={[colors.primary, colors.primary]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.buttonGradient}
              >
                <Text style={styles.saveButtonText}>
                  {isLoading ? 'Guardando...' : 'Guardar'}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.cancelButton}
              onPress={onCancel}
            >
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 60,
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    backgroundColor: '#69C5F8',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginBottom: 20,
    textAlign: 'center',
  },
  form: {
    gap: 16,
    marginBottom: 20,
  },
  passwordRequirements: {
    backgroundColor: 'rgba(105, 197, 248, 0.1)',
    padding: 16,
    borderRadius: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(105, 197, 248, 0.2)',
  },
  requirementsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textDark,
    marginBottom: 8,
  },
  requirementItem: {
    fontSize: 14,
    color: colors.gray[600],
    marginBottom: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  saveButton: {
    flex: 1,
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
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButtonText: {
    color: colors.textDark,
    fontSize: 14,
    fontWeight: '600',
  },
  cancelButton: {
    flex: 1,
    backgroundColor: colors.gray[200],
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButtonText: {
    color: colors.gray[600],
    fontSize: 14,
    fontWeight: '600',
  },
});
