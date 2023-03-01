/* eslint-disable react-hooks/rules-of-hooks */
import {useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil';
import {accessTokenState, refreshTokenState} from '../state/token';
import AsyncStorage from '@react-native-async-storage/async-storage';
import http from './http';

export const getAccessToken = async () => {
  try {
    const accessToken = useRecoilValue(accessTokenState);
    const [refreshToken, setRefreshToken] = useRecoilState(refreshTokenState);
    if (accessToken) {
      return accessToken;
    } else {
      if (!refreshToken) {
        const localToken = await AsyncStorage.getItem('refreshToken');
        if (localToken) {
          setRefreshToken(localToken);
        } else {
          return null;
        }
      }
      refreshAccessToken();
    }
  } catch (err) {
    console.log(err);
  }
  return null;
};

export const refreshAccessToken = async () => {
  try {
    const setAccessToken = useSetRecoilState(accessTokenState);
    const refreshToken = useRecoilValue(refreshTokenState);
    const response = await http.post('', {
      refreshToken: refreshToken,
    });
    if (response.data.isSuccess) {
      const token = response.data.token;
      setAccessToken(token);
      return token;
    } else {
      throw Error(response.data.message);
    }
  } catch (err) {
    console.error(err);
  }
};

export const saveToken = async (
  newAccessToken: string,
  newRefreshToken: string,
) => {
  try {
    const setAccessToken = useSetRecoilState(accessTokenState);
    const setRefreshToken = useSetRecoilState(refreshTokenState);
    const autoLogin = await AsyncStorage.getItem('autoLogin');
    if (newAccessToken) {
      setAccessToken(newAccessToken);
    }
    if (newRefreshToken) {
      setRefreshToken(newRefreshToken);
      if (autoLogin) {
        await AsyncStorage.setItem('refreshToken', newRefreshToken);
      }
    }
  } catch (err) {
    console.error(err);
  }
};

// export const destroyToken = async
