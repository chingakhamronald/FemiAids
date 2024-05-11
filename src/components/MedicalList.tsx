import {View, Text, FlatList, StyleSheet} from 'react-native';
import React, {FC, useEffect, useState} from 'react';
import {Avatar} from 'react-native-paper';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {styleMain} from '../styles';
import {FONT_FAMILY, FONT_SIZE} from '../constants';
import {TouchableOpacity} from 'react-native-gesture-handler';
import firestore from '@react-native-firebase/firestore';

interface IMedicalList {
  navigation: any;
}

interface IMedicalData {
  id: string;
  name: string;
  img: string;
  description: string;
  symptoms: string;
  treatment: string;
}

const MedicalList: FC<IMedicalList> = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [medicalData, setMedicalData] = useState<IMedicalData[]>([]);

  const ref = firestore().collection('medical');

  useEffect(() => {
    const unsubscribe = ref.onSnapshot(querySnapshot => {
      const fetchedMedical: any = [];

      querySnapshot.forEach(doc => {
        const {description, img, name, symptoms, treatment} = doc.data();
        fetchedMedical.push({
          id: doc.id,
          description: description,
          img: img,
          name: name,
          symptoms: symptoms,
          treatment: treatment,
        });
      });

      setMedicalData(fetchedMedical);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [ref]);

  const onRefresh = () => {
    setLoading(true);
  };

  return (
    <>
      <FlatList
        data={medicalData}
        refreshing={loading}
        onRefresh={onRefresh}
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
