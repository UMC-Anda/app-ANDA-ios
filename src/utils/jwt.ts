import AsyncStorage from '@react-native-async-storage/async-storage';
import http from './http';
import jwtDecode from 'jwt-decode';
import {setUser} from './user';

export const getAccessToken = async () => {
  return await AsyncStorage.getItem('accessToken');
};

export const setToken = async (
  newAccessToken: string,
  newRefreshToken: string,
) => {
  http.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;
  // console.log
  try {
    const decodedToken: {id: number; email: string; nickname: string} =
      jwtDecode(newAccessToken);
    setUser({
      id: decodedToken.id,
      email: decodedToken.email,
      nickname: decodedToken.nickname,
    });
    await AsyncStorage.multiSet([
      ['accessToken', newAccessToken],
      ['refreshToken', newRefreshToken],
    ]);
  } catch (err) {
    console.error(err);
  }
};

export const isAuthenticated = async () => {
  try {
    const refreshToken = await AsyncStorage.getItem('refreshToken');

    if (refreshToken) {
      const decodedToken: {exp: number} = jwtDecode(refreshToken);
      const expirationTime = decodedToken.exp * 1000;
      const currentTime = new Date().getTime();
      if (expirationTime < currentTime) {
        return false;
      }
      return true;
    }
  } catch (err) {
    console.error(err);
  }
  return false;
};
export const distroyToken = async () => {
  try {
    await AsyncStorage.multiRemove(['accessToken', 'refreshToken']);
  } catch (err) {
    console.error(err);
  }
};
