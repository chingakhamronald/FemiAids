import {StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import {styleMain} from '../styles';
import FA from '../components/FA';
import SchemesList from '../components/SchemesList';
import {Button} from 'react-native-paper';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {COLOR_TYPE, FONT_FAMILY, data} from '../constants';
import {MainNavProps} from '../router/MainNavigation';

const Dashboard: FC<MainNavProps<'Dashboard'>> = ({navigation}) => {
  return (
    <View style={styleMain.flexGrow}>
      <View style={styles.container}>
        <Text style={[styleMain.subheader, {fontFamily: FONT_FAMILY.bold}]}>
          Schemes
        </Text>
        <Button
          mode="contained"
          style={styles.btn}
          labelStyle={{color: COLOR_TYPE.blue}}
          onPress={() => navigation.navigate('Schemes')}>
          See more
        </Button>
      </View>
      <SchemesList schemesData={data} />
      <FA />
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: hp('2%'),
    marginVertical: hp('3%'),
    alignItems: 'center',
  },
  btn: {
    borderRadius: 10,
    backgroundColor: COLOR_TYPE.secondary,
  },
});
