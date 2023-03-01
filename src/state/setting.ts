import AsyncStorage from '@react-native-async-storage/async-storage';
import {atom, selector} from 'recoil';

const savedIDAtom = atom({
  key: 'savedIDString',
  default: '',
  effects: [
    ({setSelf}) => {
      AsyncStorage.getItem('savedID').then(id => setSelf(id as string));
    },
  ],
});

export const savedIDState = selector({
  key: 'savedIDState',
  get: ({get}) => {
    return get(savedIDAtom);
  },
  set: ({set}, id) => {
    set(savedIDAtom, id);
    AsyncStorage.setItem('savedID', id as string);
  },
});
const autoLoginAtom = atom({
  key: 'autoLoginAtom',
  default: false,
  effects: [
    ({setSelf}) => {
      AsyncStorage.getItem('autoLogin').then(autoLogin => {
        setSelf(autoLogin === 'true');
      });
    },
  ],
});

export const autoLoginState = selector({
  key: 'autoLoginSelector',
  get: ({get}) => {
    return get(autoLoginAtom);
  },
  set: ({set}, login) => {
    set(autoLoginAtom, login);
    try {
      AsyncStorage.setItem('autoLogin', login.toString());
    } catch (error) {
      console.error(error);
    }
  },
});

const isSaveIDAtom = atom({
  key: 'isSaveIDAtom',
  default: false,
  effects: [
    ({setSelf}) => {
      AsyncStorage.getItem('isSaveID').then(saveID => {
        setSelf(saveID === 'true');
      });
    },
  ],
});

export const isSaveIDState = selector({
  key: 'isSaveIDState',
  get: ({get}) => {
    return get(isSaveIDAtom);
  },
  set: ({set}, login) => {
    set(isSaveIDAtom, login);
    try {
      AsyncStorage.setItem('isSaveID', login.toString());
    } catch (error) {
      console.error(error);
    }
  },
});
