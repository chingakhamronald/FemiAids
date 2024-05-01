import React, {FC} from 'react';
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

export type MainList = {
  Home: undefined;
  Dashboard: undefined;
};

export type MainNavProps<T extends keyof MainList> = NavProps<
  MainList,
  T,
  StackNavigationProp<MainList, T>
>;

const Stack = createStackNavigator<MainList>();

const MainNavigation: FC = () => {
  return (
    <Stack.Navigator>
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
          headerRight: () => (
            <TouchableOpacity
              style={{marginRight: 5}}
              onPress={() => console.log('click')}>
              <ProfileSvg />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack.Navigator>
  );
};

export default MainNavigation;
