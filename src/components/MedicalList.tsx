import {View, Text, FlatList, StyleSheet} from 'react-native';
import React from 'react';
import {Avatar} from 'react-native-paper';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {styleMain} from '../styles';
import {FONT_FAMILY, FONT_SIZE} from '../constants';

const MedicalList = () => {
  return (
    <>
      <FlatList
        data={medicalData}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => {
          return (
            <View style={styles.container}>
              <Avatar.Image
                source={{uri: item.img_url}}
                size={90}
                style={styles.elevation}
              />
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

const medicalData = [
  {
    id: '1',
    name: 'Skin care',
    img_url:
      'https://images.pexels.com/photos/2622187/pexels-photo-2622187.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: '2',
    name: 'Breast Cancer',
    img_url:
      'https://images.pexels.com/photos/2622187/pexels-photo-2622187.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: '3',
    name: 'HIV/AIDs',
    img_url:
      'https://images.pexels.com/photos/2622187/pexels-photo-2622187.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: '4',
    name: 'Pregnency',
    img_url:
      'https://images.pexels.com/photos/2622187/pexels-photo-2622187.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: '5',
    name: 'Mental Health',
    img_url:
      'https://images.pexels.com/photos/2622187/pexels-photo-2622187.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
];
