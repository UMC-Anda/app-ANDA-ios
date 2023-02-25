import React from 'react';
import {Image, TouchableOpacity} from 'react-native';

interface CheckBoxProps {
  checked: boolean;
  setChecked: React.Dispatch<React.SetStateAction<boolean>>;
}

const CheckBox = ({checked, setChecked}: CheckBoxProps) => {
  return (
    <TouchableOpacity
      onPress={() => {
        setChecked(!checked);
      }}>
      <Image
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
