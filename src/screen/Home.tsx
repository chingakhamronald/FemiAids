import React, {FC} from 'react';
import {StyleSheet, View} from 'react-native';
import {COLOR_TYPE, FONT_FAMILY, FONT_SIZE} from '../constants';
import {Button, Text} from 'react-native-paper';
import HomeSvg from '../../assets/icons/home.svg';
import Logo from '../../assets/icons/FemAid_Logo.svg';
import {styleMain} from '../styles';
import {MainNavProps} from '../router/MainNavigation';

const Home: FC<MainNavProps<'Home'>> = ({navigation}) => {
  return (
    <View style={styles.container}>
      <HomeSvg style={styles.img} />
      <View style={styles.buttonContainer}>
        <View style={styles.logoContainer}>
          <Logo style={styles.img1} />
          <Text style={[styleMain.header, {color: COLOR_TYPE.white}]}>
            FemiAids
          </Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styleMain.header}>Welcome to FemiAids</Text>
          <Text style={styleMain.subheader}>
            Safety and Support in One Touch
          </Text>
        </View>
        <Button
          mode="contained"
          style={styles.button}
          onPress={() => navigation.navigate('Dashboard')}>
          <Text style={styles.text}>Get Started</Text>
        </Button>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: COLOR_TYPE.primary,
  },
  img: {
    marginRight: 25,
  },
  img1: {
    marginLeft: 25,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 30,
    zIndex: 2,
  },
  button: {
    paddingHorizontal: 100,
    backgroundColor: COLOR_TYPE.blue,
    borderRadius: 10,
  },
  textContainer: {
    marginBottom: 15,
  },
  logoContainer: {
    bottom: '200%',
    display: 'flex',
    alignItems: 'flex-start',
  },
  text: {
    fontFamily: FONT_FAMILY.medium,
    fontSize: FONT_SIZE.lg,
    padding: 8,
    color: COLOR_TYPE.white,
  },
});
