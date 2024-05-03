import {View, Text, StyleSheet, ScrollView, Linking} from 'react-native';
import React, {FC} from 'react';
import AppBar from '../components/AppBar';
import {MainNavProps} from '../router/MainNavigation';
import {styleMain} from '../styles';
import {COLOR_TYPE, FONT_SIZE} from '../constants';
import {Button, Icon, Surface} from 'react-native-paper';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

type docType = {
  id: string;
  name: string;
  gender: string;
  address: string;
  mobile_number: number;
  hospital: string;
  place: string;
};

type aboutsDataType = {
  id: string;
  name: string;
  description: string;
  symptoms: string;
  treatment: string;
  doc: docType[];
};

interface IAboutsProps {
  data: aboutsDataType;
}

const MedicalDetails: FC<MainNavProps<'MedicalDetails'>> = ({navigation}) => {
  return (
    <>
      <AppBar navigation={navigation} check={true} />
      <View style={styleMain.flexGrow}>
        <Abouts data={dataDD} />
      </View>
    </>
  );
};

export default MedicalDetails;

const Abouts: FC<IAboutsProps> = ({data}) => {
  const handleLink = (mobile_number: number) => {
    return Linking.openURL(`tel:${mobile_number}`);
  };
  return (
    <>
      <ScrollView contentContainerStyle={{minHeight: hp('60%')}}>
        <Surface style={styles.wrapper}>
          <Text style={styleMain.header}>About {data.name}</Text>
          <Text>{data.description}</Text>

          <Text style={styleMain.header}>Symptoms</Text>
          <Text>{data.symptoms}</Text>

          <Text style={styleMain.header}>Treatment</Text>
          <Text>{data.treatment}</Text>
        </Surface>
        {dataDD.doc.map(e => {
          return (
            <Surface style={styles.docWrapper} key={e.id}>
              <View style={styles.flex}>
                <Text style={[styleMain.header, {fontSize: FONT_SIZE.lg}]}>
                  {e.name}
                </Text>
                <View style={{width: wp('1%')}} />
                <Icon
                  source={e.gender === 'male' ? 'gender-male' : 'gender-female'}
                  size={20}
                  color={COLOR_TYPE.blue}
                />
              </View>

              <View style={[styles.flex, {justifyContent: 'space-between'}]}>
                <Text style={[styleMain.subheader, {fontSize: FONT_SIZE.md}]}>
                  {e.address}
                </Text>
                <Button
                  mode="contained"
                  buttonColor={COLOR_TYPE.blue}
                  labelStyle={[styleMain.subheader, styles.label]}
                  icon={'phone'}
                  contentStyle={styles.btn}
                  onPress={() => handleLink(e.mobile_number)}>
                  Contact {e.gender === 'male' ? 'him' : 'her'}
                </Button>
              </View>

              <View style={[styles.flex, {justifyContent: 'space-between'}]}>
                <Text style={[styleMain.header, {fontSize: FONT_SIZE.lg}]}>
                  {e.hospital}
                </Text>
                <Text style={[styleMain.header, {fontSize: FONT_SIZE.lg}]}>
                  {e.mobile_number}
                </Text>
              </View>
            </Surface>
          );
        })}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexGrow: 1,
    backgroundColor: COLOR_TYPE.dark_green,
    margin: hp('2%'),
    borderRadius: 10,
    padding: hp('2%'),
  },
  docWrapper: {
    marginHorizontal: hp('2%'),
    marginBottom: hp('2%'),
    borderRadius: 10,
    paddingHorizontal: hp('2%'),
    paddingVertical: hp('1%'),
  },
  flex: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  btn: {
    flexDirection: 'row-reverse',
    height: 25,
    textAlign: 'left',
  },
  label: {
    fontSize: FONT_SIZE.sm,
    color: COLOR_TYPE.secondary,
    height: '100%',
    marginLeft: 15,
  },
});

const dataDD = {
  id: '1',
  name: 'HIV/AIDs',
  description:
    " HIV (human immunodeficiency virus) is a virus that attacks the body's immune system.",
  symptoms: 'Fever and muscle pains, Headache, Sore throat.',
  treatment: 'Antiretroviral therapy (ART) is the treatment for HIV',
  doc: [
    {
      id: '1',
      name: 'Dr Tombi',
      gender: 'female',
      address: 'Imphal Manipur, 795003',
      mobile_number: 6009421413,
      hospital: 'ABC Hospital',
      place: 'Singjamei',
    },
    {
      id: '2',
      name: 'Dr Tomba',
      gender: 'male',
      address: 'Imphal Manipur, 795003',
      mobile_number: 6009421413,
      hospital: 'ABC Hospital',
      place: 'Singjamei',
    },
  ],
};
