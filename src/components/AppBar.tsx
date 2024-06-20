import React, {FC} from 'react';
import {Appbar} from 'react-native-paper';
import {CHECK_SCREEN, COLOR_TYPE, FONT_FAMILY} from '../constants';
import {StyleSheet} from 'react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {IUseStore, useStore} from '../hooks/useStore';

interface IAppBarProps {
  navigation: any;
  check: boolean;
}

const AppBar: FC<IAppBarProps> = ({navigation, check}) => {
  const useStateStore = useStore((state: IUseStore) => state);

  return (
    <Appbar.Header style={styles.backgroundColor}>
      {check ? (
        <Appbar.BackAction
          onPress={() => {
            navigation.canGoBack() && navigation.goBack();
          }}
        />
      ) : null}
      <Appbar.Content title="FemAid" titleStyle={styles.title} />
      <Appbar.Action
        icon={'account-circle'}
        size={35}
        color={COLOR_TYPE.black}
        onPress={() => {
          useStateStore.showVisible(true);
          useStateStore.setCheckScreen(CHECK_SCREEN.PROFILE);
        }}
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
