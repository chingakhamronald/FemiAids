import {NavigationContainer} from '@react-navigation/native';
import React, {FC} from 'react';
import {PaperProvider} from 'react-native-paper';
import MainNavigation from './src/router/MainNavigation';
import {SafeAreaView} from 'react-native-safe-area-context';
import {styleMain} from './src/styles';

const AppProvider: FC<{children?: React.ReactElement}> = ({children}) => {
  return (
    <NavigationContainer>
      <PaperProvider>{children}</PaperProvider>
    </NavigationContainer>
  );
};
const App = () => {
  return (
    <AppProvider>
      <SafeAreaView style={styleMain.flexGrow}>
        <MainNavigation />
      </SafeAreaView>
    </AppProvider>
  );
};

export default App;
