import AsyncStorage from '@react-native-async-storage/async-storage';

export const getUser = async () => {
  const user = await AsyncStorage.getItem('user');
  if (user) {
    return JSON.parse(user);
  }
};

interface User {
  id: number;
  email: string;
  nickname: string;
}

export const setUser = (user: User) => {
  console.log(user);
  AsyncStorage.setItem('user', JSON.stringify(user));
};
