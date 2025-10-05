import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '@/constants/colors';
import { Star, MessageCircle } from 'lucide-react-native';

interface Comment {
  id: string;
  client_name?: string;
  created_at: string;
  tip_amount?: number;
  rating?: number;
  comment?: string;
}

interface AbstractWorkerCommentsSectionProps {
  comments: Comment[];
  isLoading: boolean;
}

export const AbstractWorkerCommentsSection: React.FC<AbstractWorkerCommentsSectionProps> = ({
  comments,
  isLoading,
}) => {
  // Mock data for testing design
  const mockComments: Comment[] = [
    {
      id: '1',
      client_name: 'María González',
      created_at: '2024-01-15T10:30:00Z',
      tip_amount: 25.50,
      rating: 5,
      comment: 'Excelente servicio, muy profesional y amable. Definitivamente lo recomiendo!'
    },
    {
      id: '2',
      client_name: 'Carlos Rodríguez',
      created_at: '2024-01-14T15:45:00Z',
      tip_amount: 15.00,
      rating: 4,
      comment: 'Muy buen trabajo, cumplió con todas las expectativas.'
    },
    {
      id: '3',
      client_name: 'Ana Martínez',
      created_at: '2024-01-13T09:20:00Z',
      tip_amount: 30.00,
      rating: 5,
      comment: 'Increíble atención al detalle. Superó mis expectativas completamente.'
    },
    {
      id: '4',
      client_name: 'Luis Fernández',
      created_at: '2024-01-12T14:15:00Z',
      tip_amount: 20.00,
      rating: 5,
      comment: 'Trabajo de calidad excepcional. Muy recomendado!'
    }
  ];

  // Use mock data for testing, fallback to real comments
  const displayComments = comments.length > 0 ? comments : mockComments;
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        size={12}
        color={index < rating ? colors.primary : colors.gray[300]}
        fill={index < rating ? colors.primary : 'transparent'}
      />
    ));
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <LinearGradient
          colors={[colors.white, colors.white]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradientContainer}
        >
          <View style={styles.contentContainer}>
            <Text style={styles.title}>Comentarios</Text>
            <Text style={styles.loadingText}>Cargando comentarios...</Text>
          </View>
        </LinearGradient>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[colors.white, colors.white]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradientContainer}
      >
        <View style={styles.contentContainer}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.chatIcon}>
              <MessageCircle size={20} color={colors.primary} />
            </View>
            <Text style={styles.sectionTitle}>Comentarios</Text>
          </View>
          
          {displayComments.length > 0 ? (
            displayComments.map((comment, index) => (
              <View key={comment.id} style={[styles.commentItem, index === 0 && styles.firstCommentItem]}>
                <View style={styles.commentHeader}>
                  <View style={styles.commentAuthorInfo}>
                    <Text style={styles.commentAuthor}>{comment.client_name || 'Cliente'}</Text>
                    <Text style={styles.commentDate}>
                      {new Date(comment.created_at).toLocaleDateString('es-ES', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </Text>
                  </View>
                  <Text style={styles.tipAmount}>${(comment.tip_amount || 0).toFixed(2)}</Text>
                </View>
                
                {comment.rating && (
                  <View style={styles.ratingContainer}>
                    <View style={styles.starsContainer}>
                      {renderStars(comment.rating)}
                    </View>
                    <Text style={styles.ratingText}>{comment.rating}/5</Text>
                  </View>
                )}
                
                {comment.comment && (
                  <Text style={styles.commentText}>{comment.comment}</Text>
                )}
              </View>
            ))
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>No hay comentarios aún</Text>
              <Text style={styles.emptySubtext}>Sé el primero en dejar un comentario</Text>
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
    marginBottom: 32, // Увеличенный отступ снизу для плавающей кнопки
    borderRadius: 20,
    shadowColor: colors.gray[900],
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
  gradientContainer: {
    borderRadius: 20,
    padding: 20,
  },
  contentContainer: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  chatIcon: {
    width: 32,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#69C5F8',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    backgroundColor: '#69C5F8',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
    alignSelf: 'center',
  },
  commentItem: {
    backgroundColor: 'rgba(105, 197, 248, 0.05)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(105, 197, 248, 0.1)',
  },
  firstCommentItem: {
    marginTop: 0,
  },
  commentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  commentAuthorInfo: {
    flex: 1,
  },
  commentAuthor: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textDark,
    marginBottom: 2,
  },
  commentDate: {
    fontSize: 12,
    color: colors.gray[500],
  },
  tipAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primary,
    backgroundColor: '#69C5F8',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    textAlign: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  starsContainer: {
    flexDirection: 'row',
    marginRight: 8,
  },
  ratingText: {
    fontSize: 12,
    color: colors.gray[600],
    fontWeight: '500',
  },
  commentText: {
    fontSize: 14,
    color: colors.textDark,
    lineHeight: 20,
  },
  loadingText: {
    fontSize: 14,
    color: colors.gray[500],
    textAlign: 'center',
    fontStyle: 'italic',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.gray[600],
    marginBottom: 4,
  },
  emptySubtext: {
    fontSize: 14,
    color: colors.gray[500],
  },
});

