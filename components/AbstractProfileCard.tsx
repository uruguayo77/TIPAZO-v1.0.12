import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '@/constants/colors';
import Svg, { Path } from 'react-native-svg';
import { Crown } from 'lucide-react-native';
import { InstagramIcon } from './InstagramIcon';
import { TelegramIcon } from './TelegramIcon';
import { TikTokIcon } from './TikTokIcon';
import { FacebookIcon } from './FacebookIcon';
import { LinkedInIcon } from './LinkedInIcon';

interface AbstractProfileCardProps {
  name: string;
  occupation: string;
  isSubscriptionActive: boolean;
  onEditPress?: () => void;
  onSubscriptionPress?: () => void;
  socialNetworks?: {
    instagram?: string;
    telegram?: string;
    tiktok?: string;
    facebook?: string;
    linkedin?: string;
  };
  avatarComponent?: React.ReactNode;
}

export const AbstractProfileCard: React.FC<AbstractProfileCardProps> = ({
  name,
  occupation,
  isSubscriptionActive,
  onEditPress,
  onSubscriptionPress,
  socialNetworks = {},
  avatarComponent
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
          {/* Avatar */}
          {avatarComponent && (
            <View style={styles.avatarContainer}>
              {avatarComponent}
            </View>
          )}
          
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
          
          {/* Premium badge */}
          {isSubscriptionActive && (
            <TouchableOpacity 
              style={styles.premiumBadge}
              onPress={onSubscriptionPress}
            >
              <Crown size={16} color={colors.primary} />
              <Text style={styles.premiumText}>TIPAZO Premium</Text>
            </TouchableOpacity>
          )}
          
          {/* Edit button */}
          <TouchableOpacity 
            style={styles.editButton}
            onPress={onEditPress}
          >
            <Text style={styles.editButtonText}>Editar perfil</Text>
          </TouchableOpacity>
          
          {/* Social networks */}
          <View style={styles.socialNetworksContainer}>
            {socialNetworks.instagram && (
              <TouchableOpacity style={styles.socialIcon}>
                <InstagramIcon size={16} color={colors.textDark} />
              </TouchableOpacity>
            )}
            {socialNetworks.telegram && (
              <TouchableOpacity style={styles.socialIcon}>
                <TelegramIcon size={16} color={colors.textDark} />
              </TouchableOpacity>
            )}
            {socialNetworks.tiktok && (
              <TouchableOpacity style={styles.socialIcon}>
                <TikTokIcon size={16} color={colors.textDark} />
              </TouchableOpacity>
            )}
            {socialNetworks.facebook && (
              <TouchableOpacity style={styles.socialIcon}>
                <FacebookIcon size={16} color={colors.textDark} />
              </TouchableOpacity>
            )}
            {socialNetworks.linkedin && (
              <TouchableOpacity style={styles.socialIcon}>
                <LinkedInIcon size={16} color={colors.textDark} />
              </TouchableOpacity>
            )}
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
    marginBottom: 24,
    width: '100%',
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
    width: '100%',
    // Additional abstract styling
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
  contentContainer: {
    padding: 32,
    alignItems: 'center',
    zIndex: 2,
    width: '100%',
  },
  avatarContainer: {
    marginBottom: 20,
  },
  nameContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
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
    marginBottom: 16,
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
  premiumBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#69C5F8',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 12,
    gap: 6,
    // Enhanced abstract shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
    // Abstract border
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  premiumText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  editButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginBottom: 12,
    // Abstract shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  editButtonText: {
    color: colors.textDark,
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  socialNetworksContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  socialIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.gray[300],
    // Abstract shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  bottomWaveDecoration: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
});
