import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Linking, Animated, Text } from 'react-native';
import { colors } from '@/constants/colors';
import { InstagramIcon } from '@/components/InstagramIcon';
import { TelegramIcon } from '@/components/TelegramIcon';
import { TikTokIcon } from '@/components/TikTokIcon';
import { FacebookIcon } from '@/components/FacebookIcon';
import { LinkedInIcon } from '@/components/LinkedInIcon';
import { ChevronDown, ChevronUp } from 'lucide-react-native';

interface CollapsibleSocialNetworksProps {
  instagram?: string;
  telegram?: string;
  tiktok?: string;
  facebook?: string;
  linkedin?: string;
}

export const CollapsibleSocialNetworks: React.FC<CollapsibleSocialNetworksProps> = ({
  instagram,
  telegram,
  tiktok,
  facebook,
  linkedin
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [animation] = useState(new Animated.Value(0));

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

  const toggleExpanded = () => {
    const toValue = isExpanded ? 0 : 1;
    setIsExpanded(!isExpanded);
    
    Animated.timing(animation, {
      toValue,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const maxHeight = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 60], // Высота для одной строки иконок
  });

  const opacity = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
    <View style={styles.container}>
      {/* Кнопка-триггер в левом верхнем углу */}
      <TouchableOpacity 
        style={styles.triggerButton} 
        onPress={toggleExpanded}
        activeOpacity={0.7}
      >
        {isExpanded ? (
          <ChevronUp size={20} color={colors.textDark} />
        ) : (
          <ChevronDown size={20} color={colors.textDark} />
        )}
      </TouchableOpacity>

      {/* Выпадающий контент */}
      <Animated.View 
        style={[
          styles.collapsibleContent,
          {
            maxHeight,
            opacity,
          }
        ]}
      >
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
                <IconComponent size={20} color={colors.textDark} />
              </TouchableOpacity>
            );
          })}
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 0,
  },
  triggerButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.gray[900],
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    alignSelf: 'flex-start',
  },
  collapsibleContent: {
    overflow: 'hidden',
  },
  socialContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 12,
    paddingTop: 12,
  },
  socialIconButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.gray[900],
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
});
