import React from 'react';
import {Image, TouchableOpacity} from 'react-native';

interface CheckBoxProps {
  checked: boolean;
  setChecked: React.Dispatch<React.SetStateAction<boolean>>;
  size: Number;
}

const CheckBox = ({checked, setChecked, size = 14}: CheckBoxProps) => {
  return (
    <TouchableOpacity
      onPress={() => {
        setChecked(!checked);
      }}>
      <Image
        style={{height: size, width: size}}
        source={
          checked
            ? require('ANDA/assets/icons/checkOn.png')
            : require('ANDA/assets/icons/checkOff.png')
        }
      />
    </TouchableOpacity>
  );
};

export default CheckBox;
