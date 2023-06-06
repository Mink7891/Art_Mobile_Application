import React from 'react';
import {StyleSheet, View, Text} from "react-native";

const LinePersonInformation = ({label, info}) => {
  return (
    <View style={styles.content}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.text}>{info}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.17)',
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 10,
    marginBottom: 20
  },
  label: {
    color: 'rgba(28,28,28,0.78)',
    fontSize: 14,
  },
  text: {
    fontSize: 16
  }
})

export default LinePersonInformation;
