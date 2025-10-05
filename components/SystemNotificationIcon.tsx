import React from 'react';
import Svg, { Path, G, ClipPath, Rect, Defs } from 'react-native-svg';

interface SystemNotificationIconProps {
  size?: number;
  color?: string;
}

export const SystemNotificationIcon: React.FC<SystemNotificationIconProps> = ({ size = 24, color = '#fff' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <G clipPath="url(#clip0_4418_3715)">
      <Path d="M12 9V14" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M20.2399 13.9993L21.2999 15.8993C22.9799 18.9293 21.5199 21.4093 18.0599 21.4093H11.9999H5.93993C2.46993 21.4093 1.01993 18.9293 2.69993 15.8993L5.81993 10.2793L8.75993 4.9993C10.5399 1.7893 13.4599 1.7893 15.2399 4.9993L18.1799 10.2893" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M11.9946 17H12.0036" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </G>
    <Defs>
      <ClipPath id="clip0_4418_3715">
        <Rect width="24" height="24" fill="white"/>
      </ClipPath>
    </Defs>
  </Svg>
);







