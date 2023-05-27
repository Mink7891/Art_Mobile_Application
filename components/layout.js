import React from 'react';
import NewsLenta from "../News/NewsLenta";
import {ImageBackground, StyleSheet, View} from "react-native";

const Layout = ({children}) => {
  return (
    <ImageBackground
      source={require('../assets/patternBackground.png')}
      resizeMode='cover'
      style={styles.imageBackground}
    >
        {children}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    justifyContent: 'center',
  }
})

export default Layout;
