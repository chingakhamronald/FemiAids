import {Linking, StyleSheet, Text, View} from 'react-native';
import React, {FC, useEffect, useState} from 'react';
import {styleMain} from '../styles';
import FA from '../components/FA';
import SchemesList from '../components/SchemesList';
import {Button, IconButton, Modal, Portal, Surface} from 'react-native-paper';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {CHECK_SCREEN, COLOR_TYPE, FONT_FAMILY, FONT_SIZE} from '../constants';
import {MainNavProps} from '../router/MainNavigation';
import Statusbar from '../components/Statusbar';
import MedicalList from '../components/MedicalList';
import AppBar from '../components/AppBar';
import {IUseStore, useStore} from '../hooks/useStore';
import firestore from '@react-native-firebase/firestore';

type emergencyDataType = {
  id: any;
  title: string;
  mobile_number: number;
};

const Dashboard: FC<MainNavProps<'Dashboard'>> = ({navigation}) => {
  const [emergencyData, setEmergencyData] = useState<emergencyDataType[]>([]);

  const handleLink = (mobile_number: number) => {
    return Linking.openURL(`tel:${mobile_number}`);
  };

  const useVisibleState = useStore((state: IUseStore) => state);

  const fetchDataFromMultipleCollections = (storeDate: IUseStore) => {
    const fetchedScheme: any = [];

    const fetchedEmergency: any = [];

    const schemeQuery = firestore().collection('scheme');
    const emergencyQuery = firestore().collectionGroup('emergency');

    schemeQuery
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          const {category, description, name, url} = doc.data();
          fetchedScheme.push({
            id: doc.id,
            name: name,
            description: description,
            url: url,
            category: category,
          });
        });
        storeDate.setSchemeData(fetchedScheme);
      })
      .catch(error => {
        console.error('Error fetching data from medical collection:', error);
      });

    emergencyQuery
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          const {title, mobile_number} = doc.data();
          fetchedEmergency.push({
            id: doc.id,
            title: title,
            mobile_number: mobile_number,
          });
        });

        setEmergencyData(fetchedEmergency);
      })
      .catch(error => {
        console.error('Error fetching data from otherCollection:', error);
      });
  };

  useEffect(() => {
    fetchDataFromMultipleCollections(useVisibleState);
  }, [useVisibleState]);

  return (
    <>
      <Statusbar backgroundColor={COLOR_TYPE.secondary} />
      <AppBar navigation={navigation} check={false} />
      <View style={styleMain.flexGrow}>
        <View>
          <Text
            style={[
              styleMain.header,
              {margin: hp('2%'), marginBottom: hp('0.5%')},
            ]}>
            Medical Help
          </Text>
          <MedicalList navigation={navigation} />
        </View>
        <View style={styles.container}>
          <Text style={styleMain.header}>Schemes</Text>
          <Button
            mode="contained"
            style={styles.btn}
            labelStyle={{color: COLOR_TYPE.blue}}
            onPress={() => navigation.navigate('Schemes')}>
            See more
          </Button>
        </View>
        <SchemesList schemesData={useVisibleState.scheme} />
        <Portal>
          <Modal
            visible={useVisibleState.visible}
            onDismiss={() => {
              useVisibleState.hideVisible(false);
              useVisibleState.removeCheckScreen();
            }}
            contentContainerStyle={styles.modal}>
            <View style={{marginVertical: hp('2%')}}>
              <View style={styles.flex}>
                <Text style={styleMain.header}>
                  Emergency{' '}
                  {useVisibleState.checkScreen === CHECK_SCREEN.PROFILE
                    ? 'Setting'
                    : null}
                </Text>
                <IconButton
                  icon={'close-circle'}
                  iconColor={COLOR_TYPE.blue}
                  size={30}
                  onPress={() => {
                    useVisibleState.showVisible(false);
                    useVisibleState.removeCheckScreen();
                  }}
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
              {useVisibleState.checkScreen === CHECK_SCREEN.PROFILE ? (
                <Button
                  mode="contained"
                  buttonColor={COLOR_TYPE.blue}
                  style={[
                    styles.wrapper,
                    {marginTop: hp('2%'), borderRadius: 10, padding: hp('1%')},
                  ]}>
                  Make Changes
                </Button>
              ) : null}
            </View>
          </Modal>
        </Portal>
        <FA
          showModal={useVisibleState.showVisible}
          visible={useVisibleState.visible}
          setName={useVisibleState.setCheckScreen}
        />
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
    textAlign: 'center',
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
