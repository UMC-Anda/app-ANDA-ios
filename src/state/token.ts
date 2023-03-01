import {atom} from 'recoil';

export const accessTokenState = atom({
  key: 'accessToekn',
  default: '',
});

export const refreshTokenState = atom({
  key: 'refreshToken',
  default: '',
});
