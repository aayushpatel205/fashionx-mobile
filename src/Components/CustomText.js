import React from 'react';
import { Text } from 'react-native';

// Map weights to font family names
const fontWeights = {
  '100': 'Outfit_100Thin',
  '200': 'Outfit_200ExtraLight',
  '300': 'Outfit_300Light',
  '400': 'Outfit_400Regular',
  '500': 'Outfit_500Medium',
  '600': 'Outfit_600SemiBold',
  '700': 'Outfit_700Bold',
  '800': 'Outfit_800ExtraBold',
  '900': 'Outfit_900Black',
};

const CustomText = ({ children, weight = '400', style, ...props }) => {
  return (
    <Text
      style={[{ fontFamily: fontWeights[weight] || fontWeights['400'] }, style]}
      {...props}
    >
      {children}
    </Text>
  );
};

export default CustomText;
