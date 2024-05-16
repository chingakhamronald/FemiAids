import {StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import SchemesList from '../components/SchemesList';
import {styleMain} from '../styles';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import AppBar from '../components/AppBar';
import {MainNavProps} from '../router/MainNavigation';
import {useQueryScheme} from '../hooks/useQueryScheme';
import {useStore} from '../hooks/useStore';

const Schemes: FC<MainNavProps<'Schemes'>> = ({navigation}) => {
  const useGlobalStore = useStore(state => state);

  const {data: schemeData} = useQueryScheme(useGlobalStore?.category);

  if (schemeData === undefined) {
    return;
  }

  return (
    <>
      <AppBar navigation={navigation} check={true} />
      <View style={styleMain.flexGrow}>
        <Text style={[styleMain.header, styles.text]}>Schemes</Text>
        <SchemesList schemesData={schemeData} />
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
