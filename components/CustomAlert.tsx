import React from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { colors } from '@/constants/colors';

interface AlertButton {
  text: string;
  onPress?: () => void;
  style?: 'default' | 'cancel' | 'destructive';
}

interface CustomAlertProps {
  visible: boolean;
  title?: string;
  message?: string;
  buttons: AlertButton[];
  onClose: () => void;
}

export const CustomAlert: React.FC<CustomAlertProps> = ({
  visible,
  title,
  message,
  buttons,
  onClose,
}) => {
  const handleButtonPress = (button: AlertButton) => {
    button.onPress?.();
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.alertContainer}>
          {title && <Text style={styles.title}>{title}</Text>}
          {message && <Text style={styles.message}>{message}</Text>}
          
          <View style={styles.buttonContainer}>
            {buttons.map((button, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.button,
                  button.style === 'cancel' && styles.cancelButton,
                  button.style === 'destructive' && styles.destructiveButton,
                  buttons.length === 2 && index === 0 && styles.leftButton,
                  buttons.length === 2 && index === 1 && styles.rightButton,
                  buttons.length === 1 && styles.singleButton,
                ]}
                onPress={() => handleButtonPress(button)}
                activeOpacity={0.7}
              >
                <Text style={[
                  styles.buttonText,
                  button.style === 'cancel' && styles.cancelButtonText,
                  button.style === 'destructive' && styles.destructiveButtonText,
                ]}>
                  {button.text}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </Modal>
  );
};

// Hook для удобного использования
export const useCustomAlert = () => {
  const [alertConfig, setAlertConfig] = React.useState<{
    visible: boolean;
    title?: string;
    message?: string;
    buttons: AlertButton[];
  }>({
    visible: false,
    buttons: [],
  });

  const showAlert = (
    title: string,
    message?: string,
    buttons: AlertButton[] = [{ text: 'OK' }]
  ) => {
    setAlertConfig({
      visible: true,
      title,
      message,
      buttons,
    });
  };

  const hideAlert = () => {
    setAlertConfig(prev => ({ ...prev, visible: false }));
  };

  const AlertComponent = () => (
    <CustomAlert
      visible={alertConfig.visible}
      title={alertConfig.title}
      message={alertConfig.message}
      buttons={alertConfig.buttons}
      onClose={hideAlert}
    />
  );

  return { showAlert, AlertComponent };
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  alertContainer: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 24,
    minWidth: width * 0.8,
    maxWidth: width * 0.9,
    shadowColor: colors.gray[900],
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 12,
    lineHeight: 24,
  },
  message: {
    fontSize: 16,
    color: colors.gray[600],
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 28,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  leftButton: {
    backgroundColor: colors.gray[100],
    shadowColor: colors.gray[300],
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  rightButton: {
    backgroundColor: colors.primary,
  },
  singleButton: {
    backgroundColor: colors.primary,
  },
  cancelButton: {
    backgroundColor: colors.gray[100],
    shadowColor: colors.gray[300],
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  destructiveButton: {
    backgroundColor: colors.error,
    shadowColor: colors.error,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textDark,
  },
  cancelButtonText: {
    color: colors.gray[700],
  },
  destructiveButtonText: {
    color: colors.white,
  },
});


