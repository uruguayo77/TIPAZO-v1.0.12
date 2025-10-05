import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, SafeAreaView, StatusBar, useWindowDimensions, Linking } from 'react-native';
import { router, useLocalSearchParams, useRootNavigationState } from 'expo-router';
import { colors } from '@/constants/colors';
import { ArrowLeft, Star, MessageCircle, CheckCircle } from 'lucide-react-native';
import { GoalIcon } from '@/components/GoalIcon';
import { Button } from '@/components/Button';
import { useTipsStore } from '@/store/tips-store';
import { Comment, Worker } from '@/types';
import { Card } from '@/components/Card';
import { supabase } from '@/lib/supabase';
import { Avatar } from '@/components/Avatar';
import { CustomBackIcon } from '@/components/CustomBackIcon';
import { InstagramIcon } from '@/components/InstagramIcon';
import { TelegramIcon } from '@/components/TelegramIcon';
import { TikTokIcon } from '@/components/TikTokIcon';
import { FacebookIcon } from '@/components/FacebookIcon';
import { LinkedInIcon } from '@/components/LinkedInIcon';
import { AbstractWorkerProfileCard } from '@/components/AbstractWorkerProfileCard';
import { AbstractWorkerGoalCard } from '@/components/AbstractWorkerGoalCard';
import { AbstractWorkerCommentsSection } from '@/components/AbstractWorkerCommentsSection';
import { AbstractWorkerActionButton } from '@/components/AbstractWorkerActionButton';

