import React from 'react';
import { Svg, Path } from 'react-native-svg';

interface CustomBackIconProps {
  size?: number;
  color?: string;
}

export const CustomBackIcon: React.FC<CustomBackIconProps> = ({ 
  size = 24, 
  color = '#fff' 
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path 
        d="M9.00002 15.3797H13.92C15.62 15.3797 17 13.9997 17 12.2997C17 10.5997 15.62 9.21973 13.92 9.21973H7.15002" 
        stroke={color} 
        strokeWidth="1.5" 
        strokeMiterlimit="10" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <Path 
        d="M8.57 10.7701L7 9.19012L8.57 7.62012" 
        stroke={color} 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <Path 
        d="M2 14V15C2 20 4 22 9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9" 
        stroke={color} 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </Svg>
  );
};







