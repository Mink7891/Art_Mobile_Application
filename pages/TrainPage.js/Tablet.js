import React, {useState} from 'react';
import {View, ScrollView, StyleSheet, Text, Image, TouchableOpacity} from 'react-native';

const Tablet = ({age, img, navigation, text, title, rate, userRate}) => {


  return (

    <View style={styles.tabletContainer}>
      <View style={styles.verticalStick}></View>
      <View style={styles.horizontalStick}></View>
      <View style={[styles.littleStick, {left: 30}]}></View>
      <View style={[styles.littleStick, {left: 160}]}></View>
      <TouchableOpacity disabled={rate - (userRate * 45) > 15}
                        onPress={() => navigation.navigate('FullViewAge', {text, title, img})}>
        <View style={[styles.table]}>
          <Text style={styles.tableText}>{age}</Text>
        </View>
      </TouchableOpacity>
    </View>


  );
};

const styles = StyleSheet.create({
  tabletContainer: {
    position: 'relative',
    top: -119.5,
    left: -5,
    width: 180,
    height: 120,
  },


  verticalStick: {
    position: 'absolute',
    top: 12,
    width: '100%',
    borderRadius: 20,
    height: 6,
    backgroundColor: '#4e4e4e'
  },


  horizontalStick: {
    position: 'absolute',
    left: 10,
    height: '100%',
    width: 6,
    borderRadius: 20,
    backgroundColor: '#4e4e4e'
  },


  littleStick: {
    top: 17,
    position: 'absolute',
    height: 10,
    width: 2,
    backgroundColor: 'black'
  },


  table: {
    top: 25,
    left: 23,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 4,
    backgroundColor: '#ece8df',
    alignSelf: 'flex-start',
    justifyContent: 'flex-start',

  },


  tableText: {}


});

export default Tablet;
