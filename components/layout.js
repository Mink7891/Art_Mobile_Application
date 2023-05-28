import React from 'react';
import {ImageBackground, StyleSheet, Dimensions} from "react-native";

const d = Dimensions.get("screen");

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
    width: d.width,
    height: d.height,
  }
})

export default Layout;
