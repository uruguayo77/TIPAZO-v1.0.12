import React from 'react';
import Svg, { Path, G, ClipPath, Rect, Defs } from 'react-native-svg';

interface TipReceivedIconProps {
  size?: number;
  color?: string;
}

export const TipReceivedIcon: React.FC<TipReceivedIconProps> = ({ size = 24, color = '#fff' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <G clipPath="url(#clip0_4418_169396)">
      <Path d="M6.19 7.06C6.45 7.02 6.72 7 7 7H17C17.26 7 17.51 7.00999 17.75 7.04999C20.33 7.34999 22 9.26 22 12V17C22 20 20 22 17 22H7.63C7.94 21.74 8.21 21.42 8.42 21.06C8.79 20.46 9 19.75 9 19C9 16.79 7.21 15 5 15C3.8 15 2.73 15.53 2 16.36V12C2 11.13 2.17 10.34 2.48 9.66998" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M17.7499 7.04997C17.5099 7.00997 17.2599 6.99998 16.9999 6.99998H6.99994C6.71994 6.99998 6.44994 7.01998 6.18994 7.05998C6.32994 6.77998 6.52994 6.52001 6.76994 6.28001L10.0199 3.02C11.3899 1.66 13.6099 1.66 14.9799 3.02L16.7299 4.78996C17.3699 5.41996 17.7099 6.21997 17.7499 7.04997Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M9 19C9 19.75 8.79 20.46 8.42 21.06C7.73 22.22 6.46 23 5 23C3.54 23 2.27 22.22 1.58 21.06C1.21 20.46 1 19.75 1 19C1 16.79 2.79 15 5 15C7.21 15 9 16.79 9 19Z" stroke={color} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M6.48977 18.9795H3.50977" stroke={color} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M5 17.5195V20.5095" stroke={color} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M22 12.5H19C17.9 12.5 17 13.4 17 14.5C17 15.6 17.9 16.5 19 16.5H22" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </G>
    <Defs>
      <ClipPath id="clip0_4418_169396">
        <Rect width="24" height="24" fill="white"/>
      </ClipPath>
    </Defs>
  </Svg>
);







