import React from 'react';
import Svg, { Path, G, ClipPath, Rect, Defs } from 'react-native-svg';

interface NotificationIconProps {
  size?: number;
  color?: string;
}

export const NotificationIcon: React.FC<NotificationIconProps> = ({ size = 24, color = '#fff' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <G clipPath="url(#clip0_4418_3813)">
      <Path d="M12 6.43945V9.76945" stroke={color} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" />
      <Path d="M20.5899 15.17C21.3199 16.39 20.7399 17.97 19.3899 18.42C14.6099 20.01 9.43993 20.01 4.65993 18.42C3.21993 17.94 2.66993 16.48 3.45993 15.17L4.72993 13.05C5.07993 12.47 5.35993 11.44 5.35993 10.77V8.67C5.35993 4.98 8.33993 2 12.0199 2C15.6799 2 18.6799 5 18.6799 8.66V10.76C18.6799 10.94 18.6999 11.14 18.7299 11.35" stroke={color} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" />
      <Path d="M15.3299 18.8203C15.3299 20.6503 13.8299 22.1503 11.9999 22.1503C11.0899 22.1503 10.2499 21.7703 9.64992 21.1703C9.04992 20.5703 8.66992 19.7303 8.66992 18.8203" stroke={color} strokeWidth="1.5" strokeMiterlimit="10" />
    </G>
    <Defs>
      <ClipPath id="clip0_4418_3813">
        <Rect width="24" height="24" fill="white"/>
      </ClipPath>
    </Defs>
  </Svg>
);







