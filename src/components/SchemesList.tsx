import React, {FC} from 'react';
import {FlatList, StyleSheet, View, Text, Linking} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {COLOR_TYPE, FONT_FAMILY, FONT_SIZE} from '../constants';
import {Button, Card} from 'react-native-paper';
import {styleMain} from '../styles';
import Filter_svg from '../../assets/icons/filter.svg';

interface schemesData {
  id: string;
  name: string;
  description: string;
}

interface ISchemesProps {
  schemesData: schemesData[];
}
const Icons = () => <Filter_svg />;

const SchemesList: FC<ISchemesProps> = ({schemesData}) => {
  return (
    <View style={[styleMain.flexGrow, styles.flex]}>
      <View style={styles.wrapperContainer}>
        <Text style={[styleMain.subheader, {color: COLOR_TYPE.white}]}>
          Filter by
        </Text>
        <View style={styles.dropdownWrapper}>
          <Button
            mode="contained"
            style={[
              styles.btn,
              {
                backgroundColor: COLOR_TYPE.primary,
                marginHorizontal: hp('0%'),
                width: wp('40%'),
              },
            ]}
            contentStyle={styles.flexReverse}
            labelStyle={[
              styles.text,
              {color: COLOR_TYPE.blue, fontSize: FONT_SIZE.md},
            ]}
            icon={Icons}>
            Category
          </Button>
          <Button
            mode="contained"
            style={[
              styles.btn,
              {
                backgroundColor: COLOR_TYPE.primary,
                marginHorizontal: hp('0%'),
                width: wp('40%'),
              },
            ]}
            labelStyle={[
              styles.text,
              {color: COLOR_TYPE.blue, fontSize: FONT_SIZE.md},
            ]}
            icon={Icons}
            contentStyle={styles.flexReverse}>
            Age
          </Button>
        </View>
      </View>
      <FlatList
        data={schemesData}
        contentContainerStyle={styles.container}
        renderItem={({item}) => {
          return (
            <View style={styles.cardContainer} key={item.id}>
              <Card.Title
                title={item.name}
                titleStyle={[styleMain.header, {fontSize: hp('2.5%')}]}
                style={styles.card}
                right={Btn}
              />
            </View>
          );
        }}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default SchemesList;

const Btn = () => {
  const handleLink = () => {
    const pdfLink =
      'https://wcd.nic.in/sites/default/files/Beti%20Bachao-Beti%20Padao_English.pdf';

    return Linking.openURL(pdfLink);
  };
  return (
    <Button
      mode="contained"
      style={styles.btn}
      labelStyle={styles.text}
      onPress={handleLink}>
      More Details
    </Button>
  );
};

const styles = StyleSheet.create({
  dropdownWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  wrapperContainer: {
    marginHorizontal: wp('3%'),
    marginVertical: hp('2%'),
  },
  flex: {
    marginBottom: hp('2%'),
    marginHorizontal: wp('3%'),
    backgroundColor: COLOR_TYPE.dark_green,
    borderRadius: 10,
  },
  container: {
    flexGrow: 1,
  },
  cardContainer: {
    marginHorizontal: wp('3%'),
    marginBottom: hp('2%'),
  },
  card: {
    backgroundColor: COLOR_TYPE.secondary,
    elevation: 12,
    borderRadius: 10,
  },
  btn: {
    backgroundColor: COLOR_TYPE.blue,
    borderRadius: 10,
    margin: 5,
  },
  text: {
    fontFamily: FONT_FAMILY.regular,
    fontSize: hp('1.5%'),
    color: COLOR_TYPE.white,
  },
  flexReverse: {
    flexDirection: 'row-reverse',
  },
});
