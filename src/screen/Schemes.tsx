import {StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import SchemesList from '../components/SchemesList';
import {styleMain} from '../styles';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import AppBar from '../components/AppBar';
import {MainNavProps} from '../router/MainNavigation';
import {useStore} from '../hooks/useStore';

const Schemes: FC<MainNavProps<'Schemes'>> = ({navigation}) => {
  const useSchemeStore = useStore(state => state);

  return (
    <>
      <AppBar navigation={navigation} check={true} />
      <View style={styleMain.flexGrow}>
        <Text style={[styleMain.header, styles.text]}>Schemes</Text>
        <SchemesList schemesData={useSchemeStore.scheme} />
      </View>
    </>
  );
};

export default Schemes;

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    marginVertical: hp('2%'),
  },
});
