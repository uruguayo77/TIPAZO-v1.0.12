import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { colors } from '@/constants/colors';
import { Card } from '@/components/Card';
import { Star, DollarSign, TrendingUp, Users } from 'lucide-react-native';
import { supabase } from '@/lib/supabase';

interface ProfileStatsProps {
  userId: string;
}

interface StatsData {
  averageRating: number;
  totalTips: number;
  averageTipAmount: number;
  totalTipAmount: number;
}

export const ProfileStats: React.FC<ProfileStatsProps> = ({ userId }) => {
  const [stats, setStats] = useState<StatsData>({
    averageRating: 0,
    totalTips: 0,
    averageTipAmount: 0,
    totalTipAmount: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, [userId]);

  const fetchStats = async () => {
    try {
      setLoading(true);

      // Use our new get_user_stats function for better performance
      const { data: statsData, error: statsError } = await supabase
        .rpc('get_user_stats', { user_uuid: userId });

      if (statsError) {
        console.error('Error fetching stats via RPC:', statsError);
        // Fallback to manual queries if RPC fails
        await fetchStatsManual();
        return;
      }

      if (statsData && statsData.length > 0) {
        const stats = statsData[0];
        setStats({
          averageRating: parseFloat(stats.average_rating) || 0,
          totalTips: stats.total_tips || 0,
          averageTipAmount: parseFloat(stats.average_tip_amount) || 0,
          totalTipAmount: parseFloat(stats.total_tip_amount) || 0,
        });
      } else {
        // No data found
        setStats({
          averageRating: 0,
          totalTips: 0,
          averageTipAmount: 0,
          totalTipAmount: 0,
        });
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
      // Fallback to manual queries
      await fetchStatsManual();
    } finally {
      setLoading(false);
    }
  };

  // Fallback function for manual stat calculation
  const fetchStatsManual = async () => {
    try {
      // Fetch tips statistics
      const { data: tipsData, error: tipsError } = await supabase
        .from('tipazo_tips')
        .select('amount, rating')
        .eq('receiver_id', userId)
        .eq('status', 'completed');

      if (tipsError) {
        console.error('Error fetching tips:', tipsError);
        return;
      }

      // Fetch comments for additional ratings
      const { data: commentsData, error: commentsError } = await supabase
        .from('tipazo_comments')
        .select('rating')
        .eq('worker_id', userId)
        .not('rating', 'is', null);

      if (commentsError) {
        console.error('Error fetching comments:', commentsError);
        return;
      }

      // Calculate statistics
      const tips = tipsData || [];
      const comments = commentsData || [];
      
      const totalTips = tips.length;
      const totalTipAmount = tips.reduce((sum, tip) => sum + (tip.amount || 0), 0);
      const averageTipAmount = totalTips > 0 ? totalTipAmount / totalTips : 0;
      
      // Collect all ratings
      const allRatings = [
        ...tips.filter(tip => tip.rating).map(tip => tip.rating),
        ...comments.map(comment => comment.rating)
      ];
      
      const averageRating = allRatings.length > 0 
        ? allRatings.reduce((sum, rating) => sum + rating, 0) / allRatings.length 
        : 0;

      setStats({
        averageRating,
        totalTips,
        averageTipAmount,
        totalTipAmount,
      });
    } catch (error) {
      console.error('Error in manual stats fetch:', error);
    }
  };

  const StatCard = ({ icon, title, value, color = colors.primary, width }: {
    icon: React.ReactNode;
    title: string;
    value: string;
    color?: string;
    width?: number;
  }) => (
    <Card style={[styles.statCard, width && { width }]}>
      <View style={[styles.statIconContainer, { backgroundColor: `${color}15` }]}>
        {React.cloneElement(icon as React.ReactElement, { size: 18, color })} {/* Уменьшен с 20 до 18 */}
      </View>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statTitle}>{title}</Text>
    </Card>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <View style={styles.statsGrid}>
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} style={[styles.statCard, styles.loadingCard]}>
              <View style={styles.loadingContent} />
            </Card>
          ))}
        </View>
      </View>
    );
  }

  const screenWidth = Dimensions.get('window').width;
  const pageWidth = screenWidth; // Полная ширина экрана для правильного paging
  const cardWidth = screenWidth * 0.82; // Ширина карточки (уменьшена на 10%)
  const cardOffset = (screenWidth - cardWidth) / 2; // Отступ для центрирования

  const statsData = [
    {
      icon: <Star />,
      title: "Calificación promedio",
      value: stats.averageRating > 0 ? stats.averageRating.toFixed(1) : "Sin calificaciones",
      color: "#FFD700"
    },
    {
      icon: <Users />,
      title: "Total de propinas",
      value: stats.totalTips.toString(),
      color: colors.primary
    },
    {
      icon: <TrendingUp />,
      title: "Propina promedio",
      value: stats.averageTipAmount > 0 ? `$${stats.averageTipAmount.toFixed(2)}` : "$0.00",
      color: "#8B5CF6"
    },
    {
      icon: <DollarSign />,
      title: "Total recibido",
      value: `$${stats.totalTipAmount.toFixed(2)}`,
      color: "#10B981"
    }
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Estadísticas</Text>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        style={styles.statsScrollView}
        contentContainerStyle={[styles.statsScrollContent, { paddingHorizontal: cardOffset }]}
        decelerationRate="fast"
        snapToInterval={cardWidth}
        snapToAlignment="start"
        bounces={false}
        scrollEventThrottle={16}
        contentInsetAdjustmentBehavior="never"
      >
        {statsData.map((stat, index) => (
          <View key={index} style={[styles.statPage, { width: cardWidth, marginHorizontal: 0 }]}>
            <StatCard
              icon={stat.icon}
              title={stat.title}
              value={stat.value}
              color={stat.color}
              width={cardWidth}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.white,
    marginBottom: 16,
    textAlign: 'center',
  },
  statsScrollView: {
    marginHorizontal: 0, // Убираем отступы для правильного paging
  },
  statsScrollContent: {
    paddingHorizontal: 0,
  },
  statPage: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  statCardContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  statCard: {
    padding: 14, // Уменьшен с 16 до 14 (на 12.5%)
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 16,
    shadowColor: colors.gray[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  statIconContainer: {
    width: 36, // Уменьшен с 40 до 36 (на 10%)
    height: 36, // Уменьшен с 40 до 36 (на 10%)
    borderRadius: 18, // Соответственно уменьшен радиус
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 4,
    textAlign: 'center',
  },
  statTitle: {
    fontSize: 12,
    color: colors.gray[600],
    textAlign: 'center',
    lineHeight: 16,
  },
  loadingCard: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
  },
  loadingContent: {
    width: '80%',
    height: 60,
    backgroundColor: colors.gray[200],
    borderRadius: 8,
  },
});
