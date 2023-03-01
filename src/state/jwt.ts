import AsyncStorage from '@react-native-async-storage/async-storage';
import {atom, selector} from 'recoil';
import httpState from './http';
import {autoLoginState} from './setting';

export const accessTokenState = atom({
  key: 'accessToekn',
  default: '',
});

export const refreshTokenState = atom({
  key: 'refreshToken',
  default: AsyncStorage.getItem('refreshToken') || '',
});

export const refreshAccessTokenState = selector({
  key: 'refreshAccessToken',
  get: () => {},
  set: async ({set, get}) => {
    try {
      const refreshToken = get(refreshTokenState);
      const http = get(httpState);
      if (refreshToken) {
        const response = await http.post('', {
          refreshToken: refreshToken,
        });
        if (response.data.isSuccess) {
          set(accessTokenState, response.data.token);
        } else {
          throw Error(response.data.message);
        }
      }
    } catch (error) {
      console.error(error);
    }
  },
});

export const saveTokenState = selector({
  key: 'saveToken',
  get: () => {},
  set: async ({set, get}, {newAccessToken, newRefreshToken}: any) => {
    try {
      set(accessTokenState, newAccessToken);
      set(refreshTokenState, newRefreshToken);
      if (get(autoLoginState)) {
        await AsyncStorage.setItem('refreshToken', newRefreshToken);
      }
    } catch (error) {
      console.log(error);
    }
  },
});

export const destroyTokenState = selector({
  key: 'destroyToken',
  get: () => {},
  set: async ({set}) => {
    try {
      set(accessTokenState, '');
      set(refreshTokenState, '');
      await AsyncStorage.removeItem('refreshToken');
    } catch (error) {
      console.log(error);
    }
  },
});
