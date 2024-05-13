import {View, Text, FlatList, StyleSheet, RefreshControl} from 'react-native';
import React, {FC} from 'react';
import {Avatar} from 'react-native-paper';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {styleMain} from '../styles';
import {FONT_FAMILY, FONT_SIZE} from '../constants';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useQueryMedical} from '../hooks/useQueryMedical';

interface IMedicalList {
  navigation: any;
}

const MedicalList: FC<IMedicalList> = ({navigation}) => {
  const {data: medicalData, isLoading, refetch} = useQueryMedical();

  if (medicalData === undefined || medicalData === null) {
    return;
  }

  return (
    <>
      <FlatList
        data={medicalData}
        refreshing={isLoading}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={() => refetch()} />
        }
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => {
          return (
            <View style={styles.container}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('MedicalDetails', {
                    id: item.id,
                    medicalName: item.name,
                    description: item.description,
                    symptoms: item.symptoms,
                    treatment: item.treatment,
                  })
                }>
                <Avatar.Image
                  source={{uri: item.img}}
                  size={90}
                  style={styles.elevation}
                />
              </TouchableOpacity>
              <Text
                style={[
                  styleMain.subheader,
                  {fontSize: FONT_SIZE.md, fontFamily: FONT_FAMILY.bold},
                ]}>
                {item.name}
              </Text>
            </View>
          );
        }}
      />
    </>
  );
};

export default MedicalList;

const styles = StyleSheet.create({
  container: {
    width: wp('30%'),
    display: 'flex',
    alignItems: 'center',
    paddingVertical: hp('1%'),
  },
  elevation: {
    elevation: 8,
  },
});
