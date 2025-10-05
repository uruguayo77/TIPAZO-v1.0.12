import React from 'react';
import { Svg, Path } from 'react-native-svg';

interface WidgetIconProps {
  size?: number;
  color?: string;
}

export const WidgetIcon: React.FC<WidgetIconProps> = ({ 
  size = 24, 
  color = '#000' 
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M4.87 4.99C3.09 6.79 2 9.27 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2C11.31 2 10.64 2.07 9.98 2.2"
        stroke={color}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M13.26 15.5297L9.73999 11.9997L10.7 11.0297L12.9 8.82973L13.26 8.46973"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};





