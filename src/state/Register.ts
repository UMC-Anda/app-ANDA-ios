import {atom} from 'recoil';

export const readyButton = atom<boolean>({
  key: 'RegisterButtonReady',
  default: false,
});

export const registerType = atom<String>({
  key: 'RegisterType',
  default: '',
});

export const registerTerms = atom({
  key: 'RegisterTerms',
  default: {
    over14: false,
    useTerms: false,
    privacy: false,
    ad: false,
  },
});

export const registerInfoNormal = atom({
  key: 'RegisterInfoNormal',
  default: {
    email: '',
    password: '',
    nickname: '',
    recommendUserId: '',
  },
});
