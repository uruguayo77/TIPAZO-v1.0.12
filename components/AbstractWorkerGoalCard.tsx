import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '@/constants/colors';
import { GoalIcon } from '@/components/GoalIcon';
import { CheckCircle2 } from 'lucide-react-native';

interface AbstractWorkerGoalCardProps {
  goalDescription: string;
  goalAmount: number;
  goalAccumulated: number;
  isGoalReached: boolean;
}

export const AbstractWorkerGoalCard: React.FC<AbstractWorkerGoalCardProps> = ({
  goalDescription,
  goalAmount,
  goalAccumulated,
  isGoalReached,
}) => {
  // Add 30% visually for testing design
  const visualAccumulated = goalAccumulated + (goalAmount * 0.3);
  const progressPercentage = goalAmount > 0 ? Math.min((visualAccumulated / goalAmount) * 100, 100) : 0;

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <LinearGradient
          colors={['#FFFFFF', '#F8F9FA', '#E8F4FD']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradientContainer}
        >
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.goalIcon}>
              <GoalIcon size={20} color={colors.primary} />
            </View>
            <Text style={styles.sectionTitle}>Mi Meta Personal</Text>
            
            {isGoalReached && (
              <View style={styles.goalReachedBadge}>
                <CheckCircle2 size={14} color={colors.success} />
                <Text style={styles.goalReachedText}>Meta alcanzada</Text>
              </View>
            )}
          </View>

          {/* Content */}
          <View style={styles.content}>
            {goalDescription ? (
              <>
                <Text style={styles.goalDescription}>{goalDescription}</Text>
                
                <View style={styles.goalProgressContainer}>
                  <Text style={styles.goalProgressText}>
                    Acumulado: ${visualAccumulated.toFixed(2)} de ${goalAmount.toFixed(2)}
                  </Text>
                  
                  <View style={styles.progressBarContainer}>
                    <View 
                      style={[
                        styles.progressBar,
                        { width: `${progressPercentage}%` }
                      ]} 
                    />
                  </View>
                  
                  <Text style={styles.progressPercentage}>
                    {progressPercentage.toFixed(1)}%
                  </Text>
                </View>
              </>
            ) : (
              <Text style={styles.noGoalText}>
                No has configurado una meta personal. Edita tu perfil para agregar una meta y mostrarla a tus clientes.
              </Text>
            )}
          </View>
        </LinearGradient>
      </View>
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
  card: {
    borderRadius: 25,
    overflow: 'hidden',
    // Abstract shadow
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
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  goalIcon: {
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
  goalReachedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(46, 204, 113, 0.15)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 8,
  },
  goalReachedText: {
    fontSize: 12,
    color: colors.success,
    marginLeft: 4,
    fontWeight: '600',
  },
  content: {
    marginBottom: 16,
  },
  goalDescription: {
    fontSize: 16,
    color: colors.text,
    marginBottom: 20,
    lineHeight: 24,
    backgroundColor: 'rgba(105, 197, 248, 0.1)',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(105, 197, 248, 0.2)',
    // Make container fit content
    alignSelf: 'stretch',
  },
  goalProgressContainer: {
    marginBottom: 8,
  },
  goalProgressText: {
    fontSize: 16,
    color: colors.textDark,
    marginBottom: 10,
    fontWeight: '700',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  progressBarContainer: {
    height: 12,
    backgroundColor: 'rgba(105, 197, 248, 0.2)',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 8,
    borderWidth: 1,
    borderColor: 'rgba(105, 197, 248, 0.3)',
    shadowColor: colors.gray[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  progressBar: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 8,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  progressPercentage: {
    fontSize: 14,
    color: '#69C5F8',
    textAlign: 'right',
    fontWeight: '700',
    backgroundColor: 'rgba(105, 197, 248, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: 'flex-end',
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
  },
  noGoalText: {
    fontSize: 14,
    color: colors.gray[500],
    textAlign: 'center',
    lineHeight: 20,
    fontStyle: 'italic',
  },
});

