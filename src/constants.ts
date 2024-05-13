import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const COLOR_TYPE = {
  primary: '#8DECB4',
  secondary: '#FFF5E0',
  blue: '#141E46',
  dark_green: '#41B06E',
  white: '#FFFFFF',
  black: '#000000',
};

export const FONT_FAMILY = {
  bold: 'Bold',
  semi_bold: 'SemiBold',
  regular: 'Regular',
  medium: 'Medium',
};

export const FONT_SIZE = {
  xxl: hp('4%'),
  xl: hp('3%'),
  lg: hp('2.5%'),
  md: hp('2%'),
  sm: hp('1.8%'),
  xs: hp('1.3%'),
};

export enum CHECK_SCREEN {
  DASHBOARD = 'DASHBOARD',
  PROFILE = 'PROFILE',
  CATEGORY = 'CATEGORY',
}
