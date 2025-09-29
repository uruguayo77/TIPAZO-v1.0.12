import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, ActivityIndicator } from 'react-native';
import { Image } from 'expo-image';
import { colors } from '@/constants/colors';

interface QRCodeProps {
  value: string;
  size?: number;
  logo?: any; // Can be a require() or a URI
  logoSize?: 'small' | 'medium' | 'large';
  backgroundColor?: string;
  foregroundColor?: string;
}

export const QRCode: React.FC<QRCodeProps> = ({
  value,
  size = 200,
  logo,
  logoSize = 'medium',
  backgroundColor = colors.card,
  foregroundColor = colors.text,
}) => {
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Calculate logo size based on the provided option
  const getLogoSize = () => {
    switch (logoSize) {
      case 'small':
        return size * 0.12; // 12% of QR code size
      case 'large':
        return size * 0.22; // 22% of QR code size
      case 'medium':
      default:
        return size * 0.207; // 20.7% of QR code size (increased by 15% from 18%)
    }
  };

  useEffect(() => {
    if (!value) {
      setError("QR code value is required");
      setIsLoading(false);
      return;
    }

    // Encode the value for URL
    const encodedValue = encodeURIComponent(value);
    
    // Use QR code API to generate QR code
    // Note: Using a public API for demo purposes
    // Adding error correction level to handle logo overlay better
    const apiUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodedValue}&size=${size}x${size}&color=${foregroundColor.replace('#', '')}&bgcolor=${backgroundColor.replace('#', '')}&ecc=H`;
    
    setQrCodeUrl(apiUrl);
    setIsLoading(false);
  }, [value, size, backgroundColor, foregroundColor]);

  if (error) {
    return (
      <View style={[styles.container, { width: size, height: size }]}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (isLoading || !qrCodeUrl) {
    return (
      <View style={[styles.container, { width: size, height: size }]}>
        <ActivityIndicator color={colors.primary} size="large" />
      </View>
    );
  }

  const logoSizeValue = getLogoSize();

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Image
        source={{ uri: qrCodeUrl }}
        style={styles.qrCode}
        contentFit="contain"
        transition={300}
      />
      {logo && (
        <View style={[
          styles.logoContainer, 
          { 
            width: logoSizeValue, 
            height: logoSizeValue,
            borderRadius: logoSizeValue / 4
          }
        ]}>
          <Image
            source={logo}
            style={[
              styles.logo,
              { borderRadius: (logoSizeValue - 4) / 4 }
            ]}
            contentFit="cover"
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
  },
  qrCode: {
    width: '100%',
    height: '100%',
  },
  logoContainer: {
    position: 'absolute',
    backgroundColor: colors.card,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 2,
  },
  logo: {
    width: '100%',
    height: '100%',
  },
  errorText: {
    color: colors.error,
    textAlign: 'center',
  },
});