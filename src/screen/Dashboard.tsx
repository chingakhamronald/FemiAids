import {Linking, StyleSheet, Text, View} from 'react-native';
import React, {FC, useState} from 'react';
import {styleMain} from '../styles';
import FA from '../components/FA';
import SchemesList from '../components/SchemesList';
import {
  Button,
  Divider,
  IconButton,
  Modal,
  Portal,
  Surface,
} from 'react-native-paper';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {COLOR_TYPE, FONT_FAMILY, FONT_SIZE, data} from '../constants';
import {MainNavProps} from '../router/MainNavigation';
import Statusbar from '../components/Statusbar';
import MedicalList from '../components/MedicalList';

type emergencyDataType = {
  id: string;
  title: string;
  mobile_number: number;
};

const Dashboard: FC<MainNavProps<'Dashboard'>> = ({navigation}) => {
  const [visible, setVisible] = useState<boolean>(false);

  const showModal = (value: boolean) => setVisible(value);
  const hideModal = () => setVisible(false);

  const handleLink = (mobile_number: number) => {
    return Linking.openURL(`tel:${mobile_number}`);
  };

  return (
    <>
      <Statusbar backgroundColor={COLOR_TYPE.secondary} />
      <View style={styleMain.flexGrow}>
        <View>
          <Text
            style={[
              styleMain.header,
              {margin: hp('2%'), marginBottom: hp('0.5%')},
            ]}>
            Medical Help
          </Text>
          <MedicalList />
        </View>
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
        <Portal>
          <Modal
            visible={visible}
            onDismiss={hideModal}
            contentContainerStyle={styles.modal}>
            <View style={{marginVertical: hp('2%')}}>
              <View style={styles.flex}>
                <Text style={styleMain.header}>Emergency</Text>
                <IconButton
                  icon={'close-circle'}
                  iconColor={COLOR_TYPE.blue}
                  size={30}
                  onPress={hideModal}
                />
              </View>
              {emergencyData.map((e: emergencyDataType) => {
                return (
                  <View key={e.id} style={styles.wrapper}>
                    <Text style={[styles.text, {marginVertical: hp('1%')}]}>
                      {e.title}
                    </Text>
                    <Surface style={styles.surface}>
                      <Text
                        style={[styles.text, {fontFamily: FONT_FAMILY.bold}]}>
                        {e.mobile_number}
                      </Text>
                      <IconButton
                        icon={'phone'}
                        iconColor={COLOR_TYPE.blue}
                        onPress={() => handleLink(e.mobile_number)}
                      />
                    </Surface>
                  </View>
                );
              })}
              <Divider />
            </View>
          </Modal>
        </Portal>
        <FA showModal={showModal} visible={visible} />
      </View>
    </>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: hp('2%'),
    marginVertical: hp('2%'),
    alignItems: 'center',
  },
  btn: {
    borderRadius: 10,
    backgroundColor: COLOR_TYPE.secondary,
  },
  modal: {
    backgroundColor: COLOR_TYPE.secondary,
    marginHorizontal: hp('1.5%'),
    borderRadius: 10,
  },
  flex: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: hp('2%'),
  },
  wrapper: {
    marginHorizontal: hp('2%'),
  },
  text: {
    fontFamily: FONT_FAMILY.regular,
    fontSize: FONT_SIZE.lg,
    color: COLOR_TYPE.blue,
  },
  surface: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: hp('1%'),
    alignItems: 'center',
    borderRadius: 10,
  },
});

const emergencyData = [
  {
    id: '1',
    title: 'First Priority',
    mobile_number: 6009421415,
  },
  {
    id: '2',
    title: 'Second Priority',
    mobile_number: 8837312294,
  },
  {
    id: '3',
    title: 'Third Priority',
    mobile_number: 6009421416,
  },
];
