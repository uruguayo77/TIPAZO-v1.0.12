import React from 'react';
import { Tabs, router, useRootNavigationState } from 'expo-router';
import { useAuthStore } from '@/store/auth-store';
import { colors } from '@/constants/colors';
import { QRScanIcon } from '@/components/QRScanIcon';
import { WalletIcon } from '@/components/WalletIcon';
import { WithdrawIcon } from '@/components/WithdrawIcon';
import { ProfileIcon } from '@/components/ProfileIcon';
import { useLanguageStore } from '@/store/language-store';
import { SubscriptionBanner } from '@/components/SubscriptionBanner';
import { useSubscriptionStore } from '@/store/subscription-store';
import { View, StyleSheet, Text, Dimensions } from 'react-native';

export default function TabLayout() {
  const { isAuthenticated } = useAuthStore();
  const { status } = useSubscriptionStore();
  const { t } = useLanguageStore();
  
  const rootNavigationState = useRootNavigationState();
  
  // Адаптивные отступы для разных размеров экранов
  const { width: screenWidth } = Dimensions.get('window');
  const getHorizontalPadding = () => {
    if (screenWidth < 350) return 30; // Очень маленькие экраны (iPhone SE 1st gen)
    if (screenWidth < 400) return 35; // Маленькие экраны (iPhone SE, iPhone 12/13 mini)
    if (screenWidth < 450) return 40; // Средние экраны (iPhone 12/13/14, Galaxy S21)
    return 45; // Большие экраны (iPhone Plus, Pro Max, Galaxy Note)
  };
  
  // Адаптивный размер иконок
  const getIconSize = () => {
    if (screenWidth < 350) return 24; // Маленькие иконки для очень маленьких экранов
    if (screenWidth < 400) return 26; // Средние иконки
    return 28; // Большие иконки для больших экранов
  };

  React.useEffect(() => {
    if (!isAuthenticated && rootNavigationState?.key) {
      // Only navigate when the root navigation is ready
      router.replace('/(auth)/welcome');
    }
  }, [isAuthenticated, rootNavigationState?.key]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <View style={{ flex: 1 }}>
      <Tabs
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.gray[400],
        tabBarStyle: {
          position: 'absolute',
          bottom: 20,
          marginHorizontal: '4%', // Такие же отступы как у карточек
          left: '4%',
          right: '4%',
          backgroundColor: colors.white,
          borderRadius: 30,
          height: 70,
          paddingBottom: 8,
          paddingTop: 8,
          paddingHorizontal: 16,
          borderTopWidth: 0,
          elevation: 15,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 10 },
          shadowOpacity: 0.15,
          shadowRadius: 20,
        },
        headerShown: false,
        tabBarItemStyle: {
          paddingVertical: 6,
          borderRadius: 16,
        },
        tabBarIconStyle: {
          marginBottom: 0,
        },
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '500',
          marginTop: 2,
        },
        tabBarShowLabel: true,
      })}
    >
      <Tabs.Screen
        name="index"
        options={({ navigation }) => ({
          title: t('dashboard'),
          tabBarIcon: ({ color, size, focused }) => (
            <View style={styles.tabItemContainer}>
              <WalletIcon 
                size={getIconSize()} 
                color={focused ? colors.primary : colors.gray[400]} 
              />
            </View>
          ),
          tabBarLabel: ({ focused }) => (
            <Text style={[styles.tabLabel, { color: focused ? colors.text : colors.gray[400] }]}>
              {focused ? t('dashboard') : ''}
            </Text>
          ),
        })}
      />
      <Tabs.Screen
        name="qr-code"
        options={({ navigation }) => ({
          title: t('myQRCode'),
          tabBarIcon: ({ color, size, focused }) => (
            <View style={styles.tabItemContainer}>
              <QRScanIcon 
                size={getIconSize()} 
                color={focused ? colors.primary : colors.gray[400]} 
              />
            </View>
          ),
          tabBarLabel: ({ focused }) => (
            <Text style={[styles.tabLabel, { color: focused ? colors.text : colors.gray[400] }]}>
              {focused ? t('myQRCode') : ''}
            </Text>
          ),
        })}
      />
      <Tabs.Screen
        name="withdrawals"
        options={({ navigation }) => ({
          title: t('withdrawals'),
          tabBarIcon: ({ color, size, focused }) => (
            <View style={styles.tabItemContainer}>
              <WithdrawIcon 
                size={getIconSize()} 
                color={focused ? colors.primary : colors.gray[400]} 
              />
            </View>
          ),
          tabBarLabel: ({ focused }) => (
            <Text style={[styles.tabLabel, { color: focused ? colors.text : colors.gray[400] }]}>
              {focused ? t('withdrawals') : ''}
            </Text>
          ),
        })}
      />
      <Tabs.Screen
        name="profile"
        options={({ navigation }) => ({
          title: t('profile'),
          tabBarIcon: ({ color, size, focused }) => (
            <View style={styles.tabItemContainer}>
              <ProfileIcon 
                size={getIconSize()} 
                color={focused ? colors.primary : colors.gray[400]} 
              />
            </View>
          ),
          tabBarLabel: ({ focused }) => (
            <Text style={[styles.tabLabel, { color: focused ? colors.text : colors.gray[400] }]}>
              {focused ? t('profile') : ''}
            </Text>
          ),
        })}
      />
      </Tabs>
    </View>
  );
}

const styles = StyleSheet.create({
  headerRight: {
    marginRight: 16,
  },
  tabItemContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    width: 60,
    height: 50,
  },
  tabLabel: {
    fontSize: 10,
    textAlign: 'center',
    marginTop: 4, // Увеличили отступ от иконки до текста
  },
});