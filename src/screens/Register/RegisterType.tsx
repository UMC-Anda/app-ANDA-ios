import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AppBar from '../../components/AppBar';
import React, {useEffect} from 'react';
import User from '../../../assets/icons/fi-rr-user.svg';
import Stethoscope from '../../../assets/icons/fi-rr-stethoscope.svg';
import {Button} from 'react-native-paper';
import {useSafeAreaInsets, SafeAreaView} from 'react-native-safe-area-context';

const Width = Dimensions.get('window').width;
const style = StyleSheet.create({
  box: {
    flex: 1,
    aspectRatio: 1,
    borderColor: '#1CB9D9',
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 12,
    alignContent: 'center',
    justifyContent: 'center',
  },
  contain: {
    height: '100%',
  },
  wrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 50,
    width: '90%',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
  },
  subtitle: {
    color: '#666666',
    fontSize: 14,
    fontWeight: '400',
  },
  titleWrap: {
    alignItems: 'center',
    marginBottom: 37,
  },
  button: {
    backgroundColor: '#CCCCCC',
    borderRadius: 0,
    width: Width,
  },
  nextButton: {
    color: '#ffffff',
    backgroundColor: '#1CB9D9',
    borderRadius: 0,
  },
  label: {
    fontWeight: '700',
    fontSize: 16,
    color: '#ffffff',
  },
});
const RegisterType = function (): JSX.Element {
  const [normal, setNormal] = React.useState(false);
  const [doctor, setDoctor] = React.useState(false);
  const insets = useSafeAreaInsets();
  return (
    <View style={style.contain}>
      <AppBar
        onPress={() => {}}
        title={doctor || normal ? '회원가입' : '회원가입 유형 선택'}
      />
      <View style={style.wrap}>
        <View style={style.titleWrap}>
          <Text style={style.title}>회원가입 유형을 선택해주세요.</Text>
          <Text style={style.subtitle}>
            회원님이 해당하는 유형은 무엇인가요?
          </Text>
        </View>
        <View style={style.row}>
          <TouchableOpacity
            style={[
              style.box,
              {backgroundColor: normal ? '#1CB9D9' : '#ffffff'},
            ]}
            onPress={() => {
              setNormal(!normal);
              setDoctor(false);
            }}>
            <View style={{alignItems: 'center'}}>
              <User fill={normal ? '#ffffff' : '#1CB9D9'} />
              <Text
                style={{
                  color: normal ? '#ffffff' : '#1CB9D9',
                  fontSize: 16,
                  fontWeight: '700',
                  marginTop: 20,
                }}>
                일반 회원가입
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              style.box,
              {backgroundColor: doctor ? '#1CB9D9' : '#ffffff'},
            ]}
            onPress={() => {
              setDoctor(!doctor);
              setNormal(false);
            }}>
            <View style={{alignItems: 'center'}}>
              <Stethoscope fill={doctor ? '#ffffff' : '#1CB9D9'} />
              <Text
                style={{
                  color: doctor ? '#ffffff' : '#1CB9D9',
                  fontSize: 16,
                  fontWeight: '700',
                  marginTop: 20,
                }}>
                의사 회원가입
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <Button
        style={[
          doctor || normal ? style.nextButton : style.button,
          {paddingBottom: insets.bottom, paddingTop: 7},
        ]}
        labelStyle={style.label}>
        다음
      </Button>
    </View>
  );
};

export default RegisterType;
