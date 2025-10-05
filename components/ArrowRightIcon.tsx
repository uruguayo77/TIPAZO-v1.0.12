import React from 'react';
import Svg, { Path, Defs, ClipPath, Rect, G } from 'react-native-svg';

interface ArrowRightIconProps {
  size?: number;
  color?: string;
}

export const ArrowRightIcon: React.FC<ArrowRightIconProps> = ({ 
  size = 24, 
  color = '#fff' 
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <G clipPath="url(#clip0_4418_3350)">
        <Path 
          d="M7.70015 3.06931C4.95015 1.61931 1.96015 4.54931 3.35015 7.32931L4.97015 10.5693C5.42015 11.4693 5.42015 12.5293 4.97015 13.4293L3.35015 16.6693C1.96015 19.4493 4.95015 22.3693 7.70015 20.9293L19.2901 14.8293C21.5701 13.6293 21.5701 10.3693 19.2901 9.16931L12.3201 5.49931" 
          stroke={color} 
          strokeWidth="1.5" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
        />
      </G>
      <Defs>
        <ClipPath id="clip0_4418_3350">
          <Rect width="24" height="24" fill="white"/>
        </ClipPath>
      </Defs>
    </Svg>
  );
};


