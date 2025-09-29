import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { colors } from '@/constants/colors';

interface EmptyStateProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  style?: ViewStyle;
  textColor?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ 
  title, 
  description, 
  icon, 
  style,
  textColor = colors.textLight
}) => {
  // Determine icon color based on text color
  const iconColor = textColor === '#000000' ? '#666666' : colors.textLight;
  
  return (
    <View style={[styles.container, style]}>
      <View style={styles.iconContainer}>
        {icon}
      </View>
      <Text style={[styles.title, { color: textColor }]}>{title}</Text>
      <Text style={[styles.description, { color: textColor }]}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  iconContainer: {
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
    paddingHorizontal: 16,
  },
});