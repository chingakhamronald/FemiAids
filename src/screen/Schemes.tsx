import {StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import SchemesList from '../components/SchemesList';
import {FONT_FAMILY, data} from '../constants';
import {styleMain} from '../styles';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

const Schemes: FC = () => {
  return (
    <View style={styleMain.flexGrow}>
      <Text style={[styleMain.subheader, styles.text]}>Schemes</Text>
      <SchemesList schemesData={data} />
    </View>
  );
};

export default Schemes;

const styles = StyleSheet.create({
  text: {
    fontFamily: FONT_FAMILY.bold,
    textAlign: 'center',
    marginVertical: hp('2%'),
  },
});
