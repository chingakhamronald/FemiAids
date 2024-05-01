import {ScrollView, Text, View} from 'react-native';
import React, {useState} from 'react';
import {styleMain} from '../styles';
import FA from '../components/FA';

const Dashboard = () => {
  const [isExtended, setIsExtended] = useState(true);

  const onScroll = (nativeEvent: any) => {
    const currentScrollPosition =
      Math.floor(nativeEvent?.contentOffset?.y) ?? 0;

    setIsExtended(currentScrollPosition <= 0);
  };
  return (
    <View style={styleMain.flexGrow}>
      <ScrollView
        onScroll={onScroll}
        contentContainerStyle={styleMain.flexGrow}>
        <Text>Dashboard</Text>
        <FA isExtended={isExtended} />
      </ScrollView>
    </View>
  );
};

export default Dashboard;
