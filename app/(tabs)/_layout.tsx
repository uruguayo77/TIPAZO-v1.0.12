import React from 'react';
import { Tabs, router, useRootNavigationState } from 'expo-router';
import { useAuthStore } from '@/store/auth-store';
import { colors } from '@/constants/colors';
import { Home, QrCode, Wallet, User } from 'lucide-react-native';
import { useLanguageStore } from '@/store/language-store';
import { SubscriptionBanner } from '@/components/SubscriptionBanner';
import { useSubscriptionStore } from '@/store/subscription-store';
import { View, StyleSheet, Text } from 'react-native';

export default function TabLayout() {
  const { isAuthenticated } = useAuthStore();
  const { status } = useSubscriptionStore();
  const { t } = useLanguageStore();
  const rootNavigationState = useRootNavigationState();

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
    <Tabs
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.gray[400],
        tabBarStyle: {
          backgroundColor: colors.white,
          borderTopWidth: 0,
          elevation: 8,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.05,
          shadowRadius: 12,
          height: 60,
          paddingBottom: 4,
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          paddingHorizontal: 10,
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
            <View style={[styles.tabItemContainer, focused && styles.activeTab]}>
              <Home 
                size={22} 
                color={focused ? colors.primary : colors.gray[400]} 
                opacity={focused ? 1 : 0.5}
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
            <View style={[styles.tabItemContainer, focused && styles.activeTab]}>
              <QrCode 
                size={22} 
                color={focused ? colors.primary : colors.gray[400]} 
                opacity={focused ? 1 : 0.5}
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
            <View style={[styles.tabItemContainer, focused && styles.activeTab]}>
              <Wallet 
                size={22} 
                color={focused ? colors.primary : colors.gray[400]} 
                opacity={focused ? 1 : 0.5}
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
            <View style={[styles.tabItemContainer, focused && styles.activeTab]}>
              <User 
                size={22} 
                color={focused ? colors.primary : colors.gray[400]} 
                opacity={focused ? 1 : 0.5}
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
  );
}

const styles = StyleSheet.create({
  headerRight: {
    marginRight: 16,
  },
  tabItemContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 6,
    width: 50,
    height: 40,
  },
  activeTab: {
    backgroundColor: 'rgba(229, 244, 88, 0.2)',
    borderRadius: 16,
  },
  tabLabel: {
    fontSize: 10,
    textAlign: 'center',
    marginTop: -2,
  }
});