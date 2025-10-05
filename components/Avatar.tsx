import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ViewStyle, TouchableOpacity, Alert } from 'react-native';
import { Image } from 'expo-image';
import { colors } from '@/constants/colors';
import * as ImagePicker from 'expo-image-picker';
import { supabase } from '@/lib/supabase';
import { CustomLoader } from './CustomLoader';
import { useAuthStore } from '@/store/auth-store';

interface AvatarProps {
  source?: string;
  name?: string;
  size?: number;
  style?: ViewStyle;
  editable?: boolean;
  onUpload?: (url: string) => void;
  variant?: 'circle' | 'rounded';
}

export const Avatar: React.FC<AvatarProps> = ({ 
  source, 
  name = '', 
  size = 40,
  style,
  editable = false,
  onUpload,
  variant = 'circle'
}) => {
  const [uploading, setUploading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(source || null);
  const { user } = useAuthStore();

  useEffect(() => {
    console.log('Avatar useEffect triggered with source:', source);
    if (source) {
      // Always treat source as Supabase storage path if it doesn't start with http
      if (source.startsWith('http')) {
        // If it's already a full URL, use it directly
        console.log('Using direct URL:', source);
        setAvatarUrl(source);
      } else {
        // Check if source looks like a valid path (not just a filename)
        if (source.includes('/') || source.includes('.')) {
          // Treat as Supabase storage path
          try {
            const { data: { publicUrl } } = supabase.storage
              .from('avatars')
              .getPublicUrl(source);
            console.log('Generated public URL from path:', source, '-> URL:', publicUrl);
            
            // Validate the generated URL
            if (publicUrl && publicUrl.includes('supabase.co')) {
              setAvatarUrl(publicUrl);
            } else {
              console.log('Invalid public URL generated, resetting avatar');
              setAvatarUrl(null);
            }
          } catch (error) {
            console.error('Error generating public URL:', error);
            setAvatarUrl(null);
          }
        } else {
          // If it's just a filename without path, it's likely invalid
          console.log('Invalid source format, resetting avatar:', source);
          setAvatarUrl(null);
        }
      }
    } else {
      // Reset avatar if source is empty
      console.log('No source provided, resetting avatar');
      setAvatarUrl(null);
    }
  }, [source]);

  const getInitials = (name: string) => {
    if (!name) return '';
    
    const parts = name.split(' ');
    if (parts.length === 1) {
      return parts[0].charAt(0).toUpperCase();
    }
    
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
  };


  const uploadAvatar = async () => {
    if (!user) {
      Alert.alert('Error', 'Debes estar autenticado para cambiar tu avatar');
      return;
    }

    try {
      setUploading(true);

      // Request permission to access media library
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (permissionResult.granted === false) {
        Alert.alert('Permiso requerido', 'Necesitas dar permiso para acceder a tus fotos');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsMultipleSelection: false,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
        exif: false,
      });

      if (result.canceled || !result.assets || result.assets.length === 0) {
        return;
      }

      const image = result.assets[0];

      if (!image.uri) {
        throw new Error('No image URI');
      }

      // Read image as binary data for React Native
      const response = await fetch(image.uri);
      const imageData = await response.arrayBuffer();

      // Create unique filename
      const fileExt = image.uri?.split('.').pop()?.toLowerCase() ?? 'jpeg';
      const fileName = `${user.id}/${Date.now()}.${fileExt}`;
      const mimeType = image.mimeType ?? `image/${fileExt}`;

      // Upload to Supabase Storage
      const { data, error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(fileName, imageData, {
          contentType: mimeType,
          upsert: true,
        });

      if (uploadError) {
        throw uploadError;
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(data.path);

      // Update user profile in database
      const { error: updateError } = await supabase
        .from('tipazo_users')
        .update({ profile_picture: data.path })
        .eq('id', user.id);

      if (updateError) {
        console.error('Error updating profile:', updateError);
      }

      // Update local state immediately 
      console.log('Setting new avatar URL:', publicUrl);
      setAvatarUrl(publicUrl);
      
      // Update auth store with new profile picture
      console.log('Updating auth store with path:', data.path);
      useAuthStore.setState(state => ({
        user: state.user ? { 
          ...state.user, 
          profilePicture: data.path 
        } : null
      }));
      
      // Call onUpload callback
      if (onUpload) {
        onUpload(data.path);
      }

      Alert.alert('Éxito', 'Avatar actualizado correctamente');

    } catch (error) {
      console.error('Error uploading avatar:', error);
      Alert.alert('Error', 'No se pudo subir la imagen. Intenta de nuevo.');
    } finally {
      setUploading(false);
    }
  };

  const initials = getInitials(name);
  const fontSize = size * 0.4;
  const borderRadius = variant === 'rounded' ? 12 : size / 2;

  const avatarContent = (
    <View 
      style={[
        styles.container, 
        { 
          width: size, 
          height: size, 
          borderRadius: borderRadius
        },
        style
      ]}
    >
      {avatarUrl ? (
        <Image
          key={avatarUrl} // Force re-render when URL changes
          source={{ uri: avatarUrl }}
          style={[styles.image, { borderRadius: borderRadius }]}
          contentFit="cover"
          transition={200}
          onLoad={() => console.log('Image loaded successfully:', avatarUrl)}
          onError={(error) => {
            console.error('Image failed to load:', error, 'URL:', avatarUrl);
            // Fallback to showing initials if image fails to load
            setAvatarUrl(null);
          }}
        />
      ) : (
        <Text style={[styles.initials, { fontSize }]}>{initials}</Text>
      )}
      
      {uploading && (
        <View style={[styles.loadingOverlay, { borderRadius: borderRadius }]}>
          <CustomLoader size={16} color={colors.card} />
        </View>
      )}
      
    </View>
  );

  return editable ? (
    <TouchableOpacity onPress={uploadAvatar} disabled={uploading}>
      {avatarContent}
    </TouchableOpacity>
  ) : (
    avatarContent
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  initials: {
    color: colors.card,
    fontWeight: 'bold',
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});