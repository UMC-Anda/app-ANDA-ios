import {Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect} from 'react';
import User from '../../../assets/icons/fi-rr-user.svg';
import Stethoscope from '../../../assets/icons/fi-rr-stethoscope.svg';
import {RegisterTypeStyle as style} from './Register.style';
import {useSetRecoilState} from 'recoil';
import {readyButton} from '../../state/Register';
import {registerType} from '../../state/Register';

const RegisterType = function (): JSX.Element {
  const [normal, setNormal] = React.useState(false);
  const [doctor, setDoctor] = React.useState(false);
  const setReady = useSetRecoilState(readyButton);
  const setRegisterType = useSetRecoilState(registerType);
  useEffect(() => {
    setReady(normal || doctor);
    if (normal) {
      setRegisterType('normal');
    } else if (doctor) {
      setRegisterType('doctor');
    } else {
      setRegisterType('');
    }
  }, [normal, doctor, setReady, setRegisterType]);
  // const insets = useSafeAreaInsets();
  return (
    <View style={style.contain}>
      {/* <AppBar
        onPress={() => {
          props.goBack();
        }}
        title={doctor || normal ? '회원가입' : '회원가입 유형 선택'}
      /> */}
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
    </View>
  );
};

export default RegisterType;
