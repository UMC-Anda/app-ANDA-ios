import {ScrollView, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useRecoilState, useRecoilValue} from 'recoil';
import {registerInfoNormal, registerType} from '../../state/Register';
import {Button, TextInput} from 'react-native-paper';
import {RegisterInfoStyle as style} from './Register.style';
import fetch from '../../utils/fetch';

const emailRegEx =
  /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;

const DoctorInfo = function (): JSX.Element {
  return <ScrollView style={style.wrap} />;
};

const Input = function ({
  placeholder,
  onChangeText,
  buttonContent,
  success,
  fail,
  isPass,
  onPress,
  buttonActive,
}: any): JSX.Element {
  return (
    <View style={style.itemWrap}>
      <View style={style.row}>
        <TextInput
          style={style.input}
          contentStyle={{paddingLeft: 2}}
          placeholder={placeholder}
          onChangeText={onChangeText}
          secureTextEntry={isPass}
          activeUnderlineColor={
            success ? '#1CB9D9' : fail ? '#FA2F13' : '#CCCCCC'
          }
          underlineColor={success ? '#1CB9D9' : fail ? '#FA2F13' : '#CCCCCC'}
        />
        {buttonContent && (
          <Button
            labelStyle={buttonActive ? style.onButtonText : style.buttonText}
            style={buttonActive ? style.onButton : style.button}
            onPress={onPress}>
            {buttonContent}
          </Button>
        )}
      </View>
      {success && <Text style={style.success}>{success}</Text>}
      {fail && <Text style={style.fail}>{fail}</Text>}
    </View>
  );
};
const NormalInfo = function (): JSX.Element {
  const [info, setInfo] = useRecoilState(registerInfoNormal);
  const [emailConfirm, setEmailConfirm] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [emailButton, setEmailButton] = useState(false);

  useEffect(() => {
    if (password && password == passwordConfirm) {
      setInfo({
        ...info,
        password: password,
      });
    }
  }, [info, password, passwordConfirm, setInfo]);

  return (
    <ScrollView style={style.wrap}>
      <Input
        placeholder="이메일 입력"
        onChangeText={(text: string) => {
          setInfo({
            ...info,
            email: text,
          });
        }}
        buttonContent="인증번호"
        buttonActive={info.email && emailRegEx.test(info.email)}
        success={
          info.email && emailRegEx.test(info.email)
            ? '사용가능한 이메일 입니다.'
            : ''
        }
        fail={
          info.email && !emailRegEx.test(info.email)
            ? '이메일을 확인해주세요!'
            : ''
        }
        onPress={async () => {
          //   const verify = await fetch('/app/users/signup/verify/email').then(
          //     (res: any) => res.json(),
          //   );
          const response = await fetch(
            `/app/users/signup/verify/${info.email}`,
          );
          const data = await response.json();
          console.log(data);
        }}
      />
      <Input
        placeholder="이메일 인증번호 입력"
        onChangeText={(text: string) => {
          setEmailConfirm(text);
        }}
        buttonContent="확인"
        buttonActive={emailConfirm}
      />
      <Input
        placeholder="비밀번호 입력"
        onChangeText={(text: string) => {
          setPassword(text);
        }}
        isPass={true}
      />
      <Input
        placeholder="비밀번호 재입력"
        onChangeText={(text: string) => {
          setPasswordConfirm(text);
        }}
        isPass={true}
      />
      <Input
        placeholder="닉네임 입력"
        onChangeText={(text: string) => {
          setInfo({
            ...info,
            nickname: text,
          });
        }}
        buttonContent="중복확인"
      />
      <View style={{height: 30}} />
      <Text style={{marginBottom: 20}}>선택</Text>
      <Input
        placeholder="추천인 아이디 입력"
        onChangeText={(text: string) => {
          setInfo({
            ...info,
            recommendUserId: text,
          });
        }}
      />
    </ScrollView>
  );
};
const RegisterInfo = function (): JSX.Element {
  const rType = useRecoilValue(registerType);
  return (
    <View style={style.container}>
      {rType === 'doctor' ? <DoctorInfo /> : <NormalInfo />}
    </View>
  );
};

export default RegisterInfo;
