import React, { useState } from 'react';
import { StyleSheet, ScrollView, Alert, Platform } from 'react-native';
import { Stack, router } from 'expo-router';
import { useAuthStore } from '@/store/auth-store';
import { useLanguageStore } from '@/store/language-store';
import { colors } from '@/constants/colors';
import { AbstractChangePasswordForm } from '@/components/AbstractChangePasswordForm';
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
          headerShown: false,
        }} 
      />
      
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <AbstractChangePasswordForm
          currentPassword={currentPassword}
          newPassword={newPassword}
          confirmPassword={confirmPassword}
          onCurrentPasswordChange={(text) => {
            setCurrentPassword(text);
            clearError('currentPassword');
          }}
          onNewPasswordChange={(text) => {
            setNewPassword(text);
            clearError('newPassword');
          }}
          onConfirmPasswordChange={(text) => {
            setConfirmPassword(text);
            clearError('confirmPassword');
          }}
          onSave={handleChangePassword}
          onCancel={() => router.back()}
          isLoading={isLoading}
          errors={errors}
          t={t}
        />
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
});