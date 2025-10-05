import React from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl, Animated, Dimensions } from 'react-native';
import { colors } from '@/constants/colors';
import { TipHistoryItem } from '@/components/TipHistoryItem';
import { EmptyState } from '@/components/EmptyState';
import { Tip } from '@/types';
import { Calendar } from 'lucide-react-native';
import { ScrollDownIcon } from '@/components/ScrollDownIcon';
import { useLanguageStore } from '@/store/language-store';

interface AbstractTipsHistoryProps {
  tips: Tip[];
  onRefresh: () => void;
  refreshing: boolean;
  isSmallDevice?: boolean;
}

export const AbstractTipsHistory: React.FC<AbstractTipsHistoryProps> = ({
  tips,
  onRefresh,
  refreshing,
  isSmallDevice = false
}) => {
  const { t } = useLanguageStore();
  const scrollY = React.useRef(new Animated.Value(0)).current;
  const arrowAnimation = React.useRef(new Animated.Value(0)).current;

  const getRecentTips = (): Tip[] => {
    return [...tips]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 10);
  };

  // Arrow animation
  React.useEffect(() => {
    const createArrowAnimation = () => {
      return Animated.loop(
        Animated.sequence([
          Animated.timing(arrowAnimation, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(arrowAnimation, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      );
    };

    const animation = createArrowAnimation();
    animation.start();

    return () => {
      animation.stop();
    };
  }, [arrowAnimation]);

  return (
    <View style={styles.container}>
      <Animated.ScrollView
        style={styles.scrollableContent}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[colors.primary]}
            tintColor={colors.primary}
            progressBackgroundColor="#FFFFFF"
            progressViewOffset={20}
          />
        }
        contentContainerStyle={styles.scrollContentContainer}
        bounces={true}
        bouncesZoom={false}
        alwaysBounceVertical={true}
        decelerationRate="fast"
        scrollIndicatorInsets={{ right: 1 }}
      >
        <View style={styles.listContent}>
          {getRecentTips().length > 0 ? (
            getRecentTips().map((item, index) => (
              <React.Fragment key={item.id}>
                <Animated.View
                  style={[
                    styles.tipItemContainer,
                    {
                      opacity: scrollY.interpolate({
                        inputRange: [index * 80 - 30, index * 80, index * 80 + 30],
                        outputRange: [0, 1, 1],
                        extrapolate: 'clamp',
                      }),
                      transform: [
                        {
                          translateY: scrollY.interpolate({
                            inputRange: [index * 80 - 30, index * 80, index * 80 + 30],
                            outputRange: [30, 0, 0],
                            extrapolate: 'clamp',
                          }),
                        },
                        {
                          scale: scrollY.interpolate({
                            inputRange: [index * 80 - 30, index * 80, index * 80 + 30],
                            outputRange: [0.9, 1, 1],
                            extrapolate: 'clamp',
                          }),
                        },
                      ],
                    },
                  ]}
                >
                  <TipHistoryItem tip={item} />
                </Animated.View>
                
                {/* Arrow indicator after first item */}
                {index === 0 && getRecentTips().length > 1 && (
                  <Animated.View
                    style={[
                      styles.arrowContainer,
                      {
                        opacity: scrollY.interpolate({
                          inputRange: [0, 50],
                          outputRange: [1, 0],
                          extrapolate: 'clamp',
                        }),
                        transform: [
                          {
                            translateY: arrowAnimation.interpolate({
                              inputRange: [0, 1],
                              outputRange: [0, 8],
                            }),
                          },
                        ],
                      },
                    ]}
                  >
                    <ScrollDownIcon size={24} color={colors.primary} />
                    <Text style={styles.arrowText}>Desliza para ver más</Text>
                  </Animated.View>
                )}
              </React.Fragment>
            ))
          ) : (
            <Animated.View
              style={[
                styles.emptyStateContainer,
                {
                  opacity: scrollY.interpolate({
                    inputRange: [0, 50],
                    outputRange: [1, 0.9],
                    extrapolate: 'clamp',
                  }),
                },
              ]}
            >
              <EmptyState
                title={t('noTipsYet')}
                description={t('noTipsDescription')}
                icon={<Calendar size={48} color="#666666" />}
                textColor="#000000"
              />
            </Animated.View>
          )}
        </View>
        
        {/* Bottom spacer with gradient */}
        <View style={styles.bottomSpacer}>
          <View style={styles.bottomGradient} />
        </View>
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollableContent: {
    flex: 1,
  },
  scrollContentContainer: {
    paddingBottom: 20,
  },
  listContent: {
    paddingTop: 8,
  },
  tipItemContainer: {
    marginBottom: 12,
  },
  emptyStateContainer: {
    paddingVertical: 40,
  },
  bottomSpacer: {
    height: 110, // Space for tab navigation (70px) + extra padding (40px)
    position: 'relative',
  },
  bottomGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 20,
    backgroundColor: 'rgba(105, 197, 248, 0.1)',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  arrowContainer: {
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  arrowText: {
    fontSize: 12,
    color: colors.primary,
    marginTop: 4,
    fontWeight: '500',
  },
});
