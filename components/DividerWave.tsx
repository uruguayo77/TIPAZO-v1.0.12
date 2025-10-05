import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Path, Defs, Filter, FeDropShadow } from 'react-native-svg';

interface DividerWaveProps {
  width?: number;
  height?: number;
  color?: string;
}

export const DividerWave: React.FC<DividerWaveProps> = ({
  width = 100,
  height = 8,
  color = '#FFFFFF'
}) => {
  return (
    <View style={styles.container}>
      <Svg width={width} height={height} viewBox="0 0 750 180">
        <Defs>
          <Filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
            <FeDropShadow
              dx="0"
              dy="3"
              stdDeviation="4"
              floodColor="#000000"
              floodOpacity="0.3"
            />
          </Filter>
        </Defs>
        <Path
          d="M714.7 40H146.5a140 140 0 0 0-125.2 77.4 15.6 15.6 0 0 0 14 22.6h568.2c53 0 101.5-30 125.2-77.4a15.6 15.6 0 0 0-14-22.6Z"
          fill={color}
          filter="url(#shadow)"
        />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    // Additional shadow for the container
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
});
