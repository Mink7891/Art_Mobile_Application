import React from 'react';
import {Pressable, StyleSheet, TouchableOpacity, Text} from "react-native";

const CustomButton = ({onPress, title, sizeButton}) => {
  return (
    <TouchableOpacity style={{...styles.button, width: sizeButton}} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    // width: '50%',
    
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
  text: {
    fontSize: 14,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
})

export default CustomButton;
