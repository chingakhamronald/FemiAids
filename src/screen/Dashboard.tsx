import {Linking, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {FC, Fragment, useEffect, useState} from 'react';
import {styleMain} from '../styles';
import SchemesList from '../components/SchemesList';
import {
  ActivityIndicator,
  Button,
  Chip,
  IconButton,
  Modal,
  Portal,
  Surface,
  TextInput,
} from 'react-native-paper';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {CHECK_SCREEN, COLOR_TYPE, FONT_FAMILY, FONT_SIZE} from '../constants';
import {MainNavProps} from '../router/MainNavigation';
import Statusbar from '../components/Statusbar';
import MedicalList from '../components/MedicalList';
import AppBar from '../components/AppBar';
import {IUseStore, useStore} from '../hooks/useStore';
import {useQueryScheme} from '../hooks/useQueryScheme';
import {useQueryEmergency} from '../hooks/useQueryEmergency';
import {useQueryCategory} from '../hooks/useQueryCategory';
import FA from '../components/FA';
import {useMutationEmergency} from '../hooks/useMutationEmergency';

const Dashboard: FC<MainNavProps<'Dashboard'>> = ({navigation}) => {
  const useVisibleState = useStore((state: IUseStore) => state);

  const {data: emergencyData, isLoading: emergencyLoading} =
    useQueryEmergency();

  const emergency = Object.assign({}, emergencyData);

  const [emergencyState, setEmergency] = useState({
    priority1: '',
    priority2: '',
    priority3: '',
  });

  const {data: schemeData, isLoading} = useQueryScheme(
    useVisibleState?.category,
  );

  const {data: categoryData, isLoading: categoryLoading} = useQueryCategory();

  const {mutate, isLoading: editLoading} = useMutationEmergency(
    emergency[0]?.id,
  );

  const handleLink = (mobile_number: number) => {
    return Linking.openURL(`tel:${mobile_number}`);
  };

  useEffect(() => {
    if (emergencyData && emergencyData.length > 0) {
      setEmergency({
        priority1: emergencyData[0]?.priority1 || '',
        priority2: emergencyData[0]?.priority2 || '',
        priority3: emergencyData[0]?.priority3 || '',
      });
    }
  }, [emergencyData]);

  if (
    schemeData === undefined ||
    emergencyData === undefined ||
    categoryData === undefined ||
    emergencyData === undefined
  ) {
    return;
  }

  if (isLoading || categoryLoading || emergencyLoading || editLoading) {
    return (
      <View
        style={[
          styleMain.flexGrow,
          {
            backgroundColor: COLOR_TYPE.secondary,
            alignItems: 'center',
            justifyContent: 'center',
          },
        ]}>
        <ActivityIndicator
          animating={true}
          color={COLOR_TYPE.blue}
          size={'large'}
        />
      </View>
    );
  }

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
        <SchemesList schemesData={schemeData} />
        <Portal>
          <Modal
            visible={useVisibleState.visible}
            onDismiss={() => {
              useVisibleState.hideVisible(false);
              useVisibleState.removeCheckScreen();
            }}
            contentContainerStyle={styles.modal}>
            {useVisibleState.checkScreen === CHECK_SCREEN.CATEGORY ? (
              <View style={{marginVertical: hp('2%')}}>
                <View style={styles.flex}>
                  <Text style={styleMain.header}>Select Category</Text>
                </View>
                <ScrollView
                  contentContainerStyle={[
                    styles.wrapper,
                    {maxHeight: hp('50%'), marginVertical: 2},
                  ]}>
                  {categoryData.map(e => (
                    <Chip
                      key={e.id}
                      selectedColor={COLOR_TYPE.blue}
                      selected={e.category_name === useVisibleState.category}
                      onPress={() => {
                        useVisibleState.setCategory(e.category_name);
                        useVisibleState.showVisible(false);
                        useVisibleState.removeCheckScreen();
                      }}
                      style={{
                        marginVertical: 2,
                        marginRight: 5,
                        backgroundColor: COLOR_TYPE.primary,
                      }}>
                      <Text
                        style={{
                          fontSize: FONT_SIZE.md,
                          color: COLOR_TYPE.blue,
                        }}>
                        {e.category_name}
                      </Text>
                    </Chip>
                  ))}
                </ScrollView>
              </View>
            ) : (
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
                {useVisibleState.checkScreen === CHECK_SCREEN.PROFILE ? (
                  <View style={styles.wrapper}>
                    <TextInput
                      mode="outlined"
                      label="First Priority"
                      value={emergencyState.priority1}
                      outlineColor={COLOR_TYPE.blue}
                      onChangeText={(e: any) => {
                        setEmergency(prevState => ({
                          ...prevState,
                          priority1: e,
                        }));
                      }}
                    />
                    <TextInput
                      mode="outlined"
                      label="Second Priority"
                      value={emergencyState.priority2}
                      onChangeText={(e: any) => {
                        setEmergency(prevState => ({
                          ...prevState,
                          priority2: e,
                        }));
                      }}
                      outlineColor={COLOR_TYPE.blue}
                    />
                    <TextInput
                      mode="outlined"
                      label="Third Priority"
                      value={emergencyState.priority3}
                      onChangeText={(e: any) => {
                        setEmergency(prevState => ({
                          ...prevState,
                          priority3: e,
                        }));
                      }}
                      outlineColor={COLOR_TYPE.blue}
                    />
                    <Button
                      mode="contained"
                      buttonColor={COLOR_TYPE.blue}
                      onPress={() =>
                        mutate({
                          priority1: emergencyState.priority1,
                          priority2: emergencyState.priority2,
                          priority3: emergencyState.priority3,
                        })
                      }
                      style={{
                        marginTop: hp('2%'),
                        borderRadius: 10,
                        padding: hp('0.5%'),
                      }}>
                      <Text style={{color: COLOR_TYPE.white}}>
                        Make Changes
                      </Text>
                    </Button>
                  </View>
                ) : (
                  <>
                    <Fragment>
                      <View style={styles.wrapper}>
                        <Text style={[styles.text, {marginVertical: hp('1%')}]}>
                          First Priority
                        </Text>
                        <Surface style={styles.surface}>
                          <Text
                            style={[
                              styles.text,
                              {fontFamily: FONT_FAMILY.bold},
                            ]}>
                            {emergencyData[0].priority1}
                          </Text>
                          <IconButton
                            icon={'phone'}
                            iconColor={COLOR_TYPE.blue}
                            onPress={() =>
                              handleLink(Number(emergencyState.priority1))
                            }
                          />
                        </Surface>
                      </View>
                      <View style={styles.wrapper}>
                        <Text style={[styles.text, {marginVertical: hp('1%')}]}>
                          Second Priority
                        </Text>
                        <Surface style={styles.surface}>
                          <Text
                            style={[
                              styles.text,
                              {fontFamily: FONT_FAMILY.bold},
                            ]}>
                            {emergencyData[0].priority2}
                          </Text>
                          <IconButton
                            icon={'phone'}
                            iconColor={COLOR_TYPE.blue}
                            onPress={() =>
                              handleLink(Number(emergencyState.priority2))
                            }
                          />
                        </Surface>
                      </View>
                      <View style={styles.wrapper}>
                        <Text style={[styles.text, {marginVertical: hp('1%')}]}>
                          Third Priority
                        </Text>
                        <Surface style={styles.surface}>
                          <Text
                            style={[
                              styles.text,
                              {fontFamily: FONT_FAMILY.bold},
                            ]}>
                            {emergencyData[0].priority3}
                          </Text>
                          <IconButton
                            icon={'phone'}
                            iconColor={COLOR_TYPE.blue}
                            onPress={() =>
                              handleLink(Number(emergencyState.priority3))
                            }
                          />
                        </Surface>
                      </View>
                    </Fragment>
                  </>
                )}
              </View>
            )}
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
    backgroundColor: COLOR_TYPE.white,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
