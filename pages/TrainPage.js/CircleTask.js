import React from 'react';
import { View, ScrollView, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import Tablet from './Tablet';

const CircleTask = ({ age, img , navigation,rate , text, title,userRate}) => {
    
    return (
        <>

            <View style={[styles.circle, { left: rate}]}>
                
                    <Tablet age={age} navigation={navigation} text={text} title={title} userRate={userRate} rate={rate} img={img}></Tablet>
            
            </View>


        </>
    );
};

const styles = StyleSheet.create({

    flag: {
        position: 'absolute',
        bottom: -21,
        left: -50,
        width: 176,
        height: 180
    },

    text: {
        position: 'absolute',
        width: 100,
        top: -70,
        left: 32

    },


    circle: {
        position: 'absolute',
        backgroundColor: 'black',
        height: '100%',
        width: 15,
        borderRadius: 100,
        textAlign: 'center',


    }
});

export default CircleTask;