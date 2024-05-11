import React, {FC, useEffect, useState} from 'react';
import {
  StackNavigationProp,
  createStackNavigator,
} from '@react-navigation/stack';
import Home from '../screen/Home';
import {NavProps} from './type';
import Dashboard from '../screen/Dashboard';
import Schemes from '../screen/Schemes';
import Splash from '../screen/Splash';
import MedicalDetails from '../screen/MedicalDetails';

export type MainList = {
  Home: undefined;
  Dashboard: undefined;
  Schemes: undefined;
  Splash: undefined;
  MedicalDetails: {
    id: string;
    medicalName: string;
    description: string;
    symptoms: string;
    treatment: string;
  };
};

export type MainNavProps<T extends keyof MainList> = NavProps<
  MainList,
  T,
  StackNavigationProp<MainList, T>
>;

const Stack = createStackNavigator<MainList>();

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
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{
        headerShown: false,
      }}>
      {splashShown && <Stack.Screen name="Splash" component={Splash} />}
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Dashboard" component={Dashboard} />
      <Stack.Screen name="Schemes" component={Schemes} />
      <Stack.Screen name="MedicalDetails" component={MedicalDetails} />
    </Stack.Navigator>
  );
};

export default MainNavigation;
