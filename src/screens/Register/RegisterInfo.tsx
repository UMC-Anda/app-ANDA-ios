import {ScrollView, Text, View} from 'react-native';
import React, {useState} from 'react';
import {useRecoilState, useRecoilValue} from 'recoil';
import {registerInfoNormal, registerType} from '../../state/register';
import {Button, TextInput} from 'react-native-paper';
import {RegisterInfoStyle as style} from './Register.style';
import http from '../../utils/http';
import Toast from 'react-native-toast-message';

const emailRegEx =
  /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;
const numberRegEx = /^-?\d+$/;
const passRegEx = /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
const showToast = (text: string, type: string) => {
  Toast.show({
    type: type,
    position: 'bottom',
    text1: text,
    visibilityTime: 1000,
    bottomOffset: 0,
  });
};
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
          autoCapitalize="none"
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
            disabled={!buttonActive}
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

type item = {
  value: string;
  status: number;
};
const NormalInfo = function (): JSX.Element {
  const [info, setInfo] = useRecoilState(registerInfoNormal);
  const [email, setEmail] = useState<item>({value: '', status: 0});
  const [emailConfirm, setEmailConfirm] = useState<item>({
    value: '',
    status: 0,
  });
  const [password, setPassword] = useState<item>({value: '', status: 0});
  const [passwordConfirm, setPasswordConfirm] = useState<item>({
    value: '',
    status: 0,
  });
  const [nickname, setNickname] = useState<item>({value: '', status: 0});

  //   useEffect(() => {
  //     if (password.status > 0 && passwordConfirm.status > 0) {
  //       setInfo({
  //         ...info,
  //         password: password.value,
  //       });
  //     }
  //   }, [info, password, passwordConfirm, setInfo]);

  return (
    <ScrollView style={style.wrap} showsVerticalScrollIndicator={false}>
      <Input
        placeholder="이메일 입력"
        onChangeText={(text: string) => {
          setEmail({
            value: text,
            status: 0,
          });
          setEmailConfirm({
            value: emailConfirm.value,
            status: 0,
          });
        }}
        buttonContent="인증번호"
        buttonActive={email.value && emailRegEx.test(email.value)}
        success={email.status > 0 ? '사용할 수 있는 이메일 입니다.' : ''}
        fail={email.status < 0 ? '이메일을 확인해주세요.' : ''}
        onPress={async () => {
          try {
            if (!emailRegEx.test(email.value)) {
              setEmail({
                value: email.value,
                status: -1,
              });
              return;
            }
            //이메일 존재 확인
            const isExist = await http.get(
              `/users/signup/verify/email?email=${email.value}`,
            );
            if (!isExist.data.result.isUsable) {
              showToast('이미 등록된 이메일입니다!', 'error');
              setEmail({
                value: email.value,
                status: -1,
              });
            } else {
              const sendMail = await http.post(
                '/users/signup/verify/email/code',
                {
                  email: email.value,
                },
              );
              if (sendMail.data.isSuccess) {
                setEmail({
                  value: email.value,
                  status: 1,
                });
                setInfo({
                  ...info,
                  email: email.value,
                });
                showToast('이메일 인증번호를 전송했습니다.', 'info');
              } else {
                throw Error('이메일 인증번호 전송 실패');
              }
            }
          } catch (err) {
            showToast('이메일 인증번호 전송을 실패했습니다.', 'error');
            setEmail({
              value: email.value,
              status: -1,
            });
            console.error(err);
          }
        }}
      />
      <Input
        placeholder="이메일 인증번호 입력"
        onChangeText={(text: string) => {
          setEmailConfirm({
            value: text,
            status: 0,
          });
        }}
        buttonContent="확인"
        buttonActive={emailConfirm.value.length >= 5}
        success={emailConfirm.status > 0 ? '인증번호가 인증되었습니다.' : ''}
        fail={emailConfirm.status < 0 ? '인증번호를 확인해주세요.' : ''}
        onPress={async () => {
          try {
            if (!numberRegEx.test(emailConfirm.value) || email.status <= 0) {
              setEmailConfirm({
                value: emailConfirm.value,
                status: -1,
              });
              if (email.status <= 0) {
                showToast('이메일을 확인해주세요!', 'error');
              } else {
                showToast('인증번호를 확인해주세요!', 'error');
              }
              return;
            }
            const isConfirm = await http.get(
              `/users/signup/verify/email/code?email=${
                email.value
              }&code=${parseInt(emailConfirm.value, 10)}`,
            );
            console.log(isConfirm.data, parseInt(emailConfirm.value, 10));
            if (isConfirm.data.isSuccess) {
              setEmailConfirm({
                value: emailConfirm.value,
                status: 1,
              });
              showToast(isConfirm.data.message, 'info');
            } else {
              setEmailConfirm({
                value: emailConfirm.value,
                status: -1,
              });
              showToast(isConfirm.data.message, 'error');
            }
          } catch (err) {
            setEmailConfirm({
              value: emailConfirm.value,
              status: -1,
            });
            showToast('이메일 인증번호 인증을 실패했습니다!', 'error');
            console.error(err);
          }
        }}
      />
      <Input
        placeholder="비밀번호 입력"
        onChangeText={(text: string) => {
          setPassword({
            value: text,
            status: text ? (passRegEx.test(text) ? 1 : -1) : 0,
          });
          setPasswordConfirm({
            value: passwordConfirm.value,
            status: passwordConfirm.value === text ? 1 : -1,
          });
        }}
        success={password.status > 0 ? '사용할 수 있는 비밀번호입니다.' : ''}
        fail={
          password.status < 0
            ? '특수문자 / 문자 / 숫자 포함 형태의 8~15자리 이내'
            : ''
        }
        isPass={true}
      />
      <Input
        placeholder="비밀번호 재입력"
        onChangeText={(text: string) => {
          if (password.status > 0 && text === password.value) {
            setInfo({
              ...info,
              password: text,
            });
          }
          setPasswordConfirm({
            value: text,
            status: text === password.value ? 1 : -1,
          });
        }}
        success={
          passwordConfirm.value && passwordConfirm.status > 0
            ? '비밀번호가 일치합니다.'
            : ''
        }
        fail={
          passwordConfirm.value && passwordConfirm.status < 0
            ? '비밀번호가 다릅니다.'
            : ''
        }
        isPass={true}
      />
      <Input
        placeholder="닉네임 입력"
        onChangeText={(text: string) => {
          setNickname({
            value: text,
            status: 0,
          });
        }}
        buttonActive={nickname.value}
        buttonContent="중복확인"
        success={nickname.status > 0 ? '사용할 수 있는 닉네임입니다.' : ''}
        fail={nickname.status < 0 ? '사용할 수 없는 닉네임입니다.' : ''}
        onPress={async () => {
          try {
            const isExist = await http.get(
              `/users/signup/verify/nickname?nickname=${nickname.value}`,
            );
            if (isExist.data.result.isUsable) {
              setNickname({
                value: nickname.value,
                status: 1,
              });
              setInfo({
                ...info,
                nickname: nickname.value,
              });
            } else {
              showToast('이미 등록된 닉네임입니다!', 'error');
              setNickname({
                value: nickname.value,
                status: -1,
              });
            }
          } catch (err) {
            setNickname({
              value: nickname.value,
              status: -1,
            });
            console.log(err);
          }
        }}
      />
      <View style={{height: 30}} />
      <Text style={{marginBottom: 20}}>선택</Text>
      <Input
        placeholder="추천인 코드 입력"
        onChangeText={(text: string) => {
          setInfo({
            ...info,
            recommendUserId: text,
          });
        }}
      />
      <View style={{height: 70}} />
    </ScrollView>
  );
};
const RegisterInfo = function (): JSX.Element {
  const rType = useRecoilValue(registerType);
  return (
    <View style={style.container}>
      {rType === 'doctor' ? <DoctorInfo /> : <NormalInfo />}
      <Toast />
    </View>
  );
};

export default RegisterInfo;
