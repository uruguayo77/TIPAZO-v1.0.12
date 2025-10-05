import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '@/constants/colors';
import Svg, { Path } from 'react-native-svg';
import { DividerWave } from './DividerWave';

interface AbstractQRCardProps {
  name: string;
  occupation: string;
  children: React.ReactNode;
}

export const AbstractQRCard: React.FC<AbstractQRCardProps> = ({
  name,
  occupation,
  children
}) => {
  return (
    <View style={styles.container}>
      {/* Abstract background with gradient and shadow */}
      <LinearGradient
        colors={['#FFFFFF', '#F8F9FA', '#E8F4FD']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradientContainer}
      >
        {/* Content container */}
        <View style={styles.contentContainer}>
          {/* Name with background */}
          <View style={styles.nameContainer}>
            <Text style={styles.name}>{name}</Text>
            <View style={styles.nameBackground} />
          </View>
          
          {/* Occupation container with label and divider */}
          <View style={styles.occupationContainer}>
            <Text style={styles.occupationLabel}>Ocupación</Text>
            <Text style={styles.occupationDivider}>|</Text>
            <View style={styles.occupationBackground}>
              <Text style={styles.occupation}>{occupation}</Text>
            </View>
          </View>
          
          {/* QR Code wrapper */}
          <View style={styles.qrWrapper}>
            {children}
          </View>
        </View>

        {/* Abstract wave decoration at bottom */}
        <View style={styles.bottomWaveDecoration}>
          <Svg width="100%" height={15} viewBox="0 0 400 15">
            <Path
              d="M0,5 Q50,15 100,5 T200,5 T300,5 T400,5 L400,15 L0,15 Z"
              fill="rgba(255, 255, 255, 0.3)"
            />
          </Svg>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    // Abstract shadow for the entire card
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 12,
  },
  gradientContainer: {
    borderRadius: 25,
    overflow: 'hidden',
    // Additional abstract styling
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
  contentContainer: {
    padding: 24,
    alignItems: 'center',
    zIndex: 2,
  },
  nameContainer: {
    position: 'relative',
    marginBottom: 8,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    zIndex: 2,
    // Text shadow for depth
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  nameBackground: {
    position: 'absolute',
    top: -5,
    left: -10,
    right: -10,
    bottom: -5,
    backgroundColor: '#69C5F8',
    borderRadius: 15,
    zIndex: -1,
  },
  occupationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 20,
    gap: 8,
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
  qrWrapper: {
    marginVertical: 8,
    width: 250,
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: colors.white,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  bottomWaveDecoration: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
});
