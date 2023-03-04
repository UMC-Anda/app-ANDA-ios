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
    isOverAge: false,
    isTermsOfUseAgree: false,
    isPrivacyPolicyAgree: false,
    isMarketingInfoAgree: false,
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
