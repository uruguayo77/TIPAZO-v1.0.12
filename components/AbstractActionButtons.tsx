import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '@/constants/colors';

interface AbstractActionButtonsProps {
  onSharePress?: () => void;
  onDownloadPress?: () => void;
  shareIcon?: React.ReactNode;
  downloadIcon?: React.ReactNode;
  isDisabled?: boolean;
}

export const AbstractActionButtons: React.FC<AbstractActionButtonsProps> = ({
  onSharePress,
  onDownloadPress,
  shareIcon,
  downloadIcon,
  isDisabled = false
}) => {
  return (
    <View style={styles.container}>
      {/* Share Button */}
      <TouchableOpacity 
        style={[styles.actionButton, isDisabled && styles.disabledButton]}
        onPress={onSharePress}
        disabled={isDisabled}
      >
        <LinearGradient
          colors={isDisabled ? ['#E5E5E5', '#D0D0D0'] : [colors.primary, colors.primary]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.buttonGradient}
        >
          <View style={styles.buttonContent}>
            {shareIcon}
          </View>
        </LinearGradient>
      </TouchableOpacity>
      
      {/* Download Button */}
      <TouchableOpacity 
        style={[styles.actionButton, isDisabled && styles.disabledButton]}
        onPress={onDownloadPress}
        disabled={isDisabled}
      >
        <LinearGradient
          colors={isDisabled ? ['#E5E5E5', '#D0D0D0'] : [colors.primary, colors.primary]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.buttonGradient}
        >
          <View style={styles.buttonContent}>
            {downloadIcon}
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    gap: 16,
  },
  actionButton: {
    flex: 1,
    borderRadius: 20,
    overflow: 'hidden',
    // Abstract shadow for buttons
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  disabledButton: {
    opacity: 0.6,
  },
  buttonGradient: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
