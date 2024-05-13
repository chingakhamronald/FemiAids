import {NavigationContainer} from '@react-navigation/native';
import React, {FC} from 'react';
import {PaperProvider} from 'react-native-paper';
import MainNavigation from './src/router/MainNavigation';
import {SafeAreaView} from 'react-native-safe-area-context';
import {styleMain} from './src/styles';
import {QueryClient, QueryClientProvider} from 'react-query';

const queryClient = new QueryClient();

const AppProvider: FC<{children?: React.ReactElement}> = ({children}) => {
  return (
    <NavigationContainer>
      <QueryClientProvider client={queryClient}>
        <PaperProvider>{children}</PaperProvider>
      </QueryClientProvider>
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
