import {StyleSheet} from 'react-native';
import React, {FC} from 'react';
import {AnimatedFAB} from 'react-native-paper';
import Emergency_svg from '../../assets/icons/Emergency_Button.svg';

interface IFaProps {
  isExtended: boolean;
}

const FA: FC<IFaProps> = ({isExtended}) => {
  return (
    <AnimatedFAB
      icon={Emergency_svg}
      label={'Label'}
      extended={false}
      onPress={() => console.log('Pressed')}
      visible={isExtended}
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
    bottom: 30,
    right: 20,
    position: 'absolute',
  },
});
