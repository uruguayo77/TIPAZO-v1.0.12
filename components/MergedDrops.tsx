import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Crown } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { NotificationIcon } from './NotificationIcon';

interface MergedDropsProps {
  onTipazoPress?: () => void;
  onNotificationPress?: () => void;
  unreadCount?: number;
  isSubscriptionActive?: boolean;
}

export const MergedDrops: React.FC<MergedDropsProps> = ({
  onTipazoPress,
  onNotificationPress,
  unreadCount = 0,
  isSubscriptionActive = false
}) => {
  return (
    <View style={styles.container}>
      {/* Notification Bell Drop - now circular */}
      <TouchableOpacity 
        style={styles.notificationDrop}
        onPress={onNotificationPress}
      >
        <NotificationIcon size={20} color={colors.primary} />
        
        {/* Notification Badge */}
        {unreadCount > 0 && (
          <View style={styles.notificationBadge}>
            <Text style={styles.notificationCount}>
              {unreadCount > 99 ? '99+' : unreadCount}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  notificationDrop: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 255, 170, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
    zIndex: 1,
  },
  notificationBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
    backgroundColor: '#FF4444',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  notificationCount: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: 12,
  },
});
