import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, SafeAreaView, TouchableOpacity, StatusBar, Platform } from 'react-native';
import { router, useRootNavigationState } from 'expo-router';
import { colors } from '@/constants/colors';
import { QrCode, Wallet, ArrowRight } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Constants from 'expo-constants';
import { useAuthStore } from '@/store/auth-store';
import { useTipsStore } from '@/store/tips-store';
import { Avatar } from '@/components/Avatar';

export default function WelcomeScreen() {
  const rootNavigationState = useRootNavigationState();
  const appVersion = Constants.expoConfig?.version || '1.0.0';
  const { isAuthenticated, user } = useAuthStore();
  const { getUserBalance, fetchTips, fetchWithdrawals } = useTipsStore();
  const [userBalance, setUserBalance] = useState(0);

  useEffect(() => {
    if (isAuthenticated && user) {
      fetchTips(user.id);
      fetchWithdrawals(user.id);
      const balance = getUserBalance(user.id);
      setUserBalance(balance);
    }
  }, [isAuthenticated, user, getUserBalance, fetchTips, fetchWithdrawals]);

  const handleClientFlow = () => {
    if (rootNavigationState?.key) {
      router.push('/(client)/scan');
    }
  };

  const handleWorkerFlow = () => {
    if (rootNavigationState?.key) {
      router.push('/(auth)/login');
    }
  };

  const handleWalletNavigation = () => {
    if (rootNavigationState?.key) {
      router.replace('/(tabs)');
    }
  };

  return (
    <>
      <StatusBar backgroundColor={colors.background} barStyle="light-content" />
      <LinearGradient
        colors={['#69c5f8', '#4a9fe0']}
        style={styles.container}
      >
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.content}>
            {/* Logo image - increased by 15% */}
            <View style={styles.titleContainer}>
              <Image 
                source={{ uri: 'https://iili.io/3MOeUTG.png' }} 
                style={styles.logoImage}
                resizeMode="contain"
              />
            </View>

            {/* New image - increased by 10% */}
            <View style={styles.newImageContainer}>
              <Image 
                source={{ uri: 'https://iili.io/3Oj3LiJ.png' }} 
                style={styles.newImage}
                resizeMode="contain"
              />
            </View>

            {/* Middle section with text */}
            <View style={styles.middleSection}>
              <View style={styles.taglineContainer}>
                <Text style={styles.taglineWhite}>UN CLICK</Text>
                <Text style={styles.taglineGreen}>UNA PROPINA</Text>
              </View>
            </View>

            {/* Action buttons or Wallet Widget */}
            <View style={styles.buttonsContainer}>
              <TouchableOpacity 
                style={styles.button}
                onPress={handleClientFlow}
                activeOpacity={0.8}
              >
                <QrCode size={24} color="#000000" />
                <Text style={styles.buttonText}>DEJAR PROPINA</Text>
              </TouchableOpacity>
              
              {isAuthenticated ? (
                <TouchableOpacity
                  style={styles.walletWidget}
                  onPress={handleWalletNavigation}
                  activeOpacity={0.8}
                >
                  <LinearGradient
                    colors={[colors.primaryLight, colors.primary]}
                    style={styles.walletGradient}
                  >
                    <Avatar 
                      source={user?.profilePicture}
                      name={user?.name || ''}
                      size={36}
                    />
                    <View style={styles.walletBalanceContainer}>
                      <Text style={styles.walletGreetingText}>Hola, {user?.name || 'Usuario'}</Text>
                      <Text style={styles.walletActionText}>Ver billetera</Text>
                    </View>
                    <ArrowRight size={20} color="#000000" />
                  </LinearGradient>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity 
                  style={styles.button}
                  onPress={handleWorkerFlow}
                  activeOpacity={0.8}
                >
                  <Wallet size={24} color="#000000" />
                  <Text style={styles.buttonText}>BILLETERA</Text>
                </TouchableOpacity>
              )}
            </View>
            
            {/* Version and brand signature - now centered */}
            <View style={styles.versionContainer}>
              <Text style={styles.versionText}>Tipazo® 2025</Text>
              <Text style={styles.versionText}>v{appVersion}</Text>
            </View>
          </View>
        </SafeAreaView>
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: '5%',
    justifyContent: 'space-between',
  },
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    maxHeight: '30%',
  },
  logoImage: {
    width: '138%', // Increased from 120% to 138% (15% increase)
    height: 276, // Increased from 240 to 276 (15% increase)
  },
  newImageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -20,
  },
  newImage: {
    width: '88%', // Increased from 80% to 88% (10% increase)
    height: 165, // Increased from 150 to 165 (10% increase)
  },
  middleSection: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -10,
  },
  taglineContainer: {
    alignItems: 'center',
  },
  taglineWhite: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: '600',
    letterSpacing: 2,
  },
  taglineGreen: {
    fontSize: 24,
    color: colors.primary,
    fontWeight: '600',
    letterSpacing: 2,
  },
  buttonsContainer: {
    marginTop: 20,
    marginBottom: '15%',
    gap: 16,
  },
  button: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 30,
    gap: 12,
  },
  buttonText: {
    color: '#000000',
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 1,
  },
  walletWidget: {
    borderRadius: 30,
    overflow: 'hidden',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  walletGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 30,
    gap: 12,
  },
  walletBalanceContainer: {
    flex: 1,
    alignItems: 'center',
  },
  walletGreetingText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '600',
  },
  walletActionText: {
    color: '#000000',
    fontSize: 14,
    fontWeight: '500',
  },
  versionContainer: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 10 : 5,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  versionText: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 12,
    fontWeight: '400',
  },
});