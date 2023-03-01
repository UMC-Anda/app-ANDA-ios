import {createNativeStackNavigator} from '@react-navigation/native-stack';
import RegisterType from './RegisterType';
import React, {useEffect} from 'react';
import RegisterAgree from './RegisterAgree';
import {View} from 'react-native';
import {Button, DefaultTheme, IconButton} from 'react-native-paper';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import style from './Register.style';
import {useNavigation} from '@react-navigation/native';
import {useRecoilState, useSetRecoilState} from 'recoil';
import {readyButton, registerInfoNormal} from '../../state/Register';
import RegisterInfo from './RegisterInfo';
import http from '../../utils/http';

const Stack = createNativeStackNavigator();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#1CB9D9',
  },
};

let current = 0;
const route = ['Type', 'Agree', 'Info'];
const buttonContent = ['다음', '동의 후 가입하기', '회원가입 완료'];

function HeaderLeft({navigation}: any): JSX.Element {
  const setReady = useSetRecoilState(readyButton);
  return (
    <IconButton
      icon="chevron-left"
      onPress={() => {
        if (current > 0) {
          current--;
        }
        setReady(true);
        navigation.goBack();
      }}
      style={style.icon}
      size={32}
    />
  );
}

function RegisterScreen(): JSX.Element {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const [ready, setReady] = useRecoilState(readyButton);
  const [info, setInfo] = useRecoilState(registerInfoNormal);
  console.log(ready);

  useEffect(() => {
    if (current === 2 && info.email && info.nickname && info.password) {
      setReady(true);
    }
  }, [info, setReady]);
  return (
    <View style={{height: '100%'}}>
      <Stack.Navigator
        screenOptions={{
          animation: 'slide_from_right',
          headerShadowVisible: false,
        }}>
        <Stack.Screen
          name="Type"
          component={RegisterType}
          options={{
            title: '회원가입 유형 선택',
            headerLeft: () => <HeaderLeft navigation={navigation} />,
          }}
        />
        <Stack.Screen
          name="Agree"
          component={RegisterAgree}
          options={({navigation}) => ({
            title: '약관동의',
            headerLeft: () => <HeaderLeft navigation={navigation} />,
          })}
        />
        <Stack.Screen
          name="Info"
          component={RegisterInfo}
          options={({navigation}) => ({
            title: '회원가입',
            headerLeft: () => <HeaderLeft navigation={navigation} />,
          })}
        />
      </Stack.Navigator>
      <Button
        style={ready ? style.nextButton : style.button}
        labelStyle={style.label}
        theme={theme}
        disabled={!ready}
        contentStyle={{paddingBottom: insets.bottom, paddingTop: 7}}
        onPress={async () => {
          if (current < 2) {
            current++;
            setReady(false);
            navigation.navigate(route[current]);
          } else {
            try {
              const res = await http.post('/users/signup', info);
              if (res.data.isSuccess) {
                navigation.goBack();
              } else {
                throw Error('회원가입 실패');
              }
            } catch (err) {
              console.log(err);
            }
          }
        }}>
        {buttonContent[current]}
      </Button>
    </View>
  );
}

export default RegisterScreen;
