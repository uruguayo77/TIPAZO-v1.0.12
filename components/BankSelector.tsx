import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Modal, 
  FlatList,
  useWindowDimensions
} from 'react-native';
import { colors } from '@/constants/colors';
import { ChevronDown, X } from 'lucide-react-native';

interface BankSelectorProps {
  value: string | undefined;
  onChange: (value: string) => void;
  label?: string;
}

const BANK_OPTIONS: string[] = [
  'Bancamiga',
  'Banco de Venezuela',
  'Mercantil',
  'BNB'
];

export const BankSelector: React.FC<BankSelectorProps> = ({
  value,
  onChange,
  label
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const { width } = useWindowDimensions();
  const isSmallDevice = width < 375;

  const handleSelect = (option: string) => {
    onChange(option);
    setModalVisible(false);
  };

  const renderItem = ({ item }: { item: string }) => (
    <TouchableOpacity
      style={styles.optionItem}
      onPress={() => handleSelect(item)}
    >
      <Text style={[
        styles.optionText,
        item === value && styles.selectedOptionText
      ]}>
        {item}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      
      <TouchableOpacity
        style={styles.selector}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.selectorText}>
          {value || 'Seleccionar banco'}
        </Text>
        <ChevronDown size={20} color={colors.gray[500]} />
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[
            styles.modalContent,
            isSmallDevice && styles.modalContentSmall
          ]}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Seleccionar banco</Text>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={styles.closeButton}
              >
                <X size={20} color={colors.textLight} />
              </TouchableOpacity>
            </View>
            
            <FlatList
              data={BANK_OPTIONS}
              renderItem={renderItem}
              keyExtractor={(item) => item}
              contentContainerStyle={styles.optionsList}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 6,
    color: colors.gray[700],
  },
  selector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: colors.gray[300],
    borderRadius: 8,
    backgroundColor: colors.card,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  selectorText: {
    fontSize: 16,
    color: colors.text,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    width: '90%',
    maxHeight: '70%',
    backgroundColor: colors.white,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: colors.gray[900],
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 12,
  },
  modalContentSmall: {
    width: '95%',
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[200],
    backgroundColor: colors.gray[50],
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
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
  optionsList: {
    padding: 8,
  },
  optionItem: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[100],
  },
  optionText: {
    fontSize: 16,
    color: colors.text,
    fontWeight: '500',
  },
  selectedOptionText: {
    color: colors.primary,
    fontWeight: '700',
  },
});