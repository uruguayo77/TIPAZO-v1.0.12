import React from 'react';
import Svg, { G, Path, Defs, ClipPath, Rect } from 'react-native-svg';

interface TikTokIconProps {
  size?: number;
  color?: string;
}

export const TikTokIcon: React.FC<TikTokIconProps> = ({ 
  size = 24, 
  color = '#fff' 
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <G clipPath="url(#clip0_4418_3156)">
        <Path 
          d="M4.11021 16.98C4.02021 17.3 3.97021 17.65 3.97021 18C3.97021 20.21 5.76021 22 7.97021 22C10.1802 22 11.9702 20.21 11.9702 18C11.9702 15.79 10.1802 14 7.97021 14C7.62021 14 7.27021 14.05 6.95021 14.13" 
          stroke={color} 
          strokeWidth="1.5" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
        />
        <Path 
          d="M11.9702 18V4" 
          stroke={color} 
          strokeWidth="1.5" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
        />
        <Path 
          d="M14.61 2.11049L19.03 3.58049C20.1 3.94049 20.98 5.15049 20.98 6.28049V7.45049C20.98 8.98049 19.8 9.83049 18.35 9.35049L13.93 7.88049C12.86 7.52049 11.98 6.31049 11.98 5.18049V4.00049C11.97 2.48049 13.16 1.62049 14.61 2.11049Z" 
          stroke={color} 
          strokeWidth="1.5" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
        />
      </G>
      <Defs>
        <ClipPath id="clip0_4418_3156">
          <Rect width="24" height="24" fill="white"/>
        </ClipPath>
      </Defs>
    </Svg>
  );
};