import React from 'react';
import Svg, { Path, G, ClipPath, Rect, Defs } from 'react-native-svg';

interface WelcomeIconProps {
  size?: number;
  color?: string;
}

export const WelcomeIcon: React.FC<WelcomeIconProps> = ({ size = 24, color = '#fff' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <G clipPath="url(#clip0_4418_3750)">
      <Path d="M2 10.9895V5.70953C2 4.37953 2.77 4.05953 3.71 4.99953L6.3 7.58953C6.69 7.97953 7.33 7.97953 7.71 7.58953L11.29 3.99953C11.68 3.60953 12.32 3.60953 12.7 3.99953L16.29 7.58953C16.68 7.97953 17.32 7.97953 17.7 7.58953L20.29 4.99953C21.23 4.05953 22 4.37953 22 5.70953V15.2995C22 18.2995 20 20.2995 17 20.2995H7C4.24 20.2995 2 18.0595 2 15.2995" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </G>
    <Defs>
      <ClipPath id="clip0_4418_3750">
        <Rect width="24" height="24" fill="white"/>
      </ClipPath>
    </Defs>
  </Svg>
);







