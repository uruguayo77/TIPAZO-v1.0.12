import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import { useCustomAlert } from '@/components/CustomAlert';
import { colors } from '@/constants/colors';
import { X, Check, CheckCheck, Trash2 } from 'lucide-react-native';
import { NotificationIcon } from '@/components/NotificationIcon';
import { WelcomeIcon } from '@/components/WelcomeIcon';
import { SystemNotificationIcon } from '@/components/SystemNotificationIcon';
import { PagoMovilIcon } from '@/components/PagoMovilIcon';
import { CreditCardIcon } from '@/components/CreditCardIcon';
import { CryptoIcon } from '@/components/CryptoIcon';
import { WithdrawFailedIcon } from '@/components/WithdrawFailedIcon';
import { TipReceivedIcon } from '@/components/TipReceivedIcon';
import { RatingIcon } from '@/components/RatingIcon';
import { ReviewIcon } from '@/components/ReviewIcon';
import { TipSentIcon } from '@/components/TipSentIcon';
import { useNotificationsStore } from '@/store/notifications-store';

interface NotificationsModalProps {
  visible: boolean;
  onClose: () => void;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({
  visible,
  onClose,
}) => {
  const { 
    notifications, 
    unreadCount, 
    markAsRead, 
    markAllAsRead, 
    clearAllNotifications 
  } = useNotificationsStore();
  const { showAlert, AlertComponent } = useCustomAlert();

  const handleMarkAsRead = (id: string) => {
    markAsRead(id);
  };

  const handleMarkAllAsRead = () => {
    markAllAsRead();
  };

  const handleClearAll = () => {
    showAlert(
      'Eliminar todas las notificaciones',
      '¿Estás seguro de que quieres eliminar todas las notificaciones?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Eliminar', 
          style: 'destructive',
          onPress: clearAllNotifications 
        },
      ]
    );
  };

  const getNotificationIcon = (type: string, subtype?: string) => {
    switch (type) {
      case 'tip':
        if (subtype === 'received') {
          return <TipReceivedIcon size={20} color={colors.primary} />;
        } else if (subtype === 'sent') {
          return <TipSentIcon size={20} color={colors.primary} />;
        }
        return <Text style={styles.emojiIcon}>💰</Text>;
      case 'payment':
        // Use specific deposit icons based on subtype
        if (subtype === 'pago-movil') {
          return <PagoMovilIcon size={20} color={colors.primary} />;
        } else if (subtype === 'card') {
          return <CreditCardIcon size={20} color={colors.primary} />;
        } else if (subtype === 'crypto') {
          return <CryptoIcon size={20} color={colors.primary} />;
        }
        return <Text style={styles.emojiIcon}>💳</Text>;
      case 'withdrawal':
        if (subtype === 'failed') {
          return <WithdrawFailedIcon size={20} color="#FF4444" />;
        }
        return <Text style={styles.emojiIcon}>💸</Text>;
      case 'rating':
        return <RatingIcon size={20} color={colors.primary} />;
      case 'review':
        return <ReviewIcon size={20} color={colors.primary} />;
      case 'system':
        return <SystemNotificationIcon size={20} color={colors.primary} />;
      case 'welcome':
        return <WelcomeIcon size={20} color={colors.primary} />;
      default:
        return <Text style={styles.emojiIcon}>📢</Text>;
    }
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = diffMs / (1000 * 60 * 60);
    const diffDays = diffMs / (1000 * 60 * 60 * 24);

    if (diffHours < 1) {
      return 'Hace unos minutos';
    } else if (diffHours < 24) {
      return `Hace ${Math.floor(diffHours)} hora${Math.floor(diffHours) > 1 ? 's' : ''}`;
    } else if (diffDays < 7) {
      return `Hace ${Math.floor(diffDays)} día${Math.floor(diffDays) > 1 ? 's' : ''}`;
    } else {
      return date.toLocaleDateString('es-ES', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <StatusBar backgroundColor={colors.background} barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <NotificationIcon size={24} color={colors.primary} />
            <Text style={styles.headerTitle}>Notificaciones</Text>
            {unreadCount > 0 && (
              <View style={styles.headerBadge}>
                <Text style={styles.headerBadgeText}>{unreadCount}</Text>
              </View>
            )}
          </View>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <X size={24} color={colors.textDark} />
          </TouchableOpacity>
        </View>

        {/* Action buttons */}
        {notifications.length > 0 && (
          <View style={styles.actionBar}>
            {unreadCount > 0 && (
              <TouchableOpacity 
                onPress={handleMarkAllAsRead}
                style={styles.actionButton}
              >
                <CheckCheck size={16} color={colors.primary} />
                <Text style={styles.actionButtonText}>Marcar todas como leídas</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity 
              onPress={handleClearAll}
              style={[styles.actionButton, styles.deleteButton]}
            >
              <Trash2 size={16} color="#FF4444" />
              <Text style={[styles.actionButtonText, styles.deleteButtonText]}>
                Eliminar todas
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Notifications List */}
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {notifications.length === 0 ? (
            <View style={styles.emptyState}>
              <NotificationIcon size={64} color={colors.gray[400]} />
              <Text style={styles.emptyTitle}>No tienes notificaciones</Text>
              <Text style={styles.emptyDescription}>
                Las notificaciones aparecerán aquí cuando recibas nuevas actualizaciones.
              </Text>
            </View>
          ) : (
            <View style={styles.notificationsList}>
              {notifications.map((notification) => (
                <TouchableOpacity
                  key={notification.id}
                  style={[
                    styles.notificationItem,
                    !notification.isRead && styles.unreadNotification
                  ]}
                  onPress={() => handleMarkAsRead(notification.id)}
                >
                  <View style={styles.notificationContent}>
                    <View style={styles.notificationHeader}>
                      <View style={styles.notificationIcon}>
                        {getNotificationIcon(notification.type, notification.subtype)}
                      </View>
                      <View style={styles.notificationInfo}>
                        <Text style={styles.notificationTitle}>
                          {notification.title}
                        </Text>
                        <Text style={styles.notificationTime}>
                          {formatDate(notification.createdAt)}
                        </Text>
                      </View>
                      {!notification.isRead && (
                        <View style={styles.unreadDot} />
                      )}
                    </View>
                    <Text style={styles.notificationMessage}>
                      {notification.message}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
      <AlertComponent />
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[200],
    backgroundColor: colors.gray[50],
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
  },
  headerBadge: {
    backgroundColor: '#FF4444',
    borderRadius: 12,
    minWidth: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
    marginLeft: 8,
  },
  headerBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
    textAlign: 'center',
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.gray[100],
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.gray[300],
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  actionBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[200],
    gap: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: colors.gray[100],
  },
  actionButtonText: {
    fontSize: 14,
    color: colors.textDark,
    fontWeight: '500',
  },
  deleteButton: {
    backgroundColor: 'rgba(255, 68, 68, 0.1)',
  },
  deleteButtonText: {
    color: '#FF4444',
  },
  scrollView: {
    flex: 1,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textLight,
    marginTop: 16,
    marginBottom: 8,
  },
  emptyDescription: {
    fontSize: 14,
    color: colors.gray[600],
    textAlign: 'center',
    lineHeight: 20,
  },
  notificationsList: {
    paddingTop: 8,
  },
  notificationItem: {
    backgroundColor: colors.white,
    marginHorizontal: 16,
    marginVertical: 4,
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  unreadNotification: {
    backgroundColor: colors.white,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  notificationContent: {
    flex: 1,
  },
  notificationHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  notificationIcon: {
    marginRight: 12,
    marginTop: 2,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emojiIcon: {
    fontSize: 20,
  },
  notificationInfo: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  notificationTime: {
    fontSize: 12,
    color: colors.gray[500],
  },
  unreadDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.primary,
    marginTop: 4,
    marginLeft: 8,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2,
  },
  notificationMessage: {
    fontSize: 14,
    color: colors.gray[700],
    lineHeight: 20,
    marginLeft: 32,
  },
});
