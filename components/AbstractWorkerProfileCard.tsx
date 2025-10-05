import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '@/constants/colors';
import { Star, MessageCircle } from 'lucide-react-native';
import { Avatar } from '@/components/Avatar';
import { InstagramIcon } from '@/components/InstagramIcon';
import { TelegramIcon } from '@/components/TelegramIcon';
import { TikTokIcon } from '@/components/TikTokIcon';
import { FacebookIcon } from '@/components/FacebookIcon';
import { LinkedInIcon } from '@/components/LinkedInIcon';

interface AbstractWorkerProfileCardProps {
  worker: {
    name: string;
    occupation: string;
    profilePicture?: string;
    instagram?: string;
    telegram?: string;
    tiktok?: string;
    facebook?: string;
    linkedin?: string;
  };
  averageRating: number | null;
  ratingsCount: number;
  commentsCount: number;
  onSocialPress: (platform: string, username: string) => void;
}

export const AbstractWorkerProfileCard: React.FC<AbstractWorkerProfileCardProps> = ({
  worker,
  averageRating,
  ratingsCount,
  commentsCount,
  onSocialPress,
}) => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[colors.white, colors.white]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradientContainer}
      >
        <View style={styles.contentContainer}>
          {/* Avatar */}
          <View style={styles.avatarContainer}>
            <Avatar
              source={worker.profilePicture}
              name={worker.name}
              size={120}
              variant="rounded"
            />
          </View>

          {/* Name */}
          <View style={styles.nameContainer}>
            <Text style={styles.name}>{worker.name}</Text>
          </View>

          {/* Occupation */}
          <View style={styles.occupationContainer}>
            <Text style={styles.occupationLabel}>Ocupación</Text>
            <Text style={styles.occupationDivider}>|</Text>
            <Text style={styles.occupation}>{worker.occupation}</Text>
          </View>

          {/* Stats */}
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Star size={20} color={colors.primary} />
              <Text style={styles.statValue}>
                {averageRating !== null ? averageRating.toFixed(1) : '--'}
              </Text>
              <Text style={styles.statLabel}>
                {averageRating !== null ? 'Calificación' : 'Sin valoraciones'}
              </Text>
            </View>
            
            <View style={styles.statDivider} />
            
            <View style={styles.statItem}>
              <MessageCircle size={20} color={colors.primary} />
              <Text style={styles.statValue}>{commentsCount}</Text>
              <Text style={styles.statLabel}>Comentarios</Text>
            </View>
          </View>

          {/* Social Networks */}
          {(worker.instagram || worker.telegram || worker.tiktok || worker.facebook || worker.linkedin) && (
            <View style={styles.socialNetworks}>
              {worker.instagram && (
                <TouchableOpacity 
                  style={styles.socialIcon} 
                  onPress={() => onSocialPress('instagram', worker.instagram!)}
                >
                  <InstagramIcon size={24} color={colors.textDark} />
                </TouchableOpacity>
              )}
              {worker.telegram && (
                <TouchableOpacity 
                  style={styles.socialIcon} 
                  onPress={() => onSocialPress('telegram', worker.telegram!)}
                >
                  <TelegramIcon size={24} color={colors.textDark} />
                </TouchableOpacity>
              )}
              {worker.tiktok && (
                <TouchableOpacity 
                  style={styles.socialIcon} 
                  onPress={() => onSocialPress('tiktok', worker.tiktok!)}
                >
                  <TikTokIcon size={24} color={colors.textDark} />
                </TouchableOpacity>
              )}
              {worker.facebook && (
                <TouchableOpacity 
                  style={styles.socialIcon} 
                  onPress={() => onSocialPress('facebook', worker.facebook!)}
                >
                  <FacebookIcon size={24} color={colors.textDark} />
                </TouchableOpacity>
              )}
              {worker.linkedin && (
                <TouchableOpacity 
                  style={styles.socialIcon} 
                  onPress={() => onSocialPress('linkedin', worker.linkedin!)}
                >
                  <LinkedInIcon size={24} color={colors.textDark} />
                </TouchableOpacity>
              )}
            </View>
          )}
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 20,
    shadowColor: colors.gray[900],
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
  gradientContainer: {
    borderRadius: 20,
    padding: 24,
  },
  contentContainer: {
    alignItems: 'center',
  },
  avatarContainer: {
    marginBottom: 20,
  },
  nameContainer: {
    backgroundColor: '#69C5F8',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 16,
    marginBottom: 12,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  occupationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  occupationLabel: {
    fontSize: 14,
    color: colors.textDark,
    marginRight: 8,
    fontWeight: '500',
  },
  occupationDivider: {
    fontSize: 14,
    color: colors.gray[400],
    marginRight: 8,
    fontWeight: '300',
  },
  occupation: {
    fontSize: 14,
    color: '#FFFFFF',
    backgroundColor: '#69C5F8',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
    fontWeight: '600',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    backgroundColor: '#69C5F8',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.textLight,
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textLight,
  },
  statDivider: {
    width: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  socialNetworks: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
  },
  socialIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.gray[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});

