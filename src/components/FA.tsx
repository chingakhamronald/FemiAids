import {StyleSheet} from 'react-native';
import React, {FC} from 'react';
import {AnimatedFAB} from 'react-native-paper';
import Emergency_svg from '../../assets/icons/Emergency_Button.svg';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {CHECK_SCREEN} from '../constants';

interface IFaProps {
  visible: boolean;
  showModal: (value: boolean) => void;
  setName: (value: string) => void;
}

const FA: FC<IFaProps> = ({showModal, visible, setName}) => {
  return (
    <AnimatedFAB
      icon={Emergency_svg}
      label={'Label'}
      extended={false}
      onPress={() => {
        showModal(!visible);
        setName(CHECK_SCREEN.DASHBOARD);
      }}
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
