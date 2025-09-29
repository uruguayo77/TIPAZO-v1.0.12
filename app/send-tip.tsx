import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  StatusBar, 
  TextInput, 
  Alert, 
  SafeAreaView, 
  useWindowDimensions,
  Animated,
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { Stack, router } from 'expo-router';
import { colors } from '@/constants/colors';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { useAuthStore } from '@/store/auth-store';
import { useTipsStore } from '@/store/tips-store';
import { ArrowLeft, QrCode, User, DollarSign } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';

export default function SendTipScreen() {
  const { user } = useAuthStore();
  const { tips, deposits, withdrawals, sendTip, getUserBalance } = useTipsStore();
  const [recipientId, setRecipientId] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { height } = useWindowDimensions();
  const [userBalance, setUserBalance] = useState(0);
  
  // Animation value for pulse effect
  const pulseAnim = useRef(new Animated.Value(1)).current;
  
  // Calculate top spacing (15% of screen height)
  const topSpacing = height * 0.15;

  // Update balance whenever tips, deposits, or withdrawals change
  useEffect(() => {
    if (user) {
      const balance = getUserBalance(user.id);
      setUserBalance(balance);
    }
  }, [user, tips, deposits, withdrawals, getUserBalance]);

  // Setup pulse animation
  useEffect(() => {
    const pulsate = Animated.sequence([
      Animated.timing(pulseAnim, {
        toValue: 1.1,
        duration: 1000,
        useNativeDriver: Platform.OS !== 'web',
      }),
      Animated.timing(pulseAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: Platform.OS !== 'web',
      })
    ]);

    Animated.loop(pulsate).start();

    return () => {
      pulseAnim.stopAnimation();
    };
  }, [pulseAnim]);

  const handleScanQR = () => {
    if (Platform.OS !== 'web') {
      Haptics.selectionAsync();
    }
    
    // Navigate to scan screen
    router.push('/scan-for-tip');
  };

  const handleSendTip = async () => {
    if (!recipientId || !amount) {
      Alert.alert('Error', 'Por favor ingresa un destinatario y un monto');
      return;
    }
    
    const tipAmount = parseFloat(amount);
    if (isNaN(tipAmount) || tipAmount <= 0) {
      Alert.alert('Error', 'Por favor ingresa un monto válido');
      return;
    }
    
    if (tipAmount > userBalance) {
      Alert.alert('Saldo insuficiente', 'No tienes saldo suficiente para enviar esta propina');
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Send the tip using the updated sendTip function
      await sendTip(user?.id || '', recipientId, tipAmount, message);
      
      // Update balance after sending tip
      const newBalance = getUserBalance(user?.id || '');
      setUserBalance(newBalance);
      
      Alert.alert(
        'Propina enviada',
        `Has enviado $${tipAmount.toFixed(2)} a ${recipientName || recipientId}`,
        [
          {
            text: 'OK',
            onPress: () => router.back()
          }
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'No se pudo enviar la propina. Inténtalo de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor={colors.background} barStyle="dark-content" />
      <Stack.Screen 
        options={{
          title: 'Enviar Propina',
          headerShown: false, // Hide the default header
        }} 
      />
      
      {/* Custom back button - positioned absolutely so it stays fixed */}
      <TouchableOpacity 
        onPress={handleBack} 
        style={styles.backButton}
        activeOpacity={0.7}
      >
        <ArrowLeft size={24} color={colors.text} />
      </TouchableOpacity>
      
      {/* Screen title - positioned absolutely so it stays fixed */}
      <Text style={styles.screenTitle}>Enviar Propina</Text>
      
      {/* KeyboardAvoidingView to handle keyboard appearance */}
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidView}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
      >
        {/* ScrollView to make content scrollable */}
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Top spacer to shift content down */}
          <View style={{ height: topSpacing * 0.3 }} />
          
          <Card style={styles.balanceCard}>
            <Text style={styles.balanceLabel}>Saldo disponible</Text>
            <Text style={styles.balanceAmount}>${userBalance.toFixed(2)}</Text>
          </Card>
          
          <Card style={styles.formCard}>
            {/* Enhanced QR scan section */}
            <View style={styles.qrScanSection}>
              <TouchableOpacity 
                style={styles.qrScanButton}
                onPress={handleScanQR}
                activeOpacity={0.7}
              >
                <Animated.View style={[
                  styles.qrIconContainer,
                  { transform: [{ scale: pulseAnim }] }
                ]}>
                  <QrCode size={100} color={colors.primary} />
                </Animated.View>
                <Text style={styles.qrScanTitle}>Escanear QR</Text>
                <Text style={styles.qrScanInstructions}>
                  Escanea un QR para enviar propina{"\n"}
                  Toca el ícono para escanear el código.
                </Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.amountSection}>
              <Text style={styles.sectionTitle}>Monto</Text>
              
              <View style={styles.amountInputContainer}>
                <Text style={styles.currencySymbol}>$</Text>
                <TextInput
                  style={styles.amountInput}
                  placeholder="0.00"
                  keyboardType="numeric"
                  value={amount}
                  onChangeText={setAmount}
                />
              </View>
            </View>
            
            <View style={styles.messageSection}>
              <Text style={styles.sectionTitle}>Mensaje (opcional)</Text>
              
              <TextInput
                style={styles.messageInput}
                placeholder="Escribe un mensaje..."
                multiline
                numberOfLines={3}
                value={message}
                onChangeText={setMessage}
              />
            </View>
          </Card>
          
          {/* Add some bottom padding to ensure the button is visible when scrolled to bottom */}
          <View style={styles.buttonContainer}>
            <Button
              title="Enviar Propina"
              onPress={handleSendTip}
              isLoading={isLoading}
              disabled={!recipientId || !amount || parseFloat(amount) <= 0 || isLoading}
              style={styles.sendButton}
            />
          </View>
          
          {/* Extra padding at bottom to ensure everything is accessible when scrolling */}
          <View style={styles.bottomPadding} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    padding: 12,
    zIndex: 10,
  },
  screenTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10,
    zIndex: 5,
  },
  keyboardAvoidView: {
    flex: 1,
    marginTop: 40, // Add space for the fixed header
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingHorizontal: '4%',
    paddingBottom: 20,
  },
  balanceCard: {
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
  },
  balanceLabel: {
    fontSize: 14,
    color: colors.gray[600],
    marginBottom: 4,
  },
  balanceAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
  },
  formCard: {
    padding: 16,
    marginBottom: 16,
  },
  qrScanSection: {
    marginBottom: 24,
    alignItems: 'center',
  },
  qrScanButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    width: '100%',
  },
  qrIconContainer: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: 'rgba(205, 255, 7, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  qrScanTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  qrScanInstructions: {
    fontSize: 14,
    color: colors.gray[600],
    textAlign: 'center',
    lineHeight: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textLight,
    marginBottom: 8,
  },
  amountSection: {
    marginBottom: 16,
  },
  amountInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 48,
    borderWidth: 1,
    borderColor: colors.gray[300],
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  currencySymbol: {
    fontSize: 18,
    color: colors.text,
    marginRight: 8,
  },
  amountInput: {
    flex: 1,
    fontSize: 18,
    color: colors.text,
  },
  messageSection: {
    marginBottom: 16,
  },
  messageInput: {
    height: 80,
    borderWidth: 1,
    borderColor: colors.gray[300],
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    textAlignVertical: 'top',
    fontSize: 16,
    color: colors.text,
  },
  buttonContainer: {
    marginTop: 8,
    marginBottom: 8,
  },
  sendButton: {
    width: '100%',
  },
  bottomPadding: {
    height: 40, // Extra padding at the bottom
  },
});