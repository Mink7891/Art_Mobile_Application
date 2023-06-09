import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, Text, Image, SafeAreaView } from 'react-native';
import Tablet from './Tablet';





const FullViewAge = ({ route }) => {

    const { text, img, title } = route.params







    return (
        <SafeAreaView style={{flex : 1}}>
            <View style={styles.container}>
                <ScrollView >
                    <Text style={styles.h1}>{title}</Text>
                    <View style={styles.imgContainer}>
                        <Image style={styles.img} source={{ uri: img }} resizeMode="cover"></Image>
                    </View>
                    <View>

                        <Text style={styles.text}>
                            {text.split("<br/>").join("\n")}
                        </Text>


                    </View>
                </ScrollView>
            </View >
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 16,
    },

    h1: {
        marginTop: 60,
        fontSize: 18,
        alignItems: "center",
        textAlign: 'center',
        fontWeight: "bold"
    },



    imgContainer: {

        marginTop: 20,
        width: '100%',
        height: 300,
        paddingLeft: 50,
        paddingRight: 50,

    },

    img: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover'
    },

    text: {
        marginTop: 15
    }

});

export default FullViewAge;