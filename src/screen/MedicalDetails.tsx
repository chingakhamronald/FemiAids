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
import {docType} from '../types';
import {useQueryDoctor} from '../hooks/useQueryDoctor';

interface IAboutsProps {
  name: string;
  description: string;
  treatment: string;
  symptoms: string;
  data: docType[];
}

const MedicalDetails: FC<MainNavProps<'MedicalDetails'>> = ({
  navigation,
  route,
}) => {
  const {id, description, medicalName, symptoms, treatment} = route.params;

  const [doctorData] = useQueryDoctor(medicalName);

  if (doctorData === undefined) {
    return;
  }

  return (
    <>
      <AppBar navigation={navigation} check={true} />
      <View style={styleMain.flexGrow}>
        <Abouts
          data={doctorData}
          description={description}
          name={medicalName}
          symptoms={symptoms}
          treatment={treatment}
        />
      </View>
    </>
  );
};

export default MedicalDetails;

const Abouts: FC<IAboutsProps> = ({
  description,
  name,
  symptoms,
  treatment,
  data,
}) => {
  const handleLink = (mobile_number: number) => {
    return Linking.openURL(`tel:${mobile_number}`);
  };
  return (
    <>
      <ScrollView contentContainerStyle={{minHeight: hp('60%')}}>
        <Surface style={styles.wrapper}>
          <Text style={styleMain.header}>About {name}</Text>
          <Text>{description}</Text>

          <Text style={styleMain.header}>Symptoms</Text>
          <Text>{symptoms}</Text>

          <Text style={styleMain.header}>Treatment</Text>
          <Text>{treatment}</Text>
        </Surface>
        {data.map(e => {
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
  },
  label: {
    fontSize: FONT_SIZE.sm,
    color: COLOR_TYPE.secondary,
    height: '100%',
    marginLeft: 15,
  },
});
