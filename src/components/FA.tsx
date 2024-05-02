import {StyleSheet} from 'react-native';
import React, {FC} from 'react';
import {AnimatedFAB} from 'react-native-paper';
import Emergency_svg from '../../assets/icons/Emergency_Button.svg';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const FA: FC = () => {
  return (
    <AnimatedFAB
      icon={Emergency_svg}
      label={'Label'}
      extended={false}
      onPress={() => console.log('Pressed')}
      visible={true}
      animateFrom={'right'}
      iconMode={'static'}
      style={[styles.fabStyle]}
    />
  );
};

export default FA;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  fabStyle: {
    bottom: hp('4%'),
    right: wp('8%'),
    position: 'absolute',
  },
});
