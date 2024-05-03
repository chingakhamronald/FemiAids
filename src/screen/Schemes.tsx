import {StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import SchemesList from '../components/SchemesList';
import {data} from '../constants';
import {styleMain} from '../styles';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import AppBar from '../components/AppBar';
import {MainNavProps} from '../router/MainNavigation';

const Schemes: FC<MainNavProps<'Schemes'>> = ({navigation}) => {
  return (
    <>
      <AppBar navigation={navigation} check={true} />
      <View style={styleMain.flexGrow}>
        <Text style={[styleMain.header, styles.text]}>Schemes</Text>
        <SchemesList schemesData={data} />
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
