import {View, StyleSheet} from 'react-native';
import React, {FC} from 'react';
import Statusbar from '../components/Statusbar';
import {COLOR_TYPE} from '../constants';
import FemiAidsLogo from '../../assets/icons/splash.svg';

const Splash: FC = () => {
  return (
    <>
      <Statusbar backgroundColor={COLOR_TYPE.primary} />
      <View style={styles.wrapper}>
        <FemiAidsLogo />
      </View>
    </>
  );
};

export default Splash;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLOR_TYPE.primary,
  },
});
