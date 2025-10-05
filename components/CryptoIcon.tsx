import React from 'react';
import Svg, { Path, G, ClipPath, Rect, Defs } from 'react-native-svg';

interface CryptoIconProps {
  size?: number;
  color?: string;
}

export const CryptoIcon: React.FC<CryptoIconProps> = ({ size = 24, color = '#fff' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <G clipPath="url(#clip0_4418_4092)">
      <Path d="M8.7793 7.66992H14.1993C15.3993 7.66992 16.3693 8.74992 16.3693 9.83992C16.3693 11.0399 15.3993 12.0099 14.1993 12.0099H8.7793V7.66992Z" stroke={color} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M8.7793 12H14.9693C16.3393 12 17.4493 12.97 17.4493 14.17C17.4493 15.37 16.3393 16.34 14.9693 16.34H8.7793V12Z" stroke={color} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M12.5703 16.3301V18.5001" stroke={color} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M9.86914 16.3301V18.5001" stroke={color} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M12.5703 5.5V7.67" stroke={color} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M9.86914 5.5V7.67" stroke={color} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M10.8408 7.66992H7.05078" stroke={color} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M10.8408 16.3301H7.05078" stroke={color} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M4 6C2.75 7.67 2 9.75 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2C10.57 2 9.2 2.3 7.97 2.85" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </G>
    <Defs>
      <ClipPath id="clip0_4418_4092">
        <Rect width="24" height="24" fill="white"/>
      </ClipPath>
    </Defs>
  </Svg>
);







