import React from 'react';
import { View, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import { colors } from '@/constants/colors';
import { InstagramIcon } from '@/components/InstagramIcon';
import { TelegramIcon } from '@/components/TelegramIcon';
import { TikTokIcon } from '@/components/TikTokIcon';
import { FacebookIcon } from '@/components/FacebookIcon';
import { LinkedInIcon } from '@/components/LinkedInIcon';

interface AnimatedSocialNetworksProps {
  instagram?: string;
  telegram?: string;
  tiktok?: string;
  facebook?: string;
  linkedin?: string;
}

export const AnimatedSocialNetworks: React.FC<AnimatedSocialNetworksProps> = ({
  instagram,
  telegram,
  tiktok,
  facebook,
  linkedin
}) => {
  const socialNetworks = [
    { key: 'instagram', value: instagram, icon: InstagramIcon },
    { key: 'telegram', value: telegram, icon: TelegramIcon },
    { key: 'tiktok', value: tiktok, icon: TikTokIcon },
    { key: 'facebook', value: facebook, icon: FacebookIcon },
    { key: 'linkedin', value: linkedin, icon: LinkedInIcon },
  ].filter(network => network.value);

  // Если нет социальных сетей, не показываем компонент
  if (socialNetworks.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      {/* Разделительная линия */}
      <View style={styles.divider} />
      
      <View style={styles.socialContainer}>
        {socialNetworks.map((network) => {
          const IconComponent = network.icon;
          const username = (network.value || '').replace(/^@+/, '');

          const urlMap: Record<string, string> = {
            instagram: `https://instagram.com/${username}`,
            telegram: `https://t.me/${username}`,
            tiktok: `https://www.tiktok.com/@${username}`,
            facebook: `https://facebook.com/${username}`,
            linkedin: `https://www.linkedin.com/in/${username}`,
          };

          const onPress = () => {
            const url = urlMap[network.key as keyof typeof urlMap];
            if (url) Linking.openURL(url).catch(() => {});
          };
          
          return (
            <TouchableOpacity
              key={network.key}
              style={styles.socialIconButton}
              activeOpacity={0.7}
              onPress={onPress}
            >
              <IconComponent size={24} color={colors.textDark} />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 16,
  },
  divider: {
    width: '60%',
    height: 1,
    backgroundColor: colors.gray[300],
    marginBottom: 16,
  },
  socialContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  socialIconButton: {
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