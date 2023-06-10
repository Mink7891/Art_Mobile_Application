import React from 'react'
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

export default function FlatButton({text, onPress, isDisable, correct, chooseButton}) {
  return (

    <TouchableOpacity disabled={isDisable} onPress={onPress}>
      <View
        style={!isDisable ? styles.buttonUnChoose : correct ? styles.buttonCorrect : chooseButton ? styles.buttonUnCorrect : styles.buttonUnChoose}>
        <Text style={styles.buttonText}>{text}</Text>
      </View>
    </TouchableOpacity>
  )
}


const styles = StyleSheet.create({
  buttonUnChoose: {
    padding: 10,
    margin: 10,
    width: 300,
    backgroundColor: '#fff',
    borderRadius: 20
  },

  buttonCorrect: {
    padding: 10,
    margin: 10,
    width: 300,
    backgroundColor: '#92CF06',
    borderRadius: 20

  },

  buttonUnCorrect: {
    padding: 10,
    margin: 10,
    width: 300,
    backgroundColor: '#DC143C',
    borderRadius: 20
  },


  buttonText: {
    fontFamily: 'Calibri'
  }
})
