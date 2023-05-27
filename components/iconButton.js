import React from 'react';
import {TouchableHighlight, View} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";

export const ProfileButton = ({onPress, size}) => {
  return (
    <TouchableHighlight onPress={onPress}>
      <View style={{width: size, height: size}}>
        <AntDesign color='black' size={25} name='user'/>
      </View>
    </TouchableHighlight>
  );
};
