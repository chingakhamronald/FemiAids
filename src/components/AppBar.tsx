import React, {FC} from 'react';
import {Appbar} from 'react-native-paper';
import {COLOR_TYPE, FONT_FAMILY} from '../constants';
import {StyleSheet} from 'react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

interface IAppBarProps {
  navigation: any;
  check: boolean;
}

const AppBar: FC<IAppBarProps> = ({navigation, check}) => {
  return (
    <Appbar.Header style={styles.backgroundColor}>
      {check ? (
        <Appbar.BackAction
          onPress={() => {
            navigation.canGoBack() && navigation.goBack();
          }}
        />
      ) : null}
      <Appbar.Content title="FemiAids" titleStyle={styles.title} />
      <Appbar.Action
        icon={'account-circle'}
        size={35}
        color={COLOR_TYPE.black}
        onPress={() => console.log('click')}
      />
    </Appbar.Header>
  );
};

export default AppBar;

const styles = StyleSheet.create({
  backgroundColor: {
    backgroundColor: COLOR_TYPE.secondary,
    elevation: 8,
    display: 'flex',
    alignItems: 'center',
  },
  title: {
    fontFamily: FONT_FAMILY.bold,
    fontSize: hp('3.5%'),
    color: COLOR_TYPE.blue,
    marginTop: hp('1%'),
  },
});
