import React, { useEffect, useRef } from 'react';
import { View, Animated } from 'react-native';

interface TransferIconProps {
  size?: number;
  color?: string;
}

export const TransferIcon: React.FC<TransferIconProps> = ({ 
  size = 24, 
  color = '#69C5F8' 
}) => {
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const spinAnimation = Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      })
    );

    spinAnimation.start();

    return () => {
      spinAnimation.stop();
    };
  }, []);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const circleSize = size * 0.8;
  const strokeWidth = size * 0.1;

  return (
    <View style={{ 
      width: size, 
      height: size, 
      justifyContent: 'center', 
      alignItems: 'center' 
    }}>
      <Animated.View
        style={{
          width: circleSize,
          height: circleSize,
          borderRadius: circleSize / 2,
          borderWidth: strokeWidth,
          borderColor: 'transparent',
          borderTopColor: color,
          transform: [{ rotate: spin }],
        }}
      />
    </View>
  );
};
