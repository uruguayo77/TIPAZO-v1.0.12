import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Path, Animate } from 'react-native-svg';

interface CustomLoaderProps {
  size?: number;
  color?: string;
}

export const CustomLoader: React.FC<CustomLoaderProps> = ({ 
  size = 40, 
  color = '#CDFF07' 
}) => {
  return (
    <View style={styles.container}>
      <Svg width={size} height={size / 2} viewBox="0 0 300 150">
        <Path
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="300 385"
          strokeDashoffset="0"
          d="M275 75c0 31-27 50-50 50-58 0-92-100-150-100-28 0-50 22-50 50s23 50 50 50c58 0 92-100 150-100 24 0 50 19 50 50Z"
        >
          <Animate
            attributeName="stroke-dashoffset"
            calcMode="spline"
            dur="3"
            values="685;-685"
            keySplines="0 0 1 1"
            repeatCount="indefinite"
          />
        </Path>
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});


