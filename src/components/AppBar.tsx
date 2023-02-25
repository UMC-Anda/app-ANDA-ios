import React from 'react';

import {Appbar} from 'react-native-paper';
import {StyleSheet} from 'react-native';

const style = StyleSheet.create({
  title: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '700',
  },
  header: {
    backgroundColor: '#ffffff',
  },
});
const AppBar = ({onPress, title}: any) => {
  return (
    <Appbar.Header style={style.header}>
      <Appbar.BackAction onPress={onPress} size={18} />
      <Appbar.Content title={title} titleStyle={style.title} />
    </Appbar.Header>
  );
};

export default AppBar;
