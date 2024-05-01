import { StyleSheet } from 'react-native';
import { COLOR_TYPE, FONT_FAMILY, FONT_SIZE } from '../constants';

export const styleMain = StyleSheet.create({
  flexGrow: {
    flex: 1,
    backgroundColor: COLOR_TYPE.primary,
  },
  header: {
    fontSize: FONT_SIZE.xxl,
    fontFamily: FONT_FAMILY.bold,
    color: COLOR_TYPE.blue,
  },
  subheader: {
    fontSize: FONT_SIZE.xl,
    fontFamily: FONT_FAMILY.regular,
    color: COLOR_TYPE.blue,
  },
});
