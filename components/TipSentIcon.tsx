import React from 'react';
import Svg, { Path, G, ClipPath, Rect, Defs } from 'react-native-svg';

interface TipSentIconProps {
  size?: number;
  color?: string;
}

export const TipSentIcon: React.FC<TipSentIconProps> = ({ size = 24, color = '#fff' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <G clipPath="url(#clip0_4418_3760)">
      <Path d="M18.0698 8.51062C21.9098 10.4306 21.9098 13.5706 18.0698 15.4906L9.50978 19.7706C3.74978 22.6506 1.39978 20.2906 4.27978 14.5406L5.14978 12.8106C5.36978 12.3706 5.36978 11.6406 5.14978 11.2006L4.27978 9.46062C1.39978 3.71062 3.75978 1.35062 9.50978 4.23062L14.0198 6.49062" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M5.43994 12H10.8399" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </G>
    <Defs>
      <ClipPath id="clip0_4418_3760">
        <Rect width="24" height="24" fill="white"/>
      </ClipPath>
    </Defs>
  </Svg>
);







