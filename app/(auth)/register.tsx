import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, SafeAreaView, StatusBar, Alert, AppState } from 'react-native';
import { router } from 'expo-router';
import { useAuthStore } from '@/store/auth-store';
import { useLanguageStore } from '@/store/language-store';
import { colors } from '@/constants/colors';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import { ArrowLeft, Mail, Lock, User, Briefcase } from 'lucide-react-native';
import { SUBSCRIPTION_PRICE, TRIAL_DAYS } from '@/store/subscription-store';
import { supabase } from '@/lib/supabase';

// Tells Supabase Auth to continuously refresh the session automatically if
// the app is in the foreground. When this is added, you will continue to receive
// `onAuthStateChange` events with the `TOKEN_REFRESHED` or `SIGNED_OUT` event
// if the user's session is terminated. This should only be registered once.
AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh()
  } else {
    supabase.auth.stopAutoRefresh()
  }
})

export default function RegisterScreen() {
  const { t } = useLanguageStore();
  const [isLoading, setIsLoading] = useState(false);
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [occupation, setOccupation] = useState('');
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!name) newErrors.name = t('nameRequired');
    if (!email) newErrors.email = t('emailRequired');
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = t('invalidEmail');
    
    if (!password) newErrors.password = t('passwordRequired');
    else if (password.length < 6) newErrors.password = t('passwordTooShort');
    
    if (password !== confirmPassword) newErrors.confirmPassword = t('passwordsDoNotMatch');
    
    if (!username) newErrors.username = t('usernameRequired');
    if (!occupation) newErrors.occupation = t('occupationRequired');
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleRegister = async () => {
    if (!validateForm()) return;
    
    setIsLoading(true);
    try {
      // Prepare metadata for Supabase auth - the trigger will use this data
      const metadata = {
        name: name,
        user_type: 'worker',
        username: username,
        occupation: occupation,
      };

      // Sign up with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          data: metadata
        }
      });

      if (authError) {
        throw new Error(authError.message);
      }

      if (!authData.user) {
        throw new Error(t('noUserDataReceived') || 'No se recibieron datos del usuario');
      }

      // Show success message if email confirmation is required
      if (!authData.session) {
        setIsLoading(false);
        Alert.alert(
          t('registrationSuccessful') || 'Registro exitoso',
          t('checkEmailVerification') || 'Por favor revisa tu correo electrónico para verificar tu cuenta antes de iniciar sesión.',
          [{ 
            text: 'OK', 
            onPress: () => router.replace('/(auth)/login') 
          }]
        );
        return;
      }

      // Wait a moment for trigger to complete, then check
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Check if user profile was created by trigger
      const { data: userProfile, error: profileError } = await supabase
        .from('tipazo_users')
        .select('*')
        .eq('id', authData.user.id)
        .single();

      if (profileError && profileError.code !== 'PGRST116') {
        console.error('Error checking user profile:', profileError);
      }

      if (!userProfile) {
        console.log('Trigger did not create profile, creating manually');
        
        // Fallback: create profile manually if trigger failed
        const { data: newProfile, error: manualCreateError } = await supabase
          .from('tipazo_users')
          .insert({
            id: authData.user.id,
            email: email,
            name: name,
            username: username || null,
            user_type: 'worker',
            occupation: occupation || null,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          })
          .select()
          .single();

        if (manualCreateError) {
          console.error('Manual profile creation error:', manualCreateError);
          throw new Error(`No se pudo crear el perfil de usuario: ${manualCreateError.message}`);
        }
        
        console.log('User profile created manually:', newProfile);
      } else {
        console.log('User profile created by trigger:', userProfile);
      }

      // User is automatically logged in, redirect to tabs
      router.replace('/(tabs)');
    } catch (error) {
      console.error('Registration error:', error);
      Alert.alert(
        t('registrationError') || 'Error de registro', 
        error instanceof Error ? error.message : (t('registrationFailed') || 'No se pudo completar el registro. Por favor intenta de nuevo.')
      );
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleBack = () => {
    router.back();
  };
  
  return (
    <>
      <StatusBar backgroundColor={colors.background} barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardAvoidingView}
        >
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <TouchableOpacity style={styles.backButton} onPress={handleBack}>
              <ArrowLeft size={24} color={colors.textLight} />
            </TouchableOpacity>
            
            <View style={styles.header}>
              <Text style={styles.title}>{t('createAccount')}</Text>
              <Text style={styles.subtitle}>{t('signUpToReceiveTips')}</Text>
            </View>
            
            <View style={styles.form}>
              <Input
                label={t('fullName')}
                placeholder={t('enterYourFullName')}
                value={name}
                onChangeText={setName}
                error={errors.name}
                leftIcon={<User size={20} color={colors.gray[500]} />}
              />
              
              <Input
                label={t('email')}
                placeholder={t('enterYourEmail')}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                error={errors.email}
                leftIcon={<Mail size={20} color={colors.gray[500]} />}
              />
              
              <Input
                label={t('username')}
                placeholder={t('enterYourUsername')}
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
                error={errors.username}
                leftIcon={<User size={20} color={colors.gray[500]} />}
              />
              
              <Input
                label={t('occupation')}
                placeholder={t('enterYourOccupation')}
                value={occupation}
                onChangeText={setOccupation}
                error={errors.occupation}
                leftIcon={<Briefcase size={20} color={colors.gray[500]} />}
              />
              
              <Input
                label={t('password')}
                placeholder={t('createPassword')}
                value={password}
                onChangeText={setPassword}
                isPassword
                error={errors.password}
                leftIcon={<Lock size={20} color={colors.gray[500]} />}
              />
              
              <Input
                label={t('confirmPassword')}
                placeholder={t('confirmYourPassword')}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                isPassword
                error={errors.confirmPassword}
                leftIcon={<Lock size={20} color={colors.gray[500]} />}
              />
              
              <View style={styles.trialInfo}>
                <Text style={styles.trialTitle}>{t('includesFreeTrial')}</Text>
                <Text style={styles.trialDescription}>
                  Al registrarte, obtendrás acceso a todas las funciones premium durante {TRIAL_DAYS} días sin costo. Luego ${SUBSCRIPTION_PRICE.toFixed(2)} al mes.
                </Text>
              </View>
              
              <Button
                title={t('signUp')}
                onPress={handleRegister}
                isLoading={isLoading}
                style={styles.button}
              />
              
              <View style={styles.loginLink}>
                <Text style={styles.loginText}>{t('alreadyHaveAccount')}</Text>
                <TouchableOpacity onPress={() => router.push('/(auth)/login')}>
                  <Text style={styles.loginButton}>{t('signIn')}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
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
    flex: 1,
  },
  scrollContent: {
    padding: '6%',
    paddingBottom: 40,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  header: {
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.textLight,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textLight,
    opacity: 0.8,
  },
  form: {
    gap: 16,
  },
  trialInfo: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 16,
    marginTop: 8,
    marginBottom: 8,
  },
  trialTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textLight,
    marginBottom: 8,
  },
  trialDescription: {
    fontSize: 14,
    color: colors.textLight,
    opacity: 0.8,
    lineHeight: 20,
  },
  button: {
    marginTop: 8,
  },
  loginLink: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
  loginText: {
    fontSize: 14,
    color: colors.textLight,
    opacity: 0.8,
  },
  loginButton: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
    marginLeft: 4,
  },
});