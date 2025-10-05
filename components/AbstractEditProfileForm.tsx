import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '@/constants/colors';
import { Input } from './Input';
import { User, Mail, Instagram, Facebook, Linkedin } from 'lucide-react-native';
import { TelegramIcon } from './TelegramIcon';
import { TikTokIcon } from './TikTokIcon';
import { GoalIcon } from './GoalIcon';
import { CheckCircle2 } from 'lucide-react-native';
import { Lock, CreditCard } from 'lucide-react-native';

interface AbstractEditProfileFormProps {
  // Personal Information
  editingName: string;
  setEditingName: (name: string) => void;
  editingEmail: string;
  setEditingEmail: (email: string) => void;
  editingOccupation: string;
  setEditingOccupation: (occupation: string) => void;
  editingBiography: string;
  setEditingBiography: (biography: string) => void;
  
  // Social Networks
  editingInstagram: string;
  setEditingInstagram: (instagram: string) => void;
  editingTelegram: string;
  setEditingTelegram: (telegram: string) => void;
  editingTikTok: string;
  setEditingTikTok: (tiktok: string) => void;
  editingFacebook: string;
  setEditingFacebook: (facebook: string) => void;
  editingLinkedIn: string;
  setEditingLinkedIn: (linkedin: string) => void;
  
  // Goal
  goalDescription: string;
  setGoalDescription: (description: string) => void;
  goalAmount: number;
  setGoalAmount: (amount: number) => void;
  goalAccumulated: number;
  isGoalReached: boolean;
  
  // Actions
  onSavePress: () => void;
  onCancelPress: () => void;
  onChangePassword: () => void;
  onWithdrawalSettings: () => void;
  isLoading?: boolean;
}

