import React, {FC} from 'react';
import {FlatList, StyleSheet, View, Text, Linking} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {CHECK_SCREEN, COLOR_TYPE, FONT_FAMILY, FONT_SIZE} from '../constants';
import {Button, Card} from 'react-native-paper';
import {styleMain} from '../styles';
import Filter_svg from '../../assets/icons/filter.svg';
import {useStore} from '../hooks/useStore';
import {ISchemeData} from '../types';

interface ISchemesProps {
  schemesData: ISchemeData[];
}

const Icons = () => <Filter_svg />;

const SchemesList: FC<ISchemesProps> = ({schemesData}) => {
  const store = useStore(state => state);

  return (
    <View style={[styleMain.flexGrow, styles.flex]}>
      <View style={styles.wrapperContainer}>
        <Text style={[styleMain.subheader, {color: COLOR_TYPE.white}]}>
          Filter by
        </Text>
        <View style={styles.dropdownWrapper}>
          <Button
            mode="contained"
            onPress={() => {
              store.showVisible(true);
              store.setCheckScreen(CHECK_SCREEN.CATEGORY);
            }}
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
                subtitle={item.description}
                titleStyle={[styleMain.header, {fontSize: hp('2.5%')}]}
                style={styles.card}
                right={() => <Btn URL={item.url} />}
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

const Btn: FC<{URL: string}> = ({URL}) => {
  const handleLink = () => {
    return Linking.openURL(URL);
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
