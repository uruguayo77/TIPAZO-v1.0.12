import React from 'react';
import Svg, { G, Path, Defs, ClipPath, Rect } from 'react-native-svg';

interface ProfileIconProps {
  size?: number;
  color?: string;
}

export const ProfileIcon: React.FC<ProfileIconProps> = ({ size = 24, color = '#fff' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <G clipPath="url(#clip0_3111_32653)">
      <Path 
        d="M15.68 3.96C16.16 4.67 16.44 5.52 16.44 6.44C16.43 8.84 14.54 10.79 12.16 10.87C12.06 10.86 11.94 10.86 11.83 10.87C9.61999 10.8 7.82999 9.11 7.58999 6.95C7.29999 4.38 9.40999 2 11.99 2" 
        stroke={color} 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <Path 
        d="M6.98999 14.56C4.56999 16.18 4.56999 18.82 6.98999 20.43C9.73999 22.27 14.25 22.27 17 20.43C19.42 18.81 19.42 16.17 17 14.56C14.27 12.73 9.75999 12.73 6.98999 14.56Z" 
        stroke={color} 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </G>
    <Defs>
      <ClipPath id="clip0_3111_32653">
        <Rect width="24" height="24" fill="white"/>
      </ClipPath>
    </Defs>
  </Svg>
);