export default function WorkerProfileScreen() {
  const params = useLocalSearchParams<{ id: string, name?: string, occupation?: string }>();
  const rootNavigationState = useRootNavigationState();
  const { width } = useWindowDimensions();
  const isSmallDevice = width < 375;
  
  // Get worker comments and tips from store
  const { getWorkerComments, getUserBalance } = useTipsStore();
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [worker, setWorker] = useState<Worker | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [averageRating, setAverageRating] = useState<number | null>(null);
  const [ratingsCount, setRatingsCount] = useState<number>(0);
  
  // Get worker ID from params
  const workerId = params.id;

  // Function to update goal with received tips
  const updateGoalWithTips = async (userId: string) => {
    try {
      // Get total tips received
      const { data: tipsData, error: tipsError } = await supabase
        .from('tipazo_tips')
        .select('amount')
        .eq('receiver_id', userId)
        .eq('status', 'completed');

      if (tipsError) {
        console.error('Error fetching tips for goal:', tipsError);
        return;
      }

      const totalTips = tipsData?.reduce((sum, tip) => sum + tip.amount, 0) || 0;
      
      // Update goal accumulated amount
      const { error: goalError } = await supabase
        .from('tipazo_goals')
        .update({ 
          goal_accumulated: totalTips,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', userId);

      if (goalError) {
        console.error('Error updating goal:', goalError);
      } else {
        console.log('Goal updated with tips:', totalTips);
        // Update local worker state
        if (worker) {
          setWorker({
            ...worker,
            goalAccumulated: totalTips
          });
        }
      }
    } catch (error) {
      console.error('Error updating goal with tips:', error);
    }
  };

  // Function to fetch comments and ratings
  const fetchCommentsAndRatings = async (userId: string) => {
    try {
      // Fetch comments from tips table
      const { data: commentsData, error: commentsError } = await supabase
        .from('tipazo_tips')
        .select('*')
        .eq('receiver_id', userId)
        .not('comment', 'is', null)
        .order('created_at', { ascending: false });

      if (commentsError) {
        console.error('Error fetching comments:', commentsError);
      } else {
        console.log('Comments loaded:', commentsData);
        // Process tips as comments
        const processedComments = (commentsData || []).map(tip => ({
          id: tip.id,
          worker_id: tip.receiver_id,
          client_id: tip.sender_id,
          client_name: tip.sender_name,
          content: tip.comment,
          rating: tip.rating,
          tip_amount: tip.amount,
          created_at: tip.created_at
        }));
        setComments(processedComments);
      }

      // Fetch ratings from tips
      const { data: ratingsData, error: ratingsError } = await supabase
        .from('tipazo_tips')
        .select('rating')
        .eq('receiver_id', userId)
        .not('rating', 'is', null);

      if (ratingsError) {
        console.error('Error fetching ratings:', ratingsError);
      } else {
        console.log('Ratings loaded:', ratingsData);
        const ratings = ratingsData?.map(tip => tip.rating).filter(rating => rating !== null) || [];
        setRatingsCount(ratings.length);
        
        if (ratings.length > 0) {
          const avgRating = ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length;
          console.log('Setting average rating from tips:', avgRating);
          setAverageRating(Number(avgRating.toFixed(1)));
        } else {
          console.log('No ratings found in tips, setting to null');
          setAverageRating(null);
        }
      }

      // Also fetch ratings from comments (as backup) - exclude self-ratings
      const { data: commentRatingsData, error: commentRatingsError } = await supabase
        .from('tipazo_comments')
        .select('rating, client_id')
        .eq('worker_id', userId)
        .not('rating', 'is', null)
        .neq('client_id', userId); // Exclude self-ratings

      if (!commentRatingsError && commentRatingsData) {
        const commentRatings = commentRatingsData.map(comment => comment.rating).filter(rating => rating !== null);
        console.log('Comment ratings loaded (excluding self-ratings):', commentRatings);
        
        // Combine ratings from tips and comments
        const allRatings = [
          ...(ratingsData?.map(tip => tip.rating).filter(rating => rating !== null) || []),
          ...commentRatings
        ];
        
        if (allRatings.length > 0) {
          setRatingsCount(allRatings.length);
          const avgRating = allRatings.reduce((sum, rating) => sum + rating, 0) / allRatings.length;
          console.log('Setting final average rating from all sources:', avgRating, 'from', allRatings.length, 'ratings');
          setAverageRating(Number(avgRating.toFixed(1)));
        } else {
          console.log('No ratings found from any source, keeping null');
        }
      }
    } catch (error) {
      console.error('Error fetching comments and ratings:', error);
    }
  };

  // Debug log for rating changes
  useEffect(() => {
    console.log('averageRating changed to:', averageRating);
    console.log('ratingsCount changed to:', ratingsCount);
  }, [averageRating, ratingsCount]);
  
  // Fetch worker data and comments
  useEffect(() => {
    const fetchData = async () => {
      if (!workerId) {
        console.log('No worker ID provided');
        setError('ID de trabajador no proporcionado');
        setIsLoading(false);
        return;
      }
      
      // Reset state first
      setAverageRating(null);
      setRatingsCount(0);
      setComments([]);
      console.log('Reset rating state for fresh fetch');
      
      try {
        console.log('Fetching worker data for ID:', workerId);
        
        // First, check if user exists
        const { data: userData, error: userError } = await supabase
          .from('tipazo_users')
          .select('*')
          .eq('id', workerId)
          .single();

        if (userError) {
          console.error('Error fetching user data:', userError);
          setError('Usuario no encontrado');
          throw new Error('Usuario no encontrado');
        }

        if (!userData) {
          setError('Datos del trabajador no encontrados');
          throw new Error('Datos del trabajador no encontrados');
        }

        // Then fetch worker details separately (may not exist)
        const { data: workerDetails } = await supabase
          .from('tipazo_workers')
          .select('*')
          .eq('user_id', workerId)
          .single();
        
        // Fetch goal data
        const { data: goalData } = await supabase
          .from('tipazo_goals')
          .select('*')
          .eq('user_id', workerId)
          .single();

        // Transform to Worker interface
        const workerData: Worker = {
          id: userData.id,
          name: userData.name,
          email: userData.email,
          userType: 'worker',
          createdAt: userData.created_at,
          totalEarnings: workerDetails?.total_earnings || 0,
          qrCode: workerDetails?.qr_code || '',
          profilePicture: userData.profile_picture,
          biography: userData.biography || '',
          occupation: userData.occupation || params.occupation || 'Profesional',
          goalDescription: goalData?.goal_description || null,
          goalAmount: goalData?.goal_amount || null,
          goalAccumulated: goalData?.goal_accumulated || null,
          instagram: userData.instagram,
          telegram: userData.telegram,
          tiktok: userData.tiktok,
          facebook: userData.facebook,
          linkedin: userData.linkedin,
        };

        console.log('Worker data loaded:', workerData);
        setWorker(workerData);
        
        // Fetch comments and ratings from database
        console.log('About to fetch comments and ratings for worker:', workerId);
        await fetchCommentsAndRatings(workerId);
        
        // Update goal with received tips
        await updateGoalWithTips(workerId);
      } catch (error) {
        console.error('Error fetching worker data:', error);
        
        // Fallback to params data if Supabase fails
        const fallbackWorker: Worker = {
          id: workerId,
          name: params.name || 'Trabajador',
          email: '',
          userType: 'worker',
          createdAt: new Date().toISOString(),
          totalEarnings: 0,
          qrCode: '',
          biography: '',
          occupation: params.occupation || 'Profesional',
          goalDescription: 'Meta personal',
          goalAmount: 0,
          goalAccumulated: 0,
        };
        setWorker(fallbackWorker);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [workerId, getWorkerComments, getUserBalance, params.name, params.occupation]);
  
  const handleBack = () => {
    if (rootNavigationState?.key) {
      router.back();
    }
  };

  // Function to handle social media links
  const handleSocialPress = (platform: string, username: string) => {
    let url = '';
    switch (platform) {
      case 'instagram':
        url = `https://instagram.com/${username.replace(/^@+/, '')}`;
        break;
      case 'telegram':
        url = `https://t.me/${username.replace(/^@+/, '')}`;
        break;
      case 'tiktok':
        url = `https://www.tiktok.com/@${username.replace(/^@+/, '')}`;
        break;
      case 'facebook':
        url = `https://facebook.com/${username.replace(/^@+/, '')}`;
        break;
      case 'linkedin':
        url = `https://www.linkedin.com/in/${username.replace(/^@+/, '')}`;
        break;
    }
    if (url) {
      Linking.openURL(url);
    }
  };
  
  const handleSendTip = () => {
    if (rootNavigationState?.key && worker) {
      router.push({
        pathname: '/(client)/tip-amount',
        params: { 
          workerId: worker.id, 
          name: worker.name,
          occupation: worker.occupation || '',
          profilePicture: worker.profilePicture
        }
      });
    }
  };
  
  // Calculate goal progress percentage
  const calculateProgress = () => {
    if (!worker || !worker.goalAmount || worker.goalAmount === 0) return 0;
    const progress = (worker.goalAccumulated || 0) / worker.goalAmount;
    return Math.min(progress, 1);
  };
  
  const progressPercentage = calculateProgress() * 100;
  const isGoalReached = progressPercentage >= 100;
  
  // Get progress bar color based on percentage
  const getProgressBarColor = () => {
    if (progressPercentage >= 75) return colors.success;
    if (progressPercentage >= 40) return colors.warning;
    return colors.error;
  };
  
  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor={colors.background} barStyle="dark-content" />
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Cargando perfil...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error || !worker) {
    return (
      <>
        <StatusBar backgroundColor={colors.background} barStyle="dark-content" />
        <SafeAreaView style={styles.container}>
          {/* Back Button - Fixed position within content */}
          <View style={styles.backButtonContainer}>
            <TouchableOpacity style={styles.backButton} onPress={handleBack}>
              <CustomBackIcon size={32} color={colors.primary} />
            </TouchableOpacity>
          </View>
          
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>
              {error || 'No se pudo cargar el perfil del trabajador'}
            </Text>
            <Button
              title="Volver"
              onPress={handleBack}
              style={styles.errorButton}
            />
          </View>
        </SafeAreaView>
      </>
    );
  }
  
  return (
    <>
      <StatusBar backgroundColor={colors.background} barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {/* Back Button */}
          <View style={styles.backButtonContainer}>
            <TouchableOpacity style={styles.backButton} onPress={handleBack}>
              <CustomBackIcon size={32} color={colors.primary} />
            </TouchableOpacity>
          </View>
          
          <AbstractWorkerProfileCard
            worker={worker}
            averageRating={averageRating}
            ratingsCount={ratingsCount}
            commentsCount={comments.length}
            onSocialPress={handleSocialPress}
          />
          
          {/* Only show goal section if there's real goal data */}
          {worker.goalDescription && worker.goalAmount && worker.goalAmount > 0 && (
            <AbstractWorkerGoalCard
              goalDescription={worker.goalDescription}
              goalAmount={worker.goalAmount}
              goalAccumulated={worker.goalAccumulated || 0}
              isGoalReached={isGoalReached}
            />
          )}
          
          <AbstractWorkerCommentsSection
            comments={comments}
            isLoading={isLoading}
          />
          
          {/* Отступ после комментариев для прокрутки */}
          <View style={styles.commentsSpacer} />
        </ScrollView>
        
        {/* Floating Action Button */}
        <AbstractWorkerActionButton
          title="Enviar Propina"
          onPress={handleSendTip}
        />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  backButtonContainer: {
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 20,
  },
  backButton: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
    paddingBottom: 120, // Увеличенный отступ для плавающей кнопки
  },
  commentsSpacer: {
    height: 80, // Увеличенный отступ после комментариев для прокрутки
  },
  profileHeader: {
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: '4%',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.textLight,
    marginTop: 20, // Добавлен отступ между аватаркой и именем
    marginBottom: 4,
  },
  occupation: {
    fontSize: 16,
    color: colors.textLight,
    marginBottom: 24,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 16,
    marginTop: 8,
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
  sectionContainer: {
    paddingHorizontal: '4%',
    marginBottom: 16,
  },
  goalCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: colors.gray[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    marginLeft: 8,
    marginBottom: 16,
  },
  goalReachedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(46, 204, 113, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 'auto',
  },
  goalReachedText: {
    fontSize: 12,
    color: colors.success,
    marginLeft: 4,
    fontWeight: '600',
  },
  goalDescription: {
    fontSize: 16,
    color: '#000000',
    marginBottom: 16,
    lineHeight: 24,
  },
  goalProgressContainer: {
    marginBottom: 8,
  },
  goalProgressText: {
    fontSize: 14,
    color: '#000000',
    marginBottom: 8,
  },
  progressBarContainer: {
    height: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 6,
    overflow: 'hidden',
    marginBottom: 4,
  },
  progressBar: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 6,
  },
  progressPercentage: {
    fontSize: 12,
    color: '#000000',
    textAlign: 'right',
  },
  section: {
    paddingHorizontal: '4%',
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: colors.textLight,
    textAlign: 'center',
    marginVertical: 16,
  },
  noCommentsContainer: {
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 16,
  },
  noCommentsText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textLight,
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 8,
  },
  noCommentsSubtext: {
    fontSize: 14,
    color: colors.textLight + '80',
    textAlign: 'center',
    lineHeight: 20,
  },
  commentItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: colors.gray[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  firstCommentItem: {
    marginTop: 8,
  },
  commentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  commentAuthorInfo: {
    flex: 1,
  },
  commentAuthor: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.warning + '20',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.warning,
    marginLeft: 2,
  },
  commentDate: {
    fontSize: 14,
    color: '#666666',
  },
  tipAmount: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000000',
  },
  ratingStars: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  commentContentContainer: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    padding: 12,
  },
  commentContent: {
    fontSize: 16,
    color: '#000000',
    lineHeight: 22,
    fontStyle: 'italic',
  },
  footer: {
    padding: '4%',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.2)',
  },
  tipButton: {
    backgroundColor: colors.primary,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: '4%',
  },
  errorText: {
    fontSize: 16,
    color: colors.textLight,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 24,
  },
  errorButton: {
    backgroundColor: colors.primary,
    minWidth: 120,
  },
  socialNetworks: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    gap: 16,
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
  profileDivider: {
    width: '50%',
    height: 1,
    backgroundColor: colors.white,
    alignSelf: 'center',
    marginBottom: 16,
    opacity: 0.8,
  },
  occupationContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
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
  occupation: {
    fontSize: 16,
    color: colors.textLight,
    fontWeight: '600',
  },
});