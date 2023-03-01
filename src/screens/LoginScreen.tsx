/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  Image,
  Text,
  TextInput,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {Button, IconButton} from 'react-native-paper';
import style from './LoginScreen.style';
import http from '../utils/http';
import {saveToken} from '../utils/jwt';
// import {IconButton, MD3Colors} from 'react-native-paper';

const Width = Dimensions.get('window').width;

function LoginScreen({navigation}: any): JSX.Element {
  const [saveID, setSaveID] = React.useState(false);
  const [autoLogin, setAutoLogin] = React.useState(false);
  const [showPass, setShowPass] = React.useState(true);
  return (
    <View style={style.loginView}>
      <View style={style.logoWrap}>
        <Image
          style={style.logo}
          source={require('ANDA/assets/images/logo.png')}
        />
        <Text style={style.loginTitle}>안경을 벗다. 안다로 본다</Text>
      </View>
      <View style={style.fullWidth}>
        <View style={style.inputWrap}>
          <Text style={style.inputTitle}>아이디</Text>
          <TextInput style={style.inputText} placeholder="이메일 주소" />
        </View>
        <View style={{height: 38}} />
        <View style={style.inputWrap}>
          <Text style={style.inputTitle}>비밀번호</Text>
          <View>
            <TextInput
              style={[style.inputText, {paddingRight: 30}]}
              placeholder="영문, 숫자, 특수문자 조합 8자리이상"
              secureTextEntry={showPass}
            />
            <IconButton
              icon={showPass ? 'eye-off' : 'eye'}
              style={{position: 'absolute', right: -10}}
              size={20}
              onPress={() => {
                setShowPass(!showPass);
              }}
            />
          </View>
        </View>
        <View style={{height: 16}} />
        <View style={style.row}>
          <View style={style.row}>
            <TouchableOpacity
              // underlayColor="#1CBBD9"
              onPress={() => {
                setSaveID(!saveID);
              }}
              style={style.CheckBox}>
              <Image
                source={
                  saveID
                    ? require('ANDA/assets/icons/checkOn.png')
                    : require('ANDA/assets/icons/checkOff.png')
                }
              />
            </TouchableOpacity>
            <Text>아이디 저장</Text>
          </View>
          <View style={{width: 12}} />
          <View style={style.row}>
            <TouchableOpacity
              // underlayColor="#1CBBD9"
              onPress={() => {
                setAutoLogin(!autoLogin);
              }}
              style={style.CheckBox}>
              <Image
                source={
                  autoLogin
                    ? require('ANDA/assets/icons/checkOn.png')
                    : require('ANDA/assets/icons/checkOff.png')
                }
              />
            </TouchableOpacity>
            <Text>자동 로그인</Text>
          </View>
        </View>
      </View>
      <View style={[style.fullWidth, {alignItems: 'center'}]}>
        <Button
          mode="contained-tonal"
          onPress={async () => {
            try {
              const res = await http.get('/users/signin');
              if (res.data.isSuccessisSuccess) {
                // jwt 토큰관리
                const data = res.data.result;
                saveToken(data.AccessJWT, data.RefreshJWT);
              } else {
                throw Error('로그인 실패');
              }
            } catch (err) {
              console.log(err);
            }
          }}
          style={style.loginButton}
          labelStyle={{color: '#fff', width: Width * 0.8}}>
          로그인
        </Button>
        <View style={{height: 12}} />
        <Button
          mode="contained-tonal"
          onPress={() => {
            console.log('test');
          }}
          buttonColor="#fff"
          style={style.simpleLoginButton}
          labelStyle={{color: '#1CBBD9', width: Width * 0.8 - 1}}>
          간편로그인
        </Button>
        <View style={{height: 15}} />
        <View style={style.row}>
          <Button textColor="#000">비밀번호 찾기</Button>
          <Text>|</Text>
          <Button
            textColor="#000"
            onPress={() => {
              navigation.navigate('Register');
            }}>
            회원가입
          </Button>
        </View>
      </View>
    </View>
  );
}
export default LoginScreen;
