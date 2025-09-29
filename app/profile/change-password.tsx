import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, Platform } from 'react-native';
import { Stack, router } from 'expo-router';
import { useAuthStore } from '@/store/auth-store';
import { useLanguageStore } from '@/store/language-store';
import { colors } from '@/constants/colors';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import * as Haptics from 'expo-haptics';

export default function ChangePasswordScreen() {
  const { changePassword, isLoading } = useAuthStore();
  const { t } = useLanguageStore();
  
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<{
    currentPassword?: string;
    newPassword?: string;
    confirmPassword?: string;
  }>({});

  const validateForm = () => {
    const newErrors: typeof errors = {};

    if (!currentPassword.trim()) {
      newErrors.currentPassword = t('currentPasswordRequired');
    }

    if (!newPassword.trim()) {
      newErrors.newPassword = t('newPasswordRequired');
    } else if (newPassword.length < 8) {
      newErrors.newPassword = t('passwordTooShort');
    }

    if (!confirmPassword.trim()) {
      newErrors.confirmPassword = t('confirmPasswordRequired');
    } else if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = t('passwordsDoNotMatch');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChangePassword = async () => {
    if (!validateForm()) {
      if (Platform.OS !== 'web') {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      }
      return;
    }

    try {
      await changePassword(currentPassword, newPassword);
      
      if (Platform.OS !== 'web') {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      }

      Alert.alert(
        t('passwordChangeSuccess'),
        t('passwordChangeSuccessMessage'),
        [
          {
            text: t('ok'),
            onPress: () => router.back(),
          },
        ]
      );
    } catch (error) {
      if (Platform.OS !== 'web') {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      }

      Alert.alert(
        t('error'),
        error instanceof Error ? error.message : t('passwordChangeError')
      );
    }
  };

  const clearError = (field: keyof typeof errors) => {
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <>
      <Stack.Screen 
        options={{ 
          title: t('changePassword'),
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerTintColor: colors.text,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }} 
      />
      
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <Card style={styles.card}>
          <Text style={styles.title}>{t('changePassword')}</Text>
          <Text style={styles.subtitle}>{t('changePasswordDescription')}</Text>
          
          <View style={styles.form}>
            <Input
              label={t('currentPassword')}
              value={currentPassword}
              onChangeText={(text) => {
                setCurrentPassword(text);
                clearError('currentPassword');
              }}
              placeholder={t('enterCurrentPassword')}
              secureTextEntry
              error={errors.currentPassword}
              autoCapitalize="none"
            />
            
            <Input
              label={t('newPassword')}
              value={newPassword}
              onChangeText={(text) => {
                setNewPassword(text);
                clearError('newPassword');
              }}
              placeholder={t('enterNewPassword')}
              secureTextEntry
              error={errors.newPassword}
              autoCapitalize="none"
            />
            
            <Input
              label={t('confirmNewPassword')}
              value={confirmPassword}
              onChangeText={(text) => {
                setConfirmPassword(text);
                clearError('confirmPassword');
              }}
              placeholder={t('confirmNewPassword')}
              secureTextEntry
              error={errors.confirmPassword}
              autoCapitalize="none"
            />
          </View>
          
          <View style={styles.passwordRequirements}>
            <Text style={styles.requirementsTitle}>{t('passwordRequirements')}</Text>
            <Text style={styles.requirementItem}>• {t('passwordMinLength')}</Text>
            <Text style={styles.requirementItem}>• {t('passwordRecommendation')}</Text>
          </View>
          
          <Button
            title={t('saveChanges')}
            onPress={handleChangePassword}
            isLoading={isLoading}
            style={styles.saveButton}
          />
        </Card>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  contentContainer: {
    padding: 16,
  },
  card: {
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.gray[600],
    marginBottom: 24,
    lineHeight: 22,
  },
  form: {
    gap: 16,
    marginBottom: 24,
  },
  passwordRequirements: {
    backgroundColor: colors.gray[50],
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  requirementsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  requirementItem: {
    fontSize: 14,
    color: colors.gray[600],
    marginBottom: 4,
  },
  saveButton: {
    marginTop: 8,
  },
});