export const AbstractEditProfileForm: React.FC<AbstractEditProfileFormProps> = ({
  editingName,
  setEditingName,
  editingEmail,
  setEditingEmail,
  editingOccupation,
  setEditingOccupation,
  editingBiography,
  setEditingBiography,
  editingInstagram,
  setEditingInstagram,
  editingTelegram,
  setEditingTelegram,
  editingTikTok,
  setEditingTikTok,
  editingFacebook,
  setEditingFacebook,
  editingLinkedIn,
  setEditingLinkedIn,
  goalDescription,
  setGoalDescription,
  goalAmount,
  setGoalAmount,
  goalAccumulated,
  isGoalReached,
  onSavePress,
  onCancelPress,
  onChangePassword,
  onWithdrawalSettings,
  isLoading = false
}) => {
  return (
    <View style={styles.container}>
      {/* Personal Information Card */}
      <View style={styles.card}>
        <LinearGradient
          colors={['#FFFFFF', '#F8F9FA', '#E8F4FD']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradientContainer}
        >
          <Text style={styles.sectionTitle}>Información Personal</Text>
          
          <View style={styles.form}>
            <Input
              label="Nombre completo"
              value={editingName}
              onChangeText={setEditingName}
              placeholder="Ingresa tu nombre completo"
              leftIcon={<User size={20} color={colors.gray[500]} />}
            />
            
            <Input
              label="Correo electrónico"
              value={editingEmail}
              onChangeText={setEditingEmail}
              placeholder="Ingresa tu correo electrónico"
              keyboardType="email-address"
              leftIcon={<Mail size={20} color={colors.gray[500]} />}
            />
            
            <Input
              label="Ocupación"
              value={editingOccupation}
              onChangeText={setEditingOccupation}
              placeholder="Ingresa tu ocupación"
              leftIcon={<User size={20} color={colors.gray[500]} />}
            />
            
            <Input
              label="Biografía"
              value={editingBiography}
              onChangeText={setEditingBiography}
              placeholder="Cuéntanos sobre ti..."
              multiline
              numberOfLines={3}
            />
          </View>
        </LinearGradient>
      </View>

      {/* Social Networks Card */}
      <View style={styles.card}>
        <LinearGradient
          colors={['#FFFFFF', '#F8F9FA', '#E8F4FD']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradientContainer}
        >
          <Text style={styles.sectionTitle}>Redes Sociales</Text>
          
          <View style={styles.form}>
            <Input
              label="Instagram"
              value={editingInstagram}
              onChangeText={setEditingInstagram}
              placeholder="@tu_usuario"
              leftIcon={<Instagram size={20} color={colors.gray[500]} />}
            />
            
            <Input
              label="Telegram"
              value={editingTelegram}
              onChangeText={setEditingTelegram}
              placeholder="@tu_usuario"
              leftIcon={<TelegramIcon size={20} color={colors.gray[500]} />}
            />
            
            <Input
              label="TikTok"
              value={editingTikTok}
              onChangeText={setEditingTikTok}
              placeholder="@tu_usuario"
              leftIcon={<TikTokIcon size={20} color={colors.gray[500]} />}
            />
            
            <Input
              label="Facebook"
              value={editingFacebook}
              onChangeText={setEditingFacebook}
              placeholder="@tu_usuario"
              leftIcon={<Facebook size={20} color={colors.gray[500]} />}
            />
            
            <Input
              label="LinkedIn"
              value={editingLinkedIn}
              onChangeText={setEditingLinkedIn}
              placeholder="@tu_usuario"
              leftIcon={<Linkedin size={20} color={colors.gray[500]} />}
            />
          </View>
        </LinearGradient>
      </View>

      {/* Personal Goal Card */}
      <View style={styles.card}>
        <LinearGradient
          colors={['#FFFFFF', '#F8F9FA', '#E8F4FD']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradientContainer}
        >
          <View style={styles.goalHeader}>
            <View style={styles.goalIcon}>
              <GoalIcon size={16} color={colors.primary} />
            </View>
            <Text style={styles.goalTitle}>Mi Meta Personal</Text>
            
            {isGoalReached && (
              <View style={styles.goalReachedBadge}>
                <CheckCircle2 size={14} color={colors.success} />
                <Text style={styles.goalReachedText}>Meta alcanzada</Text>
              </View>
            )}
          </View>
          
          <View style={styles.form}>
            <Input
              label="Descripción de tu meta"
              value={goalDescription}
              onChangeText={setGoalDescription}
              placeholder="Ej: Estoy ahorrando para comprar un perrito de husky"
              multiline
            />
            
            <Input
              label="Monto total de la meta ($)"
              value={goalAmount.toString()}
              onChangeText={(text) => {
                const filtered = text.replace(/[^0-9.]/g, '');
                setGoalAmount(parseFloat(filtered) || 0);
              }}
              keyboardType="numeric"
              placeholder="Ej: 500"
            />
          </View>
        </LinearGradient>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionButtonsContainer}>
        <TouchableOpacity 
          style={styles.saveButton}
          onPress={onSavePress}
          disabled={isLoading}
        >
          <LinearGradient
            colors={[colors.primary, colors.primary]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.buttonGradient}
          >
            <Text style={styles.saveButtonText}>
              {isLoading ? 'Guardando...' : 'Guardar'}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.cancelButton}
          onPress={onCancelPress}
        >
          <Text style={styles.cancelButtonText}>Cancelar</Text>
        </TouchableOpacity>
      </View>

      {/* Additional Actions */}
      <View style={styles.additionalActions}>
        <TouchableOpacity onPress={onChangePassword} style={styles.actionButton}>
          <View style={styles.actionButtonContent}>
            <Lock size={20} color={colors.textDark} />
            <Text style={styles.actionButtonText}>Cambiar contraseña</Text>
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity 
          onPress={() => {}} 
          style={[styles.actionButton, styles.disabledButton]}
          disabled={true}
        >
          <View style={styles.actionButtonContent}>
            <CreditCard size={20} color={colors.gray[400]} />
            <Text style={[styles.actionButtonText, styles.disabledButtonText]}>Datos para retiros</Text>
          </View>
        </TouchableOpacity>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    gap: 16,
  },
  card: {
    // Abstract shadow for the entire card
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 12,
  },
  gradientContainer: {
    borderRadius: 25,
    padding: 24,
    overflow: 'hidden',
    // Additional abstract styling
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    // Abstract shadow for the entire card
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 16,
    textAlign: 'center',
    backgroundColor: '#69C5F8',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  form: {
    gap: 16,
  },
  goalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 8,
  },
  goalIcon: {
    width: 32,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#69C5F8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  goalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    backgroundColor: '#69C5F8',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  goalReachedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.success,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  goalReachedText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '600',
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  saveButton: {
    flex: 1,
    borderRadius: 20,
    overflow: 'hidden',
    // Abstract shadow for button
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  buttonGradient: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButtonText: {
    color: colors.textDark,
    fontSize: 16,
    fontWeight: '600',
  },
  cancelButton: {
    flex: 1,
    backgroundColor: colors.gray[200],
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButtonText: {
    color: colors.gray[600],
    fontSize: 16,
    fontWeight: '600',
  },
  additionalActions: {
    gap: 12,
    marginTop: 16,
  },
  actionButton: {
    // Green background
    backgroundColor: colors.primary,
    paddingVertical: 18,
    paddingHorizontal: 24,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    // Enhanced abstract shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
  actionButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  actionButtonText: {
    color: colors.textDark,
    fontSize: 16,
    fontWeight: '600',
    textShadowColor: 'rgba(255, 255, 255, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  disabledButton: {
    opacity: 0.5,
    backgroundColor: colors.gray[100],
  },
  disabledButtonText: {
    color: colors.gray[500],
  },
});
