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
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Linking
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { colors } from '@/constants/colors';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { useAuthStore } from '@/store/auth-store';
import { useTipsStore } from '@/store/tips-store';
import { useExchangeRate } from '@/hooks/useExchangeRate';
import { User, DollarSign, Star } from 'lucide-react-native';
import { QRScanIcon } from '@/components/QRScanIcon';
import { CustomBackIcon } from '@/components/CustomBackIcon';
import { Avatar } from '@/components/Avatar';
import { InstagramIcon } from '@/components/InstagramIcon';
import { TelegramIcon } from '@/components/TelegramIcon';
import { TikTokIcon } from '@/components/TikTokIcon';
import { FacebookIcon } from '@/components/FacebookIcon';
import { LinkedInIcon } from '@/components/LinkedInIcon';
import * as Haptics from 'expo-haptics';
import { useCustomAlert } from '@/components/CustomAlert';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { supabase } from '@/lib/supabase';
import { LinearGradient } from 'expo-linear-gradient';

export default function SendTipScreen() {
  const { user } = useAuthStore();
  const { sendTip } = useTipsStore();
  const params = useLocalSearchParams();
  const { showAlert, AlertComponent } = useCustomAlert();
  const { exchangeRate } = useExchangeRate();
  const [recipientId, setRecipientId] = useState(params.recipientId as string || '');
  const [recipientName, setRecipientName] = useState(params.recipientName as string || '');
  const [recipientData, setRecipientData] = useState<any>(null);
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingUser, setIsLoadingUser] = useState(false);
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const { height } = useWindowDimensions();
  
  // Calculate top spacing (15% of screen height)
  const topSpacing = height * 0.15;

  // Update recipient info when params change
  useEffect(() => {
    if (params.recipientId) {
      setRecipientId(params.recipientId as string);
      setRecipientName(params.recipientName as string || '');
    }
  }, [params.recipientId, params.recipientName]);

  // Function to fetch user data by ID
  const fetchUserData = async (userId: string) => {
    try {
      setIsLoadingUser(true);
      console.log('Fetching user data for ID:', userId);
      
      const { data: userData, error: userError } = await supabase
        .from('tipazo_users')
        .select('*')
        .eq('id', userId)
        .single();

      if (userError) {
        console.error('Error fetching user data:', userError);
        return null;
      }

      if (!userData) {
        console.log('User not found');
        return null;
      }

      console.log('User data found:', userData);
      
      // Fetch ratings from tips (copied from worker-profile)
      const { data: ratingsData, error: ratingsError } = await supabase
        .from('tipazo_tips')
        .select('rating')
        .eq('receiver_id', userId)
        .not('rating', 'is', null);

      let averageRating = null;
      let ratingsCount = 0;

      if (ratingsError) {
        console.error('Error fetching ratings:', ratingsError);
      } else {
        console.log('Ratings loaded:', ratingsData);
        const ratings = ratingsData?.map(tip => tip.rating).filter(rating => rating !== null) || [];
        ratingsCount = ratings.length;
        
        if (ratings.length > 0) {
          const avgRating = ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length;
          console.log('Setting average rating from tips:', avgRating);
          averageRating = Number(avgRating.toFixed(1));
        } else {
          console.log('No ratings found in tips, setting to null');
          averageRating = null;
        }
      }

      const result = {
        ...userData,
        averageRating: averageRating ? Number(averageRating.toFixed(1)) : null,
        ratingsCount
      };
      
      console.log('Rating data:', {
        averageRating: result.averageRating,
        ratingsCount: result.ratingsCount,
        ratingsData: ratingsData?.length || 0
      });
      
      return result;
    } catch (error) {
      console.error('Error in fetchUserData:', error);
      return null;
    } finally {
      setIsLoadingUser(false);
    }
  };

  // Handle QR code scanning
  const handleBarCodeScanned = async ({ type, data }: { type: string; data: string }) => {
    if (Platform.OS !== 'web') {
      Haptics.selectionAsync();
    }
    
    console.log('QR Code scanned:', data);
    
    // Parse the QR code data to extract recipient info
    try {
      // First try to parse as URL (expected format)
      const url = new URL(data);
      console.log('Parsed URL:', url);
      
      const pathParts = url.pathname.split('/');
      const workerId = pathParts[pathParts.length - 1];
      
      console.log('Path parts:', pathParts);
      console.log('Worker ID:', workerId);
      
      const params = url.searchParams;
      const nameFromQR = params.get('name') || 'Usuario';
      const occupation = params.get('occupation') || '';
      
      console.log('Name from QR:', nameFromQR);
      console.log('Occupation:', occupation);
      
      // Set the recipient ID immediately
      setRecipientId(workerId);
      setRecipientName(nameFromQR);
      
      // Try to fetch actual user data from database
      const userData = await fetchUserData(workerId);
      if (userData) {
        console.log('Using database name:', userData.name);
        setRecipientName(userData.name || nameFromQR);
        setRecipientData(userData);
      } else {
        console.log('Using QR name:', nameFromQR);
        setRecipientName(nameFromQR);
        setRecipientData(null);
      }
      
    } catch (urlError) {
      console.log('Not a URL, trying JSON format...');
      
      try {
        // Try JSON format as fallback
        const qrData = JSON.parse(data);
        if (qrData.userId) {
          setRecipientId(qrData.userId);
          setRecipientName(qrData.userName || 'Usuario');
          
          // Try to fetch actual user data
          const userData = await fetchUserData(qrData.userId);
          if (userData) {
            setRecipientName(userData.name || qrData.userName || 'Usuario');
            setRecipientData(userData);
          } else {
            setRecipientData(null);
          }
        }
      } catch (jsonError) {
        console.log('Not JSON either, treating as simple user ID');
        // If it's neither URL nor JSON, treat it as a simple user ID
        setRecipientId(data);
        setRecipientName('Usuario');
        
        // Try to fetch actual user data
        const userData = await fetchUserData(data);
        if (userData) {
          setRecipientName(userData.name || 'Usuario');
          setRecipientData(userData);
        } else {
          setRecipientData(null);
        }
      }
    }
  };

  const handleScanQR = () => {
    if (Platform.OS !== 'web') {
      Haptics.selectionAsync();
    }
    
    // Navigate to scan screen
    router.push('/scan-for-tip');
  };


  // Calculate conversion to local currency
  const calculateConversion = (usdAmount: string) => {
    if (!usdAmount || !exchangeRate) return null;
    const amount = parseFloat(usdAmount);
    if (isNaN(amount) || amount <= 0) return null;
    return (amount * exchangeRate).toFixed(2);
  };

  const handleSendTip = async () => {
    if (!recipientId || !amount) {
      showAlert('Error', 'Por favor ingresa un destinatario y un monto');
      return;
    }
    
    const tipAmount = parseFloat(amount);
    if (isNaN(tipAmount) || tipAmount <= 0) {
      showAlert('Error', 'Por favor ingresa un monto válido');
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Send the tip using the updated sendTip function
      await sendTip(user?.id || '', recipientId, tipAmount, message);
      
      showAlert(
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
      showAlert('Error', 'No se pudo enviar la propina. Inténtalo de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    // Always go back to main screen (tabs)
    router.replace('/(tabs)');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor={colors.background} barStyle="dark-content" />
      
      {/* KeyboardAvoidingView to handle keyboard appearance */}
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidView}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
      >
        {/* Fixed content container */}
        <View 
          style={styles.scrollView}
        >
          
          <Card style={styles.formCard}>
            {/* Recipient info section - shown when QR is scanned */}
            {recipientId ? (
              <View style={styles.recipientSection}>
                <View style={styles.recipientInfo}>
                  <View style={styles.recipientMainInfo}>
                    <Avatar 
                      source={recipientData?.profile_picture}
                      name={recipientName || 'Usuario'}
                      size={50}
                      style={styles.recipientAvatar}
                      variant="rounded"
                    />
                    <View style={styles.recipientDetails}>
                      <Text style={styles.recipientName}>
                        {isLoadingUser ? 'Cargando...' : (recipientName || 'Usuario')}
                      </Text>
                      {recipientData?.occupation && (
                        <View style={styles.occupationContainer}>
                          <Text style={styles.occupationLabel}>Ocupación</Text>
                          <Text style={styles.occupationDivider}>|</Text>
                          <View style={styles.occupationBackground}>
                            <Text style={styles.occupation}>{recipientData.occupation}</Text>
                          </View>
                        </View>
                      )}
                      <View style={styles.ratingContainer}>
                        {console.log('Displaying rating:', recipientData?.averageRating, recipientData?.ratingsCount)}
                        {recipientData?.averageRating ? (
                          <>
                            <View style={styles.starsContainer}>
                              {[1, 2, 3, 4, 5].map((star) => {
                                const rating = recipientData.averageRating;
                                const isFilled = star <= Math.floor(rating);
                                const isHalfFilled = star === Math.ceil(rating) && rating % 1 !== 0;
                                
                                return (
                                  <Star 
                                    key={star}
                                    size={16} 
                                    color={isFilled || isHalfFilled ? colors.primary : colors.gray[400]} 
                                    fill={isFilled ? colors.primary : 'transparent'} 
                                  />
                                );
                              })}
                            </View>
                            <Text style={styles.ratingText}>
                              {recipientData.averageRating} ({recipientData.ratingsCount} reseñas)
                            </Text>
                          </>
                        ) : (
                          <>
                            <View style={styles.starsContainer}>
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star 
                                  key={star}
                                  size={16} 
                                  color={colors.gray[400]} 
                                  fill="transparent" 
                                />
                              ))}
                            </View>
                            <Text style={styles.noRatingText}>
                              Sin valoraciones
                            </Text>
                          </>
                        )}
                      </View>
                      
                      {/* Social Networks */}
                      {recipientData && (recipientData.instagram || recipientData.telegram || recipientData.tiktok || recipientData.facebook || recipientData.linkedin) && (
                        <View style={styles.socialNetworks}>
                          {recipientData.instagram && (
                            <TouchableOpacity 
                              style={styles.socialIcon} 
                              onPress={() => Linking.openURL(`https://instagram.com/${String(recipientData.instagram).replace(/^@+/, '')}`)}
                              activeOpacity={0.7}
                            >
                              <InstagramIcon size={20} color={colors.textDark} />
                            </TouchableOpacity>
                          )}
                          {recipientData.telegram && (
                            <TouchableOpacity 
                              style={styles.socialIcon} 
                              onPress={() => Linking.openURL(`https://t.me/${String(recipientData.telegram).replace(/^@+/, '')}`)}
                              activeOpacity={0.7}
                            >
                              <TelegramIcon size={20} color={colors.textDark} />
                            </TouchableOpacity>
                          )}
                          {recipientData.tiktok && (
                            <TouchableOpacity 
                              style={styles.socialIcon} 
                              onPress={() => Linking.openURL(`https://www.tiktok.com/@${String(recipientData.tiktok).replace(/^@+/, '')}`)}
                              activeOpacity={0.7}
                            >
                              <TikTokIcon size={20} color={colors.textDark} />
                            </TouchableOpacity>
                          )}
                          {recipientData.facebook && (
                            <TouchableOpacity 
                              style={styles.socialIcon} 
                              onPress={() => Linking.openURL(`https://facebook.com/${String(recipientData.facebook).replace(/^@+/, '')}`)}
                              activeOpacity={0.7}
                            >
                              <FacebookIcon size={20} color={colors.textDark} />
                            </TouchableOpacity>
                          )}
                          {recipientData.linkedin && (
                            <TouchableOpacity 
                              style={styles.socialIcon} 
                              onPress={() => Linking.openURL(`https://www.linkedin.com/in/${String(recipientData.linkedin).replace(/^@+/, '')}`)}
                              activeOpacity={0.7}
                            >
                              <LinkedInIcon size={20} color={colors.textDark} />
                            </TouchableOpacity>
                          )}
                        </View>
                      )}
                    </View>
                  </View>
                </View>
                
                <TouchableOpacity 
                  style={styles.changeRecipientButton}
                  onPress={handleScanQR}
                  activeOpacity={0.7}
                >
                  <LinearGradient
                    colors={[colors.primary, colors.primary]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.buttonGradient}
                  >
                    <View style={styles.buttonContent}>
                      <QRScanIcon size={20} color={colors.textDark} />
                      <Text style={styles.changeRecipientText}>Escanear otro código</Text>
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
                
                {/* Cancel button */}
                <TouchableOpacity 
                  style={styles.cancelButton}
                  onPress={handleBack}
                  activeOpacity={0.7}
                >
                  <Text style={styles.cancelButtonText}>Cancelar</Text>
                </TouchableOpacity>
              </View>
            ) : (
              /* Camera preview section */
              <View style={styles.cameraSection}>
                <Text style={styles.cameraTitle}>Escanear QR</Text>
                <Text style={styles.cameraInstructions}>
                  Apunta la cámara al código QR para enviar propina
                </Text>
                
                {!permission?.granted ? (
                  <View style={styles.permissionContainer}>
                    <Text style={styles.permissionText}>Se necesita permiso para usar la cámara</Text>
                    <Button
                      title="Permitir cámara"
                      onPress={requestPermission}
                      style={styles.permissionButton}
                    />
                  </View>
                ) : (
                  <View style={styles.cameraContainer}>
                    <CameraView
                      style={styles.cameraPreview}
                      facing={facing}
                      onBarcodeScanned={handleBarCodeScanned}
                      barcodeScannerSettings={{
                        barcodeTypes: ['qr'],
                      }}
                    >
                      <View style={styles.cameraOverlay}>
                        <QRScanIcon size={100} color={colors.primary} />
                      </View>
                    </CameraView>
                  </View>
                )}
              </View>
            )}
            
            {!recipientId && (
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={handleBack}
                activeOpacity={0.7}
              >
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </TouchableOpacity>
            )}
            
            {/* Show form only after QR scan */}
            {recipientId && (
              <>
                <View style={styles.amountSection}>
                  <Text style={styles.amountLabel}>Monto</Text>
                  
                  <View style={styles.amountInputContainer}>
                    <Text style={styles.currencySymbol}>$</Text>
                    <TextInput
                      style={styles.amountInput}
                      placeholder="0.00"
                      placeholderTextColor="rgba(255, 255, 255, 0.7)"
                      keyboardType="numeric"
                      value={amount}
                      onChangeText={setAmount}
                    />
                  </View>
                  
                  {/* Currency conversion display */}
                  {amount && calculateConversion(amount) && exchangeRate && (
                    <View style={styles.conversionContainer}>
                      <Text style={styles.conversionText}>
                        ≈ Bs. {calculateConversion(amount)} (Tasa BCV: {exchangeRate.toFixed(2)})
                      </Text>
                    </View>
                  )}
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
              </>
            )}
          </Card>
          
          {/* Show button only after QR scan */}
          {recipientId && (
            <View style={styles.buttonContainer}>
              <TouchableOpacity 
                style={[styles.sendButton, (!recipientId || !amount || parseFloat(amount) <= 0 || isLoading) && styles.disabledButton]}
                onPress={handleSendTip}
                disabled={!recipientId || !amount || parseFloat(amount) <= 0 || isLoading}
                activeOpacity={0.7}
              >
                <LinearGradient
                  colors={(!recipientId || !amount || parseFloat(amount) <= 0 || isLoading) ? ['#E5E5E5', '#D0D0D0'] : [colors.primary, colors.primary]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.sendButtonGradient}
                >
                  <Text style={[styles.sendButtonText, (!recipientId || !amount || parseFloat(amount) <= 0 || isLoading) && styles.disabledButtonText]}>
                    {isLoading ? 'Enviando...' : 'Enviar Propina'}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          )}
          
        </View>
      </KeyboardAvoidingView>
      <AlertComponent />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  backButton: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 60,
    marginLeft: 20,
    marginBottom: 20,
  },
  keyboardAvoidView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: '4%',
    paddingTop: '15%',
    paddingBottom: '20%',
  },
  scrollViewContent: {
    paddingHorizontal: '4%',
    paddingTop: '20%',
    paddingBottom: '15%',
  },
  formCard: {
    padding: 20,
    marginBottom: 8,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
  recipientSection: {
    marginBottom: 8,
    padding: 12,
    backgroundColor: 'rgba(105, 197, 248, 0.1)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(105, 197, 248, 0.2)',
  },
  recipientInfo: {
    marginBottom: 10,
  },
  recipientMainInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  recipientAvatar: {
    marginBottom: 0,
  },
  recipientDetails: {
    flex: 1,
  },
  recipientName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    backgroundColor: '#69C5F8',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  occupationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    marginBottom: 6,
    gap: 6,
  },
  occupationLabel: {
    fontSize: 16,
    color: colors.gray[500],
    fontWeight: '500',
  },
  occupationDivider: {
    fontSize: 16,
    color: colors.gray[400],
    fontWeight: '300',
  },
  occupationBackground: {
    backgroundColor: '#69C5F8',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  occupation: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  starsContainer: {
    flexDirection: 'row',
    gap: 2,
  },
  ratingText: {
    fontSize: 14,
    color: colors.white,
    fontWeight: '500',
  },
  noRatingText: {
    fontSize: 14,
    color: colors.white,
    fontWeight: '400',
  },
  socialNetworks: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    gap: 12,
  },
  socialIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.gray[300],
    shadowColor: colors.gray[900],
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  changeRecipientButton: {
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  buttonGradient: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  changeRecipientText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textDark,
    textShadowColor: 'rgba(255, 255, 255, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  cancelButton: {
    backgroundColor: colors.gray[200],
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
  cancelButtonText: {
    color: colors.gray[600],
    fontSize: 16,
    fontWeight: '600',
  },
  cameraSection: {
    marginBottom: 24,
    alignItems: 'center',
  },
  cameraTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  cameraInstructions: {
    fontSize: 14,
    color: colors.gray[600],
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 16,
  },
  permissionContainer: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(255, 193, 7, 0.1)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 193, 7, 0.3)',
  },
  permissionText: {
    fontSize: 14,
    color: colors.text,
    marginBottom: 12,
    textAlign: 'center',
  },
  permissionButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  cameraContainer: {
    width: '100%',
    alignItems: 'center',
  },
  cameraPreview: {
    width: 280,
    height: 280,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  cameraOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    backgroundColor: '#69C5F8',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginBottom: 16,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  amountSection: {
    marginBottom: 12,
    padding: 12,
    backgroundColor: 'rgba(105, 197, 248, 0.1)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(105, 197, 248, 0.2)',
  },
  amountLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    backgroundColor: '#69C5F8',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginBottom: 16,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  amountInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#69C5F8',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  currencySymbol: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.white,
    marginRight: 6,
  },
  amountInput: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.white,
    paddingVertical: 0,
  },
  conversionContainer: {
    marginTop: 6,
    paddingHorizontal: 2,
  },
  conversionText: {
    fontSize: 14,
    color: colors.gray[600],
    fontStyle: 'italic',
  },
  messageSection: {
    marginBottom: 16,
    padding: 20,
    backgroundColor: 'rgba(105, 197, 248, 0.1)',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(105, 197, 248, 0.2)',
  },
  messageInput: {
    height: 80,
    borderWidth: 1,
    borderColor: colors.gray[300],
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    textAlignVertical: 'top',
    fontSize: 16,
    color: colors.text,
    backgroundColor: 'rgba(105, 197, 248, 0.1)',
  },
  buttonContainer: {
    marginTop: 8,
    marginBottom: 8,
  },
  sendButton: {
    width: '100%',
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  sendButtonGradient: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonText: {
    color: colors.textDark,
    fontSize: 16,
    fontWeight: '600',
    textShadowColor: 'rgba(255, 255, 255, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  disabledButton: {
    opacity: 0.6,
  },
  disabledButtonText: {
    color: colors.gray[500],
  },
});