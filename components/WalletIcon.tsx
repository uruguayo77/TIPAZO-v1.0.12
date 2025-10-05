import React from 'react';
import Svg, { G, Path, Defs, ClipPath, Rect } from 'react-native-svg';

interface WalletIconProps {
  size?: number;
  color?: string;
}

export const WalletIcon: React.FC<WalletIconProps> = ({ size = 24, color = '#fff' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <G clipPath="url(#clip0_4418_169398)">
      <Path 
        d="M2.5 14.07V11.51C2.5 9.44001 4.19 7.75 6.26 7.75H17.74C19.81 7.75 21.5 9.44001 21.5 11.51V12.95H19.48C18.92 12.95 18.41 13.17 18.04 13.55C17.62 13.96 17.38 14.55 17.44 15.18C17.53 16.26 18.52 17.05 19.6 17.05H21.5V18.24C21.5 20.31 19.81 22 17.74 22H6.26C4.19 22 2.5 20.31 2.5 18.24" 
        stroke={color} 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <Path 
        d="M12.2798 2.1703C13.5198 1.7003 14.8498 2.62033 14.8498 3.95033V7.75032" 
        stroke={color} 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <Path 
        d="M2.5 12.4099V7.83997C2.5 6.64997 3.23 5.58992 4.34 5.16992L8.31 3.66992" 
        stroke={color} 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <Path 
        d="M22.5598 13.9702V16.0302C22.5598 16.5802 22.1198 17.0302 21.5598 17.0502H19.5998C18.5198 17.0502 17.5298 16.2602 17.4398 15.1802C17.3798 14.5502 17.6198 13.9602 18.0398 13.5502C18.4098 13.1702 18.9198 12.9502 19.4798 12.9502H21.5598C22.1198 12.9702 22.5598 13.4202 22.5598 13.9702Z" 
        stroke={color} 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <Path 
        d="M7 12H14" 
        stroke={color} 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </G>
    <Defs>
      <ClipPath id="clip0_4418_169398">
        <Rect width="24" height="24" fill="white"/>
      </ClipPath>
    </Defs>
  </Svg>
);







