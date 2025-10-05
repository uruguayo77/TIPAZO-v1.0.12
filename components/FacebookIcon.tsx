import React from 'react';
import Svg, { G, Path, Defs, ClipPath, Rect } from 'react-native-svg';

interface FacebookIconProps {
  size?: number;
  color?: string;
}

export const FacebookIcon: React.FC<FacebookIconProps> = ({ 
  size = 24, 
  color = '#fff' 
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <G clipPath="url(#clip0_4418_4124)">
        <Path 
          d="M14 9.29999V12.25H16.63C16.82 12.25 16.96 12.42 16.92 12.61L16.54 14.51C16.51 14.65 16.39 14.75 16.25 14.75H14V22H11V14.75H9.29999C9.12999 14.75 9 14.62 9 14.45V12.55C9 12.38 9.12999 12.25 9.29999 12.25H11V9C11 7.34 12.34 6 14 6H16.7C16.87 6 17 6.12999 17 6.29999V8.70001C17 8.87001 16.87 9 16.7 9H14.3C14.13 9 14 9.12999 14 9.29999Z" 
          stroke={color} 
          strokeWidth="1.5" 
          strokeMiterlimit="10" 
          strokeLinecap="round" 
        />
        <Path 
          d="M2 12.83V15C2 20 4 22 9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9" 
          stroke={color} 
          strokeWidth="1.5" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
        />
      </G>
      <Defs>
        <ClipPath id="clip0_4418_4124">
          <Rect width="24" height="24" fill="white"/>
        </ClipPath>
      </Defs>
    </Svg>
  );
};