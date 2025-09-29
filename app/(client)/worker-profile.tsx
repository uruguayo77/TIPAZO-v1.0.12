import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, SafeAreaView, StatusBar, useWindowDimensions } from 'react-native';
import { router, useLocalSearchParams, useRootNavigationState } from 'expo-router';
import { colors } from '@/constants/colors';
import { ArrowLeft, Star, MessageCircle, Target, CheckCircle } from 'lucide-react-native';
import { Button } from '@/components/Button';
import { useTipsStore } from '@/store/tips-store';
import { Comment, Worker } from '@/types';
import { Card } from '@/components/Card';

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
  
  // Get worker ID from params
  const workerId = params.id;
  
  // Fetch worker data and comments
  useEffect(() => {
    const fetchData = async () => {
      if (!workerId) return;
      
      try {
        // TODO: Replace with real API call to fetch worker data
        // const workerData = await api.getWorker(workerId);
        // For now, use a placeholder worker with data from params if available
        const placeholderWorker: Worker = {
          id: workerId,
          name: params.name || 'Trabajador',
          email: '',
          userType: 'worker',
          createdAt: new Date().toISOString(),
          totalEarnings: 0,
          qrCode: '',
          photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          biography: '',
          occupation: params.occupation || 'Profesional',
          goalDescription: 'Estoy ahorrando para un objetivo personal',
          goalAmount: 500,
          goalAccumulated: 0,
        };
        setWorker(placeholderWorker);
        
        // Fetch comments
        const workerComments = await getWorkerComments(workerId);
        setComments(workerComments);
      } catch (error) {
        console.error('Error fetching data:', error);
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
  
  const handleSendTip = () => {
    if (rootNavigationState?.key && worker) {
      router.push({
        pathname: '/(client)/tip-amount',
        params: { 
          workerId: worker.id, 
          name: worker.name,
          occupation: worker.occupation || ''
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
  
  if (!worker) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor={colors.background} barStyle="dark-content" />
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Cargando perfil...</Text>
        </View>
      </SafeAreaView>
    );
  }
  
  return (
    <>
      <StatusBar backgroundColor={colors.background} barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <ArrowLeft size={24} color={colors.textLight} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, isSmallDevice && styles.headerTitleSmall]}>Perfil</Text>
          <View style={styles.placeholder} />
        </View>
        
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.topSpacer} />
          
          <View style={styles.profileHeader}>
            <Image 
              source={{ uri: worker.photoUrl }} 
              style={styles.profileImage} 
            />
            <Text style={styles.name}>{worker.name}</Text>
            <Text style={styles.occupation}>{worker.occupation}</Text>
            
            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Star size={20} color={colors.primary} />
                <Text style={styles.statValue}>4.9</Text>
                <Text style={styles.statLabel}>Rating</Text>
              </View>
              
              <View style={styles.statDivider} />
              
              <View style={styles.statItem}>
                <MessageCircle size={20} color={colors.primary} />
                <Text style={styles.statValue}>{comments.length}</Text>
                <Text style={styles.statLabel}>Comentarios</Text>
              </View>
            </View>
          </View>
          
          <View style={styles.sectionContainer}>
            <Card style={styles.goalCard}>
              <View style={styles.sectionTitleContainer}>
                <Target size={20} color={colors.primary} />
                <Text style={styles.sectionTitle}>Meta Personal</Text>
                
                {isGoalReached && (
                  <View style={styles.goalReachedBadge}>
                    <CheckCircle size={14} color={colors.success} />
                    <Text style={styles.goalReachedText}>Meta alcanzada</Text>
                  </View>
                )}
              </View>
              
              <Text style={styles.goalDescription}>{worker.goalDescription}</Text>
              
              <View style={styles.goalProgressContainer}>
                <Text style={styles.goalProgressText}>
                  Acumulado: ${(worker.goalAccumulated || 0).toFixed(2)} de ${worker.goalAmount.toFixed(2)}
                </Text>
                
                <View style={styles.progressBarContainer}>
                  <View 
                    style={[
                      styles.progressBar, 
                      { 
                        width: `${progressPercentage}%`,
                        backgroundColor: getProgressBarColor()
                      }
                    ]} 
                  />
                </View>
                
                <Text style={styles.progressPercentage}>
                  {progressPercentage.toFixed(0)}%
                </Text>
              </View>
            </Card>
          </View>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Comentarios</Text>
            {isLoading ? (
              <Text style={styles.loadingText}>Cargando comentarios...</Text>
            ) : comments.length > 0 ? (
              comments.map((comment) => (
                <View key={comment.id} style={styles.commentItem}>
                  <View style={styles.commentHeader}>
                    <Text style={styles.commentAuthor}>{comment.clientName}</Text>
                    <Text style={styles.commentDate}>{comment.date}</Text>
                  </View>
                  <Text style={styles.commentContent}>{comment.content}</Text>
                </View>
              ))
            ) : (
              <Text style={styles.noCommentsText}>No hay comentarios aún.</Text>
            )}
          </View>
        </ScrollView>
        
        <View style={styles.footer}>
          <Button
            title="Enviar Propina"
            onPress={handleSendTip}
            style={styles.tipButton}
          />
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: '4%',
    paddingTop: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textLight,
  },
  headerTitleSmall: {
    fontSize: 16,
  },
  placeholder: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  topSpacer: {
    height: 20,
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
    // Card styling is handled by the Card component
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginLeft: 8,
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
    color: colors.text,
    marginBottom: 16,
    lineHeight: 24,
  },
  goalProgressContainer: {
    marginBottom: 8,
  },
  goalProgressText: {
    fontSize: 14,
    color: colors.text,
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
    color: colors.text,
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
  noCommentsText: {
    fontSize: 16,
    color: colors.textLight,
    textAlign: 'center',
    marginVertical: 16,
  },
  commentItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  commentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  commentAuthor: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
  commentDate: {
    fontSize: 14,
    color: '#666666',
  },
  commentContent: {
    fontSize: 16,
    color: '#000000',
    lineHeight: 22,
  },
  footer: {
    padding: '4%',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.2)',
  },
  tipButton: {
    backgroundColor: colors.primary,
  },
});