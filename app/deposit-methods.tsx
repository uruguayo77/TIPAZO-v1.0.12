import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar, SafeAreaView, useWindowDimensions, FlatList, RefreshControl, Modal, Pressable, Clipboard, Alert, Animated } from 'react-native';
import { router } from 'expo-router';
import { colors } from '@/constants/colors';
import { Card } from '@/components/Card';
import { CustomBackIcon } from '@/components/CustomBackIcon';
import { PagoMovilIcon } from '@/components/PagoMovilIcon';
import { CreditCardIcon } from '@/components/CreditCardIcon';
import { CryptoIcon } from '@/components/CryptoIcon';
import { EmptyState } from '@/components/EmptyState';
import { useAuthStore } from '@/store/auth-store';
import { useTipsStore } from '@/store/tips-store';
import * as Haptics from 'expo-haptics';
import { Platform } from 'react-native';
import { useLanguageStore } from '@/store/language-store';
import { Wallet, Clock, CheckCircle, XCircle, X, Calendar, Hash, DollarSign, Copy } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

// Simple Method Card Component with haptic feedback
const MethodCard = ({ onPress, icon, title, description }) => {
  const handlePress = () => {
    // Haptic feedback on press
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    onPress();
  };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={handlePress}
      style={styles.methodCard}
    >
      <LinearGradient
        colors={['#FFFFFF', '#F8F9FA', '#E8F4FD']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.methodGradient}
      >
        <View style={styles.methodContent}>
          <View style={styles.methodIconContainer}>
            {icon}
          </View>
          <View style={styles.methodInfo}>
            <Text style={styles.methodTitle}>{title}</Text>
            <Text style={styles.methodDescription}>
              {description}
            </Text>
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default function DepositMethodsScreen() {
  const { user } = useAuthStore();
  const { deposits, fetchTips, isLoading } = useTipsStore();
  const { t } = useLanguageStore();
  const { width } = useWindowDimensions();
  const isSmallDevice = width < 375;
  const [refreshing, setRefreshing] = useState(false);
  const [selectedDeposit, setSelectedDeposit] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  // Mock data for UI preview
  const mockDeposits = [
    {
      id: '1',
      amount: 50.00,
      method: 'pago-movil',
      status: 'completed',
      createdAt: '2024-12-15T14:30:00Z',
    },
    {
      id: '2',
      amount: 25.00,
      method: 'card',
      status: 'pending',
      createdAt: '2024-12-14T10:15:00Z',
    },
    {
      id: '3',
      amount: 100.00,
      method: 'crypto',
      status: 'completed',
      createdAt: '2024-12-13T16:45:00Z',
    },
    {
      id: '4',
      amount: 75.00,
      method: 'pago-movil',
      status: 'failed',
      createdAt: '2024-12-12T09:20:00Z',
    },
    {
      id: '5',
      amount: 30.00,
      method: 'card',
      status: 'completed',
      createdAt: '2024-12-11T12:10:00Z',
    },
  ];

  useEffect(() => {
    if (user) {
      fetchTips(user.id);
    }
  }, [user, fetchTips]);

  const onRefresh = async () => {
    if (user) {
      setRefreshing(true);
      await fetchTips(user.id);
      setRefreshing(false);
    }
  };

  const handleDepositPress = (deposit) => {
    setSelectedDeposit(deposit);
    setModalVisible(true);
    // Haptic feedback
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedDeposit(null);
  };

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await Clipboard.setString(text);
      // Haptic feedback
      if (Platform.OS !== 'web') {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }
      Alert.alert('Copiado', `${label} copiado al portapapeles`);
    } catch (error) {
      Alert.alert('Error', 'No se pudo copiar el texto');
    }
  };

  const handleMethodSelect = (method: string) => {
    switch (method) {
      case 'pago-movil':
        router.push('/deposit-pago-movil');
        break;
      case 'card':
        router.push('/deposit-card');
        break;
      case 'crypto':
        router.push('/deposit-crypto');
        break;
      default:
        break;
    }
  };

  const handleBack = () => {
    router.back();
  };

  const renderDepositItem = ({ item }) => {
    const formatDate = (dateString: string) => {
      const date = new Date(dateString);
      return date.toLocaleDateString('es-ES', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    };

    const getStatusIcon = () => {
      const iconSize = isSmallDevice ? 12 : 14;
      switch (item.status) {
        case 'completed':
          return <CheckCircle size={iconSize} color="#4CAF50" />;
        case 'pending':
          return <Clock size={iconSize} color="#FF9800" />;
        case 'failed':
          return <XCircle size={iconSize} color="#F44336" />;
        default:
          return null;
      }
    };

    const getStatusText = (status: string) => {
      switch (status) {
        case 'completed':
          return 'Completado';
        case 'pending':
          return 'Pendiente';
        case 'failed':
          return 'Fallido';
        default:
          return status;
      }
    };

    const getMethodText = (method: string) => {
      switch (method) {
        case 'pago-movil':
          return 'Pago Móvil';
        case 'card':
          return 'Tarjeta';
        case 'crypto':
          return 'Criptomoneda';
        default:
          return method;
      }
    };

    return (
      <TouchableOpacity
        onPress={() => handleDepositPress(item)}
        activeOpacity={0.7}
        style={styles.depositItemTouchable}
      >
        <View style={styles.depositItem}>
          <LinearGradient
            colors={['#FFFFFF', '#F8F9FA', '#E8F4FD']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.depositGradient}
          >
            <View style={styles.depositHeader}>
              <View style={styles.depositInfo}>
                <View style={styles.depositIconContainer}>
                  {item.method === 'pago-movil' ? (
                    <PagoMovilIcon size={isSmallDevice ? 20 : 22} color="#69C5F8" />
                  ) : item.method === 'card' ? (
                    <CreditCardIcon size={isSmallDevice ? 20 : 22} color="#69C5F8" />
                  ) : item.method === 'crypto' ? (
                    <CryptoIcon size={isSmallDevice ? 20 : 22} color="#69C5F8" />
                  ) : (
                    <Wallet size={isSmallDevice ? 20 : 22} color="#69C5F8" />
                  )}
                </View>
                <View style={styles.depositTextInfo}>
                  <View style={styles.depositMethodBox}>
                    <Text style={[styles.depositMethod, isSmallDevice && styles.depositMethodSmall]}>
                      {getMethodText(item.method)}
                    </Text>
                  </View>
                  <Text style={styles.depositDate}>
                    {formatDate(item.createdAt)}
                  </Text>
                </View>
              </View>
              <View style={styles.depositAmount}>
                <View style={styles.depositAmountBox}>
                  <Text style={[styles.depositAmountText, isSmallDevice && styles.depositAmountTextSmall]}>
                    ${item.amount.toFixed(2)}
                  </Text>
                </View>
                <View style={styles.depositStatus}>
                  {getStatusIcon()}
                  <Text style={[
                    styles.depositStatusText,
                    item.status === 'completed' && styles.completedStatus,
                    item.status === 'pending' && styles.pendingStatus,
                    item.status === 'failed' && styles.failedStatus,
                  ]}>
                    {getStatusText(item.status)}
                  </Text>
                </View>
              </View>
            </View>
          </LinearGradient>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <StatusBar backgroundColor={colors.background} barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[colors.primary]}
              tintColor={colors.primary}
            />
          }
        >
          {/* Custom back button */}
          <TouchableOpacity 
            onPress={handleBack} 
            style={styles.backButton}
            activeOpacity={0.7}
          >
            <CustomBackIcon size={32} color={colors.primary} />
          </TouchableOpacity>
          <MethodCard
            onPress={() => handleMethodSelect('pago-movil')}
            icon={<PagoMovilIcon size={24} color="#69C5F8" />}
            title={t('pagoMovil')}
            description={t('depositViaApp')}
          />
          
          <MethodCard
            onPress={() => handleMethodSelect('card')}
            icon={<CreditCardIcon size={24} color="#69C5F8" />}
            title={t('creditDebitCard')}
            description={t('depositViaCard')}
          />
          
          <MethodCard
            onPress={() => handleMethodSelect('crypto')}
            icon={<CryptoIcon size={24} color="#69C5F8" />}
            title={t('cryptocurrency')}
            description={t('depositViaCrypto')}
          />
          
          {/* Deposit History Section */}
          <View style={styles.historyContainer}>
            <Text style={[styles.historyTitle, isSmallDevice && styles.historyTitleSmall]}>
              Historial de Depósitos
            </Text>
            
            <FlatList
              data={mockDeposits}
              keyExtractor={(item) => item.id}
              renderItem={renderDepositItem}
              contentContainerStyle={styles.historyList}
              showsVerticalScrollIndicator={false}
              scrollEnabled={false}
              ListEmptyComponent={
                <EmptyState
                  title="No hay depósitos aún"
                  description="Tu historial de depósitos aparecerá aquí una vez que realices tu primer depósito."
                  icon={<Wallet size={48} color={colors.textLight} />}
                />
              }
            />
          </View>
          
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Todos los depósitos son procesados de forma segura y se reflejarán en tu saldo una vez confirmados.
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>

      {/* Deposit Details Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Detalles del Depósito</Text>
              <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
                <X size={24} color={colors.textLight} />
              </TouchableOpacity>
            </View>
            
            {selectedDeposit && (
              <View style={styles.modalContent}>
                <View style={styles.detailRow}>
                  <View style={styles.detailIconContainer}>
                    <Hash size={16} color={colors.white} />
                  </View>
                  <View style={styles.detailInfo}>
                    <Text style={styles.detailLabel}>ID</Text>
                    <Text style={styles.detailValue} numberOfLines={1} ellipsizeMode="middle">
                      {selectedDeposit.id}
                    </Text>
                  </View>
                  <TouchableOpacity 
                    style={styles.copyButton}
                    onPress={() => copyToClipboard(selectedDeposit.id, 'ID')}
                    activeOpacity={0.7}
                  >
                    <Copy size={14} color={colors.white} />
                  </TouchableOpacity>
                </View>

                <View style={styles.detailRow}>
                  <View style={styles.detailIconContainer}>
                    <DollarSign size={16} color={colors.white} />
                  </View>
                  <View style={styles.detailInfo}>
                    <Text style={styles.detailLabel}>Monto</Text>
                    <Text style={styles.detailValue}>${selectedDeposit.amount.toFixed(2)}</Text>
                  </View>
                  <TouchableOpacity 
                    style={styles.copyButton}
                    onPress={() => copyToClipboard(selectedDeposit.amount.toFixed(2), 'Monto')}
                    activeOpacity={0.7}
                  >
                    <Copy size={14} color={colors.white} />
                  </TouchableOpacity>
                </View>

                <View style={styles.detailRow}>
                  <View style={styles.detailIconContainer}>
                    <Wallet size={16} color={colors.white} />
                  </View>
                  <View style={styles.detailInfo}>
                    <Text style={styles.detailLabel}>Método</Text>
                    <Text style={styles.detailValue} numberOfLines={1}>
                      {selectedDeposit.method === 'pago-movil' ? 'Pago Móvil' :
                       selectedDeposit.method === 'card' ? 'Tarjeta' :
                       selectedDeposit.method === 'crypto' ? 'Crypto' : selectedDeposit.method}
                    </Text>
                  </View>
                  <TouchableOpacity 
                    style={styles.copyButton}
                    onPress={() => copyToClipboard(
                      selectedDeposit.method === 'pago-movil' ? 'Pago Móvil' :
                      selectedDeposit.method === 'card' ? 'Tarjeta' :
                      selectedDeposit.method === 'crypto' ? 'Crypto' : selectedDeposit.method, 
                      'Método'
                    )}
                    activeOpacity={0.7}
                  >
                    <Copy size={14} color={colors.white} />
                  </TouchableOpacity>
                </View>

                <View style={styles.detailRow}>
                  <View style={styles.detailIconContainer}>
                    <Calendar size={16} color={colors.white} />
                  </View>
                  <View style={styles.detailInfo}>
                    <Text style={styles.detailLabel}>Fecha</Text>
                    <Text style={styles.detailValue} numberOfLines={1}>
                      {new Date(selectedDeposit.createdAt).toLocaleDateString('es-ES', {
                        day: '2-digit',
                        month: '2-digit',
                        year: '2-digit',
                      })}
                    </Text>
                  </View>
                  <TouchableOpacity 
                    style={styles.copyButton}
                    onPress={() => copyToClipboard(
                      new Date(selectedDeposit.createdAt).toLocaleDateString('es-ES', {
                        day: '2-digit',
                        month: '2-digit',
                        year: '2-digit',
                      }), 
                      'Fecha'
                    )}
                    activeOpacity={0.7}
                  >
                    <Copy size={14} color={colors.white} />
                  </TouchableOpacity>
                </View>

                <View style={styles.detailRow}>
                  <View style={styles.detailIconContainer}>
                    <Clock size={16} color={colors.white} />
                  </View>
                  <View style={styles.detailInfo}>
                    <Text style={styles.detailLabel}>Hora</Text>
                    <Text style={styles.detailValue}>
                      {new Date(selectedDeposit.createdAt).toLocaleTimeString('es-ES', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </Text>
                  </View>
                  <TouchableOpacity 
                    style={styles.copyButton}
                    onPress={() => copyToClipboard(
                      new Date(selectedDeposit.createdAt).toLocaleTimeString('es-ES', {
                        hour: '2-digit',
                        minute: '2-digit',
                      }), 
                      'Hora'
                    )}
                    activeOpacity={0.7}
                  >
                    <Copy size={14} color={colors.white} />
                  </TouchableOpacity>
                </View>

                <View style={styles.detailRow}>
                  <View style={styles.detailIconContainer}>
                    {selectedDeposit.status === 'completed' ? (
                      <CheckCircle size={16} color={colors.white} />
                    ) : selectedDeposit.status === 'pending' ? (
                      <Clock size={16} color={colors.white} />
                    ) : (
                      <XCircle size={16} color={colors.white} />
                    )}
                  </View>
                  <View style={styles.detailInfo}>
                    <Text style={styles.detailLabel}>Estado</Text>
                    <Text style={[
                      styles.detailValue,
                      selectedDeposit.status === 'completed' && styles.completedStatus,
                      selectedDeposit.status === 'pending' && styles.pendingStatus,
                      selectedDeposit.status === 'failed' && styles.failedStatus,
                    ]}>
                      {selectedDeposit.status === 'completed' ? 'Completado' :
                       selectedDeposit.status === 'pending' ? 'Pendiente' :
                       selectedDeposit.status === 'failed' ? 'Fallido' : selectedDeposit.status}
                    </Text>
                  </View>
                  <TouchableOpacity 
                    style={styles.copyButton}
                    onPress={() => copyToClipboard(
                      selectedDeposit.status === 'completed' ? 'Completado' :
                      selectedDeposit.status === 'pending' ? 'Pendiente' :
                      selectedDeposit.status === 'failed' ? 'Fallido' : selectedDeposit.status, 
                      'Estado'
                    )}
                    activeOpacity={0.7}
                  >
                    <Copy size={14} color={colors.white} />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: '4%',
    paddingTop: 60,
  },
  backButton: {
    position: 'relative',
    top: 0,
    left: 0,
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    marginBottom: 16,
    alignSelf: 'flex-start',
  },
  methodCard: {
    marginBottom: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  methodGradient: {
    borderRadius: 16,
    padding: 20,
  },
  methodContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  methodIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    backgroundColor: 'rgba(105, 197, 248, 0.1)',
  },
  methodInfo: {
    flex: 1,
  },
  methodTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  methodDescription: {
    fontSize: 14,
    color: colors.gray[500],
  },
  footer: {
    marginTop: 24,
    marginBottom: 32,
    padding: 16,
  },
  footerText: {
    fontSize: 14,
    color: colors.textLight,
    textAlign: 'center',
    lineHeight: 20,
  },
  // Deposit History Styles
  historyContainer: {
    marginTop: 24,
    marginBottom: 16,
  },
  historyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textDark,
    marginBottom: 16,
    textAlign: 'center',
  },
  historyTitleSmall: {
    fontSize: 16,
  },
  historyList: {
    gap: 8,
  },
  depositItem: {
    marginBottom: 0,
    borderRadius: 16,
  },
  depositGradient: {
    borderRadius: 16,
    padding: 16,
  },
  depositHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  depositInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  depositTextInfo: {
    flex: 1,
  },
  depositMethodBox: {
    backgroundColor: '#69C5F8',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginBottom: 4,
    alignSelf: 'flex-start',
  },
  depositAmountBox: {
    backgroundColor: '#69C5F8',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    marginBottom: 4,
  },
  depositIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(105, 197, 248, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  depositMethod: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  depositMethodSmall: {
    fontSize: 14,
  },
  depositDate: {
    fontSize: 12,
    color: colors.textDark,
  },
  depositAmount: {
    alignItems: 'flex-end',
  },
  depositAmountText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  depositAmountTextSmall: {
    fontSize: 14,
  },
  depositStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  depositStatusText: {
    fontSize: 10,
    fontWeight: '600',
    color: colors.textDark,
  },
  completedStatus: {
    color: '#4CAF50',
  },
  pendingStatus: {
    color: '#FF9800',
  },
  failedStatus: {
    color: '#F44336',
  },
  // Touchable deposit item
  depositItemTouchable: {
    marginBottom: 12,
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContainer: {
    backgroundColor: '#69C5F8',
    borderRadius: 20,
    width: '90%',
    maxWidth: 350,
    maxHeight: '70%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 10,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.3)',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.white,
    textAlign: 'center',
    flex: 1,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  modalContent: {
    padding: 16,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginVertical: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  detailIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  detailInfo: {
    flex: 1,
    flexShrink: 1,
  },
  detailLabel: {
    fontSize: 10,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 2,
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
  detailValue: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.white,
    flexWrap: 'wrap',
  },
  copyButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    marginLeft: 8,
  },
});