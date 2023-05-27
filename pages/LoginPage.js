import React from 'react';
import {ImageBackground, StyleSheet, View} from "react-native";
import Login from "../Auth/Login";
import layout from "../components/layout";
import Layout from "../components/layout";

const LoginPage = () => {
  return (
    <Layout>
      <Login/>
    </Layout>
  );
};

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    justifyContent: 'center',
  }
})

export default LoginPage;
