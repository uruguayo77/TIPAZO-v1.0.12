import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { router, useRootNavigationState } from 'expo-router';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { colors } from '@/constants/colors';
import { useAuthStore } from '@/store/auth-store';
import { useTipFlowStore } from '@/store/tip-flow-store';
import { Mail, Lock, ArrowLeft, Check, Square } from 'lucide-react-native';
import { useLanguageStore } from '@/store/language-store';

export default function LoginScreen() {
  const { t } = useLanguageStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  
  const { login, isLoading, error } = useAuthStore();
  const rootNavigationState = useRootNavigationState();
  
  // Get tip flow state
  const { 
    workerId, 
    workerName, 
    workerOccupation, 
    isRedirectingFromLogin,
    setRedirectingFromLogin
  } = useTipFlowStore();

  // Check if we're coming from the tip flow - use isRedirectingFromLogin flag for reliability
  const isFromTipFlow = isRedirectingFromLogin && !!workerId;

  useEffect(() => {
    // Log the current state for debugging
    console.log('Login screen - isRedirectingFromLogin:', isRedirectingFromLogin);
    console.log('Login screen - workerId:', workerId);
    console.log('Login screen - isFromTipFlow:', isFromTipFlow);
  }, [isRedirectingFromLogin, workerId, isFromTipFlow]);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError(t('emailRequired'));
      return false;
    }
    if (!emailRegex.test(email)) {
      setEmailError(t('invalidEmail'));
      return false;
    }
    setEmailError('');
    return true;
  };

  const validatePassword = (password: string) => {
    if (!password) {
      setPasswordError(t('passwordRequired'));
      return false;
    }
    if (password.length < 6) {
      setPasswordError(t('passwordTooShort'));
      return false;
    }
    setPasswordError('');
    return true;
  };

  const handleLogin = async () => {
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    
    if (isEmailValid && isPasswordValid) {
      try {
        await login(email, password, rememberMe);
        
        if (rootNavigationState?.key) {
          // If we came from the tip flow, redirect back to tip amount screen
          if (isFromTipFlow) {
            console.log('Redirecting back to tip amount screen after login');
            // Reset the redirecting flag since we're now handling the redirect
            setRedirectingFromLogin(false);
            
            router.push({
              pathname: '/(client)/tip-amount',
              params: { 
                workerId, 
                name: workerName || 'Trabajador', 
                occupation: workerOccupation || '' 
              }
            });
          } else {
            // Otherwise, go to the main tabs
            console.log('Redirecting to main tabs after login');
            router.replace('/(tabs)');
          }
        }
      } catch (error) {
        console.error('Login error:', error);
      }
    }
  };

  const handleRegister = () => {
    if (rootNavigationState?.key) {
      router.push('/(auth)/register');
    }
  };

  const handleBack = () => {
    if (rootNavigationState?.key) {
      // If we came from the tip flow, reset the redirecting flag
      if (isFromTipFlow) {
        setRedirectingFromLogin(false);
      }
      router.back();
    }
  };

  const toggleRememberMe = () => {
    setRememberMe(!rememberMe);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView contentContainerStyle={styles.scrollView}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <ArrowLeft size={24} color={colors.text} />
          </TouchableOpacity>
          
          <View style={styles.header}>
            <Text style={styles.title}>{t('welcomeBack')}</Text>
            <Text style={styles.subtitle}>
              {isFromTipFlow 
                ? t('loginToSendTips') 
                : t('signInToYourAccount')}
            </Text>
          </View>
          
          {error && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          )}
          
          <View style={styles.form}>
            <Input
              label={t('email')}
              placeholder={t('enterYourEmail')}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              error={emailError}
              leftIcon={<Mail size={20} color={colors.gray[500]} />}
            />
            
            <Input
              label={t('password')}
              placeholder={t('enterYourPassword')}
              value={password}
              onChangeText={setPassword}
              isPassword
              error={passwordError}
              leftIcon={<Lock size={20} color={colors.gray[500]} />}
            />
            
            {/* Remember Me Checkbox */}
            <TouchableOpacity 
              style={styles.rememberMeContainer} 
              onPress={toggleRememberMe}
              activeOpacity={0.7}
            >
              {rememberMe ? (
                <View style={styles.checkboxChecked}>
                  <Check size={16} color="#fff" />
                </View>
              ) : (
                <View style={styles.checkbox}>
                  <Square size={16} color={colors.gray[400]} />
                </View>
              )}
              <Text style={styles.rememberMeText}>Recordar sesión</Text>
            </TouchableOpacity>
            
            <Button
              title={t('signIn')}
              onPress={handleLogin}
              isLoading={isLoading}
              style={styles.button}
            />
          </View>
          
          <View style={styles.footer}>
            <Text style={styles.footerText}>{t('dontHaveAccount')}</Text>
            <TouchableOpacity onPress={handleRegister}>
              <Text style={styles.footerLink}>{t('signUp')}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
    padding: 24,
  },
  backButton: {
    marginBottom: 24,
  },
  header: {
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.gray[600],
  },
  errorContainer: {
    backgroundColor: colors.error + '20',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  errorText: {
    color: colors.error,
    fontSize: 14,
  },
  form: {
    marginBottom: 24,
  },
  rememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 8,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: colors.gray[400],
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  checkboxChecked: {
    width: 20,
    height: 20,
    backgroundColor: colors.primary,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  rememberMeText: {
    color: colors.gray[600],
    fontSize: 14,
  },
  button: {
    marginTop: 16,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
  footerText: {
    color: colors.gray[600],
    marginRight: 4,
  },
  footerLink: {
    color: colors.primary,
    fontWeight: '600',
  },
});