import React from 'react';
import { View } from 'react-native';
import Svg, { Path, G, ClipPath, Defs, Rect } from 'react-native-svg';

interface ScrollDownIconProps {
  size?: number;
  color?: string;
}

export const ScrollDownIcon: React.FC<ScrollDownIconProps> = ({ 
  size = 24, 
  color = '#69C5F8' 
}) => {
  return (
    <View style={{ width: size, height: size }}>
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <G clipPath="url(#clip0_4418_3345)">
          <Path 
            d="M3.0698 7.70015C1.6198 4.95015 4.5498 1.96015 7.3298 3.35015L10.5698 4.97015C11.4698 5.42015 12.5298 5.42015 13.4298 4.97015L16.6698 3.35015C19.4498 1.96015 22.3698 4.95015 20.9298 7.70015L14.8298 19.2901C13.6298 21.5701 10.3698 21.5701 9.1698 19.2901L5.4998 12.3201" 
            stroke={color} 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
          />
        </G>
        <Defs>
          <ClipPath id="clip0_4418_3345">
            <Rect width="24" height="24" fill="white"/>
          </ClipPath>
        </Defs>
      </Svg>
    </View>
  );
};

