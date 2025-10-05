import React from 'react';
import Svg, { Path, G, ClipPath, Rect, Defs } from 'react-native-svg';

interface PagoMovilIconProps {
  size?: number;
  color?: string;
}

export const PagoMovilIcon: React.FC<PagoMovilIconProps> = ({ size = 24, color = '#fff' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <G clipPath="url(#clip0_4418_3902)">
      <Path d="M20 11.03V17C20 21 19 22 15 22H9C5 22 4 21 4 17V7C4 3 5 2 9 2H15C19 2 20 3 20 7" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M14 5.5H10" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M12.0002 19.1C12.8562 19.1 13.5502 18.406 13.5502 17.55C13.5502 16.694 12.8562 16 12.0002 16C11.1442 16 10.4502 16.694 10.4502 17.55C10.4502 18.406 11.1442 19.1 12.0002 19.1Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </G>
    <Defs>
      <ClipPath id="clip0_4418_3902">
        <Rect width="24" height="24" fill="white"/>
      </ClipPath>
    </Defs>
  </Svg>
);







