import React from 'react';
import Svg, { G, Path, Defs, ClipPath, Rect } from 'react-native-svg';

interface QRScanIconProps {
  size?: number;
  color?: string;
}

export const QRScanIcon: React.FC<QRScanIconProps> = ({ size = 24, color = '#fff' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <G clipPath="url(#clip0_4418_3439)">
      <Path 
        d="M2 9V6.5C2 4.01 4.01 2 6.5 2H9" 
        stroke={color} 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <Path 
        d="M15 2H17.5C19.99 2 22 4.01 22 6.5V9" 
        stroke={color} 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <Path 
        d="M22 16V17.5C22 19.99 19.99 22 17.5 22H16" 
        stroke={color} 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <Path 
        d="M9 22H6.5C4.01 22 2 19.99 2 17.5V15" 
        stroke={color} 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <Path 
        d="M10.5 7V9C10.5 10 10 10.5 9 10.5H7C6 10.5 5.5 10 5.5 9V7C5.5 6 6 5.5 7 5.5H9C10 5.5 10.5 6 10.5 7Z" 
        stroke={color} 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <Path 
        d="M13.5 9V7C13.5 6 14 5.5 15 5.5H17C18 5.5 18.5 6 18.5 7V9C18.5 10 18 10.5 17 10.5" 
        stroke={color} 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <Path 
        d="M7 13.5H9C10 13.5 10.5 14 10.5 15V17C10.5 18 10 18.5 9 18.5H7C6 18.5 5.5 18 5.5 17" 
        stroke={color} 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <Path 
        d="M18.5 15V17C18.5 18 18 18.5 17 18.5H15C14 18.5 13.5 18 13.5 17V15C13.5 14 14 13.5 15 13.5H17C18 13.5 18.5 14 18.5 15Z" 
        stroke={color} 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </G>
    <Defs>
      <ClipPath id="clip0_4418_3439">
        <Rect width="24" height="24" fill="white"/>
      </ClipPath>
    </Defs>
  </Svg>
);







