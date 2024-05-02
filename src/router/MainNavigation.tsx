import React, {FC, useEffect, useState} from 'react';
import {
  StackNavigationProp,
  createStackNavigator,
} from '@react-navigation/stack';
import Home from '../screen/Home';
import {NavProps} from './type';
import Dashboard from '../screen/Dashboard';
import {COLOR_TYPE, FONT_FAMILY, FONT_SIZE} from '../constants';
import ProfileSvg from '../../assets/icons/profile.svg';
import {TouchableOpacity} from 'react-native';
import Schemes from '../screen/Schemes';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import Splash from '../screen/Splash';

export type MainList = {
  Home: undefined;
  Dashboard: undefined;
  Schemes: undefined;
  Splash: undefined;
};

export type MainNavProps<T extends keyof MainList> = NavProps<
  MainList,
  T,
  StackNavigationProp<MainList, T>
>;

const Stack = createStackNavigator<MainList>();

const Profile = () => {
  return (
    <TouchableOpacity
      style={{marginRight: wp('2%')}}
      onPress={() => console.log('click')}>
      <ProfileSvg />
    </TouchableOpacity>
  );
};

const MainNavigation: FC = () => {
  const [splashShown, setSplashShown] = useState<boolean>(true);

  useEffect(() => {
    const t = setTimeout(() => {
      setSplashShown(false);
    }, 500);
    return () => {
      clearTimeout(t);
    };
  }, [setSplashShown]);

  return (
    <Stack.Navigator initialRouteName="Splash">
      {splashShown && (
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{headerShown: false}}
        />
      )}
      <Stack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          headerLeft: () => null,
          title: 'FemiAids',
          headerStyle: {
            backgroundColor: COLOR_TYPE.secondary,
            elevation: 4,
          },
          headerTintColor: COLOR_TYPE.blue,
          headerTitleStyle: {
            fontFamily: FONT_FAMILY.bold,
            fontSize: FONT_SIZE.xl,
          },
          headerRight: Profile,
        }}
      />
      <Stack.Screen
        name="Schemes"
        component={Schemes}
        options={{
          title: 'FemiAids',
          headerStyle: {
            backgroundColor: COLOR_TYPE.secondary,
            elevation: 4,
          },
          headerTintColor: COLOR_TYPE.blue,
          headerTitleStyle: {
            fontFamily: FONT_FAMILY.bold,
            fontSize: FONT_SIZE.xl,
          },
          headerRight: Profile,
        }}
      />
    </Stack.Navigator>
  );
};

export default MainNavigation;
