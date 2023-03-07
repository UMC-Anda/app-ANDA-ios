import {Image, ScrollView, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {useRecoilState, useRecoilValue} from 'recoil';
import {registerInfoNormal, registerTypeState} from '../../state/register';
import {
  Button,
  HelperText,
  TextInput,
  Text,
  IconButton,
} from 'react-native-paper';
import {RegisterInfoStyle as style} from './Register.style';
import Toast from 'react-native-toast-message';
import http from '../../utils/http';
import {launchImageLibrary} from 'react-native-image-picker';

interface fileType {
  fileName: string;
  fileSize: number;
  height: number;
  width: number;
  type: string;
  uri: string;
}
const emailRegEx =
  /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;
const numberRegEx = /^-?\d+$/;
const passRegEx = /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;

const showToast = (text: string, type: string) => {
  Toast.show({
    type: type,
    position: 'bottom',
    text1: text,
    visibilityTime: 1500,
    bottomOffset: 0,
  });
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
  value,
  margin = true,
}: any): JSX.Element {
  return (
    <View style={{marginBottom: margin ? 40 : 0}}>
      <View style={style.row}>
        <TextInput
          autoCapitalize="none"
          style={style.input}
          contentStyle={{paddingLeft: 2, marginBottom: 0}}
          placeholder={placeholder}
          onChangeText={onChangeText}
          secureTextEntry={isPass}
          activeUnderlineColor={
            success ? '#1CB9D9' : fail ? '#FA2F13' : '#CCCCCC'
          }
          underlineColor={success ? '#1CB9D9' : fail ? '#FA2F13' : '#CCCCCC'}
          value={value}
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
      {margin && (
        <HelperText
          visible={success || fail}
          type={success ? 'info' : 'error'}
          style={{paddingLeft: 0, color: success ? '#1CB9D9' : '#FA2F13'}}>
          {success}
          {fail}
        </HelperText>
      )}
      {/* {success && <Text style={style.success}>{success}</Text>}
      {fail && <Text style={style.fail}>{fail}</Text>} */}
    </View>
  );
};

type item = {
  value: string;
  status: number;
};
const RegisterInfo = function (): JSX.Element {
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
  const [hospitalList, setHospitalList] = useState([
    {id: 1, title: 'test'},
    {id: 2, title: 'test2'},
    {id: 3, title: 'test2'},
    {id: 4, title: 'test2'},
    {id: 5, title: 'test2'},
  ]);
  const [hospital, setHospital] = useState<item>({value: '', status: 0});
  const [doctorName, setDoctorName] = useState<item>({value: '', status: 0});
  const [showList, setShowList] = useState(false);
  const registerType = useRecoilValue(registerTypeState);
  const [file, setFile] = useState<fileType>();
  return (
    <View style={style.container}>
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
        {registerType === 'doctor' && (
          <View>
            <Input
              placeholder="병원 이름 입력"
              onChangeText={async (text: string) => {
                setHospital({
                  value: text,
                  status: 0,
                });
                if (text.length > 2) {
                  setShowList(true);
                  try {
                    const {data} = await http.get('');
                    setHospitalList(data.list);
                  } catch (err) {
                    console.error(err);
                  }
                } else {
                  setShowList(false);
                }
              }}
              value={hospital.value}
              success={hospital.status > 0 ? ' ' : ''}
              margin={!(showList && hospitalList.length > 0)}
            />
            {showList && hospitalList.length > 0 && (
              <View style={style.hospitalList}>
                {hospitalList.map(item => {
                  return (
                    <TouchableOpacity
                      style={style.hospitalItem}
                      onPress={() => {
                        setHospital({
                          value: item.title,
                          status: 1,
                        });
                        setShowList(false);
                      }}>
                      <Text>{item.title}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            )}
          </View>
        )}
        {registerType === 'doctor' && (
          <Input
            placeholder="이름 입력"
            onChangeText={(text: string) => {
              setDoctorName({
                value: text,
                status: 1,
              });
            }}
            success={doctorName.status > 0 ? ' ' : ''}
          />
        )}
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
        {registerType === 'doctor' && (
          <View>
            <Text style={style.uploadTitle}>의사면허증 사진 업로드</Text>
            <Text style={style.uploadSubtitle}>
              ※증명사진 및 생년월일을 가리고 업로드해주세요.
            </Text>
            {file && (
              <View style={style.fileWrap}>
                <Image
                  source={require('ANDA/assets/icons/file.png')}
                  style={style.fileImage}
                />
                <Text
                  style={style.filename}
                  numberOfLines={1}
                  ellipsizeMode="tail">
                  {file.fileName}
                </Text>
                <IconButton
                  style={{padding: 0, margin: 0}}
                  iconColor="#B3B3B3"
                  icon="close-circle-outline"
                  onPress={() => {
                    setFile(undefined);
                  }}
                />
              </View>
            )}
            {!file && (
              <TouchableOpacity
                style={style.folderWrap}
                onPress={async () => {
                  try {
                    const {assets}: any = await launchImageLibrary({
                      mediaType: 'photo',
                    });
                    // console.log(typeof assets);
                    setFile(assets[0]);
                  } catch (err) {
                    showToast('이미지 불러오기 실패!', 'error');
                  }
                }}>
                <Image
                  source={require('ANDA/assets/icons/folder1.png')}
                  style={style.folderImage}
                />
                <Text style={style.folderText}>사진을 업로드해주세요.</Text>
              </TouchableOpacity>
            )}
          </View>
        )}

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
      {/* {rType === 'doctor' ? <DoctorInfo /> : <NormalInfo />} */}
      <Toast />
    </View>
  );
};

export default RegisterInfo;
